export function renderApp(appOrigin: string): string {
  const installURL = `${appOrigin.replace(/\/$/, "")}/tampermonkey/godingtalk-helper.user.js`;

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="data:," />
    <title>GoDingtalk 公益远程下载台</title>
    <style>
      :root {
        --bg: #f6f4ef;
        --surface: #fffdfa;
        --surface-soft: #f8f5ef;
        --ink: #1d252b;
        --muted: #68757d;
        --line: rgba(29, 37, 43, 0.12);
        --line-strong: rgba(29, 37, 43, 0.18);
        --accent: #d5602a;
        --accent-2: #0f756a;
        --danger: #b63a2e;
        --ok: #0f756a;
        --shadow: 0 18px 50px rgba(29, 37, 43, 0.08);
        --radius-xl: 28px;
        --radius-lg: 20px;
        --radius-md: 16px;
        --radius-sm: 12px;
      }

      * {
        box-sizing: border-box;
      }

      html, body {
        margin: 0;
        min-height: 100%;
        background:
          radial-gradient(circle at top left, rgba(213, 96, 42, 0.08), transparent 24%),
          linear-gradient(180deg, #faf8f3 0%, var(--bg) 100%);
        color: var(--ink);
        font-family: "IBM Plex Sans", "Avenir Next", "Segoe UI", sans-serif;
      }

      body {
        padding: 20px;
      }

      .shell {
        max-width: 1180px;
        margin: 0 auto;
      }

      .shell[data-mode="basic"] .pro-only {
        display: none !important;
      }

      .shell[data-mode="basic"] .workspace {
        grid-template-columns: 1fr;
      }

      .shell[data-mode="pro"] .basic-only {
        display: none !important;
      }

      .topbar {
        display: grid;
        gap: 18px;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: start;
        padding: 28px;
        border: 1px solid var(--line);
        border-radius: 32px;
        background: rgba(255, 253, 250, 0.88);
        box-shadow: var(--shadow);
        backdrop-filter: blur(10px);
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 7px 11px;
        border-radius: 999px;
        background: rgba(29, 37, 43, 0.06);
        color: var(--muted);
        font-size: 12px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }

      h1 {
        margin: 14px 0 8px;
        font-size: clamp(34px, 4vw, 54px);
        line-height: 0.95;
        letter-spacing: -0.04em;
        font-family: "IBM Plex Serif", Georgia, serif;
      }

      .topbar p {
        max-width: 720px;
        margin: 0;
        color: var(--muted);
        line-height: 1.7;
      }

      .mode-switch {
        display: inline-grid;
        grid-auto-flow: column;
        gap: 8px;
        padding: 6px;
        border: 1px solid var(--line);
        border-radius: 999px;
        background: var(--surface-soft);
      }

      .mode-button {
        min-height: 44px;
        padding: 0 16px;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: var(--muted);
        font: inherit;
        font-weight: 700;
        cursor: pointer;
      }

      .mode-button.active {
        background: linear-gradient(135deg, var(--ink), #394750);
        color: white;
      }

      .stats {
        display: grid;
        gap: 12px;
        margin-top: 16px;
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }

      .stat {
        padding: 16px 18px;
        border: 1px solid var(--line);
        border-radius: 18px;
        background: var(--surface);
      }

      .stat label {
        display: block;
        color: var(--muted);
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .stat strong {
        display: block;
        margin-top: 8px;
        font-size: 24px;
      }

      .notice {
        margin-top: 14px;
        padding: 12px 14px;
        border-radius: 14px;
        font-size: 14px;
      }

      .notice.ok {
        background: rgba(15, 117, 106, 0.1);
        color: var(--ok);
      }

      .notice.error {
        background: rgba(182, 58, 46, 0.12);
        color: var(--danger);
      }

      .workspace {
        display: grid;
        gap: 18px;
        margin-top: 20px;
        grid-template-columns: minmax(0, 1fr) 360px;
      }

      .stack {
        display: grid;
        gap: 18px;
      }

      .panel {
        padding: 22px;
        border: 1px solid var(--line);
        border-radius: var(--radius-xl);
        background: rgba(255, 253, 250, 0.92);
        box-shadow: var(--shadow);
      }

      .panel-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 14px;
      }

      .panel-header h2 {
        margin: 0;
        font-size: 22px;
        font-family: "IBM Plex Serif", Georgia, serif;
      }

      .panel-subtitle {
        margin: 6px 0 0;
        color: var(--muted);
        font-size: 14px;
        line-height: 1.65;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 999px;
        font-size: 13px;
        font-weight: 700;
      }

      .badge.ok {
        background: rgba(15, 117, 106, 0.1);
        color: var(--ok);
      }

      .badge.warn {
        background: rgba(213, 96, 42, 0.12);
        color: #a14b22;
      }

      .badge.idle {
        background: rgba(29, 37, 43, 0.08);
        color: var(--muted);
      }

      .helper-strip {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;
      }

      .hint {
        color: var(--muted);
        font-size: 13px;
        line-height: 1.65;
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
        gap: 12px;
        grid-template-columns: 1fr 150px 170px;
      }

      label {
        font-size: 13px;
        font-weight: 700;
        color: #354149;
      }

      input, textarea, select {
        width: 100%;
        border: 1px solid var(--line);
        border-radius: var(--radius-md);
        background: var(--surface);
        color: var(--ink);
        font: inherit;
      }

      input, select {
        min-height: 48px;
        padding: 12px 14px;
      }

      textarea {
        min-height: 150px;
        padding: 14px;
        line-height: 1.6;
        resize: vertical;
      }

      input:focus, textarea:focus, select:focus {
        outline: none;
        border-color: rgba(15, 117, 106, 0.45);
        box-shadow: 0 0 0 4px rgba(15, 117, 106, 0.08);
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
        min-height: 44px;
        padding: 0 16px;
        border: 0;
        border-radius: 999px;
        font: inherit;
        font-weight: 700;
        text-decoration: none;
        cursor: pointer;
      }

      button.primary, .button-link.primary {
        background: linear-gradient(135deg, var(--accent), #e07d41);
        color: white;
      }

      button.secondary, .button-link.secondary {
        background: rgba(29, 37, 43, 0.08);
        color: var(--ink);
      }

      button:disabled {
        opacity: 0.7;
        cursor: wait;
      }

      .basic-note {
        padding: 14px 16px;
        border-radius: 16px;
        background: var(--surface-soft);
        color: var(--muted);
        line-height: 1.7;
      }

      .jobs {
        display: grid;
        gap: 12px;
      }

      .job-card {
        padding: 16px;
        border: 1px solid var(--line);
        border-radius: 18px;
        background: var(--surface);
      }

      .job-card.selected {
        border-color: rgba(15, 117, 106, 0.28);
        box-shadow: inset 0 0 0 1px rgba(15, 117, 106, 0.1);
      }

      .job-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
      }

      .job-title {
        margin: 6px 0 0;
        font-size: 18px;
      }

      .job-id {
        color: var(--muted);
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .job-meta, .job-errors, .job-files {
        margin-top: 10px;
        color: var(--muted);
        font-size: 14px;
        line-height: 1.6;
      }

      .progress {
        margin-top: 12px;
      }

      .progress-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        font-size: 13px;
        color: var(--muted);
      }

      .track {
        height: 8px;
        margin-top: 8px;
        overflow: hidden;
        border-radius: 999px;
        background: rgba(29, 37, 43, 0.08);
      }

      .fill {
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(135deg, var(--accent), var(--accent-2));
      }

      .job-files a {
        color: var(--accent-2);
        font-weight: 700;
        text-decoration: none;
      }

      .job-files a:hover {
        text-decoration: underline;
      }

      .job-errors {
        color: var(--danger);
      }

      .empty {
        padding: 16px;
        border: 1px dashed var(--line-strong);
        border-radius: 16px;
        color: var(--muted);
        background: var(--surface-soft);
        line-height: 1.7;
      }

      .detail-grid {
        display: grid;
        gap: 10px;
      }

      .detail-item {
        padding: 14px;
        border: 1px solid var(--line);
        border-radius: 14px;
        background: var(--surface);
      }

      .detail-item label {
        display: block;
        color: var(--muted);
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .detail-item strong {
        display: block;
        margin-top: 6px;
        font-size: 16px;
      }

      .log-list {
        display: grid;
        gap: 10px;
        max-height: 520px;
        overflow: auto;
      }

      .log-item {
        padding: 12px 14px;
        border-radius: 14px;
        border: 1px solid var(--line);
        background: var(--surface);
      }

      .log-meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        font-size: 12px;
        color: var(--muted);
      }

      .log-level {
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }

      .log-level.error {
        color: var(--danger);
      }

      .log-level.info {
        color: var(--accent-2);
      }

      .log-message {
        margin-top: 8px;
        color: var(--ink);
        line-height: 1.6;
        white-space: pre-wrap;
        word-break: break-word;
      }

      code {
        padding: 2px 6px;
        border-radius: 8px;
        background: rgba(29, 37, 43, 0.06);
        font-family: "IBM Plex Mono", monospace;
      }

      @media (max-width: 980px) {
        body {
          padding: 14px;
        }

        .topbar,
        .stats,
        .workspace,
        .field-row {
          grid-template-columns: 1fr;
        }

        .mode-switch {
          width: 100%;
          grid-auto-flow: row;
        }
      }
    </style>
  </head>
  <body>
    <main id="app-shell" class="shell" data-mode="basic">
      <section class="topbar">
        <div>
          <span class="eyebrow">GoDingtalk Public Console</span>
          <h1>公益远程下载台</h1>
          <p id="hero-copy">简单版只保留必要功能：上传 cookies、贴回放链接、开始远程下载、查看最新结果。高级版再展开参数、状态细节和任务日志。</p>
        </div>
        <div class="mode-switch" role="tablist" aria-label="界面模式">
          <button id="mode-basic" class="mode-button active" type="button">简单版</button>
          <button id="mode-pro" class="mode-button" type="button">高级版</button>
        </div>
      </section>

      <section class="stats">
        <div class="stat">
          <label>Cookies</label>
          <strong id="hero-cookies">未准备</strong>
        </div>
        <div class="stat">
          <label>总任务数</label>
          <strong id="hero-total">0</strong>
        </div>
        <div class="stat">
          <label>运行中</label>
          <strong id="hero-running">0</strong>
        </div>
        <div class="stat">
          <label>已完成</label>
          <strong id="hero-success">0</strong>
        </div>
      </section>

      <div id="status-notice" class="notice ok" hidden></div>

      <section class="workspace">
        <div class="stack">
          <article class="panel">
            <div class="panel-header">
              <div>
                <h2>浏览器辅助</h2>
                <p class="panel-subtitle">安装脚本后，在钉钉页面点按钮即可把当前链接和可见 cookies 带回这里。</p>
              </div>
              <span class="badge idle">Tampermonkey</span>
            </div>
            <div class="helper-strip">
              <a class="button-link primary" href="${installURL}" target="_blank" rel="noreferrer">安装脚本</a>
              <span class="hint">脚本只负责带回页面上下文，下载仍由远程 GitHub Actions runner 执行。</span>
            </div>
          </article>

          <article class="panel">
            <div class="panel-header">
              <div>
                <h2>Cookies</h2>
                <p class="panel-subtitle">支持 JSON 对象、JSON 数组和原始 cookie header。最少需要 <code>LV_PC_SESSION</code>。</p>
              </div>
              <span class="badge warn" id="cookie-badge">未上传</span>
            </div>
            <div class="fields">
              <div class="field">
                <label for="cookies">Cookies 内容</label>
                <textarea id="cookies" placeholder='{"LV_PC_SESSION":"replace-me"}'></textarea>
              </div>
              <div class="actions">
                <button class="primary" id="upload-cookies" type="button">上传 Cookies</button>
                <button class="secondary" id="example-cookies" type="button">填入示例</button>
              </div>
            </div>
          </article>

          <article class="panel">
            <div class="panel-header">
              <div>
                <h2 id="job-panel-title">开始下载</h2>
                <p id="job-panel-subtitle" class="panel-subtitle">简单版固定默认参数，只保留必要输入。</p>
              </div>
              <span id="mode-chip" class="badge idle">简单版</span>
            </div>

            <div class="fields">
              <div class="field">
                <label for="urls">回放链接</label>
                <textarea id="urls" placeholder="每行一个钉钉回放链接"></textarea>
              </div>

              <div class="basic-note basic-only">
                默认线程 <code>10</code>，默认生成视频列表，输出标识自动处理。你只需要贴链接。
              </div>

              <div class="fields pro-only">
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
                <div class="hint">高级版保留显式参数，方便批量调度、排错和区分不同任务输出。</div>
              </div>

              <div class="actions">
                <button class="primary" id="create-job" type="button">开始远程下载</button>
                <button class="secondary" id="refresh-status" type="button">刷新状态</button>
                <button class="secondary" id="load-jobs" type="button">刷新任务</button>
              </div>
            </div>
          </article>

          <article class="panel">
            <div class="panel-header">
              <div>
                <h2>最近任务</h2>
                <p class="panel-subtitle">这里只显示最近 20 分钟内更新过的最新 5 条任务。</p>
              </div>
              <span class="badge idle">最近窗口</span>
            </div>
            <div id="jobs" class="jobs">
              <div class="empty">最近 20 分钟内还没有任务。先上传 cookies，再贴一条回放链接试跑。</div>
            </div>
          </article>
        </div>

        <aside class="stack pro-only">
          <article class="panel">
            <div class="panel-header">
              <div>
                <h2>系统细节</h2>
                <p class="panel-subtitle">高级版展示控制面状态和远程 workflow 细节。</p>
              </div>
              <span class="badge idle" id="polling-badge">自动轮询中</span>
            </div>
            <div id="status-card" class="detail-grid">
              <div class="empty">正在读取控制面状态。</div>
            </div>
          </article>

          <article class="panel">
            <div class="panel-header">
              <div>
                <h2>任务详情</h2>
                <p class="panel-subtitle">点击左边任务卡片后，这里会展开该任务的详细信息和下载文件。</p>
              </div>
            </div>
            <div id="job-detail" class="empty">先从左侧选一条任务。</div>
          </article>

          <article class="panel">
            <div class="panel-header">
              <div>
                <h2>任务日志</h2>
                <p class="panel-subtitle">这里显示数据库里的任务事件流，用来排错。</p>
              </div>
            </div>
            <div id="job-logs" class="empty">选中任务后会显示最新日志。</div>
          </article>
        </aside>
      </section>
    </main>

    <script>
      const MODE_STORAGE_KEY = "godingtalk-ui-mode";
      const copyMap = {
        basic: {
          hero: "简单版只保留必要功能：上传 cookies、贴回放链接、开始远程下载、查看最新结果。高级版再展开参数、状态细节和任务日志。",
          title: "开始下载",
          subtitle: "简单版固定默认参数，只保留必要输入。",
          chip: "简单版",
        },
        pro: {
          hero: "高级版用于排错和精细控制。除了基础下载入口，还会展示系统状态、任务详情和事件日志。",
          title: "高级任务创建",
          subtitle: "高级版保留线程、输出标识和附加选项。",
          chip: "高级版",
        },
      };

      const elements = {
        shell: document.getElementById("app-shell"),
        modeBasic: document.getElementById("mode-basic"),
        modePro: document.getElementById("mode-pro"),
        heroCopy: document.getElementById("hero-copy"),
        jobPanelTitle: document.getElementById("job-panel-title"),
        jobPanelSubtitle: document.getElementById("job-panel-subtitle"),
        modeChip: document.getElementById("mode-chip"),
        statusNotice: document.getElementById("status-notice"),
        refreshStatus: document.getElementById("refresh-status"),
        loadJobs: document.getElementById("load-jobs"),
        cookies: document.getElementById("cookies"),
        uploadCookies: document.getElementById("upload-cookies"),
        exampleCookies: document.getElementById("example-cookies"),
        cookieBadge: document.getElementById("cookie-badge"),
        urls: document.getElementById("urls"),
        outputSubdir: document.getElementById("output-subdir"),
        threads: document.getElementById("threads"),
        videoList: document.getElementById("video-list"),
        createJob: document.getElementById("create-job"),
        jobs: document.getElementById("jobs"),
        statusCard: document.getElementById("status-card"),
        jobDetail: document.getElementById("job-detail"),
        jobLogs: document.getElementById("job-logs"),
        heroCookies: document.getElementById("hero-cookies"),
        heroTotal: document.getElementById("hero-total"),
        heroRunning: document.getElementById("hero-running"),
        heroSuccess: document.getElementById("hero-success"),
      };

      const state = {
        mode: "basic",
        jobs: [],
        selectedJobID: "",
        selectedDetail: null,
        pollingHandle: null,
      };

      function safeLocalStorageGet(key) {
        try {
          return window.localStorage.getItem(key);
        } catch {
          return null;
        }
      }

      function safeLocalStorageSet(key, value) {
        try {
          window.localStorage.setItem(key, value);
        } catch {}
      }

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

      function applyMode(mode) {
        state.mode = mode === "pro" ? "pro" : "basic";
        elements.shell.dataset.mode = state.mode;
        elements.modeBasic.classList.toggle("active", state.mode === "basic");
        elements.modePro.classList.toggle("active", state.mode === "pro");
        elements.heroCopy.textContent = copyMap[state.mode].hero;
        elements.jobPanelTitle.textContent = copyMap[state.mode].title;
        elements.jobPanelSubtitle.textContent = copyMap[state.mode].subtitle;
        elements.modeChip.textContent = copyMap[state.mode].chip;
        safeLocalStorageSet(MODE_STORAGE_KEY, state.mode);

        if (state.mode === "pro") {
          refreshSelectedJob();
        }
      }

      function renderStatus(status) {
        const cookiesReady = Boolean(status.cookies_ready);
        elements.heroCookies.textContent = cookiesReady ? "已就绪" : "未准备";
        elements.heroTotal.textContent = String(Number(status.total_jobs || 0));
        elements.heroRunning.textContent = String(Number(status.running_jobs || 0));
        elements.heroSuccess.textContent = String(Number(status.succeeded_jobs || 0));
        elements.cookieBadge.textContent = cookiesReady ? "已上传" : "未上传";
        elements.cookieBadge.className = "badge " + (cookiesReady ? "ok" : "warn");

        elements.statusCard.innerHTML = [
          '<div class="detail-item"><label>模式</label><strong>' + escapeHTML(status.mode || "-") + '</strong></div>',
          '<div class="detail-item"><label>Cookies 更新时间</label><strong>' + escapeHTML(formatTime(status.cookies_updated_at)) + '</strong></div>',
          '<div class="detail-item"><label>GitHub 仓库</label><strong>' + escapeHTML(status.workflow_repository || "未配置") + '</strong></div>',
          '<div class="detail-item"><label>工作流文件</label><strong>' + escapeHTML(status.workflow_file || "-") + '</strong></div>',
          '<div class="detail-item"><label>等待中</label><strong>' + escapeHTML(String(status.queued_jobs || 0)) + '</strong></div>',
          '<div class="detail-item"><label>失败任务</label><strong>' + escapeHTML(String(status.failed_jobs || 0)) + '</strong></div>',
        ].join("");
      }

      function renderJobs(jobs) {
        state.jobs = Array.isArray(jobs) ? jobs : [];

        if (state.jobs.length === 0) {
          elements.jobs.innerHTML = '<div class="empty">最近 20 分钟内还没有任务。先上传 cookies，再贴一条回放链接试跑。</div>';
          if (state.mode === "pro") {
            elements.jobDetail.innerHTML = '先从左侧选一条任务。';
            elements.jobLogs.innerHTML = '选中任务后会显示最新日志。';
          }
          return;
        }

        if (!state.selectedJobID || !state.jobs.some((job) => job.id === state.selectedJobID)) {
          state.selectedJobID = state.jobs[0].id;
        }

        elements.jobs.innerHTML = state.jobs.map((job) => {
          const files = Array.isArray(job.files) ? job.files : [];
          const errors = Array.isArray(job.errors) ? job.errors : [];
          const titleText = job.current_title || (Array.isArray(job.titles) && job.titles[0]) || "下载任务";
          const progress = Math.max(0, Math.min(100, Number(job.progress_percent || 0)));
          const statusClass = job.status === "succeeded" ? "ok" : (job.status === "failed" ? "warn" : "idle");
          const isSelected = state.mode === "pro" && state.selectedJobID === job.id;

          return [
            '<section class="job-card' + (isSelected ? ' selected' : '') + '" data-job-id="' + escapeHTML(job.id) + '">',
            '<div class="job-head">',
            '<div>',
            '<div class="job-id">' + escapeHTML(job.id) + '</div>',
            '<h3 class="job-title">' + escapeHTML(titleText) + '</h3>',
            '</div>',
            '<span class="badge ' + statusClass + '">' + escapeHTML(job.status || "unknown") + '</span>',
            '</div>',
            '<div class="progress">',
            '<div class="progress-top"><span>' + escapeHTML(formatStage(job.stage)) + '</span><strong>' + escapeHTML(progress.toFixed(1)) + '%</strong></div>',
            '<div class="track"><div class="fill" style="width:' + escapeHTML(progress.toFixed(1)) + '%"></div></div>',
            '</div>',
            '<div class="job-meta">创建：' + escapeHTML(formatTime(job.created_at)) + '</div>',
            Number(job.total_parts || 0) > 0 ? '<div class="job-meta">分片：' + escapeHTML(String(job.completed_parts || 0)) + ' / ' + escapeHTML(String(job.total_parts || 0)) + '</div>' : '',
            state.mode === "pro" && job.runner_run_id ? '<div class="job-meta">Run ID：' + escapeHTML(job.runner_run_id) + '</div>' : '',
            files.length ? '<div class="job-files">' + files.map((file) => '<div><a href="' + escapeHTML(file.download_url || "#") + '" target="_blank" rel="noreferrer">' + escapeHTML(file.name) + '</a></div>').join("") + '</div>' : '',
            state.mode === "basic" && errors.length ? '<div class="job-errors">' + errors.slice(0, 1).map(escapeHTML).join("") + '</div>' : '',
            '</section>',
          ].join("");
        }).join("");

        elements.jobs.querySelectorAll("[data-job-id]").forEach((node) => {
          node.addEventListener("click", () => {
            const jobID = node.getAttribute("data-job-id");
            if (!jobID) {
              return;
            }
            state.selectedJobID = jobID;
            renderJobs(state.jobs);
            refreshSelectedJob();
          });
        });
      }

      function renderJobDetail(detailPayload) {
        if (!detailPayload || !detailPayload.job) {
          elements.jobDetail.innerHTML = '先从左侧选一条任务。';
          elements.jobLogs.innerHTML = '选中任务后会显示最新日志。';
          return;
        }

        const job = detailPayload.job;
        const files = Array.isArray(job.files) ? job.files : [];
        const errors = Array.isArray(job.errors) ? job.errors : [];
        const events = Array.isArray(detailPayload.events) ? detailPayload.events : [];
        const titleText = job.current_title || (Array.isArray(job.titles) && job.titles[0]) || "下载任务";

        elements.jobDetail.innerHTML = [
          '<div class="detail-grid">',
          '<div class="detail-item"><label>标题</label><strong>' + escapeHTML(titleText) + '</strong></div>',
          '<div class="detail-item"><label>阶段</label><strong>' + escapeHTML(formatStage(job.stage)) + '</strong></div>',
          '<div class="detail-item"><label>线程数</label><strong>' + escapeHTML(String(job.thread || 0)) + '</strong></div>',
          '<div class="detail-item"><label>输出标识</label><strong>' + escapeHTML(job.output_subdir || "-") + '</strong></div>',
          '<div class="detail-item"><label>创建时间</label><strong>' + escapeHTML(formatTime(job.created_at)) + '</strong></div>',
          '<div class="detail-item"><label>完成时间</label><strong>' + escapeHTML(formatTime(job.finished_at)) + '</strong></div>',
          '</div>',
          files.length ? '<div class="job-files">' + files.map((file) => '<div><a href="' + escapeHTML(file.download_url || "#") + '" target="_blank" rel="noreferrer">' + escapeHTML(file.name) + '</a></div>').join("") + '</div>' : '<div class="empty" style="margin-top:12px;">这个任务暂时还没有可下载文件。</div>',
          errors.length ? '<div class="job-errors">' + errors.map(escapeHTML).join("<br/>") + '</div>' : '',
        ].join("");

        if (events.length === 0) {
          elements.jobLogs.innerHTML = '<div class="empty">这个任务目前还没有事件日志。</div>';
          return;
        }

        elements.jobLogs.innerHTML = '<div class="log-list">' + events.map((event) => [
          '<section class="log-item">',
          '<div class="log-meta">',
          '<span class="log-level ' + escapeHTML(event.level || "info") + '">' + escapeHTML(event.level || "info") + '</span>',
          '<span>' + escapeHTML(formatTime(event.created_at)) + '</span>',
          '</div>',
          '<div class="log-message">' + escapeHTML(event.message || "") + '</div>',
          '</section>',
        ].join("")).join("") + '</div>';
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
        } catch {
          setNotice("Tampermonkey 导入失败，请手动粘贴 cookies。", "error");
        }
      }

      async function refreshStatus() {
        try {
          const status = await request("/api/status");
          renderStatus(status);
          clearNotice();
        } catch (error) {
          elements.statusCard.innerHTML = '<div class="empty">状态暂时不可用，通常是 Worker 还没部署完成，或者数据库 / GitHub Actions secrets 还没完全就绪。</div>';
          setNotice(error.message, "error");
        }
      }

      async function refreshJobs() {
        try {
          const payload = await request("/api/jobs");
          renderJobs(payload.jobs || []);
          if (state.mode === "pro") {
            await refreshSelectedJob();
          }
        } catch (error) {
          renderJobs([]);
          setNotice(error.message, "error");
        }
      }

      async function refreshSelectedJob() {
        if (state.mode !== "pro") {
          return;
        }
        if (!state.selectedJobID) {
          renderJobDetail(null);
          return;
        }

        try {
          const detail = await request("/api/jobs/" + encodeURIComponent(state.selectedJobID) + "?include=events");
          state.selectedDetail = detail;
          renderJobDetail(detail);
        } catch (error) {
          elements.jobDetail.innerHTML = '<div class="empty">任务详情读取失败。</div>';
          elements.jobLogs.innerHTML = '<div class="empty">' + escapeHTML(error.message) + '</div>';
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

        const body = {};
        if (state.mode === "pro") {
          body.thread = Number(elements.threads.value || "10");
          body.output_subdir = elements.outputSubdir.value.trim();
          body.create_video_list = elements.videoList.value === "true";
        } else {
          body.thread = 10;
          body.output_subdir = "";
          body.create_video_list = true;
        }

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

        state.selectedJobID = payload.id || state.selectedJobID;
        if (state.mode === "pro") {
          elements.outputSubdir.value = "";
        }
        setNotice("任务已创建：" + payload.id);
        await refreshJobs();
        await refreshStatus();
      }

      function setBusy(button, busy) {
        button.disabled = busy;
      }

      function installPolling() {
        if (state.pollingHandle) {
          clearInterval(state.pollingHandle);
        }
        state.pollingHandle = setInterval(() => {
          refreshStatus();
          refreshJobs();
        }, 5000);
      }

      elements.modeBasic.addEventListener("click", () => applyMode("basic"));
      elements.modePro.addEventListener("click", () => applyMode("pro"));

      elements.refreshStatus.addEventListener("click", async () => {
        await refreshStatus();
        await refreshJobs();
      });

      elements.loadJobs.addEventListener("click", refreshJobs);

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

      applyMode(safeLocalStorageGet(MODE_STORAGE_KEY) || "basic");
      decodeImportPayload();
      installPolling();
      refreshStatus();
      refreshJobs();
    </script>
  </body>
</html>`;
}
