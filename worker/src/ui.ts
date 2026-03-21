type AppPage = "download" | "login" | "settings" | "account" | "legal";

function renderNav(page: AppPage): string {
  const items: Array<{ key: AppPage; href: string; label: string }> = [
    { key: "download", href: "/download", label: "下载" },
    { key: "settings", href: "/settings", label: "二维码登录" },
    { key: "account", href: "/account", label: "账号" },
    { key: "legal", href: "/legal", label: "免责声明" },
    { key: "login", href: "/login", label: "登录" },
  ];

  return `<nav class="nav">${items.map((item) => `<a href="${item.href}" data-nav="${item.key}" class="${page === item.key ? "active" : ""}">${item.label}</a>`).join("")}</nav>`;
}

function renderDownloadPage(): string {
  return `
      <section class="card">
        <h2>创建下载任务</h2>
        <p class="muted">先确认已接受免责声明并准备好 Cookies，然后再提交链接。每行一个链接，会拆成多个独立任务。</p>
        <div id="legal-warning" class="notice error hidden"></div>
        <div class="field">
          <label for="urls">回放链接</label>
          <textarea id="urls" placeholder="每行一个钉钉回放链接"></textarea>
        </div>
        <div class="actions">
          <button id="create-job-btn" class="primary" type="button">开始下载</button>
          <button id="refresh-btn" type="button">刷新状态</button>
        </div>
      </section>

      <section class="card">
        <h2>概览</h2>
        <div class="stats" style="margin-top:14px;">
          <div class="metric"><span>Cookies</span><strong id="stat-cookies">-</strong></div>
          <div class="metric"><span>总任务</span><strong id="stat-total">0</strong></div>
          <div class="metric"><span>运行中</span><strong id="stat-running">0</strong></div>
          <div class="metric"><span>已完成</span><strong id="stat-success">0</strong></div>
        </div>
      </section>

      <section class="card">
        <h2>全部记录</h2>
        <p class="muted">这里会显示全部下载记录；成功任务会直接显示直播 MP4 下载链接。</p>
        <div id="jobs" class="jobs" style="margin-top:14px;"><div class="empty">暂无任务</div></div>
      </section>`;
}

function renderLoginPage(): string {
  return `
      <section class="hero">
        <div class="hero-copy">
          <div class="hero-kicker">GoDingtalk Private Console</div>
          <h2>更像正式产品首页的私有控制台</h2>
          <p class="muted">登录后即可创建回放下载任务、启动二维码登录，并由 GitHub Action 自动把 Cookies 回传到 Worker，无需手动上传。</p>
          <div class="actions" style="margin-top:18px;">
            <a class="button-link primary" href="/legal">先看免责声明</a>
            <a class="button-link" href="/download">查看下载页</a>
          </div>
          <div class="hero-badges">
            <span>自动回传 Cookies</span>
            <span>二维码约 1 分钟</span>
            <span>超 2GB 再清理</span>
          </div>
          <div class="feature-list">
            <div class="feature-item"><strong>自动二维码登录</strong><span>通常约 1 分钟出二维码，扫码后再约 1 分钟回传 Cookies。</span></div>
            <div class="feature-item"><strong>私有下载链路</strong><span>任务、Cookies 和下载结果按用户隔离。</span></div>
            <div class="feature-item"><strong>条件清理</strong><span>仅当 R2 总占用超过 2GB 时，系统才会清理已超过 24 小时的旧文件。</span></div>
          </div>
          <div class="mini-steps">
            <div class="mini-step"><strong>1</strong><span>登录账号</span></div>
            <div class="mini-step"><strong>2</strong><span>扫码获取 Cookies</span></div>
            <div class="mini-step"><strong>3</strong><span>提交链接开始下载</span></div>
          </div>
        </div>
        <div class="card auth-card" id="auth-card">
          <h2>登录 / 注册</h2>
          <p class="muted" id="auth-card-hint">登录后才能使用下载、二维码登录和账号管理功能。</p>
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
        </div>
      </section>`;
}

function renderSettingsPage(installURL: string): string {
  return `
      <section class="card">
        <h2>二维码登录</h2>
        <p class="muted">点击后会启动 Action。通常约 <strong>1 分钟</strong> 出二维码；扫码后通常约 <strong>1 分钟</strong> 内自动回传 Cookies。</p>
        <div id="login-legal-warning" class="notice error hidden"></div>
        <div class="notice warn">如果当前 Cookies 仍然有效，请不要重复扫码登录，以免触发平台风控。</div>
        <div class="actions">
          <button id="start-login-workflow-btn" class="primary" type="button">启动二维码登录</button>
        </div>
        <div id="login-box" class="login-box hidden">
          <div id="login-status" class="login-status">等待开始</div>
          <img id="login-qr-image" class="qr-image hidden" alt="登录二维码" />
          <div id="login-hint" class="muted small">点击按钮后请耐心等待，大多数情况下约 1 分钟内出现二维码。</div>
        </div>
        <div class="notice warn" style="margin-top:14px;">不提供手动输入入口。请直接使用二维码登录流程；若账号被风控、限制、冻结或封禁，系统不承担责任。</div>
      </section>`;
}

function renderAccountPage(): string {
  return `
      <section class="card">
        <h2>账号信息</h2>
        <p id="account-summary" class="muted">未登录</p>
      </section>

      <section class="card">
        <h2>修改密码</h2>
        <p class="muted">请输入当前密码和新密码。新密码至少 6 位。</p>
        <div class="field">
          <label for="current-password">当前密码</label>
          <input id="current-password" type="password" placeholder="当前密码" />
        </div>
        <div class="field">
          <label for="new-password">新密码</label>
          <input id="new-password" type="password" placeholder="至少 6 位" />
        </div>
        <div class="field">
          <label for="confirm-new-password">确认新密码</label>
          <input id="confirm-new-password" type="password" placeholder="再次输入新密码" />
        </div>
        <div class="actions">
          <button id="change-password-btn" class="primary" type="button">修改密码</button>
        </div>
      </section>

      <section id="admin-panel" class="card hidden">
        <h2>用户管理</h2>
        <p class="muted">仅 sudo 用户可见。这里可以查看所有用户的注册、免责声明、Cookies 和任务状态。</p>
        <div id="admin-users" class="admin-users" style="margin-top:14px;"><div class="empty">暂无数据</div></div>
        <div class="admin-legal-editor">
          <h3>免责内容管理</h3>
          <p class="muted">sudo 可在这里修改免责文本。保存后会自动生成新版本，所有用户需要重新接受一次。</p>
          <div class="field">
            <label for="admin-legal-text">免责文本</label>
            <textarea id="admin-legal-text" class="legal-editor" placeholder="输入新的免责条款"></textarea>
          </div>
          <div class="actions">
            <button id="save-legal-btn" class="primary" type="button">保存免责</button>
          </div>
          <p id="admin-legal-meta" class="muted small"></p>
        </div>
      </section>`;
}

function renderLegalPage(): string {
  return `
      <section class="card legal-card">
        <h2>法律免责声明与用户承诺</h2>
        <p class="muted">你必须先完整阅读并接受以下条款，系统才允许发起下载任务或二维码登录。</p>
        <div id="legal-state" class="notice ok hidden"></div>
        <div id="legal-version-meta" class="muted small"></div>
        <div id="legal-text" class="legal-text"><div class="empty">正在加载免责内容...</div></div>
        <label class="checkbox-row">
          <input id="legal-confirm-check" type="checkbox" />
          <span>我确认：我已完整阅读以上全部条款，理解风险，并自愿承担全部责任。</span>
        </label>
        <div class="notice warn">重要提示：一旦点击“我已阅读并接受”，系统将记录你的接受时间和版本。该确认在系统内视为不可撤销。</div>
        <div class="actions">
          <button id="accept-legal-btn" class="primary" type="button" disabled>我已阅读并接受</button>
        </div>
      </section>`;
}

function renderPageBody(page: AppPage, installURL: string): string {
  switch (page) {
    case "download":
      return renderDownloadPage();
    case "login":
      return renderLoginPage();
    case "settings":
      return renderSettingsPage(installURL);
    case "account":
      return renderAccountPage();
    case "legal":
      return renderLegalPage();
    default:
      return renderDownloadPage();
  }
}

export function renderApp(appOrigin: string, page: AppPage): string {
  const installURL = `${appOrigin.replace(/\/$/, "")}/tampermonkey/godingtalk-helper.user.js`;

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
        --warning: #b45309;
        --shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
        --radius: 16px;
      }
      * { box-sizing: border-box; }
      html, body { margin: 0; min-height: 100%; background: var(--bg); color: var(--text); font-family: Inter, "PingFang SC", "Microsoft YaHei", system-ui, sans-serif; }
      body { padding: 24px; }
      a { color: inherit; }
      .wrap { max-width: 1080px; margin: 0 auto; display: grid; gap: 16px; }
      .topbar, .card, .metric, .job { background: var(--card); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); }
      .hero { display: grid; grid-template-columns: 1.2fr 0.9fr; gap: 16px; align-items: stretch; }
      .hero-copy { padding: 28px; border: 1px solid var(--line); border-radius: var(--radius); background: linear-gradient(135deg, #eef4ff 0%, #ffffff 100%); box-shadow: var(--shadow); }
      .hero-kicker { color: var(--primary); font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
      .hero-copy h2 { margin: 12px 0 0; font-size: 34px; line-height: 1.2; }
      .hero-badges { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px; }
      .hero-badges span { padding: 8px 12px; border-radius: 999px; background: #fff; border: 1px solid var(--line); color: var(--primary); font-size: 13px; font-weight: 700; }
      .feature-list { display: grid; gap: 12px; margin-top: 18px; }
      .feature-item { padding: 14px; border: 1px solid var(--line); border-radius: 14px; background: rgba(255,255,255,0.85); }
      .feature-item strong { display: block; }
      .feature-item span { display: block; margin-top: 6px; color: var(--muted); line-height: 1.6; }
      .mini-steps { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-top: 18px; }
      .mini-step { padding: 14px; border-radius: 14px; background: #0f172a; color: #fff; }
      .mini-step strong { display: inline-flex; width: 28px; height: 28px; align-items: center; justify-content: center; border-radius: 999px; background: rgba(255,255,255,0.14); margin-bottom: 10px; }
      .mini-step span { display: block; color: rgba(255,255,255,0.9); }
      .auth-card { align-self: stretch; }
      .topbar { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 20px; }
      .title h1 { margin: 0; font-size: 28px; }
      .title p, .muted { margin: 6px 0 0; color: var(--muted); }
      .nav { display: flex; flex-wrap: wrap; gap: 8px; }
      .nav a { padding: 10px 14px; border-radius: 999px; text-decoration: none; color: var(--muted); background: #f3f4f6; font-weight: 600; }
      .nav a.active { color: #fff; background: var(--primary); }
      .notice { padding: 12px 14px; border-radius: 12px; font-size: 14px; }
      .notice.ok { background: #ecfdf5; color: var(--ok); border: 1px solid #bbf7d0; }
      .notice.error { background: #fef2f2; color: var(--danger); border: 1px solid #fecaca; }
      .notice.warn { background: #fff7ed; color: var(--warning); border: 1px solid #fed7aa; }
      .card { padding: 20px; }
      .card h2 { margin: 0; font-size: 20px; }
      .field { display: grid; gap: 8px; margin-top: 14px; }
      label { font-size: 14px; font-weight: 600; }
      input, textarea { width: 100%; border: 1px solid var(--line); border-radius: 12px; padding: 12px 14px; font: inherit; background: #fff; color: var(--text); }
      textarea { min-height: 160px; resize: vertical; line-height: 1.6; }
      input:focus, textarea:focus { outline: none; border-color: #93c5fd; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12); }
      .auth-grid, .stats { display: grid; gap: 12px; }
      .auth-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 14px; }
      button, .button-link { border: 1px solid var(--line); background: #fff; color: var(--text); min-height: 42px; padding: 0 14px; border-radius: 10px; font: inherit; font-weight: 600; text-decoration: none; cursor: pointer; }
      button.primary, .button-link.primary { background: var(--primary); border-color: var(--primary); color: #fff; }
      button.primary:hover, .button-link.primary:hover { background: var(--primary-dark); }
      button:disabled { opacity: 0.7; cursor: wait; }
      .stats { grid-template-columns: repeat(4, minmax(0, 1fr)); }
      .metric { padding: 16px; }
      .metric span { display: block; color: var(--muted); font-size: 13px; }
      .metric strong { display: block; margin-top: 8px; font-size: 26px; }
      .jobs { display: grid; gap: 12px; }
      .job { padding: 16px; }
      .job-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
      .job-id { font-size: 12px; color: var(--muted); }
      .job-title { margin: 6px 0 0; font-size: 18px; }
      .status { padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; background: #eff6ff; color: var(--primary); }
      .status.succeeded { background: #ecfdf5; color: var(--ok); }
      .status.failed { background: #fef2f2; color: var(--danger); }
      .status.queued { background: #fff7ed; color: #c2410c; }
      .job-meta, .job-errors { margin-top: 8px; color: var(--muted); line-height: 1.6; font-size: 14px; }
      .job-errors { color: var(--danger); }
      .progress { height: 8px; margin-top: 10px; border-radius: 999px; background: #eef2f7; overflow: hidden; }
      .progress > div { height: 100%; background: var(--primary); }
      .files { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
      .files a { padding: 6px 10px; border-radius: 999px; background: #eff6ff; color: var(--primary); text-decoration: none; font-weight: 600; }
      .file-block { margin-top: 12px; }
      .file-title { color: var(--muted); font-size: 13px; font-weight: 700; margin-bottom: 8px; }
      .empty { padding: 14px; border-radius: 12px; border: 1px dashed var(--line); color: var(--muted); background: #fafafa; }
      .login-box { margin-top: 14px; padding: 14px; border-radius: 12px; background: #f8fafc; border: 1px solid var(--line); }
      .login-status { font-weight: 600; }
      .qr-image { display: block; width: 280px; max-width: 100%; margin-top: 12px; border-radius: 12px; border: 1px solid var(--line); background: #fff; }
      .legal-text { margin-top: 14px; display: grid; gap: 10px; line-height: 1.75; }
      .legal-text h3 { margin: 12px 0 0; font-size: 16px; }
      .legal-text p { margin: 0; color: var(--text); }
      .admin-users { display: grid; gap: 10px; }
      .admin-user { padding: 14px; border: 1px solid var(--line); border-radius: 12px; background: #fafcff; }
      .admin-user-top { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
      .admin-user-name { font-weight: 700; font-size: 16px; }
      .admin-user-meta { margin-top: 8px; color: var(--muted); line-height: 1.7; font-size: 14px; }
      .admin-legal-editor { margin-top: 18px; padding-top: 18px; border-top: 1px solid var(--line); }
      .legal-editor { min-height: 320px; }
      .legal-actions { margin-top: 16px; }
      .checkbox-row { display: flex; gap: 10px; align-items: flex-start; margin-top: 16px; line-height: 1.7; }
      .checkbox-row input { width: 18px; height: 18px; margin-top: 3px; }
      .small { font-size: 13px; }
      .hidden { display: none !important; }
      @media (max-width: 760px) {
        body { padding: 14px; }
        .topbar, .job-top, .hero { flex-direction: column; align-items: flex-start; }
        .hero { grid-template-columns: 1fr; }
        .mini-steps,
        .auth-grid, .stats { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>
    <main class="wrap">
      <section class="topbar">
        <div class="title">
          <h1>GoDingtalk</h1>
          <p id="user-chip">未登录</p>
        </div>
        ${renderNav(page)}
      </section>

      <div id="notice" class="notice ok hidden"></div>

      ${renderPageBody(page, installURL)}
    </main>

    <script>
      const PAGE = ${JSON.stringify(page)};
      const state = {
        authenticated: false,
        registrationOpen: false,
        legalAccepted: false,
        legalAcceptedAt: "",
        legalVersion: "",
        legalText: "",
        legalConfirmVersion: "",
        adminLegalDirty: false,
        user: null,
        loginSessionId: "",
        loginSessionStatus: "",
      };

      const el = {
        notice: document.getElementById("notice"),
        userChip: document.getElementById("user-chip"),
        authUsername: document.getElementById("auth-username"),
        authPassword: document.getElementById("auth-password"),
        authCardHint: document.getElementById("auth-card-hint"),
        loginBtn: document.getElementById("login-btn"),
        registerBtn: document.getElementById("register-btn"),
        logoutBtn: document.getElementById("logout-btn"),
        urls: document.getElementById("urls"),
        createJobBtn: document.getElementById("create-job-btn"),
        refreshBtn: document.getElementById("refresh-btn"),
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
        currentPassword: document.getElementById("current-password"),
        newPassword: document.getElementById("new-password"),
        confirmNewPassword: document.getElementById("confirm-new-password"),
        changePasswordBtn: document.getElementById("change-password-btn"),
        accountSummary: document.getElementById("account-summary"),
        acceptLegalBtn: document.getElementById("accept-legal-btn"),
        legalConfirmCheck: document.getElementById("legal-confirm-check"),
        legalState: document.getElementById("legal-state"),
        legalText: document.getElementById("legal-text"),
        legalVersionMeta: document.getElementById("legal-version-meta"),
        legalWarning: document.getElementById("legal-warning"),
        loginLegalWarning: document.getElementById("login-legal-warning"),
        adminPanel: document.getElementById("admin-panel"),
        adminUsers: document.getElementById("admin-users"),
        adminLegalText: document.getElementById("admin-legal-text"),
        saveLegalBtn: document.getElementById("save-legal-btn"),
        adminLegalMeta: document.getElementById("admin-legal-meta"),
        loginNavLink: document.querySelector('[data-nav="login"]'),
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
        return "https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=" + encodeURIComponent(value);
      }

      function renderLegalText(text) {
        if (!el.legalText) return;
        const source = String(text || "").trim();
        if (!source) {
          el.legalText.innerHTML = '<div class="empty">暂无免责内容</div>';
          return;
        }
        const blocks = source.split(/\\n\\s*\\n/g).map((block) => block.trim()).filter(Boolean);
        el.legalText.innerHTML = blocks.map((block) => {
          if (block.startsWith("## ")) {
            return "<h3>" + escapeHTML(block.slice(3).trim()) + "</h3>";
          }
          return "<p>" + escapeHTML(block).replaceAll("\\n", "<br/>") + "</p>";
        }).join("");
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
        const payload = contentType.includes("application/json") ? await response.json() : await response.text();
        if (!response.ok) {
          const message = typeof payload === "string" ? payload : (payload.error || payload.message || ("Request failed: " + response.status));
          throw new Error(message);
        }
        return payload;
      }

      function renderAuthState() {
        if (state.authenticated && state.user) {
          if (el.userChip) el.userChip.textContent = "已登录：" + state.user.username + (state.user.is_sudo ? " (sudo)" : "");
          if (el.loginBtn) el.loginBtn.classList.add("hidden");
          if (el.registerBtn) el.registerBtn.classList.add("hidden");
          if (el.logoutBtn) el.logoutBtn.classList.remove("hidden");
          if (el.authCardHint) el.authCardHint.textContent = "你已登录，可以直接去下载、二维码登录或账号页操作。";
          if (el.loginNavLink) el.loginNavLink.classList.add("hidden");
        } else {
          if (el.userChip) el.userChip.textContent = "未登录";
          if (el.loginBtn) el.loginBtn.classList.remove("hidden");
          if (el.logoutBtn) el.logoutBtn.classList.add("hidden");
          if (el.authCardHint) el.authCardHint.textContent = "登录后才能使用下载、二维码登录和账号管理功能。";
          if (el.loginNavLink) el.loginNavLink.classList.remove("hidden");
          if (el.registerBtn) {
            if (state.registrationOpen) el.registerBtn.classList.remove("hidden"); else el.registerBtn.classList.add("hidden");
          }
        }
        if (el.startLoginWorkflowBtn) {
          const busyLogin = state.loginSessionStatus === "pending" || state.loginSessionStatus === "qr_ready";
          el.startLoginWorkflowBtn.disabled = !state.authenticated || !state.legalAccepted || busyLogin;
        }
        renderLegalState();
        renderAccountState();
      }

      function renderLegalState() {
        const message = state.legalAccepted
          ? "已接受免责声明，版本：" + (state.legalVersion || "-") + "，时间：" + formatTime(state.legalAcceptedAt)
          : "未接受当前免责声明。接受后才可启动二维码登录和创建下载任务。";

        if (el.legalState) {
          el.legalState.textContent = message;
          el.legalState.className = "notice " + (state.legalAccepted ? "ok" : "warn");
          el.legalState.classList.remove("hidden");
        }
        if (el.legalWarning) {
          if (state.legalAccepted) {
            el.legalWarning.classList.add("hidden");
          } else {
            el.legalWarning.textContent = "你尚未接受免责声明。请先前往“免责声明”页面完成确认。";
            el.legalWarning.classList.remove("hidden");
          }
        }
        if (el.loginLegalWarning) {
          if (state.legalAccepted) {
            el.loginLegalWarning.classList.add("hidden");
          } else {
            el.loginLegalWarning.textContent = "请先到“免责声明”页面点击接受，再启动二维码登录。";
            el.loginLegalWarning.classList.remove("hidden");
          }
        }
        if (el.legalVersionMeta) {
          el.legalVersionMeta.textContent = state.legalVersion ? ("当前版本：" + state.legalVersion) : "";
        }
        if (el.legalConfirmCheck) {
          if (state.legalAccepted) {
            state.legalConfirmVersion = state.legalVersion || state.legalConfirmVersion;
            el.legalConfirmCheck.checked = true;
            el.legalConfirmCheck.disabled = true;
            el.legalConfirmCheck.closest("label")?.classList.add("hidden");
          } else {
            el.legalConfirmCheck.checked = state.legalConfirmVersion === state.legalVersion && Boolean(state.legalVersion);
            el.legalConfirmCheck.disabled = !state.authenticated;
            el.legalConfirmCheck.closest("label")?.classList.remove("hidden");
          }
        }
        if (el.acceptLegalBtn) {
          if (state.legalAccepted) {
            el.acceptLegalBtn.disabled = true;
            el.acceptLegalBtn.textContent = "当前版本已接受";
            el.acceptLegalBtn.classList.add("hidden");
          } else {
            el.acceptLegalBtn.classList.remove("hidden");
            el.acceptLegalBtn.textContent = state.authenticated ? "我已阅读并接受" : "请先登录";
            el.acceptLegalBtn.disabled = !state.authenticated || !el.legalConfirmCheck || state.legalConfirmVersion !== state.legalVersion;
          }
        }
      }

      function renderAccountState() {
        if (!el.accountSummary) return;
        if (!state.authenticated || !state.user) {
          el.accountSummary.textContent = "请先登录。";
          if (el.adminPanel) el.adminPanel.classList.add("hidden");
          return;
        }
        el.accountSummary.textContent = "当前用户：" + state.user.username + " · 免责声明：" + (state.legalAccepted ? "已接受" : "未接受");
        if (el.adminPanel) {
          if (state.user.is_sudo) el.adminPanel.classList.remove("hidden"); else el.adminPanel.classList.add("hidden");
        }
      }

      function renderAdminUsers(users) {
        if (!el.adminUsers) return;
        if (!Array.isArray(users) || users.length === 0) {
          el.adminUsers.innerHTML = '<div class="empty">暂无用户数据</div>';
          return;
        }
        el.adminUsers.innerHTML = users.map((user) => [
          '<section class="admin-user">',
          '<div class="admin-user-top">',
          '<div><div class="admin-user-name">' + escapeHTML(user.username) + '</div><div class="job-id">' + escapeHTML(user.id) + '</div></div>',
          '<span class="status ' + (user.is_sudo ? 'succeeded' : '') + '">' + (user.is_sudo ? 'sudo' : 'user') + '</span>',
          '</div>',
          '<div class="admin-user-meta">注册时间：' + escapeHTML(formatTime(user.created_at)) + '</div>',
          '<div class="admin-user-meta">免责声明：' + escapeHTML(user.legal_accepted ? ('已接受 · ' + formatTime(user.legal_accepted_at)) : '未接受') + '</div>',
          '<div class="admin-user-meta">Cookies：' + escapeHTML(user.cookies_ready ? '已就绪' : '未准备') + ' · 任务数：' + escapeHTML(String(user.total_jobs || 0)) + '</div>',
          '</section>',
        ].join('')).join('');
      }

      function renderAdminLegal(version, text, force) {
        if (el.adminLegalText && (!state.adminLegalDirty || force)) {
          el.adminLegalText.value = text || "";
        }
        if (el.adminLegalMeta) {
          el.adminLegalMeta.textContent = version ? ("当前免责版本：" + version + "；保存后会重置所有用户接受状态。") : "";
        }
      }

      function renderJobs(jobs) {
        if (!el.jobs) return;
        if (!Array.isArray(jobs) || jobs.length === 0) {
          el.jobs.innerHTML = '<div class="empty">暂无任务</div>';
          return;
        }
        el.jobs.innerHTML = jobs.map((job) => {
          const title = job.current_title || (Array.isArray(job.titles) && job.titles[0]) || "下载任务";
          const progress = Math.max(0, Math.min(100, Number(job.progress_percent || 0)));
          const files = Array.isArray(job.files) ? job.files : [];
          const mp4Files = files.filter((file) => String(file.name || "").toLowerCase().endsWith(".mp4"));
          const errors = Array.isArray(job.errors) ? job.errors : [];
          return [
            '<section class="job">',
            '<div class="job-top">',
            '<div><div class="job-id">' + escapeHTML(job.id) + '</div><div class="job-title">' + escapeHTML(title) + '</div></div>',
            '<span class="status ' + escapeHTML(String(job.status || '').toLowerCase()) + '">' + escapeHTML(job.status || '-') + '</span>',
            '</div>',
            '<div class="job-meta">阶段：' + escapeHTML(formatStage(job.stage)) + ' · 创建时间：' + escapeHTML(formatTime(job.created_at)) + '</div>',
            '<div class="progress"><div style="width:' + escapeHTML(progress.toFixed(1)) + '%"></div></div>',
            mp4Files.length ? '<div class="file-block"><div class="file-title">直播 MP4 下载链接</div><div class="files">' + mp4Files.map((file) => '<a href="' + escapeHTML(file.download_url || '#') + '" target="_blank" rel="noreferrer">' + escapeHTML(file.name) + '</a>').join('') + '</div></div>' : '',
            files.length ? '<div class="file-block"><div class="file-title">全部文件</div><div class="files">' + files.map((file) => '<a href="' + escapeHTML(file.download_url || '#') + '" target="_blank" rel="noreferrer">' + escapeHTML(file.name) + '</a>').join('') + '</div></div>' : '',
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
          state.loginSessionStatus = "";
          renderAuthState();
          return;
        }
        state.loginSessionId = session.id || state.loginSessionId;
        state.loginSessionStatus = session.status || "";
        el.loginBox.classList.remove("hidden");
        if (session.status === "pending") {
          el.loginStatus.textContent = "已启动，等待二维码";
          el.loginHint.textContent = "通常约 1 分钟内出现二维码，请保持页面开启。";
          el.loginQRImage.classList.add("hidden");
        } else if (session.status === "qr_ready") {
          el.loginStatus.textContent = "请扫码登录";
          el.loginHint.textContent = "二维码已就绪。扫码后通常约 1 分钟内自动回传 Cookies。";
          el.loginQRImage.src = qrImageURL(session.qr_url || "");
          el.loginQRImage.classList.remove("hidden");
        } else if (session.status === "completed") {
          el.loginStatus.textContent = "登录完成";
          el.loginHint.textContent = "Cookies 已自动回传到 Worker，现在可以回到下载页。";
          el.loginQRImage.classList.add("hidden");
        } else {
          el.loginStatus.textContent = "登录失败";
          el.loginHint.textContent = session.error_message || "请重试。";
          el.loginQRImage.classList.add("hidden");
        }
        renderAuthState();
      }

      function decodeImportPayload() {
        const hash = window.location.hash || "";
        if (!hash.startsWith("#import=")) return;
        try {
          const encoded = hash.slice("#import=".length);
          const decoded = decodeURIComponent(escape(atob(encoded)));
          const payload = JSON.parse(decoded);
          if (payload.url && el.urls) el.urls.value = payload.url + (el.urls.value ? "\\n" + el.urls.value : "");
          setNotice("已导入链接。", "ok");
          history.replaceState(null, "", window.location.pathname);
        } catch {
          setNotice("导入失败，请重试。", "error");
        }
      }

      async function refreshAuth() {
        const payload = await request("/api/auth/me");
        state.authenticated = Boolean(payload.authenticated);
        state.registrationOpen = Boolean(payload.registration_open);
        state.legalAccepted = Boolean(payload.legal_accepted);
        state.legalAcceptedAt = payload.legal_accepted_at || "";
        state.legalVersion = payload.legal_version || "";
        if (state.legalConfirmVersion && state.legalConfirmVersion !== state.legalVersion) {
          state.legalConfirmVersion = "";
        }
        state.user = payload.user || null;
        renderAuthState();
        return payload;
      }

      async function refreshLegalConfig() {
        const payload = await request("/api/legal-config");
        state.legalVersion = payload.version || state.legalVersion;
        state.legalText = payload.text || "";
        renderLegalText(state.legalText);
        renderLegalState();
      }

      async function refreshStatusAndJobs() {
        if (!state.authenticated) {
          if (el.statCookies) el.statCookies.textContent = "-";
          if (el.statTotal) el.statTotal.textContent = "0";
          if (el.statRunning) el.statRunning.textContent = "0";
          if (el.statSuccess) el.statSuccess.textContent = "0";
          renderJobs([]);
          return;
        }
        const [status, jobsPayload] = await Promise.all([request("/api/status"), request("/api/jobs")]);
        if (el.statCookies) el.statCookies.textContent = status.cookies_ready ? "已就绪" : "未准备";
        if (el.statTotal) el.statTotal.textContent = String(status.total_jobs || 0);
        if (el.statRunning) el.statRunning.textContent = String((status.running_jobs || 0) + (status.queued_jobs || 0));
        if (el.statSuccess) el.statSuccess.textContent = String(status.succeeded_jobs || 0);
        renderJobs(jobsPayload.jobs || []);
      }

      async function refreshLoginSession() {
        if (!state.authenticated || !el.loginBox) return;
        const suffix = state.loginSessionId ? ("?id=" + encodeURIComponent(state.loginSessionId)) : "";
        const payload = await request("/api/login-workflow" + suffix);
        renderLoginSession(payload);
      }

      async function refreshAdminUsers() {
        if (!state.authenticated || !state.user || !state.user.is_sudo || !el.adminUsers) return;
        const payload = await request("/api/admin/users");
        renderAdminUsers(payload.users || []);
      }

      async function refreshAdminLegal() {
        if (!state.authenticated || !state.user || !state.user.is_sudo || !el.adminLegalText) return;
        const payload = await request("/api/admin/legal");
        state.legalVersion = payload.version || state.legalVersion;
        state.legalText = payload.text || state.legalText;
        renderAdminLegal(payload.version || "", payload.text || "", false);
        if (PAGE === "legal") {
          renderLegalText(state.legalText);
          renderLegalState();
        }
      }

      async function login() {
        await request("/api/auth/login", { method: "POST", body: JSON.stringify({ username: (el.authUsername.value || "").trim(), password: (el.authPassword.value || "").trim() }) });
        await refreshAll();
        clearNotice();
      }

      async function registerUser() {
        await request("/api/auth/register", { method: "POST", body: JSON.stringify({ username: (el.authUsername.value || "").trim(), password: (el.authPassword.value || "").trim() }) });
        await refreshAll();
        setNotice("注册成功。", "ok");
      }

      async function logout() {
        await request("/api/auth/logout", { method: "POST" });
        state.loginSessionId = "";
        await refreshAll();
      }

      async function createJob() {
        if (!state.authenticated) throw new Error("请先登录。");
        if (!state.legalAccepted) throw new Error("请先接受免责声明。");
        const urls = (el.urls.value || "").split("\\n").map((item) => item.trim()).filter(Boolean);
        if (urls.length === 0) throw new Error("请先填链接。");
        const jobIDs = [];
        for (const url of urls) {
          const payload = await request("/api/jobs", {
            method: "POST",
            body: JSON.stringify({ url, thread: 100, create_video_list: true, output_subdir: "" }),
          });
          jobIDs.push(payload.id);
        }
        setNotice(urls.length === 1 ? ("任务已创建：" + jobIDs[0]) : ("已创建 " + jobIDs.length + " 个任务。"), "ok");
        await refreshStatusAndJobs();
      }

      async function startLoginWorkflow() {
        if (!state.authenticated) throw new Error("请先登录。");
        if (!state.legalAccepted) throw new Error("请先接受免责声明。");
        const payload = await request("/api/login-workflow", { method: "POST", body: JSON.stringify({}) });
        renderLoginSession(payload);
        setNotice(payload.message || "已启动二维码登录。", "ok");
      }

      async function changePassword() {
        if (!state.authenticated) throw new Error("请先登录。");
        if ((el.newPassword.value || "").trim() !== (el.confirmNewPassword.value || "").trim()) {
          throw new Error("两次输入的新密码不一致。");
        }
        const payload = await request("/api/auth/password", {
          method: "POST",
          body: JSON.stringify({ current_password: (el.currentPassword.value || "").trim(), new_password: (el.newPassword.value || "").trim() }),
        });
        if (el.currentPassword) el.currentPassword.value = "";
        if (el.newPassword) el.newPassword.value = "";
        if (el.confirmNewPassword) el.confirmNewPassword.value = "";
        setNotice(payload.message || "密码已更新。", "ok");
      }

      async function acceptLegal() {
        if (!state.authenticated) throw new Error("请先登录后再接受免责声明。");
        const payload = await request("/api/legal", { method: "POST", body: JSON.stringify({}) });
        state.legalAccepted = Boolean(payload.accepted);
        state.legalAcceptedAt = payload.accepted_at || "";
        state.legalVersion = payload.version || state.legalVersion;
        state.legalConfirmVersion = state.legalVersion;
        renderLegalState();
        setNotice("免责声明已接受。", "ok");
      }

      async function saveAdminLegal() {
        if (!state.authenticated || !state.user || !state.user.is_sudo) throw new Error("需要 sudo 权限。");
        const text = el.adminLegalText ? String(el.adminLegalText.value || "").trim() : "";
        if (!text) throw new Error("免责内容不能为空。");
        const payload = await request("/api/admin/legal", {
          method: "POST",
          body: JSON.stringify({ text }),
        });
        state.legalAccepted = false;
        state.legalAcceptedAt = "";
        state.legalVersion = payload.version || "";
        state.legalText = payload.text || text;
        state.legalConfirmVersion = "";
        state.adminLegalDirty = false;
        renderAdminLegal(state.legalVersion, state.legalText, true);
        renderLegalText(state.legalText);
        renderLegalState();
        renderAuthState();
        setNotice("免责内容已更新，所有用户需重新接受。", "ok");
      }

      if (el.loginBtn) el.loginBtn.addEventListener("click", async () => { setBusy(el.loginBtn, true); try { await login(); } catch (error) { setNotice(error.message, "error"); } finally { setBusy(el.loginBtn, false); } });
      if (el.registerBtn) el.registerBtn.addEventListener("click", async () => { setBusy(el.registerBtn, true); try { await registerUser(); } catch (error) { setNotice(error.message, "error"); } finally { setBusy(el.registerBtn, false); } });
      if (el.logoutBtn) el.logoutBtn.addEventListener("click", async () => { setBusy(el.logoutBtn, true); try { await logout(); setNotice("已退出登录。", "ok"); } catch (error) { setNotice(error.message, "error"); } finally { setBusy(el.logoutBtn, false); } });
      if (el.createJobBtn) el.createJobBtn.addEventListener("click", async () => { setBusy(el.createJobBtn, true); try { await createJob(); } catch (error) { setNotice(error.message, "error"); } finally { setBusy(el.createJobBtn, false); } });
      if (el.refreshBtn) el.refreshBtn.addEventListener("click", async () => { try { await refreshAll(); } catch (error) { setNotice(error.message, "error"); } });
      if (el.startLoginWorkflowBtn) el.startLoginWorkflowBtn.addEventListener("click", async () => { setBusy(el.startLoginWorkflowBtn, true); try { await startLoginWorkflow(); } catch (error) { setNotice(error.message, "error"); } finally { setBusy(el.startLoginWorkflowBtn, false); } });
      if (el.changePasswordBtn) el.changePasswordBtn.addEventListener("click", async () => { setBusy(el.changePasswordBtn, true); try { await changePassword(); } catch (error) { setNotice(error.message, "error"); } finally { setBusy(el.changePasswordBtn, false); } });
      if (el.acceptLegalBtn) el.acceptLegalBtn.addEventListener("click", async () => { setBusy(el.acceptLegalBtn, true); try { await acceptLegal(); } catch (error) { setNotice(error.message, "error"); } finally { setBusy(el.acceptLegalBtn, false); } });
      if (el.legalConfirmCheck && el.acceptLegalBtn) el.legalConfirmCheck.addEventListener("change", () => {
        state.legalConfirmVersion = el.legalConfirmCheck.checked ? (state.legalVersion || "") : "";
        el.acceptLegalBtn.disabled = !state.authenticated || state.legalConfirmVersion !== state.legalVersion;
      });
      if (el.adminLegalText) el.adminLegalText.addEventListener("input", () => { state.adminLegalDirty = true; });
      if (el.saveLegalBtn) el.saveLegalBtn.addEventListener("click", async () => { setBusy(el.saveLegalBtn, true); try { await saveAdminLegal(); } catch (error) { setNotice(error.message, "error"); } finally { setBusy(el.saveLegalBtn, false); } });

      decodeImportPayload();

      async function refreshAll() {
        await refreshAuth();
        if (PAGE === "legal") await refreshLegalConfig();
        if (PAGE === "download") await refreshStatusAndJobs();
        if (PAGE === "settings" || state.loginSessionId) await refreshLoginSession();
        if (PAGE === "account") {
          await refreshAdminUsers();
          await refreshAdminLegal();
        }
      }

      refreshAll().catch((error) => setNotice(error.message, "error"));
      if (pollingHandle) clearInterval(pollingHandle);
      pollingHandle = setInterval(() => { refreshAll().catch(() => {}); }, 5000);
    </script>
  </body>
</html>`;
}
