export function renderApp(appOrigin: string): string {
  const installURL = `${appOrigin.replace(/\/$/, "")}/tampermonkey/godingtalk-helper.user.js`;

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>GoDingtalk 公益版控制台</title>
    <style>
      :root {
        --bg: #f4efe6;
        --surface: rgba(255, 252, 247, 0.82);
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
        max-width: 1280px;
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
        grid-template-columns: repeat(4, minmax(0, 1fr));
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
        font-size: 24px;
        font-weight: 700;
      }

      .layout {
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

      .hint {
        color: var(--muted);
        font-size: 13px;
        line-height: 1.6;
      }

      .notice {
        margin-top: 16px;
        padding: 12px 14px;
        border-radius: 14px;
        font-size: 14px;
      }

      .notice.ok {
        background: rgba(21, 122, 110, 0.12);
        color: #0f5b52;
      }

      .notice.error {
        background: rgba(182, 63, 44, 0.12);
        color: #8d2f20;
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
        grid-template-columns: 1fr 160px 190px;
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
        min-height: 156px;
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

      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      button, .button-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 46px;
        padding: 0 18px;
        border: 0;
        border-radius: 999px;
        font: inherit;
        font-weight: 700;
        cursor: pointer;
        text-decoration: none;
      }

      button.primary, .button-link.primary {
        background: linear-gradient(135deg, var(--accent), #e18c42);
        color: white;
        box-shadow: 0 16px 36px rgba(210, 106, 46, 0.22);
      }

      button.secondary, .button-link.secondary {
        background: rgba(30, 42, 47, 0.08);
        color: var(--ink);
      }

      button:disabled {
        cursor: wait;
        opacity: 0.72;
      }

      .mini-grid {
        display: grid;
        gap: 12px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .mini-card {
        padding: 16px;
        border: 1px solid rgba(25, 43, 45, 0.08);
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.56);
      }

      .mini-card strong {
        display: block;
        margin-bottom: 8px;
        font-size: 16px;
      }

      .muted-card {
        padding: 16px;
        border-radius: 18px;
        border: 1px dashed rgba(25, 43, 45, 0.16);
        color: var(--muted);
        line-height: 1.6;
      }

      .jobs {
        display: grid;
        gap: 16px;
      }

      .job-card {
        padding: 18px;
        border-radius: 22px;
        border: 1px solid rgba(25, 43, 45, 0.08);
        background: rgba(255, 255, 255, 0.56);
      }

      .job-top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
      }

      .job-id {
        color: var(--muted);
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .job-title {
        margin: 8px 0 0;
        font-size: 20px;
      }

      .job-meta, .job-files, .job-errors {
        margin-top: 10px;
        color: var(--muted);
        font-size: 14px;
        line-height: 1.6;
      }

      .job-progress {
        margin-top: 14px;
      }

      .progress-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
        font-size: 14px;
        color: var(--muted);
      }

      .progress-track {
        height: 10px;
        overflow: hidden;
        border-radius: 999px;
        background: rgba(30, 42, 47, 0.08);
      }

      .progress-fill {
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(135deg, var(--accent), var(--accent-2));
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

      @media (max-width: 980px) {
        body {
          padding: 14px;
        }

        .hero-grid, .layout, .field-row, .mini-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <section class="hero">
        <span class="eyebrow">GoDingtalk Public Console</span>
        <h1>不用你的电脑常驻，也能远程下钉钉回放。</h1>
        <p>这版控制台会把任务写进数据库，再触发 GitHub Actions 远程 runner 去下载，成品回传到对象存储。入口公开可访问，不再依赖 Quick Tunnel，也不需要单独 token。</p>
        <div class="hero-grid">
          <div class="hero-stat">
            <label>Cookies</label>
            <strong id="hero-cookies">未准备</strong>
          </div>
          <div class="hero-stat">
            <label>总任务数</label>
            <strong id="hero-total">0</strong>
          </div>
          <div class="hero-stat">
            <label>运行中</label>
            <strong id="hero-running">0</strong>
          </div>
          <div class="hero-stat">
            <label>已完成</label>
            <strong id="hero-success">0</strong>
          </div>
        </div>
        <div id="status-notice" class="notice ok" hidden></div>
      </section>

      <section class="layout">
        <div class="stack">
          <article class="panel">
            <div class="panel-header">
              <div>
                <h2>浏览器辅助</h2>
                <p class="panel-subtitle">先装 Tampermonkey 辅助脚本，它会把当前页面链接和可见 cookies 一键带进控制台。浏览器读不到的 HttpOnly cookies，仍可能需要你手动补全。</p>
              </div>
              <span class="badge idle">公益版入口</span>
            </div>
            <div class="mini-grid">
              <div class="mini-card">
                <strong>安装脚本</strong>
                <div class="hint">打开下面这个地址安装脚本，然后在钉钉页面点右下角按钮。</div>
                <div class="actions" style="margin-top: 12px;">
                  <a class="button-link primary" href="${installURL}" target="_blank" rel="noreferrer">安装 Tampermonkey 脚本</a>
                </div>
              </div>
              <div class="mini-card">
                <strong>远程运行</strong>
                <div class="hint">任务不会在你的电脑上执行。创建任务后，会由 GitHub Actions 远程 runner 下载并上传成品。</div>
              </div>
            </div>
          </article>

          <article class="panel">
            <div class="panel-header">
              <div>
                <h2>Cookies</h2>
                <p class="panel-subtitle">支持三种格式：JSON 对象、JSON 数组、原始 cookie header 字符串。</p>
              </div>
              <span class="badge warn" id="cookie-badge">未上传</span>
            </div>
            <div class="fields">
              <div class="field">
                <label for="cookies">Cookies 内容</label>
                <textarea id="cookies" placeholder='{"LV_PC_SESSION":"replace-me"}'></textarea>
              </div>
              <div class="actions">
                <button class="primary" id="upload-cookies">上传 Cookies</button>
                <button class="secondary" id="example-cookies">填入示例</button>
              </div>
              <div class="hint">至少需要 <code>LV_PC_SESSION</code>。如果脚本导入后还是缺关键 cookie，直接补到这个文本框里再上传。</div>
            </div>
          </article>

          <article class="panel">
            <div class="panel-header">
              <div>
                <h2>创建下载任务</h2>
                <p class="panel-subtitle">支持单个或多个回放链接。每个任务会触发一个独立 GitHub Actions 运行，天然可以并行。</p>
              </div>
              <span class="badge idle">Remote Runner</span>
            </div>
            <div class="fields">
              <div class="field">
                <label for="urls">回放链接</label>
                <textarea id="urls" placeholder="每行一个钉钉回放链接"></textarea>
              </div>
              <div class="field-row">
                <div class="field">
                  <label for="output-subdir">输出标识</label>
                  <input id="output-subdir" placeholder="留空自动生成" />
                </div>
                <div class="field">
                  <label for="threads">线程数</label>
                  <input id="threads" type="number" min="1" max="100" value="10" />
                </div>
                <div class="field">
                  <label for="video-list">生成视频列表</label>
                  <select id="video-list">
                    <option value="true">生成</option>
                    <option value="false">不生成</option>
                  </select>
                </div>
              </div>
              <div class="actions">
                <button class="primary" id="create-job">开始远程下载</button>
                <button class="secondary" id="refresh-status">刷新状态</button>
                <button class="secondary" id="load-jobs">刷新任务列表</button>
              </div>
            </div>
          </article>
        </div>

        <aside class="stack">
          <article class="panel">
            <div class="panel-header">
              <div>
                <h2>系统状态</h2>
                <p class="panel-subtitle">这里显示控制面的数据库状态和 GitHub Actions 目标仓库。</p>
              </div>
              <span class="badge idle" id="polling-badge">自动轮询中</span>
            </div>
            <div id="status-card" class="muted-card">还没拿到状态，通常是 Worker 还没部署完成，或者 D1 / R2 / GitHub secrets 还没配齐。</div>
          </article>

          <article class="panel">
            <div class="panel-header">
              <div>
                <h2>任务列表</h2>
                <p class="panel-subtitle">成功任务会直接展示网页下载链接；失败任务会保留错误信息，方便你复测。</p>
              </div>
            </div>
            <div id="jobs" class="jobs">
              <div class="muted-card">还没有任务，先上传 cookies 再提交一个链接。</div>
            </div>
          </article>
        </aside>
      </section>
    </main>

    <script>
      const elements = {
        refreshStatus: document.getElementById("refresh-status"),
        statusNotice: document.getElementById("status-notice"),
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
        heroCookies: document.getElementById("hero-cookies"),
        heroTotal: document.getElementById("hero-total"),
        heroRunning: document.getElementById("hero-running"),
        heroSuccess: document.getElementById("hero-success"),
        pollingBadge: document.getElementById("polling-badge"),
      };

      let pollingHandle = null;

      function setNotice(message, type) {
        elements.statusNotice.hidden = false;
        elements.statusNotice.className = "notice " + (type || "ok");
        elements.statusNotice.textContent = message;
      }

      function clearNotice() {
        elements.statusNotice.hidden = true;
        elements.statusNotice.textContent = "";
      }

      function buildHeaders(json) {
        const headers = new Headers();
        if (json) {
          headers.set("Content-Type", "application/json");
        }
        return headers;
      }

      async function request(path, options) {
        const response = await fetch(path, {
          ...(options || {}),
          headers: (options && options.headers) || buildHeaders(Boolean(options && options.body)),
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

      function escapeHTML(value) {
        return String(value)
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;");
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
          case "waiting_runner":
            return "等待远程 runner";
          case "preparing":
            return "准备环境";
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
          const index = chunk.indexOf("=");
          if (index === -1) {
            return;
          }
          const name = chunk.slice(0, index).trim();
          const value = chunk.slice(index + 1).trim();
          if (name) {
            cookieMap[name] = value;
          }
        });

        if (Object.keys(cookieMap).length === 0) {
          throw new Error("没解析出任何 cookie 键值对。");
        }

        return cookieMap;
      }

      function renderStatus(status) {
        const cookiesReady = Boolean(status.cookies_ready);
        elements.heroCookies.textContent = cookiesReady ? "已就绪" : "未准备";
        elements.heroTotal.textContent = String(status.total_jobs || 0);
        elements.heroRunning.textContent = String(status.running_jobs || 0);
        elements.heroSuccess.textContent = String(status.succeeded_jobs || 0);
        elements.cookieBadge.textContent = cookiesReady ? "已上传" : "未上传";
        elements.cookieBadge.className = "badge " + (cookiesReady ? "ok" : "warn");

        elements.statusCard.innerHTML = [
          '<strong style="font-size:18px;">控制面已连接</strong>',
          '<div class="job-meta">模式：' + escapeHTML(status.mode || "-") + '</div>',
          '<div class="job-meta">GitHub 仓库：' + escapeHTML(status.workflow_repository || "未配置") + '</div>',
          '<div class="job-meta">工作流文件：' + escapeHTML(status.workflow_file || "-") + '</div>',
          '<div class="job-meta">Cookies 更新时间：' + escapeHTML(formatTime(status.cookies_updated_at)) + '</div>',
          '<div class="job-meta">等待中：' + escapeHTML(String(status.queued_jobs || 0)) + '</div>',
          '<div class="job-meta">运行中：' + escapeHTML(String(status.running_jobs || 0)) + '</div>',
          '<div class="job-meta">失败：' + escapeHTML(String(status.failed_jobs || 0)) + '</div>',
        ].join("");
      }

      function renderJobs(jobs) {
        if (!Array.isArray(jobs) || jobs.length === 0) {
          elements.jobs.innerHTML = '<div class="muted-card">还没有任务，先上传 cookies 再提交一个链接。</div>';
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
            '<div class="job-meta">输出标识：' + escapeHTML(job.output_subdir || "-") + '</div>',
            titles.length > 1 ? '<div class="job-meta">标题：' + titles.map(escapeHTML).join(" / ") + '</div>' : '',
            files.length ? '<div class="job-files">' + files.map((file) => '<div><a href="' + escapeHTML(file.download_url || "#") + '" target="_blank" rel="noreferrer">' + escapeHTML(file.name) + '</a></div>').join("") + '</div>' : '',
            errors.length ? '<div class="job-errors">' + errors.map(escapeHTML).join("<br/>") + '</div>' : '',
            '</section>',
          ].join("");
        }).join("");
      }

      function decodeImportPayload() {
        const hash = window.location.hash || "";
        if (!hash.startsWith("#import=")) {
          return;
        }

        try {
          const encoded = hash.slice("#import=".length);
          const decoded = decodeURIComponent(escape(atob(encoded)));
          const payload = JSON.parse(decoded);

          if (payload.url) {
            elements.urls.value = payload.url + (elements.urls.value ? "\\n" + elements.urls.value : "");
          }

          if (payload.cookies && Object.keys(payload.cookies).length > 0) {
            elements.cookies.value = JSON.stringify(payload.cookies, null, 2);
          } else if (payload.cookie_header) {
            elements.cookies.value = payload.cookie_header;
          }

          setNotice("已从 Tampermonkey 带入当前页面链接和可见 cookies。", "ok");
          history.replaceState(null, "", window.location.pathname);
        } catch (error) {
          setNotice("Tampermonkey 导入失败，请手动粘贴 cookies。", "error");
        }
      }

      async function refreshStatus() {
        try {
          const status = await request("/api/status");
          renderStatus(status);
          clearNotice();
        } catch (error) {
          elements.statusCard.innerHTML = '<strong style="font-size:18px;">状态暂时不可用</strong><div class="job-meta">通常是 Worker 还没部署完成，或者 D1 / R2 / GitHub Actions secrets 还没配齐。</div>';
          setNotice(error.message, "error");
        }
      }

      async function refreshJobs() {
        try {
          const payload = await request("/api/jobs");
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
          headers: buildHeaders(true),
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

        const payload = await request("/api/jobs", {
          method: "POST",
          headers: buildHeaders(true),
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

      decodeImportPayload();
      installPolling();
      refreshStatus();
      refreshJobs();
    </script>
  </body>
</html>`;
}
