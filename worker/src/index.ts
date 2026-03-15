import { renderTampermonkeyScript } from "./tampermonkey";
import { renderApp } from "./ui";

interface Env {
  DB: D1Database;
  FILES: R2Bucket;
  CORS_ALLOW_ORIGIN?: string;
  INTERNAL_API_TOKEN?: string;
  GITHUB_REPOSITORY?: string;
  GITHUB_WORKFLOW_FILE?: string;
  GITHUB_REF?: string;
  GITHUB_RELEASE_TAG?: string;
  GITHUB_ACTIONS_TOKEN?: string;
}

interface JobFileRecord {
  name: string;
  relative_path: string;
  bucket_key?: string;
  size_bytes?: number;
  content_type?: string;
  download_url?: string;
}

interface JobRow {
  id: string;
  status: string;
  stage: string;
  urls_json: string;
  thread: number | string;
  output_subdir: string | null;
  create_video_list: number | string;
  current_title: string | null;
  completed_parts: number | string | null;
  total_parts: number | string | null;
  progress_percent: number | string | null;
  titles_json: string;
  errors_json: string;
  files_json: string;
  runner_run_id: string | null;
  created_at: string;
  updated_at: string;
  started_at: string | null;
  finished_at: string | null;
}

interface JobRecord {
  id: string;
  status: string;
  stage: string;
  urls: string[];
  thread: number;
  output_subdir: string;
  create_video_list: boolean;
  current_title: string;
  completed_parts: number;
  total_parts: number;
  progress_percent: number;
  titles: string[];
  errors: string[];
  files: JobFileRecord[];
  runner_run_id: string;
  created_at: string;
  updated_at: string;
  started_at: string | null;
  finished_at: string | null;
}

interface JobEventRow {
  id: number | string;
  job_id: string;
  level: string;
  message: string;
  created_at: string;
}

interface JobEventRecord {
  id: number;
  level: string;
  message: string;
  created_at: string;
}

interface CookiePayload {
  cookies: Record<string, string>;
}

interface CreateJobPayload {
  url?: string;
  urls?: string[];
  thread?: number;
  output_subdir?: string;
  create_video_list?: boolean;
}

interface ProgressPayload {
  status?: string;
  stage?: string;
  current_title?: string;
  completed_parts?: number;
  total_parts?: number;
  progress_percent?: number;
  titles?: string[];
  errors?: string[];
  message?: string;
}

interface CompletePayload {
  status?: string;
  stage?: string;
  current_title?: string;
  completed_parts?: number;
  total_parts?: number;
  progress_percent?: number;
  titles?: string[];
  errors?: string[];
  files?: JobFileRecord[];
  message?: string;
}

const DEFAULT_WORKFLOW_FILE = "remote-runner.yml";
const DEFAULT_RELEASE_TAG = "godingtalk-downloads";
const COOKIE_SETTING_KEY = "cookies_payload";
const COOKIE_UPDATED_AT_KEY = "cookies_updated_at";

function jsonResponse(body: unknown, init?: ResponseInit): Response {
  const headers = new Headers(init?.headers);
  headers.set("content-type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(body, null, 2), {
    ...init,
    headers,
  });
}

function textResponse(body: string, init?: ResponseInit): Response {
  const headers = new Headers(init?.headers);
  if (!headers.has("content-type")) {
    headers.set("content-type", "text/plain; charset=utf-8");
  }
  return new Response(body, {
    ...init,
    headers,
  });
}

function htmlResponse(body: string): Response {
  return new Response(body, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function applyCors(request: Request, response: Response, env: Env): Response {
  const headers = new Headers(response.headers);
  const allowedOrigin = env.CORS_ALLOW_ORIGIN?.trim() || "*";
  const requestOrigin = request.headers.get("Origin");

  if (allowedOrigin === "*") {
    headers.set("Access-Control-Allow-Origin", requestOrigin || "*");
  } else if (requestOrigin === allowedOrigin) {
    headers.set("Access-Control-Allow-Origin", requestOrigin);
  }

  headers.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Vary", "Origin");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function nowISO(): string {
  return new Date().toISOString();
}

function nextJobID(): string {
  const random = crypto.randomUUID().split("-")[0];
  return `job-${Date.now()}-${random}`;
}

function toNumber(value: number | string | null | undefined): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeURLs(primary?: string, batch?: string[]): string[] {
  const urls: string[] = [];
  if (typeof primary === "string" && primary.trim()) {
    urls.push(primary.trim());
  }
  if (Array.isArray(batch)) {
    for (const entry of batch) {
      if (typeof entry === "string" && entry.trim()) {
        urls.push(entry.trim());
      }
    }
  }
  return urls;
}

function parseJSON<T>(value: string | null | undefined, fallback: T): T {
  if (!value) {
    return fallback;
  }
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function jobFileDownloadURL(jobID: string, relativePath: string): string {
  const params = new URLSearchParams({
    job_id: jobID,
    path: relativePath,
  });
  return `/api/files?${params.toString()}`;
}

function sanitizeReleaseAssetPath(relativePath: string): string {
  return relativePath.replace(/[\/ ]/g, "-");
}

function expectedReleaseAssetLabel(jobID: string, relativePath: string): string {
  return `${jobID}-${sanitizeReleaseAssetPath(relativePath)}`;
}

async function resolveGitHubReleaseDownloadURL(
  env: Env,
  jobID: string,
  relativePath: string,
  fileName: string,
): Promise<string | null> {
  const repository = env.GITHUB_REPOSITORY?.trim();
  if (!repository) {
    return null;
  }

  const releaseTag = env.GITHUB_RELEASE_TAG?.trim() || DEFAULT_RELEASE_TAG;
  const response = await fetch(
    `https://api.github.com/repos/${repository}/releases/tags/${encodeURIComponent(releaseTag)}`,
    {
      headers: {
        accept: "application/vnd.github+json",
        "user-agent": "godingtalk-worker",
      },
    },
  );

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as {
    assets?: Array<{
      name?: string;
      label?: string | null;
      browser_download_url?: string;
    }>;
  };

  const expectedLabels = new Set<string>([
    expectedReleaseAssetLabel(jobID, relativePath),
    expectedReleaseAssetLabel(jobID, fileName),
  ]);

  const asset = payload.assets?.find((entry) => {
    if (!entry.browser_download_url) {
      return false;
    }
    if (entry.label && expectedLabels.has(entry.label)) {
      return true;
    }
    return entry.name ? expectedLabels.has(entry.name) : false;
  });

  return asset?.browser_download_url || null;
}

function parseJobRow(row: JobRow): JobRecord {
  const files = parseJSON<JobFileRecord[]>(row.files_json, []).map((file) => ({
    ...file,
    download_url: jobFileDownloadURL(row.id, file.relative_path),
  }));

  return {
    id: row.id,
    status: row.status,
    stage: row.stage,
    urls: parseJSON<string[]>(row.urls_json, []),
    thread: toNumber(row.thread),
    output_subdir: row.output_subdir || "",
    create_video_list: Boolean(toNumber(row.create_video_list)),
    current_title: row.current_title || "",
    completed_parts: toNumber(row.completed_parts),
    total_parts: toNumber(row.total_parts),
    progress_percent: toNumber(row.progress_percent),
    titles: parseJSON<string[]>(row.titles_json, []),
    errors: parseJSON<string[]>(row.errors_json, []),
    files,
    runner_run_id: row.runner_run_id || "",
    created_at: row.created_at,
    updated_at: row.updated_at,
    started_at: row.started_at,
    finished_at: row.finished_at,
  };
}

async function requireInternalAuth(request: Request, env: Env): Promise<Response | null> {
  const expected = env.INTERNAL_API_TOKEN?.trim();
  if (!expected) {
    return jsonResponse(
      { error: "INTERNAL_API_TOKEN is not configured" },
      { status: 500 },
    );
  }

  const token = request.headers.get("Authorization")?.replace(/^Bearer\s+/i, "").trim() || "";
  if (token !== expected) {
    return jsonResponse({ error: "missing or invalid internal token" }, { status: 401 });
  }
  return null;
}

async function getSetting(env: Env, key: string): Promise<string | null> {
  const row = await env.DB
    .prepare("SELECT value FROM settings WHERE key = ?1")
    .bind(key)
    .first<{ value: string }>();
  return row?.value || null;
}

async function setSetting(env: Env, key: string, value: string): Promise<void> {
  await env.DB
    .prepare(
      `INSERT INTO settings (key, value, updated_at)
       VALUES (?1, ?2, ?3)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
    )
    .bind(key, value, nowISO())
    .run();
}

async function insertEvent(env: Env, jobID: string, level: string, message: string): Promise<void> {
  await env.DB
    .prepare(
      `INSERT INTO job_events (job_id, level, message, created_at)
       VALUES (?1, ?2, ?3, ?4)`,
    )
    .bind(jobID, level, message, nowISO())
    .run();
}

async function getJob(env: Env, jobID: string): Promise<JobRecord | null> {
  const row = await env.DB
    .prepare("SELECT * FROM jobs WHERE id = ?1")
    .bind(jobID)
    .first<JobRow>();
  return row ? parseJobRow(row) : null;
}

async function listJobEvents(env: Env, jobID: string, limit = 80): Promise<JobEventRecord[]> {
  const result = await env.DB
    .prepare(
      `SELECT id, job_id, level, message, created_at
       FROM job_events
       WHERE job_id = ?1
       ORDER BY created_at DESC
       LIMIT ?2`,
    )
    .bind(jobID, limit)
    .all<JobEventRow>();

  const rows = Array.isArray(result.results) ? result.results : [];
  return rows.map((row) => ({
    id: toNumber(row.id),
    level: row.level,
    message: row.message,
    created_at: row.created_at,
  }));
}

async function listJobs(env: Env, limit = 5, windowMinutes = 20): Promise<JobRecord[]> {
  const cutoff = new Date(Date.now() - (windowMinutes * 60 * 1000)).toISOString();
  const result = await env.DB
    .prepare(
      `SELECT *
       FROM jobs
       WHERE updated_at >= ?2
       ORDER BY updated_at DESC
       LIMIT ?1`,
    )
    .bind(limit, cutoff)
    .all<JobRow>();
  const rows = Array.isArray(result.results) ? result.results : [];
  return rows.map(parseJobRow);
}

async function updateJobProgress(env: Env, jobID: string, payload: ProgressPayload): Promise<void> {
  const current = await getJob(env, jobID);
  if (!current) {
    throw new Error("job not found");
  }

  const titles = Array.isArray(payload.titles) ? payload.titles : current.titles;
  const errors = Array.isArray(payload.errors) ? payload.errors : current.errors;
  const status = payload.status || current.status || "running";
  const stage = payload.stage || current.stage || "running";

  await env.DB
    .prepare(
      `UPDATE jobs
       SET status = ?2,
           stage = ?3,
           current_title = ?4,
           completed_parts = ?5,
           total_parts = ?6,
           progress_percent = ?7,
           titles_json = ?8,
           errors_json = ?9,
           updated_at = ?10
       WHERE id = ?1`,
    )
    .bind(
      jobID,
      status,
      stage,
      payload.current_title || current.current_title || "",
      payload.completed_parts ?? current.completed_parts,
      payload.total_parts ?? current.total_parts,
      payload.progress_percent ?? current.progress_percent,
      JSON.stringify(titles),
      JSON.stringify(errors),
      nowISO(),
    )
    .run();

  if (payload.message) {
    await insertEvent(env, jobID, "info", payload.message);
  }
}

async function completeJob(env: Env, jobID: string, payload: CompletePayload): Promise<JobRecord | null> {
  const current = await getJob(env, jobID);
  if (!current) {
    return null;
  }

  const status = payload.status || current.status || "failed";
  const stage = payload.stage || (status === "succeeded" ? "completed" : "failed");
  const titles = Array.isArray(payload.titles) ? payload.titles : current.titles;
  const errors = Array.isArray(payload.errors) ? payload.errors : current.errors;
  const files = Array.isArray(payload.files)
    ? payload.files.map((file) => ({
        ...file,
        download_url: file.download_url || jobFileDownloadURL(jobID, file.relative_path),
      }))
    : current.files;

  await env.DB
    .prepare(
      `UPDATE jobs
       SET status = ?2,
           stage = ?3,
           current_title = ?4,
           completed_parts = ?5,
           total_parts = ?6,
           progress_percent = ?7,
           titles_json = ?8,
           errors_json = ?9,
           files_json = ?10,
           updated_at = ?11,
           finished_at = ?12
       WHERE id = ?1`,
    )
    .bind(
      jobID,
      status,
      stage,
      payload.current_title || current.current_title || "",
      payload.completed_parts ?? current.completed_parts,
      payload.total_parts ?? current.total_parts,
      payload.progress_percent ?? current.progress_percent,
      JSON.stringify(titles),
      JSON.stringify(errors),
      JSON.stringify(files),
      nowISO(),
      nowISO(),
    )
    .run();

  if (payload.message) {
    await insertEvent(env, jobID, status === "succeeded" ? "info" : "error", payload.message);
  }

  return getJob(env, jobID);
}

async function getCookieState(env: Env): Promise<{
  cookiesReady: boolean;
  cookiesUpdatedAt: string | null;
  cookies: Record<string, string>;
}> {
  const raw = await getSetting(env, COOKIE_SETTING_KEY);
  const cookies = parseJSON<Record<string, string>>(raw, {});
  return {
    cookiesReady: typeof cookies.LV_PC_SESSION === "string" && cookies.LV_PC_SESSION.length > 0,
    cookiesUpdatedAt: await getSetting(env, COOKIE_UPDATED_AT_KEY),
    cookies,
  };
}

async function createJob(env: Env, payload: CreateJobPayload): Promise<JobRecord> {
  const urls = normalizeURLs(payload.url, payload.urls);
  if (urls.length === 0) {
    throw new Error("at least one url is required");
  }

  const cookieState = await getCookieState(env);
  if (!cookieState.cookiesReady) {
    throw new Error("cookies are missing or invalid");
  }

  const thread = Math.min(100, Math.max(1, toNumber(payload.thread) || 10));
  const createdAt = nowISO();
  const jobID = nextJobID();
  const outputSubdir = (payload.output_subdir || "").trim();
  const createVideoList = payload.create_video_list !== false;

  await env.DB
    .prepare(
      `INSERT INTO jobs (
         id, status, stage, urls_json, thread, output_subdir, create_video_list,
         current_title, completed_parts, total_parts, progress_percent, titles_json,
         errors_json, files_json, runner_run_id, created_at, updated_at, started_at, finished_at
       ) VALUES (?1, 'queued', 'waiting_runner', ?2, ?3, ?4, ?5, '', 0, 0, 0, '[]', '[]', '[]', '', ?6, ?6, NULL, NULL)`,
    )
    .bind(
      jobID,
      JSON.stringify(urls),
      thread,
      outputSubdir,
      createVideoList ? 1 : 0,
      createdAt,
    )
    .run();

  await insertEvent(env, jobID, "info", "任务已创建，正在触发 GitHub Actions 远程下载器。");

  try {
    await triggerGitHubRunner(env, jobID);
  } catch (error) {
    const message = error instanceof Error ? error.message : "failed to trigger GitHub Actions";
    await completeJob(env, jobID, {
      status: "failed",
      stage: "failed",
      errors: [message],
      message,
    });
    throw new Error(message);
  }

  return (await getJob(env, jobID)) as JobRecord;
}

async function triggerGitHubRunner(env: Env, jobID: string): Promise<void> {
  if (!env.GITHUB_REPOSITORY || !env.GITHUB_ACTIONS_TOKEN) {
    throw new Error("GitHub Actions dispatch is not configured");
  }

  const workflowFile = env.GITHUB_WORKFLOW_FILE || DEFAULT_WORKFLOW_FILE;
  const ref = env.GITHUB_REF || "main";

  const response = await fetch(
    `https://api.github.com/repos/${env.GITHUB_REPOSITORY}/actions/workflows/${workflowFile}/dispatches`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/vnd.github+json",
        "authorization": `Bearer ${env.GITHUB_ACTIONS_TOKEN}`,
        "user-agent": "GoDingtalk-Control-Plane",
      },
      body: JSON.stringify({
        ref,
        inputs: {
          job_id: jobID,
        },
      }),
    },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`workflow dispatch failed (${response.status}): ${body.slice(0, 200)}`);
  }
}

async function handleStatus(_request: Request, env: Env): Promise<Response> {
  const [countsRow, cookieState] = await Promise.all([
    env.DB
      .prepare(
        `SELECT
           COUNT(*) AS total_jobs,
           SUM(CASE WHEN status = 'queued' THEN 1 ELSE 0 END) AS queued_jobs,
           SUM(CASE WHEN status = 'running' THEN 1 ELSE 0 END) AS running_jobs,
           SUM(CASE WHEN status = 'succeeded' THEN 1 ELSE 0 END) AS succeeded_jobs,
           SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) AS failed_jobs
         FROM jobs`,
      )
      .first<Record<string, number | string | null>>(),
    getCookieState(env),
  ]);

  return jsonResponse({
    mode: "github-actions-control-plane",
    cookies_ready: cookieState.cookiesReady,
    cookies_updated_at: cookieState.cookiesUpdatedAt,
    total_jobs: toNumber(countsRow?.total_jobs),
    queued_jobs: toNumber(countsRow?.queued_jobs),
    running_jobs: toNumber(countsRow?.running_jobs),
    succeeded_jobs: toNumber(countsRow?.succeeded_jobs),
    failed_jobs: toNumber(countsRow?.failed_jobs),
    workflow_repository: env.GITHUB_REPOSITORY || "",
    workflow_file: env.GITHUB_WORKFLOW_FILE || DEFAULT_WORKFLOW_FILE,
    public_downloads: true,
  });
}

async function handleCookies(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return jsonResponse({ error: "method not allowed" }, { status: 405 });
  }

  const payload = (await request.json()) as CookiePayload;
  const cookies = payload?.cookies;
  if (!cookies || typeof cookies !== "object" || Array.isArray(cookies)) {
    return jsonResponse({ error: "invalid cookies payload" }, { status: 400 });
  }
  if (!cookies.LV_PC_SESSION) {
    return jsonResponse({ error: "LV_PC_SESSION cookie is required" }, { status: 400 });
  }

  await setSetting(env, COOKIE_SETTING_KEY, JSON.stringify(cookies));
  await setSetting(env, COOKIE_UPDATED_AT_KEY, nowISO());

  return jsonResponse({
    message: "cookies saved",
    cookies_valid: true,
    cookies_updated_at: await getSetting(env, COOKIE_UPDATED_AT_KEY),
  });
}

async function handleJobs(request: Request, env: Env): Promise<Response> {
  if (request.method === "GET") {
    return jsonResponse({ jobs: await listJobs(env) });
  }
  if (request.method === "POST") {
    try {
      const payload = (await request.json()) as CreateJobPayload;
      const job = await createJob(env, payload);
      return jsonResponse(job, { status: 202 });
    } catch (error) {
      return jsonResponse(
        { error: error instanceof Error ? error.message : "failed to create job" },
        { status: 400 },
      );
    }
  }
  return jsonResponse({ error: "method not allowed" }, { status: 405 });
}

async function handleJobDetail(request: Request, jobID: string, env: Env): Promise<Response> {
  const job = await getJob(env, jobID);
  if (!job) {
    return jsonResponse({ error: "job not found" }, { status: 404 });
  }

  const includeEvents = new URL(request.url).searchParams.get("include") === "events";
  if (!includeEvents) {
    return jsonResponse(job);
  }

  return jsonResponse({
    job,
    events: await listJobEvents(env, jobID),
  });
}

async function handleFileDownload(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const jobID = url.searchParams.get("job_id") || "";
  const relativePath = url.searchParams.get("path") || "";
  if (!jobID || !relativePath) {
    return jsonResponse({ error: "job_id and path are required" }, { status: 400 });
  }

  const job = await getJob(env, jobID);
  if (!job) {
    return jsonResponse({ error: "job not found" }, { status: 404 });
  }

  const file = job.files.find((entry) => entry.relative_path === relativePath || entry.name === relativePath);
  if (!file) {
    return jsonResponse({ error: "file not found" }, { status: 404 });
  }
  if (!file.bucket_key) {
    const releaseURL = await resolveGitHubReleaseDownloadURL(env, jobID, file.relative_path, file.name);
    if (releaseURL) {
      return Response.redirect(releaseURL, 302);
    }
  }
  if (!file.bucket_key && file.download_url) {
    return Response.redirect(file.download_url, 302);
  }
  if (!file.bucket_key) {
    return jsonResponse({ error: "file is missing storage metadata" }, { status: 404 });
  }

  const object = await env.FILES.get(file.bucket_key);
  if (!object) {
    return jsonResponse({ error: "object not found in bucket" }, { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=3600");
  headers.set("content-disposition", `attachment; filename*=UTF-8''${encodeURIComponent(file.name)}`);

  if (!headers.get("content-type")) {
    headers.set("content-type", file.content_type || "application/octet-stream");
  }

  return new Response(object.body, { headers });
}

async function handleInternalClaim(request: Request, env: Env, jobID: string): Promise<Response> {
  const authError = await requireInternalAuth(request, env);
  if (authError) {
    return authError;
  }

  const job = await getJob(env, jobID);
  if (!job) {
    return jsonResponse({ error: "job not found" }, { status: 404 });
  }
  if (job.status === "running") {
    return jsonResponse({ error: "job is already running" }, { status: 409 });
  }
  if (job.status === "succeeded" || job.status === "failed") {
    return jsonResponse({ error: "job already finished" }, { status: 409 });
  }

  const cookieState = await getCookieState(env);
  if (!cookieState.cookiesReady) {
    return jsonResponse({ error: "cookies are missing or invalid" }, { status: 409 });
  }

  await env.DB
    .prepare(
      `UPDATE jobs
       SET status = 'running',
           stage = 'preparing',
           runner_run_id = ?2,
           started_at = COALESCE(started_at, ?3),
           updated_at = ?3
       WHERE id = ?1`,
    )
    .bind(
      jobID,
      request.headers.get("X-GitHub-Run-ID") || "",
      nowISO(),
    )
    .run();

  await insertEvent(env, jobID, "info", "GitHub Actions 运行器已领取任务。");

  return jsonResponse({
    id: job.id,
    urls: job.urls,
    thread: job.thread,
    output_subdir: job.output_subdir,
    create_video_list: job.create_video_list,
    cookies: cookieState.cookies,
  });
}

async function handleInternalProgress(request: Request, env: Env, jobID: string): Promise<Response> {
  const authError = await requireInternalAuth(request, env);
  if (authError) {
    return authError;
  }

  const payload = (await request.json()) as ProgressPayload;
  try {
    await updateJobProgress(env, jobID, payload);
    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse(
      { error: error instanceof Error ? error.message : "failed to update job" },
      { status: 404 },
    );
  }
}

async function handleInternalComplete(request: Request, env: Env, jobID: string): Promise<Response> {
  const authError = await requireInternalAuth(request, env);
  if (authError) {
    return authError;
  }

  const payload = (await request.json()) as CompletePayload;
  const job = await completeJob(env, jobID, payload);
  if (!job) {
    return jsonResponse({ error: "job not found" }, { status: 404 });
  }
  return jsonResponse(job);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return applyCors(request, new Response(null, { status: 204 }), env);
    }

    const url = new URL(request.url);

    try {
      let response: Response;

      if (url.pathname === "/") {
        response = htmlResponse(renderApp(url.origin));
      } else if (url.pathname === "/tampermonkey/godingtalk-helper.user.js") {
        response = textResponse(renderTampermonkeyScript(url.origin), {
          headers: {
            "content-type": "application/javascript; charset=utf-8",
            "cache-control": "public, max-age=300",
          },
        });
      } else if (url.pathname === "/api/status" && request.method === "GET") {
        response = await handleStatus(request, env);
      } else if (url.pathname === "/api/cookies") {
        response = await handleCookies(request, env);
      } else if (url.pathname === "/api/jobs") {
        response = await handleJobs(request, env);
      } else if (url.pathname.startsWith("/api/jobs/") && request.method === "GET") {
        response = await handleJobDetail(request, url.pathname.replace("/api/jobs/", ""), env);
      } else if (url.pathname === "/api/files" && (request.method === "GET" || request.method === "HEAD")) {
        response = await handleFileDownload(request, env);
      } else if (url.pathname.startsWith("/internal/jobs/")) {
        const parts = url.pathname.split("/").filter(Boolean);
        if (parts.length === 4 && parts[0] === "internal" && parts[1] === "jobs") {
          const jobID = parts[2];
          const action = parts[3];
          if (action === "claim" && request.method === "GET") {
            response = await handleInternalClaim(request, env, jobID);
          } else if (action === "progress" && request.method === "POST") {
            response = await handleInternalProgress(request, env, jobID);
          } else if (action === "complete" && request.method === "POST") {
            response = await handleInternalComplete(request, env, jobID);
          } else {
            response = jsonResponse({ error: "method not allowed" }, { status: 405 });
          }
        } else {
          response = jsonResponse({ error: "not found" }, { status: 404 });
        }
      } else {
        response = jsonResponse({ error: "not found" }, { status: 404 });
      }

      return applyCors(request, response, env);
    } catch (error) {
      const message = error instanceof Error ? error.message : "internal error";
      return applyCors(
        request,
        jsonResponse({ error: message }, { status: 500 }),
        env,
      );
    }
  },
};
