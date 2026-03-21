type AppPage = "home" | "settings";

function renderHomeContent(): string {
  return `
      <section class="card">
        <h2>下载</h2>
        <p class="muted">粘贴回放链接，直接创建任务。</p>
        <div class="field">
          <label for="urls">回放链接</label>
          <textarea id="urls" placeholder="每行一个钉钉回放链接"></textarea>
        </div>
        <div class="actions">
          <button id="create-job-btn" class="primary" type="button">开始下载</button>
          <button id="refresh-btn" type="button">刷新</button>
        </div>
      </section>`;
}

function renderSettingsContent(installURL: string): string {
  return `
      <section class="card">
        <h2>二维码登录</h2>
        <p class="muted">点击开始后，Action 会自动生成二维码；前端直接显示；扫码成功后 Cookies 会自动写回 Worker。</p>
        <div class="actions">
          <button id="start-login-workflow-btn" class="primary" type="button">启动二维码登录</button>
        </div>
        <div id="login-box" class="login-box hidden">
          <div id="login-status" class="login-status">等待开始</div>
          <img id="login-qr-image" class="qr-image hidden" alt="登录二维码" />
          <div id="login-hint" class="muted small">用户只需要点击开始并扫码。</div>
        </div>
        <p class="muted small" style="margin-top:12px;">如需兜底，仍可用 <a href="${installURL}" target="_blank" rel="noreferrer">Tampermonkey</a> 或手动 Cookie 接口，但默认流程不需要。</p>
      </section>`;
}

export function renderApp(appOrigin: string, page: AppPage): string {
  const installURL = `${appOrigin.replace(/\/$/, "")}/tampermonkey/godingtalk-helper.user.js`;
  const isHome = page === "home";

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="data:," />
    <title>GoDingtalk</title>
    <style>
      :root {
        --bg: #f5f7fb;
        --card: #ffffff;
        --line: #e6ebf2;
        --text: #111827;
        --muted: #6b7280;
        --primary: #2563eb;
        --primary-dark: #1d4ed8;
        --danger: #dc2626;
        --ok: #16a34a;
        --shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
        --radius: 16px;
      }

      * { box-sizing: border-box; }
      html, body {
        margin: 0;
        min-height: 100%;
        background: var(--bg);
        color: var(--text);
        font-family: Inter, "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
      }

      body { padding: 24px; }
      a { color: inherit; }
      .wrap { max-width: 960px; margin: 0 auto; display: grid; gap: 16px; }

      .topbar, .card, .metric, .job {
        background: var(--card);
        border: 1px solid var(--line);
        border-radius: var(--radius);
        box-shadow: var(--shadow);
      }

      .topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        padding: 20px;
      }

      .title h1 {
        margin: 0;
        font-size: 28px;
      }

      .title p, .muted {
        margin: 6px 0 0;
        color: var(--muted);
      }

      .nav {
        display: flex;
        gap: 8px;
      }

      .nav a {
        padding: 10px 14px;
        border-radius: 999px;
        text-decoration: none;
        color: var(--muted);
        background: #f3f4f6;
        font-weight: 600;
      }

      .nav a.active {
        color: #fff;
        background: var(--primary);
      }

      .notice {
        padding: 12px 14px;
        border-radius: 12px;
        font-size: 14px;
      }

      .notice.ok {
        background: #ecfdf5;
        color: var(--ok);
        border: 1px solid #bbf7d0;
      }

      .notice.error {
        background: #fef2f2;
        color: var(--danger);
        border: 1px solid #fecaca;
      }

      .card { padding: 20px; }
      .card h2 { margin: 0; font-size: 20px; }

      .field { display: grid; gap: 8px; margin-top: 14px; }
      label { font-size: 14px; font-weight: 600; }

      input, textarea {
        width: 100%;
        border: 1px solid var(--line);
        border-radius: 12px;
        padding: 12px 14px;
        font: inherit;
        background: #fff;
        color: var(--text);
      }

      textarea {
        min-height: 160px;
        resize: vertical;
        line-height: 1.6;
      }

      input:focus, textarea:focus {
        outline: none;
        border-color: #93c5fd;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
      }

      .auth-grid, .stats {
        display: grid;
        gap: 12px;
      }

      .auth-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 14px; }

      button, .button-link {
        border: 1px solid var(--line);
        background: #fff;
        color: var(--text);
        min-height: 42px;
        padding: 0 14px;
        border-radius: 10px;
        font: inherit;
        font-weight: 600;
        text-decoration: none;
        cursor: pointer;
      }

      button.primary, .button-link.primary {
        background: var(--primary);
        border-color: var(--primary);
        color: #fff;
      }

      button.primary:hover, .button-link.primary:hover { background: var(--primary-dark); }
      button:disabled { opacity: 0.7; cursor: wait; }

      .stats { grid-template-columns: repeat(4, minmax(0, 1fr)); }

      .metric {
        padding: 16px;
      }

      .metric span {
        display: block;
        color: var(--muted);
        font-size: 13px;
      }

      .metric strong {
        display: block;
        margin-top: 8px;
        font-size: 26px;
      }

      .jobs { display: grid; gap: 12px; }

      .job {
        padding: 16px;
      }

      .job-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 12px;
      }

      .job-id {
        font-size: 12px;
        color: var(--muted);
      }

      .job-title {
        margin: 6px 0 0;
        font-size: 18px;
      }

      .status {
        padding: 4px 10px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 700;
        background: #eff6ff;
        color: var(--primary);
      }

      .status.succeeded { background: #ecfdf5; color: var(--ok); }
      .status.failed { background: #fef2f2; color: var(--danger); }
      .status.queued { background: #fff7ed; color: #c2410c; }

      .job-meta, .job-errors {
        margin-top: 8px;
        color: var(--muted);
        line-height: 1.6;
        font-size: 14px;
      }

      .job-errors { color: var(--danger); }

      .progress {
        height: 8px;
        margin-top: 10px;
        border-radius: 999px;
        background: #eef2f7;
        overflow: hidden;
      }

      .progress > div {
        height: 100%;
        background: var(--primary);
      }

      .files {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 10px;
      }

      .files a {
        padding: 6px 10px;
        border-radius: 999px;
        background: #eff6ff;
        color: var(--primary);
        text-decoration: none;
        font-weight: 600;
      }

      .empty {
        padding: 14px;
        border-radius: 12px;
        border: 1px dashed var(--line);
        color: var(--muted);
        background: #fafafa;
      }

      .login-box {
        margin-top: 14px;
        padding: 14px;
        border-radius: 12px;
        background: #f8fafc;
        border: 1px solid var(--line);
      }

      .login-status {
        font-weight: 600;
      }

      .qr-image {
        display: block;
        width: 280px;
        max-width: 100%;
        margin-top: 12px;
        border-radius: 12px;
        border: 1px solid var(--line);
        background: #fff;
      }

      .small { font-size: 13px; }
      .hidden { display: none !important; }

      @media (max-width: 760px) {
        body { padding: 14px; }
        .topbar, .job-top { flex-direction: column; align-items: flex-start; }
        .auth-grid, .stats { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>
    <main class="wrap">
      <section class="topbar">
        <div class="title">
          <h1>GoDingtalk</h1>
          <p>${isHome ? "只保留下载和结果。" : "只保留登录和 Cookies。"}</p>
        </div>
        <nav class="nav">
          <a href="/" class="${isHome ? "active" : ""}">下载</a>
          <a href="/settings" class="${isHome ? "" : "active"}">设置</a>
        </nav>
      </section>

      <div id="notice" class="notice ok hidden"></div>

      <section class="card">
        <h2>账号</h2>
        <p id="user-chip" class="muted">未登录</p>
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
          <button id="register-btn" type="button">注册</button>
          <button id="logout-btn" type="button" class="hidden">退出登录</button>
        </div>
      </section>

      ${isHome ? renderHomeContent() : renderSettingsContent(installURL)}

      <section class="card">
        <h2>概览</h2>
        <div class="stats" style="margin-top:14px;">
          <div class="metric">
            <span>Cookies</span>
            <strong id="stat-cookies">-</strong>
          </div>
          <div class="metric">
            <span>总任务</span>
            <strong id="stat-total">0</strong>
          </div>
          <div class="metric">
            <span>运行中</span>
            <strong id="stat-running">0</strong>
          </div>
          <div class="metric">
            <span>已完成</span>
            <strong id="stat-success">0</strong>
          </div>
        </div>
      </section>

      <section class="card">
        <h2>最近任务</h2>
        <div id="jobs" class="jobs" style="margin-top:14px;">
          <div class="empty">暂无任务</div>
        </div>
      </section>
    </main>

    <script>
      const PAGE = ${JSON.stringify(page)};
      const state = {
        authenticated: false,
        registrationOpen: false,
        user: null,
        loginSessionId: "",
        lastLoginSessionStatus: "",
      };

      const el = {
        notice: document.getElementById("notice"),
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
        startLoginWorkflowBtn: document.getElementById("start-login-workflow-btn"),
        loginBox: document.getElementById("login-box"),
        loginStatus: document.getElementById("login-status"),
        loginQRImage: document.getElementById("login-qr-image"),
        loginHint: document.getElementById("login-hint"),
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
        if (!value) return "-";
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
      }

      function formatStage(stage) {
        switch (stage) {
          case "waiting_runner": return "等待 runner";
          case "preparing": return "准备中";
          case "queued": return "排队中";
          case "resolving": return "解析中";
          case "downloading": return "下载中";
          case "converting": return "转码中";
          case "completed": return "已完成";
          case "failed": return "失败";
          default: return stage || "-";
        }
      }

      function qrImageURL(value) {
        if (!value) return "";
        return "https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=" + encodeURIComponent(value);
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
            if (typeof name === "string" && typeof value === "string") result[name] = value;
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
        if (Object.keys(cookieMap).length === 0) throw new Error("没解析出任何 cookie。");
        return cookieMap;
      }

      function renderAuthState() {
        if (state.authenticated && state.user) {
          el.userChip.textContent = "已登录：" + state.user.username + (state.user.is_sudo ? " (sudo)" : "");
          el.loginBtn.classList.add("hidden");
          el.registerBtn.classList.add("hidden");
          el.logoutBtn.classList.remove("hidden");
          if (el.startLoginWorkflowBtn) el.startLoginWorkflowBtn.disabled = false;
          return;
        }

        el.userChip.textContent = "未登录";
        el.loginBtn.classList.remove("hidden");
        el.logoutBtn.classList.add("hidden");
        if (state.registrationOpen) {
          el.registerBtn.classList.remove("hidden");
        } else {
          el.registerBtn.classList.add("hidden");
        }
        if (el.startLoginWorkflowBtn) el.startLoginWorkflowBtn.disabled = true;
      }

      function renderJobs(jobs) {
        if (!Array.isArray(jobs) || jobs.length === 0) {
          el.jobs.innerHTML = '<div class="empty">暂无任务</div>';
          return;
        }

        el.jobs.innerHTML = jobs.map((job) => {
          const title = job.current_title || (Array.isArray(job.titles) && job.titles[0]) || "下载任务";
          const progress = Math.max(0, Math.min(100, Number(job.progress_percent || 0)));
          const files = Array.isArray(job.files) ? job.files : [];
          const errors = Array.isArray(job.errors) ? job.errors : [];
          return [
            '<section class="job">',
            '<div class="job-top">',
            '<div><div class="job-id">' + escapeHTML(job.id) + '</div><div class="job-title">' + escapeHTML(title) + '</div></div>',
            '<span class="status ' + escapeHTML(String(job.status || '').toLowerCase()) + '">' + escapeHTML(job.status || '-') + '</span>',
            '</div>',
            '<div class="job-meta">阶段：' + escapeHTML(formatStage(job.stage)) + ' · 创建时间：' + escapeHTML(formatTime(job.created_at)) + '</div>',
            '<div class="progress"><div style="width:' + escapeHTML(progress.toFixed(1)) + '%"></div></div>',
            files.length ? '<div class="files">' + files.map((file) => '<a href="' + escapeHTML(file.download_url || '#') + '" target="_blank" rel="noreferrer">' + escapeHTML(file.name) + '</a>').join('') + '</div>' : '',
            errors.length ? '<div class="job-errors">' + errors.map(escapeHTML).join('<br/>') + '</div>' : '',
            '</section>'
          ].join('');
        }).join('');
      }

      function renderLoginSession(payload) {
        if (!el.loginBox || !el.loginStatus || !el.loginHint || !el.loginQRImage) return;
        const session = payload && payload.login_session ? payload.login_session : null;
        if (!session) {
          el.loginBox.classList.add("hidden");
          el.loginQRImage.classList.add("hidden");
          return;
        }

        state.loginSessionId = session.id || state.loginSessionId;
        state.lastLoginSessionStatus = session.status || "";
        el.loginBox.classList.remove("hidden");

        if (session.status === "pending") {
          el.loginStatus.textContent = "已启动，等待二维码...";
          el.loginHint.textContent = "Action 正在识别二维码。";
          el.loginQRImage.classList.add("hidden");
        } else if (session.status === "qr_ready") {
          el.loginStatus.textContent = "请扫码登录";
          el.loginHint.textContent = "二维码来自 Action 返回的 URL，前端已转成 PNG。";
          el.loginQRImage.src = qrImageURL(session.qr_url || "");
          el.loginQRImage.classList.remove("hidden");
        } else if (session.status === "completed") {
          el.loginStatus.textContent = "登录完成";
          el.loginHint.textContent = "Cookies 已直接同步到 Worker。";
          if (session.qr_url) {
            el.loginQRImage.src = qrImageURL(session.qr_url);
            el.loginQRImage.classList.remove("hidden");
          }
        } else {
          el.loginStatus.textContent = "登录失败";
          el.loginHint.textContent = session.error_message || "请重试。";
          el.loginQRImage.classList.add("hidden");
        }
      }

      function decodeImportPayload() {
        const hash = window.location.hash || "";
        if (!hash.startsWith("#import=")) return;
        try {
          const encoded = hash.slice("#import=".length);
          const decoded = decodeURIComponent(escape(atob(encoded)));
          const payload = JSON.parse(decoded);
          if (payload.url && el.urls) el.urls.value = payload.url + (el.urls.value ? "\\n" + el.urls.value : "");
          if (payload.cookies && el.cookies) {
            el.cookies.value = JSON.stringify(payload.cookies, null, 2);
          } else if (payload.cookie_header && el.cookies) {
            el.cookies.value = payload.cookie_header;
          }
          setNotice("已导入链接和 Cookie。", "ok");
          history.replaceState(null, "", window.location.pathname);
        } catch {
          setNotice("导入失败，请手动粘贴。", "error");
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
        el.statRunning.textContent = String((status.running_jobs || 0) + (status.queued_jobs || 0));
        el.statSuccess.textContent = String(status.succeeded_jobs || 0);
        renderJobs(jobsPayload.jobs || []);
      }

      async function refreshLoginSession() {
        if (!state.authenticated || (!el.loginBox && !state.loginSessionId)) return;
        const suffix = state.loginSessionId ? ("?id=" + encodeURIComponent(state.loginSessionId)) : "";
        const payload = await request("/api/login-workflow" + suffix);
        renderLoginSession(payload);
      }

      async function login() {
        await request("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({
            username: (el.authUsername.value || "").trim(),
            password: (el.authPassword.value || "").trim(),
          }),
        });
        await refreshAuth();
        await refreshStatusAndJobs();
        if (PAGE === "settings") await refreshLoginSession();
        clearNotice();
      }

      async function registerUser() {
        await request("/api/auth/register", {
          method: "POST",
          body: JSON.stringify({
            username: (el.authUsername.value || "").trim(),
            password: (el.authPassword.value || "").trim(),
          }),
        });
        await refreshAuth();
        await refreshStatusAndJobs();
        setNotice("注册成功。", "ok");
      }

      async function logout() {
        await request("/api/auth/logout", { method: "POST" });
        state.loginSessionId = "";
        state.lastLoginSessionStatus = "";
        await refreshAuth();
        await refreshStatusAndJobs();
        if (el.loginBox) el.loginBox.classList.add("hidden");
      }

      async function createJob() {
        if (!state.authenticated) throw new Error("请先登录。");
        const urls = (el.urls.value || "").split("\\n").map((item) => item.trim()).filter(Boolean);
        if (urls.length === 0) throw new Error("请先填链接。");
        const body = { thread: 100, create_video_list: true, output_subdir: "" };
        if (urls.length === 1) body.url = urls[0]; else body.urls = urls;
        const payload = await request("/api/jobs", { method: "POST", body: JSON.stringify(body) });
        setNotice("任务已创建：" + payload.id, "ok");
        await refreshStatusAndJobs();
      }

      async function uploadCookies() {
        if (!state.authenticated) throw new Error("请先登录。");
        const payload = await request("/api/cookies", {
          method: "POST",
          body: JSON.stringify({ cookies: parseCookiesInput(el.cookies.value) }),
        });
        setNotice(payload.message || "Cookies 已上传。", "ok");
        await refreshStatusAndJobs();
      }

      async function startLoginWorkflow() {
        if (!state.authenticated) throw new Error("请先登录。");
        const payload = await request("/api/login-workflow", { method: "POST", body: JSON.stringify({}) });
        renderLoginSession(payload);
        setNotice(payload.message || "已启动二维码登录。", "ok");
      }

      el.loginBtn.addEventListener("click", async () => {
        setBusy(el.loginBtn, true);
        try { await login(); } catch (error) { setNotice(error.message, "error"); } finally { setBusy(el.loginBtn, false); }
      });

      el.registerBtn.addEventListener("click", async () => {
        setBusy(el.registerBtn, true);
        try { await registerUser(); } catch (error) { setNotice(error.message, "error"); } finally { setBusy(el.registerBtn, false); }
      });

      el.logoutBtn.addEventListener("click", async () => {
        setBusy(el.logoutBtn, true);
        try { await logout(); setNotice("已退出登录。", "ok"); } catch (error) { setNotice(error.message, "error"); } finally { setBusy(el.logoutBtn, false); }
      });

      if (el.createJobBtn) {
        el.createJobBtn.addEventListener("click", async () => {
          setBusy(el.createJobBtn, true);
          try { await createJob(); } catch (error) { setNotice(error.message, "error"); } finally { setBusy(el.createJobBtn, false); }
        });
      }

      if (el.refreshBtn) {
        el.refreshBtn.addEventListener("click", async () => {
          try {
            await refreshStatusAndJobs();
            if (PAGE === "settings") await refreshLoginSession();
          } catch (error) {
            setNotice(error.message, "error");
          }
        });
      }

      if (el.uploadCookiesBtn) {
        el.uploadCookiesBtn.addEventListener("click", async () => {
          setBusy(el.uploadCookiesBtn, true);
          try { await uploadCookies(); } catch (error) { setNotice(error.message, "error"); } finally { setBusy(el.uploadCookiesBtn, false); }
        });
      }

      if (el.startLoginWorkflowBtn) {
        el.startLoginWorkflowBtn.addEventListener("click", async () => {
          setBusy(el.startLoginWorkflowBtn, true);
          try { await startLoginWorkflow(); } catch (error) { setNotice(error.message, "error"); } finally { setBusy(el.startLoginWorkflowBtn, false); }
        });
      }

      if (el.exampleCookiesBtn) {
        el.exampleCookiesBtn.addEventListener("click", () => {
          if (!el.cookies) return;
          el.cookies.value = JSON.stringify({ LV_PC_SESSION: "replace-me" }, null, 2);
        });
      }

      decodeImportPayload();

      async function refreshAll() {
        await refreshAuth();
        await refreshStatusAndJobs();
        if (PAGE === "settings" || state.loginSessionId) {
          await refreshLoginSession();
        }
      }

      refreshAll().catch((error) => setNotice(error.message, "error"));

      if (pollingHandle) clearInterval(pollingHandle);
      pollingHandle = setInterval(() => {
        refreshAll().catch(() => {});
      }, 5000);
    </script>
  </body>
</html>`;
}
