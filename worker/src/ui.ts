type AppPage = "home" | "settings";

export function renderApp(appOrigin: string, page: AppPage): string {
  const installURL = `${appOrigin.replace(/\/$/, "")}/tampermonkey/godingtalk-helper.user.js`;
  const isHome = page === "home";

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="data:," />
    <title>GoDingtalk 私有下载台</title>
    <style>
      :root {
        --bg: #f6f4ef;
        --surface: #fffdfa;
        --surface-soft: #f7f4ec;
        --ink: #1e262b;
        --muted: #67747d;
        --line: rgba(30, 38, 43, 0.12);
        --accent: #d55f2a;
        --accent-2: #0f766a;
        --danger: #b73a2f;
        --ok: #0f766a;
        --shadow: 0 18px 48px rgba(30, 38, 43, 0.08);
        --radius-xl: 26px;
        --radius-lg: 18px;
        --radius-md: 14px;
      }

      * { box-sizing: border-box; }

      html, body {
        margin: 0;
        min-height: 100%;
        color: var(--ink);
        font-family: "IBM Plex Sans", "Avenir Next", "Segoe UI", sans-serif;
        background:
          radial-gradient(circle at top left, rgba(213, 95, 42, 0.08), transparent 24%),
          radial-gradient(circle at top right, rgba(15, 118, 106, 0.08), transparent 26%),
          linear-gradient(180deg, #fbf9f4 0%, var(--bg) 100%);
      }

      body { padding: 18px; }

      .shell {
        max-width: 1080px;
        margin: 0 auto;
        display: grid;
        gap: 16px;
      }

      .topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 18px;
        border: 1px solid var(--line);
        border-radius: 24px;
        background: rgba(255, 253, 250, 0.9);
        box-shadow: var(--shadow);
      }

      .brand h1 {
        margin: 0;
        font-size: clamp(28px, 4vw, 42px);
        line-height: 0.95;
        font-family: "IBM Plex Serif", Georgia, serif;
        letter-spacing: -0.03em;
      }

      .brand p {
        margin: 8px 0 0;
        color: var(--muted);
        font-size: 14px;
      }

      .nav {
        display: inline-flex;
        gap: 8px;
        padding: 6px;
        border-radius: 999px;
        border: 1px solid var(--line);
        background: var(--surface-soft);
      }

      .nav a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
        padding: 0 14px;
        border-radius: 999px;
        text-decoration: none;
        color: var(--muted);
        font-weight: 700;
      }

      .nav a.active {
        color: white;
        background: linear-gradient(135deg, var(--ink), #37454d);
      }

      .user-chip {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 999px;
        background: rgba(30, 38, 43, 0.06);
        color: var(--muted);
        font-size: 13px;
      }

      .notice {
        padding: 12px 14px;
        border-radius: 14px;
        font-size: 14px;
      }

      .notice.ok {
        background: rgba(15, 118, 106, 0.1);
        color: var(--ok);
      }

      .notice.error {
        background: rgba(183, 58, 47, 0.12);
        color: var(--danger);
      }

      .panel {
        padding: 20px;
        border-radius: var(--radius-xl);
        border: 1px solid var(--line);
        background: rgba(255, 253, 250, 0.92);
        box-shadow: var(--shadow);
      }

      .panel h2 {
        margin: 0;
        font-size: 22px;
        font-family: "IBM Plex Serif", Georgia, serif;
      }

      .panel p {
        margin: 8px 0 0;
        color: var(--muted);
        line-height: 1.65;
      }

      .fields {
        display: grid;
        gap: 12px;
        margin-top: 14px;
      }

      .field {
        display: grid;
        gap: 8px;
      }

      label {
        font-size: 13px;
        font-weight: 700;
        color: #36434b;
      }

      input, textarea {
        width: 100%;
        border: 1px solid var(--line);
        border-radius: var(--radius-md);
        background: var(--surface);
        color: var(--ink);
        font: inherit;
      }

      input {
        min-height: 46px;
        padding: 12px 14px;
      }

      textarea {
        min-height: 150px;
        padding: 14px;
        line-height: 1.6;
        resize: vertical;
      }

      input:focus, textarea:focus {
        outline: none;
        border-color: rgba(15, 118, 106, 0.42);
        box-shadow: 0 0 0 4px rgba(15, 118, 106, 0.08);
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
        min-height: 42px;
        padding: 0 14px;
        border: 0;
        border-radius: 999px;
        font: inherit;
        font-weight: 700;
        text-decoration: none;
        cursor: pointer;
      }

      button.primary, .button-link.primary {
        background: linear-gradient(135deg, var(--accent), #e07c40);
        color: white;
      }

      button.secondary, .button-link.secondary {
        background: rgba(30, 38, 43, 0.08);
        color: var(--ink);
      }

      button:disabled {
        opacity: 0.7;
        cursor: wait;
      }

      .auth-grid {
        display: grid;
        gap: 12px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .stats {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        margin-top: 14px;
      }

      .stat {
        padding: 14px;
        border-radius: var(--radius-lg);
        border: 1px solid var(--line);
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
        font-size: 20px;
      }

      .jobs {
        display: grid;
        gap: 10px;
      }

      .job {
        padding: 14px;
        border: 1px solid var(--line);
        border-radius: var(--radius-lg);
        background: var(--surface);
      }

      .job-top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 10px;
      }

      .job-id {
        color: var(--muted);
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .job-title {
        margin: 6px 0 0;
        font-size: 17px;
      }

      .job-meta, .job-files, .job-errors {
        margin-top: 8px;
        color: var(--muted);
        font-size: 14px;
        line-height: 1.55;
      }

      .job-files a {
        color: var(--accent-2);
        text-decoration: none;
        font-weight: 700;
      }

      .job-files a:hover { text-decoration: underline; }
      .job-errors { color: var(--danger); }

      .progress-track {
        height: 8px;
        margin-top: 8px;
        border-radius: 999px;
        overflow: hidden;
        background: rgba(30, 38, 43, 0.08);
      }

      .progress-fill {
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(135deg, var(--accent), var(--accent-2));
      }

      .empty {
        padding: 14px;
        border-radius: var(--radius-lg);
        border: 1px dashed rgba(30, 38, 43, 0.2);
        color: var(--muted);
        background: var(--surface-soft);
        line-height: 1.65;
      }

      .hidden { display: none !important; }

      @media (max-width: 880px) {
        body { padding: 12px; }
        .topbar { flex-direction: column; align-items: flex-start; }
        .auth-grid, .stats { grid-template-columns: 1fr; }
        .nav { width: 100%; }
        .nav a { flex: 1; }
      }
    </style>
  </head>
  <body>
    <main class="shell">
      <section class="topbar">
        <div class="brand">
          <h1>GoDingtalk 私有下载台</h1>
          <p>${isHome ? "主页只保留下载流程和结果。" : "配置页集中管理登录、Cookies 与脚本安装。"}</p>
        </div>
        <div style="display:grid; gap:10px; justify-items:end;">
          <nav class="nav">
            <a class="${isHome ? "active" : ""}" href="/">下载</a>
            <a class="${isHome ? "" : "active"}" href="/settings">配置</a>
          </nav>
          <div id="user-chip" class="user-chip">未登录</div>
        </div>
      </section>

      <div id="notice" class="notice ok hidden"></div>

      <section id="auth-panel" class="panel">
        <h2>用户登录</h2>
        <p>为了隔离隐私，Cookie 和视频都按登录用户独立保存。首次部署可直接注册第一个账号。</p>
        <div class="fields">
          <div class="auth-grid">
            <div class="field">
              <label for="auth-username">用户名</label>
              <input id="auth-username" placeholder="至少 3 位" />
            </div>
            <div class="field">
              <label for="auth-password">密码</label>
              <input id="auth-password" type="password" placeholder="至少 6 位" />
            </div>
          </div>
          <div class="actions">
            <button id="login-btn" class="primary" type="button">登录</button>
            <button id="register-btn" class="secondary" type="button">注册首个账号</button>
            <button id="logout-btn" class="secondary hidden" type="button">退出登录</button>
          </div>
        </div>
      </section>

      <section id="home-panel" class="panel ${isHome ? "" : "hidden"}">
        <h2>开始下载</h2>
        <p>默认线程已设为最大值 <code>100</code>。你只需要粘贴回放链接。</p>
        <div class="fields">
          <div class="field">
            <label for="urls">回放链接</label>
            <textarea id="urls" placeholder="每行一个钉钉回放链接"></textarea>
          </div>
          <div class="actions">
            <button id="create-job-btn" class="primary" type="button">开始远程下载</button>
            <button id="refresh-btn" class="secondary" type="button">刷新状态</button>
          </div>
        </div>
      </section>

      <section id="settings-panel" class="panel ${isHome ? "hidden" : ""}">
        <h2>配置中心</h2>
        <p>这里放脚本安装和 Cookies 上传。Tampermonkey 会把页面链接和可见 Cookie 传到这里。</p>
        <div class="actions" style="margin-top:14px;">
          <a class="button-link primary" href="${installURL}" target="_blank" rel="noreferrer">安装 Tampermonkey 脚本</a>
        </div>
        <div class="fields">
          <div class="field">
            <label for="cookies">Cookies 内容</label>
            <textarea id="cookies" placeholder='{"LV_PC_SESSION":"replace-me"}'></textarea>
          </div>
          <div class="actions">
            <button id="upload-cookies-btn" class="primary" type="button">上传 Cookies</button>
            <button id="example-cookies-btn" class="secondary" type="button">填入示例</button>
          </div>
        </div>
      </section>

      <section class="panel">
        <h2>账户状态</h2>
        <div class="stats">
          <div class="stat">
            <label>Cookies</label>
            <strong id="stat-cookies">-</strong>
          </div>
          <div class="stat">
            <label>总任务</label>
            <strong id="stat-total">0</strong>
          </div>
          <div class="stat">
            <label>运行中</label>
            <strong id="stat-running">0</strong>
          </div>
          <div class="stat">
            <label>已完成</label>
            <strong id="stat-success">0</strong>
          </div>
        </div>
      </section>

      <section class="panel">
        <h2>最近任务</h2>
        <p>只显示最近 20 分钟内更新过的最新 5 条任务。</p>
        <div id="jobs" class="jobs" style="margin-top:14px;">
          <div class="empty">暂无任务。</div>
        </div>
      </section>
    </main>

    <script>
      const PAGE = ${JSON.stringify(page)};
      const state = {
        authenticated: false,
        registrationOpen: false,
        user: null,
      };

      const el = {
        notice: document.getElementById("notice"),
        authPanel: document.getElementById("auth-panel"),
        userChip: document.getElementById("user-chip"),
        authUsername: document.getElementById("auth-username"),
        authPassword: document.getElementById("auth-password"),
        loginBtn: document.getElementById("login-btn"),
        registerBtn: document.getElementById("register-btn"),
        logoutBtn: document.getElementById("logout-btn"),
        urls: document.getElementById("urls"),
        createJobBtn: document.getElementById("create-job-btn"),
        refreshBtn: document.getElementById("refresh-btn"),
        cookies: document.getElementById("cookies"),
        uploadCookiesBtn: document.getElementById("upload-cookies-btn"),
        exampleCookiesBtn: document.getElementById("example-cookies-btn"),
        statCookies: document.getElementById("stat-cookies"),
        statTotal: document.getElementById("stat-total"),
        statRunning: document.getElementById("stat-running"),
        statSuccess: document.getElementById("stat-success"),
        jobs: document.getElementById("jobs"),
      };

      let pollingHandle = null;

      function setNotice(message, type) {
        if (!el.notice) return;
        el.notice.textContent = message;
        el.notice.className = "notice " + (type || "ok");
        el.notice.classList.remove("hidden");
      }

      function clearNotice() {
        if (!el.notice) return;
        el.notice.textContent = "";
        el.notice.classList.add("hidden");
      }

      function setBusy(button, busy) {
        if (!button) return;
        button.disabled = busy;
      }

      function escapeHTML(value) {
        return String(value)
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;");
      }

      function formatTime(value) {
        if (!value) return "未开始";
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
      }

      function formatStage(stage) {
        switch (stage) {
          case "waiting_runner": return "等待远程 runner";
          case "preparing": return "准备环境";
          case "queued": return "排队中";
          case "resolving": return "解析回放";
          case "downloading": return "下载分片";
          case "converting": return "转换 MP4";
          case "completed": return "已完成";
          case "failed": return "失败";
          default: return stage || "未知";
        }
      }

      async function request(path, options) {
        const response = await fetch(path, {
          ...(options || {}),
          headers: {
            ...(options && options.headers ? options.headers : {}),
            ...(options && options.body ? { "Content-Type": "application/json" } : {}),
          },
        });
        const contentType = response.headers.get("content-type") || "";
        const payload = contentType.includes("application/json")
          ? await response.json()
          : await response.text();

        if (!response.ok) {
          const message = typeof payload === "string"
            ? payload
            : (payload.error || payload.message || ("Request failed: " + response.status));
          throw new Error(message);
        }
        return payload;
      }

      function parseCookiesInput(raw) {
        const input = (raw || "").trim();
        if (!input) throw new Error("先粘贴 cookies 内容。");

        if (input.startsWith("{")) {
          const parsed = JSON.parse(input);
          if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
          throw new Error("JSON 对象格式不对。");
        }

        if (input.startsWith("[")) {
          const parsed = JSON.parse(input);
          if (!Array.isArray(parsed)) throw new Error("JSON 数组格式不对。");
          return parsed.reduce((result, item) => {
            if (!item || typeof item !== "object") return result;
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
          if (!chunk) return;
          const index = chunk.indexOf("=");
          if (index === -1) return;
          const name = chunk.slice(0, index).trim();
          const value = chunk.slice(index + 1).trim();
          if (name) cookieMap[name] = value;
        });
        if (Object.keys(cookieMap).length === 0) {
          throw new Error("没解析出任何 cookie 键值对。");
        }
        return cookieMap;
      }

      function renderAuthState() {
        if (state.authenticated && state.user) {
          el.userChip.textContent = "已登录: " + state.user.username;
          el.logoutBtn.classList.remove("hidden");
          el.loginBtn.classList.add("hidden");
          el.registerBtn.classList.add("hidden");
          return;
        }
        el.userChip.textContent = "未登录";
        el.logoutBtn.classList.add("hidden");
        el.loginBtn.classList.remove("hidden");
        if (state.registrationOpen) {
          el.registerBtn.classList.remove("hidden");
        } else {
          el.registerBtn.classList.add("hidden");
        }
      }

      function renderJobs(jobs) {
        if (!Array.isArray(jobs) || jobs.length === 0) {
          el.jobs.innerHTML = '<div class="empty">最近 20 分钟内没有任务。</div>';
          return;
        }
        el.jobs.innerHTML = jobs.map((job) => {
          const files = Array.isArray(job.files) ? job.files : [];
          const errors = Array.isArray(job.errors) ? job.errors : [];
          const progress = Math.max(0, Math.min(100, Number(job.progress_percent || 0)));
          const title = job.current_title || (Array.isArray(job.titles) && job.titles[0]) || "下载任务";
          return [
            '<section class="job">',
            '<div class="job-top">',
            '<div><div class="job-id">' + escapeHTML(job.id) + '</div><h3 class="job-title">' + escapeHTML(title) + '</h3></div>',
            '<strong>' + escapeHTML(job.status || "unknown") + '</strong>',
            '</div>',
            '<div class="job-meta">' + escapeHTML(formatStage(job.stage)) + " | " + escapeHTML(progress.toFixed(1)) + '%</div>',
            '<div class="progress-track"><div class="progress-fill" style="width:' + escapeHTML(progress.toFixed(1)) + '%"></div></div>',
            '<div class="job-meta">创建: ' + escapeHTML(formatTime(job.created_at)) + '</div>',
            Number(job.total_parts || 0) > 0 ? '<div class="job-meta">分片: ' + escapeHTML(String(job.completed_parts || 0)) + ' / ' + escapeHTML(String(job.total_parts || 0)) + '</div>' : '',
            files.length ? '<div class="job-files">' + files.map((file) => '<div><a href="' + escapeHTML(file.download_url || "#") + '" target="_blank" rel="noreferrer">' + escapeHTML(file.name) + '</a></div>').join("") + '</div>' : '',
            errors.length ? '<div class="job-errors">' + errors.map(escapeHTML).join("<br/>") + '</div>' : '',
            '</section>',
          ].join("");
        }).join("");
      }

      function decodeImportPayload() {
        const hash = window.location.hash || "";
        if (!hash.startsWith("#import=")) return;
        try {
          const encoded = hash.slice("#import=".length);
          const decoded = decodeURIComponent(escape(atob(encoded)));
          const payload = JSON.parse(decoded);

          if (payload.url && el.urls) {
            el.urls.value = payload.url + (el.urls.value ? "\\n" + el.urls.value : "");
          }
          if (payload.cookies && el.cookies) {
            el.cookies.value = JSON.stringify(payload.cookies, null, 2);
          } else if (payload.cookie_header && el.cookies) {
            el.cookies.value = payload.cookie_header;
          }

          setNotice("已导入 Tampermonkey 的链接和可见 Cookie。", "ok");
          history.replaceState(null, "", window.location.pathname);
        } catch {
          setNotice("Tampermonkey 导入失败，请手动粘贴。", "error");
        }
      }

      async function refreshAuth() {
        const payload = await request("/api/auth/me");
        state.authenticated = Boolean(payload.authenticated);
        state.registrationOpen = Boolean(payload.registration_open);
        state.user = payload.user || null;
        renderAuthState();
        return payload;
      }

      async function refreshStatusAndJobs() {
        if (!state.authenticated) {
          el.statCookies.textContent = "-";
          el.statTotal.textContent = "0";
          el.statRunning.textContent = "0";
          el.statSuccess.textContent = "0";
          renderJobs([]);
          return;
        }

        const [status, jobsPayload] = await Promise.all([
          request("/api/status"),
          request("/api/jobs"),
        ]);

        el.statCookies.textContent = status.cookies_ready ? "已就绪" : "未准备";
        el.statTotal.textContent = String(status.total_jobs || 0);
        el.statRunning.textContent = String(status.running_jobs || 0);
        el.statSuccess.textContent = String(status.succeeded_jobs || 0);
        renderJobs(jobsPayload.jobs || []);
      }

      async function login() {
        const username = (el.authUsername.value || "").trim();
        const password = (el.authPassword.value || "").trim();
        await request("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ username, password }),
        });
        await refreshAuth();
        await refreshStatusAndJobs();
        clearNotice();
      }

      async function registerFirstUser() {
        const username = (el.authUsername.value || "").trim();
        const password = (el.authPassword.value || "").trim();
        await request("/api/auth/register", {
          method: "POST",
          body: JSON.stringify({ username, password }),
        });
        await refreshAuth();
        await refreshStatusAndJobs();
        setNotice("首个账号已创建并登录。", "ok");
      }

      async function logout() {
        await request("/api/auth/logout", { method: "POST" });
        await refreshAuth();
        await refreshStatusAndJobs();
      }

      async function createJob() {
        if (!state.authenticated) throw new Error("请先登录。");
        const urls = (el.urls.value || "")
          .split("\\n")
          .map((item) => item.trim())
          .filter(Boolean);
        if (urls.length === 0) throw new Error("先填至少一个回放链接。");

        const body = {
          thread: 100,
          create_video_list: true,
          output_subdir: "",
        };
        if (urls.length === 1) {
          body.url = urls[0];
        } else {
          body.urls = urls;
        }

        const payload = await request("/api/jobs", {
          method: "POST",
          body: JSON.stringify(body),
        });
        setNotice("任务已创建: " + payload.id, "ok");
        await refreshStatusAndJobs();
      }

      async function uploadCookies() {
        if (!state.authenticated) throw new Error("请先登录。");
        const parsed = parseCookiesInput(el.cookies.value);
        const payload = await request("/api/cookies", {
          method: "POST",
          body: JSON.stringify({ cookies: parsed }),
        });
        setNotice(payload.message || "Cookies 已上传。", "ok");
        await refreshStatusAndJobs();
      }

      el.loginBtn.addEventListener("click", async () => {
        setBusy(el.loginBtn, true);
        try {
          await login();
        } catch (error) {
          setNotice(error.message, "error");
        } finally {
          setBusy(el.loginBtn, false);
        }
      });

      el.registerBtn.addEventListener("click", async () => {
        setBusy(el.registerBtn, true);
        try {
          await registerFirstUser();
        } catch (error) {
          setNotice(error.message, "error");
        } finally {
          setBusy(el.registerBtn, false);
        }
      });

      el.logoutBtn.addEventListener("click", async () => {
        setBusy(el.logoutBtn, true);
        try {
          await logout();
          setNotice("已退出登录。", "ok");
        } catch (error) {
          setNotice(error.message, "error");
        } finally {
          setBusy(el.logoutBtn, false);
        }
      });

      if (el.createJobBtn) {
        el.createJobBtn.addEventListener("click", async () => {
          setBusy(el.createJobBtn, true);
          try {
            await createJob();
          } catch (error) {
            setNotice(error.message, "error");
          } finally {
            setBusy(el.createJobBtn, false);
          }
        });
      }

      if (el.refreshBtn) {
        el.refreshBtn.addEventListener("click", async () => {
          try {
            await refreshStatusAndJobs();
          } catch (error) {
            setNotice(error.message, "error");
          }
        });
      }

      if (el.uploadCookiesBtn) {
        el.uploadCookiesBtn.addEventListener("click", async () => {
          setBusy(el.uploadCookiesBtn, true);
          try {
            await uploadCookies();
          } catch (error) {
            setNotice(error.message, "error");
          } finally {
            setBusy(el.uploadCookiesBtn, false);
          }
        });
      }

      if (el.exampleCookiesBtn) {
        el.exampleCookiesBtn.addEventListener("click", () => {
          if (!el.cookies) return;
          el.cookies.value = JSON.stringify({
            LV_PC_SESSION: "replace-me",
            csrfToken: "optional",
          }, null, 2);
        });
      }

      decodeImportPayload();

      refreshAuth()
        .then(refreshStatusAndJobs)
        .catch((error) => setNotice(error.message, "error"));

      if (pollingHandle) clearInterval(pollingHandle);
      pollingHandle = setInterval(() => {
        refreshAuth()
          .then(refreshStatusAndJobs)
          .catch(() => {});
      }, 5000);
    </script>
  </body>
</html>`;
}
