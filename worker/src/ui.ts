export function renderApp(): string {
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>GoDingtalk Console</title>
    <style>
      :root {
        --bg: #f4efe6;
        --surface: rgba(255, 252, 247, 0.78);
        --surface-strong: #fffaf1;
        --ink: #1e2a2f;
        --muted: #5f6d72;
        --line: rgba(25, 43, 45, 0.12);
        --accent: #d26a2e;
        --accent-2: #157a6e;
        --danger: #b63f2c;
        --shadow: 0 22px 60px rgba(23, 39, 42, 0.12);
        --radius-lg: 28px;
        --radius-md: 18px;
        --radius-sm: 12px;
      }

      * {
        box-sizing: border-box;
      }

      html, body {
        margin: 0;
        min-height: 100%;
        background:
          radial-gradient(circle at top left, rgba(210, 106, 46, 0.18), transparent 28%),
          radial-gradient(circle at top right, rgba(21, 122, 110, 0.14), transparent 26%),
          linear-gradient(180deg, #fbf7ef 0%, var(--bg) 100%);
        color: var(--ink);
        font-family: "IBM Plex Sans", "Avenir Next", "Segoe UI", sans-serif;
      }

      body {
        padding: 24px;
      }

      .shell {
        max-width: 1240px;
        margin: 0 auto;
      }

      .hero {
        position: relative;
        overflow: hidden;
        padding: 28px;
        border: 1px solid var(--line);
        border-radius: 32px;
        background:
          linear-gradient(135deg, rgba(255, 250, 241, 0.92), rgba(255, 246, 231, 0.82)),
          linear-gradient(120deg, rgba(210, 106, 46, 0.08), rgba(21, 122, 110, 0.08));
        box-shadow: var(--shadow);
      }

      .hero::after {
        content: "";
        position: absolute;
        inset: auto -80px -80px auto;
        width: 240px;
        height: 240px;
        border-radius: 999px;
        background: radial-gradient(circle, rgba(21, 122, 110, 0.12), transparent 70%);
        pointer-events: none;
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 999px;
        background: rgba(30, 42, 47, 0.06);
        color: var(--muted);
        font-size: 13px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      h1 {
        margin: 16px 0 10px;
        font-family: "IBM Plex Serif", "Iowan Old Style", Georgia, serif;
        font-size: clamp(36px, 5vw, 62px);
        line-height: 0.94;
        letter-spacing: -0.04em;
      }

      .hero p {
        max-width: 760px;
        margin: 0;
        color: var(--muted);
        font-size: 16px;
        line-height: 1.65;
      }

      .hero-grid {
        display: grid;
        gap: 14px;
        margin-top: 24px;
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .hero-stat {
        padding: 16px 18px;
        border: 1px solid rgba(25, 43, 45, 0.08);
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.56);
        backdrop-filter: blur(10px);
      }

      .hero-stat label {
        display: block;
        color: var(--muted);
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .hero-stat strong {
        display: block;
        margin-top: 8px;
        font-size: 22px;
        font-weight: 700;
      }

      .grid {
        display: grid;
        gap: 18px;
        margin-top: 22px;
        grid-template-columns: 1.1fr 0.9fr;
      }

      .stack {
        display: grid;
        gap: 18px;
      }

      .panel {
        padding: 22px;
        border: 1px solid var(--line);
        border-radius: var(--radius-lg);
        background: var(--surface);
        box-shadow: var(--shadow);
        backdrop-filter: blur(12px);
      }

      .panel h2 {
        margin: 0;
        font-size: 22px;
        font-family: "IBM Plex Serif", Georgia, serif;
      }

      .panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 16px;
      }

      .panel-subtitle {
        margin: 6px 0 0;
        color: var(--muted);
        font-size: 14px;
        line-height: 1.6;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 999px;
        font-size: 13px;
        font-weight: 600;
      }

      .badge.ok {
        background: rgba(21, 122, 110, 0.14);
        color: #0f5b52;
      }

      .badge.warn {
        background: rgba(210, 106, 46, 0.14);
        color: #9a4d20;
      }

      .badge.idle {
        background: rgba(30, 42, 47, 0.08);
        color: var(--muted);
      }

      .fields {
        display: grid;
        gap: 14px;
      }

      .field {
        display: grid;
        gap: 8px;
      }

      .field-row {
        display: grid;
        gap: 14px;
        grid-template-columns: 1fr 170px 170px;
      }

      label {
        font-size: 13px;
        font-weight: 700;
        color: #324247;
      }

      input, textarea, select {
        width: 100%;
        border: 1px solid rgba(25, 43, 45, 0.12);
        border-radius: var(--radius-md);
        background: var(--surface-strong);
        color: var(--ink);
        font: inherit;
        transition: border-color 120ms ease, transform 120ms ease, box-shadow 120ms ease;
      }

      input, select {
        min-height: 50px;
        padding: 12px 14px;
      }

      textarea {
        min-height: 168px;
        padding: 14px;
        line-height: 1.55;
        resize: vertical;
      }

      input:focus, textarea:focus, select:focus {
        outline: none;
        border-color: rgba(21, 122, 110, 0.45);
        box-shadow: 0 0 0 5px rgba(21, 122, 110, 0.08);
        transform: translateY(-1px);
      }

      .hint {
        color: var(--muted);
        font-size: 13px;
        line-height: 1.55;
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      button {
        appearance: none;
        border: 0;
        border-radius: 999px;
        min-height: 46px;
        padding: 0 18px;
        font: inherit;
        font-weight: 700;
        cursor: pointer;
        transition: transform 120ms ease, box-shadow 120ms ease, opacity 120ms ease;
      }

      button:hover {
        transform: translateY(-1px);
      }

      button:disabled {
        opacity: 0.62;
        cursor: wait;
        transform: none;
      }

      .primary {
        background: linear-gradient(135deg, var(--accent), #e08b4d);
        color: #fff8f1;
        box-shadow: 0 14px 28px rgba(210, 106, 46, 0.24);
      }

      .secondary {
        background: rgba(21, 122, 110, 0.12);
        color: #0f5b52;
      }

      .ghost {
        background: rgba(30, 42, 47, 0.07);
        color: var(--ink);
      }

      .notice {
        margin-top: 14px;
        padding: 14px 16px;
        border-radius: 16px;
        border: 1px solid transparent;
        font-size: 14px;
        line-height: 1.55;
      }

      .notice.ok {
        background: rgba(21, 122, 110, 0.09);
        border-color: rgba(21, 122, 110, 0.16);
        color: #0f5b52;
      }

      .notice.error {
        background: rgba(182, 63, 44, 0.09);
        border-color: rgba(182, 63, 44, 0.14);
        color: var(--danger);
      }

      .jobs {
        display: grid;
        gap: 12px;
      }

      .job-card {
        padding: 18px;
        border: 1px solid rgba(25, 43, 45, 0.1);
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.56);
      }

      .job-top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 14px;
      }

      .job-id {
        font-family: "IBM Plex Mono", "SFMono-Regular", monospace;
        font-size: 12px;
        color: var(--muted);
      }

      .job-title {
        margin: 8px 0 0;
        font-size: 18px;
      }

      .job-meta, .job-files, .job-errors {
        margin-top: 12px;
        color: var(--muted);
        font-size: 13px;
        line-height: 1.7;
      }

      .job-progress {
        margin-top: 14px;
      }

      .progress-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        font-size: 13px;
        color: var(--muted);
      }

      .progress-track {
        margin-top: 8px;
        height: 10px;
        border-radius: 999px;
        background: rgba(30, 42, 47, 0.08);
        overflow: hidden;
      }

      .progress-fill {
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(90deg, var(--accent), var(--accent-2));
        transition: width 220ms ease;
      }

      .job-files a {
        color: var(--accent-2);
        text-decoration: none;
        font-weight: 600;
      }

      .job-files a:hover {
        text-decoration: underline;
      }

      .job-errors {
        color: var(--danger);
      }

      .muted-card {
        padding: 18px;
        border: 1px dashed rgba(25, 43, 45, 0.18);
        border-radius: 18px;
        color: var(--muted);
        background: rgba(255, 255, 255, 0.38);
      }

      .foot {
        margin-top: 18px;
        color: var(--muted);
        font-size: 13px;
        line-height: 1.6;
      }

      @media (max-width: 1080px) {
        .grid {
          grid-template-columns: 1fr;
        }

        .hero-grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 720px) {
        body {
          padding: 16px;
        }

        .hero, .panel {
          padding: 18px;
          border-radius: 24px;
        }

        .field-row {
          grid-template-columns: 1fr;
        }

        h1 {
          font-size: 40px;
        }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <section class="hero">
        <span class="eyebrow">GoDingtalk Console</span>
        <h1>把下载链路收进一个页面里。</h1>
        <p>
          这个页面负责四件事：保存访问 token、上传 cookies、提交回放下载、盯住任务结果。
          真正的视频下载仍然在 Go 服务端执行，所以页面能做的是把这条流程变得顺手，而不是绕开钉钉的权限限制。
        </p>
        <div class="hero-grid">
          <div class="hero-stat">
            <label>Worker 状态</label>
            <strong id="hero-worker">准备中</strong>
          </div>
          <div class="hero-stat">
            <label>Cookies</label>
            <strong id="hero-cookies">未检测</strong>
          </div>
          <div class="hero-stat">
            <label>任务队列</label>
            <strong id="hero-jobs">0</strong>
          </div>
        </div>
      </section>

      <section class="grid">
        <div class="stack">
          <article class="panel">
            <div class="panel-header">
              <div>
                <h2>访问配置</h2>
                <p class="panel-subtitle">先把访问 token 保存下来，之后页面会自动带上它访问 API。</p>
              </div>
              <span class="badge idle" id="token-badge">等待输入</span>
            </div>
            <div class="fields">
              <div class="field">
                <label for="token">Bearer Token</label>
                <input id="token" placeholder="输入 Worker API Token" autocomplete="off" />
                <div class="hint">页面不会直接读取钉钉 cookie。它只能带着你的 token 调用我们自己的 Worker API。</div>
              </div>
            </div>
            <div class="actions" style="margin-top: 14px;">
              <button class="primary" id="save-token">保存 Token</button>
              <button class="ghost" id="clear-token">清除 Token</button>
              <button class="secondary" id="refresh-status">刷新状态</button>
            </div>
            <div id="status-notice" class="notice ok" hidden></div>
          </article>

          <article class="panel">
            <div class="panel-header">
              <div>
                <h2>Cookies</h2>
                <p class="panel-subtitle">支持三种粘贴格式：JSON 对象、JSON 数组、或普通的 Cookie Header 字符串。</p>
              </div>
              <span class="badge warn" id="cookie-badge">未上传</span>
            </div>
            <div class="fields">
              <div class="field">
                <label for="cookies">Cookie 内容</label>
                <textarea id="cookies" placeholder='例如：{"LV_PC_SESSION":"..."} 或 LV_PC_SESSION=...; other=value'></textarea>
              </div>
            </div>
            <div class="actions">
              <button class="primary" id="upload-cookies">上传 Cookies</button>
              <button class="ghost" id="example-cookies">填充示例</button>
            </div>
            <p class="foot">
              这里依旧需要你手动提供 cookies。网页不能跨域直接读取 dingtalk.com 域下的浏览器 cookie，这个限制来自浏览器本身。
            </p>
          </article>

          <article class="panel">
            <div class="panel-header">
              <div>
                <h2>新建下载任务</h2>
                <p class="panel-subtitle">支持单条链接，也支持一行一个链接。服务端会按任务目录保存视频并生成下载链接。</p>
              </div>
            </div>
            <div class="fields">
              <div class="field">
                <label for="urls">回放链接</label>
                <textarea id="urls" placeholder="每行一个钉钉回放链接"></textarea>
              </div>
              <div class="field-row">
                <div class="field">
                  <label for="output-subdir">输出目录</label>
                  <input id="output-subdir" placeholder="留空则自动生成 job id" />
                </div>
                <div class="field">
                  <label for="threads">线程数</label>
                  <input id="threads" type="number" min="1" max="100" value="10" />
                </div>
                <div class="field">
                  <label for="video-list">标题清单</label>
                  <select id="video-list">
                    <option value="true">生成</option>
                    <option value="false">不生成</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="actions">
              <button class="primary" id="create-job">开始下载</button>
              <button class="secondary" id="load-jobs">刷新任务列表</button>
            </div>
          </article>
        </div>

        <aside class="stack">
          <article class="panel">
            <div class="panel-header">
              <div>
                <h2>服务状态</h2>
                <p class="panel-subtitle">这里展示当前后端是否可达、cookies 是否有效、以及正在排队的任务数量。</p>
              </div>
            </div>
            <div id="status-card" class="muted-card">还没有拉取状态。</div>
          </article>

          <article class="panel">
            <div class="panel-header">
              <div>
                <h2>任务列表</h2>
                <p class="panel-subtitle">页面会自动刷新；成功任务会展示文件下载链接。</p>
              </div>
              <span class="badge idle" id="polling-badge">自动轮询中</span>
            </div>
            <div id="jobs" class="jobs">
              <div class="muted-card">还没有任务，先上传 cookies 再提交链接。</div>
            </div>
          </article>
        </aside>
      </section>
    </main>

    <script>
      const elements = {
        token: document.getElementById("token"),
        saveToken: document.getElementById("save-token"),
        clearToken: document.getElementById("clear-token"),
        refreshStatus: document.getElementById("refresh-status"),
        statusNotice: document.getElementById("status-notice"),
        tokenBadge: document.getElementById("token-badge"),
        cookies: document.getElementById("cookies"),
        uploadCookies: document.getElementById("upload-cookies"),
        exampleCookies: document.getElementById("example-cookies"),
        cookieBadge: document.getElementById("cookie-badge"),
        urls: document.getElementById("urls"),
        outputSubdir: document.getElementById("output-subdir"),
        threads: document.getElementById("threads"),
        videoList: document.getElementById("video-list"),
        createJob: document.getElementById("create-job"),
        loadJobs: document.getElementById("load-jobs"),
        jobs: document.getElementById("jobs"),
        statusCard: document.getElementById("status-card"),
        heroWorker: document.getElementById("hero-worker"),
        heroCookies: document.getElementById("hero-cookies"),
        heroJobs: document.getElementById("hero-jobs"),
        pollingBadge: document.getElementById("polling-badge"),
      };

      const storageKey = "godingtalk.worker.token";
      let pollingHandle = null;

      function readToken() {
        return elements.token.value.trim();
      }

      function setNotice(message, type = "ok") {
        elements.statusNotice.hidden = false;
        elements.statusNotice.className = "notice " + type;
        elements.statusNotice.textContent = message;
      }

      function clearNotice() {
        elements.statusNotice.hidden = true;
        elements.statusNotice.textContent = "";
      }

      function setTokenBadge() {
        const hasToken = Boolean(readToken());
        elements.tokenBadge.textContent = hasToken ? "Token 已保存" : "等待输入";
        elements.tokenBadge.className = "badge " + (hasToken ? "ok" : "idle");
      }

      function authHeaders(json = false) {
        const headers = new Headers();
        const token = readToken();
        if (token) {
          headers.set("Authorization", "Bearer " + token);
        }
        if (json) {
          headers.set("Content-Type", "application/json");
        }
        return headers;
      }

      async function request(path, options = {}) {
        const response = await fetch(path, {
          ...options,
          headers: options.headers || authHeaders(options.body ? true : false),
        });

        const contentType = response.headers.get("content-type") || "";
        const payload = contentType.includes("application/json")
          ? await response.json()
          : await response.text();

        if (!response.ok) {
          const message = typeof payload === "string"
            ? payload
            : payload.error || payload.message || ("Request failed: " + response.status);
          throw new Error(message);
        }

        return payload;
      }

      function parseCookiesInput(raw) {
        const input = raw.trim();
        if (!input) {
          throw new Error("先粘贴 cookies 内容。");
        }

        if (input.startsWith("{")) {
          const parsed = JSON.parse(input);
          if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
            return parsed;
          }
          throw new Error("JSON 对象格式不对。");
        }

        if (input.startsWith("[")) {
          const parsed = JSON.parse(input);
          if (!Array.isArray(parsed)) {
            throw new Error("JSON 数组格式不对。");
          }
          return parsed.reduce((result, item) => {
            if (!item || typeof item !== "object") {
              return result;
            }
            const name = item.name || item.Name;
            const value = item.value || item.Value;
            if (typeof name === "string" && typeof value === "string") {
              result[name] = value;
            }
            return result;
          }, {});
        }

        const cookieMap = {};
        input.split(";").forEach((part) => {
          const chunk = part.trim();
          if (!chunk) {
            return;
          }
          const separatorIndex = chunk.indexOf("=");
          if (separatorIndex === -1) {
            return;
          }
          const name = chunk.slice(0, separatorIndex).trim();
          const value = chunk.slice(separatorIndex + 1).trim();
          if (name) {
            cookieMap[name] = value;
          }
        });

        if (Object.keys(cookieMap).length === 0) {
          throw new Error("没解析出任何 cookie 键值对。");
        }

        return cookieMap;
      }

      function formatTime(value) {
        if (!value) {
          return "未开始";
        }
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
      }

      function formatStage(stage) {
        switch (stage) {
          case "queued":
            return "排队中";
          case "resolving":
            return "解析回放";
          case "downloading":
            return "下载分片";
          case "converting":
            return "转换 MP4";
          case "completed":
            return "已完成";
          case "failed":
            return "失败";
          default:
            return stage || "未知";
        }
      }

      function renderStatus(status) {
        elements.heroWorker.textContent = "在线";
        elements.heroCookies.textContent = status.cookies_valid ? "有效" : "未准备";
        elements.heroJobs.textContent = String(status.queued_or_running_jobs || 0);
        elements.cookieBadge.textContent = status.cookies_valid ? "已就绪" : "未上传";
        elements.cookieBadge.className = "badge " + (status.cookies_valid ? "ok" : "warn");

        elements.statusCard.innerHTML = [
          '<strong style="font-size:18px;">服务已连接</strong>',
          '<div class="job-meta">监听地址：' + escapeHTML(status.listen || "-") + '</div>',
          '<div class="job-meta">保存目录：' + escapeHTML(status.save_root || "-") + '</div>',
          '<div class="job-meta">Cookies 文件：' + escapeHTML(status.cookies_file || "-") + '</div>',
          '<div class="job-meta">最大并发任务：' + escapeHTML(String(status.max_concurrent_jobs ?? "-")) + '</div>',
          '<div class="job-meta">排队或运行中：' + escapeHTML(String(status.queued_or_running_jobs ?? 0)) + '</div>',
        ].join("");
      }

      function escapeHTML(value) {
        return String(value)
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;");
      }

      function renderJobs(jobs) {
        if (!Array.isArray(jobs) || jobs.length === 0) {
          elements.jobs.innerHTML = '<div class="muted-card">还没有任务，先提交一个链接试试。</div>';
          return;
        }

        elements.jobs.innerHTML = jobs.map((job) => {
          const files = Array.isArray(job.files) ? job.files : [];
          const titles = Array.isArray(job.titles) ? job.titles : [];
          const errors = Array.isArray(job.errors) ? job.errors : [];
          const statusClass = job.status === "succeeded" ? "ok" : (job.status === "failed" ? "warn" : "idle");
          const progress = Math.max(0, Math.min(100, Number(job.progress_percent || 0)));
          const stageText = formatStage(job.stage);
          const completedParts = Number(job.completed_parts || 0);
          const totalParts = Number(job.total_parts || 0);
          const titleText = job.current_title || titles[0] || "下载任务";

          return [
            '<section class="job-card">',
            '<div class="job-top">',
            '<div>',
            '<div class="job-id">' + escapeHTML(job.id) + '</div>',
            '<h3 class="job-title">' + escapeHTML(titleText) + '</h3>',
            '</div>',
            '<span class="badge ' + statusClass + '">' + escapeHTML(job.status || "unknown") + '</span>',
            '</div>',
            '<div class="job-progress">',
            '<div class="progress-top"><span>' + escapeHTML(stageText) + '</span><strong>' + escapeHTML(progress.toFixed(1)) + '%</strong></div>',
            '<div class="progress-track"><div class="progress-fill" style="width:' + escapeHTML(progress.toFixed(1)) + '%"></div></div>',
            totalParts > 0 ? '<div class="job-meta">分片进度：' + escapeHTML(String(completedParts)) + ' / ' + escapeHTML(String(totalParts)) + '</div>' : '',
            '</div>',
            '<div class="job-meta">创建时间：' + escapeHTML(formatTime(job.created_at)) + '</div>',
            '<div class="job-meta">开始时间：' + escapeHTML(formatTime(job.started_at)) + '</div>',
            '<div class="job-meta">完成时间：' + escapeHTML(formatTime(job.finished_at)) + '</div>',
            '<div class="job-meta">输出目录：' + escapeHTML(job.relative_save_dir || "-") + '</div>',
            titles.length > 1 ? '<div class="job-meta">标题：' + titles.map(escapeHTML).join(" / ") + '</div>' : '',
            files.length ? '<div class="job-files">' + files.map((file) => '<div><a href="' + escapeHTML(file.download_url || ("/files/" + file.relative_path)) + '" target="_blank" rel="noreferrer">' + escapeHTML(file.name) + '</a></div>').join("") + '</div>' : '',
            errors.length ? '<div class="job-errors">' + errors.map(escapeHTML).join("<br/>") + '</div>' : '',
            '</section>',
          ].join("");
        }).join("");
      }

      async function refreshStatus() {
        try {
          const status = await request("/api/status", { headers: authHeaders(false) });
          renderStatus(status);
          clearNotice();
        } catch (error) {
          elements.heroWorker.textContent = "待授权";
          setNotice(error.message, "error");
          elements.statusCard.innerHTML = '<strong style="font-size:18px;">还没拿到状态</strong><div class="job-meta">通常是 token 未填写，或者后端暂时不可达。</div>';
        }
      }

      async function refreshJobs() {
        try {
          const payload = await request("/api/downloads", { headers: authHeaders(false) });
          renderJobs(payload.jobs || []);
        } catch (error) {
          renderJobs([]);
          setNotice(error.message, "error");
        }
      }

      async function uploadCookies() {
        const parsed = parseCookiesInput(elements.cookies.value);
        const payload = await request("/api/cookies", {
          method: "POST",
          headers: authHeaders(true),
          body: JSON.stringify({ cookies: parsed }),
        });
        setNotice(payload.message || "Cookies 已上传。");
        await refreshStatus();
      }

      async function createJob() {
        const urls = elements.urls.value
          .split("\\n")
          .map((item) => item.trim())
          .filter(Boolean);

        if (urls.length === 0) {
          throw new Error("先填至少一个回放链接。");
        }

        const thread = Number(elements.threads.value || "10");
        const body = {
          thread,
          output_subdir: elements.outputSubdir.value.trim(),
          create_video_list: elements.videoList.value === "true",
        };

        if (urls.length === 1) {
          body.url = urls[0];
        } else {
          body.urls = urls;
        }

        const payload = await request("/api/downloads", {
          method: "POST",
          headers: authHeaders(true),
          body: JSON.stringify(body),
        });

        setNotice("任务已创建：" + payload.id);
        elements.outputSubdir.value = "";
        await refreshJobs();
        await refreshStatus();
      }

      function setBusy(button, busy) {
        button.disabled = busy;
      }

      function installPolling() {
        if (pollingHandle) {
          clearInterval(pollingHandle);
        }
        pollingHandle = setInterval(() => {
          refreshStatus();
          refreshJobs();
        }, 5000);
      }

      elements.saveToken.addEventListener("click", () => {
        const token = readToken();
        if (!token) {
          setNotice("先输入 token 再保存。", "error");
          return;
        }
        localStorage.setItem(storageKey, token);
        setTokenBadge();
        setNotice("Token 已保存到本地浏览器。");
        refreshStatus();
        refreshJobs();
      });

      elements.clearToken.addEventListener("click", () => {
        localStorage.removeItem(storageKey);
        elements.token.value = "";
        setTokenBadge();
        setNotice("Token 已清除。");
      });

      elements.refreshStatus.addEventListener("click", async () => {
        await refreshStatus();
        await refreshJobs();
      });

      elements.uploadCookies.addEventListener("click", async () => {
        setBusy(elements.uploadCookies, true);
        try {
          await uploadCookies();
        } catch (error) {
          setNotice(error.message, "error");
        } finally {
          setBusy(elements.uploadCookies, false);
        }
      });

      elements.exampleCookies.addEventListener("click", () => {
        elements.cookies.value = JSON.stringify({
          LV_PC_SESSION: "replace-me",
          csrfToken: "optional",
        }, null, 2);
      });

      elements.createJob.addEventListener("click", async () => {
        setBusy(elements.createJob, true);
        try {
          await createJob();
        } catch (error) {
          setNotice(error.message, "error");
        } finally {
          setBusy(elements.createJob, false);
        }
      });

      elements.loadJobs.addEventListener("click", refreshJobs);

      const storedToken = localStorage.getItem(storageKey);
      if (storedToken) {
        elements.token.value = storedToken;
      }
      setTokenBadge();
      installPolling();
      refreshStatus();
      refreshJobs();
    </script>
  </body>
</html>`;
}
