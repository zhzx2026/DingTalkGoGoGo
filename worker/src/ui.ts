type AppPage = "download" | "login" | "account";

function renderNav(page: AppPage): string {
  if (page === "login") {
    return "";
  }

  const items: Array<{ key: AppPage; href: string; label: string }> = [
    { key: "download", href: "/download", label: "工作台" },
    { key: "account", href: "/account", label: "账号" },
  ];

  return `<nav class="app-nav">${items.map((item) => `<a href="${item.href}" class="nav-link ${page === item.key ? "active" : ""}">${item.label}</a>`).join("")}</nav>`;
}

function renderLoginPage(): string {
  return `
      <section class="page-intro auth-intro">
        <span class="eyebrow">Private Console</span>
        <h1>先登录，再开始。</h1>
        <p>未登录时不展示工作台内容。登录或注册后，系统会按“同意条款 → 设置 Cookie → 提交下载”的顺序引导你完成操作。</p>
      </section>

      <section class="auth-grid">
        <section class="panel">
          <div class="panel-head">
            <div>
              <span class="panel-kicker">Step 1</span>
              <h2>登录</h2>
            </div>
          </div>
          <div class="field">
            <label for="login-username">用户名</label>
            <input id="login-username" placeholder="输入用户名" autocomplete="username" />
          </div>
          <div class="field">
            <label for="login-password">密码</label>
            <input id="login-password" type="password" placeholder="输入密码" autocomplete="current-password" />
          </div>
          <div class="actions">
            <button id="login-btn" class="primary" type="button">登录</button>
          </div>
        </section>

        <section class="panel" id="register-panel">
          <div class="panel-head">
            <div>
              <span class="panel-kicker">Step 1</span>
              <h2>注册</h2>
            </div>
          </div>
          <p id="register-card-hint" class="muted">创建账号后会自动进入工作台。</p>
          <div class="field">
            <label for="register-username">用户名</label>
            <input id="register-username" placeholder="至少 3 位" autocomplete="username" />
          </div>
          <div class="field">
            <label for="register-password">密码</label>
            <input id="register-password" type="password" placeholder="至少 6 位" autocomplete="new-password" />
          </div>
          <div class="actions">
            <button id="register-btn" type="button">注册</button>
          </div>
        </section>
      </section>`;
}

function renderDownloadPage(): string {
  return `
      <section class="page-intro">
        <span class="eyebrow">Workspace</span>
        <h1>三步完成下载</h1>
        <p id="flow-summary">登录后按顺序完成条款确认和 Cookie 设置，再提交回放链接。</p>
      </section>

      <section class="step-stack">
        <section id="legal-step" class="step-card">
          <div class="step-index">1</div>
          <div class="step-content">
            <div class="step-head">
              <div>
                <span class="panel-kicker">Required</span>
                <h2>同意条款</h2>
              </div>
              <span id="legal-badge" class="badge warn">未完成</span>
            </div>
            <p class="muted">当前账号必须先接受本版本条款，系统才允许保存 Cookie 和提交下载。</p>
            <div id="legal-state" class="notice hidden"></div>
            <div id="legal-version-meta" class="meta-line"></div>
            <label id="legal-checkbox-row" class="checkbox-row">
              <input id="legal-confirm-check" type="checkbox" />
              <span>我已阅读并同意当前版本条款。</span>
            </label>
            <div class="actions">
              <button id="accept-legal-btn" class="primary" type="button" disabled>同意条款</button>
            </div>
            <details class="details-card" open>
              <summary>查看条款全文</summary>
              <div id="legal-text" class="legal-text"><div class="empty">正在加载条款...</div></div>
            </details>
          </div>
        </section>

        <section id="cookies-step" class="step-card">
          <div class="step-index">2</div>
          <div class="step-content">
            <div class="step-head">
              <div>
                <span class="panel-kicker">Required</span>
                <h2>设置 Cookie</h2>
              </div>
              <span id="cookie-badge" class="badge warn">未完成</span>
            </div>
            <p class="muted">支持手动粘贴，也支持二维码登录回传。</p>
            <div id="cookie-state" class="notice hidden"></div>
            <div id="cookie-meta" class="meta-line"></div>
            <div class="field">
              <label for="cookie-input">Cookie 内容</label>
              <textarea id="cookie-input" placeholder='支持三种格式：&#10;1. {"cookie":"value"}&#10;2. cookie=value; token=abc&#10;3. 每行一个 name=value'></textarea>
            </div>
            <div class="actions">
              <button id="save-cookies-btn" class="primary" type="button">保存 Cookie</button>
              <button id="start-login-workflow-btn" type="button">二维码登录</button>
            </div>
            <div id="login-box" class="login-box hidden">
              <div id="login-status" class="login-status">等待开始</div>
              <div id="login-hint" class="muted">启动后通常约 1 分钟内出现二维码。</div>
              <img id="login-qr-image" class="qr-image hidden" alt="登录二维码" />
            </div>
          </div>
        </section>

        <section id="download-step" class="step-card">
          <div class="step-index">3</div>
          <div class="step-content">
            <div class="step-head">
              <div>
                <span class="panel-kicker">Ready</span>
                <h2>提交下载</h2>
              </div>
              <span id="download-badge" class="badge warn">等待前置步骤</span>
            </div>
            <p class="muted">完成前两步后，这里才会开放。</p>
            <div id="download-lock" class="notice warn">先同意条款并设置 Cookie，随后才能提交下载任务。</div>
            <div id="download-panel" class="hidden">
              <div class="field">
                <label for="urls">回放链接</label>
                <textarea id="urls" placeholder="每行一个钉钉回放链接"></textarea>
              </div>
              <div class="actions">
                <button id="create-job-btn" class="primary" type="button">开始下载</button>
                <button id="refresh-btn" type="button">刷新状态</button>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section class="stats-row">
        <article class="stat-card">
          <span>Cookie</span>
          <strong id="stat-cookies">-</strong>
        </article>
        <article class="stat-card">
          <span>总任务</span>
          <strong id="stat-total">0</strong>
        </article>
        <article class="stat-card">
          <span>进行中</span>
          <strong id="stat-running">0</strong>
        </article>
        <article class="stat-card">
          <span>已完成</span>
          <strong id="stat-success">0</strong>
        </article>
      </section>

      <section class="panel jobs-panel">
        <div class="panel-head">
          <div>
            <span class="panel-kicker">Jobs</span>
            <h2>任务列表</h2>
          </div>
        </div>
        <div id="jobs" class="jobs-list"><div class="empty">暂无任务</div></div>
      </section>`;
}

function renderAccountPage(): string {
  return `
      <section class="page-intro">
        <span class="eyebrow">Account</span>
        <h1>账号设置</h1>
        <p>查看当前账号状态、修改密码，sudo 账号可额外管理用户和条款内容。</p>
      </section>

      <section class="account-grid">
        <section class="panel">
          <div class="panel-head">
            <div>
              <span class="panel-kicker">Profile</span>
              <h2>当前账号</h2>
            </div>
          </div>
          <p id="account-summary" class="muted">正在加载...</p>
          <div class="actions">
            <button id="topbar-logout-btn-inline" type="button">退出登录</button>
          </div>
        </section>

        <section class="panel">
          <div class="panel-head">
            <div>
              <span class="panel-kicker">Security</span>
              <h2>修改密码</h2>
            </div>
          </div>
          <div class="field">
            <label for="current-password">当前密码</label>
            <input id="current-password" type="password" placeholder="当前密码" autocomplete="current-password" />
          </div>
          <div class="field">
            <label for="new-password">新密码</label>
            <input id="new-password" type="password" placeholder="至少 6 位" autocomplete="new-password" />
          </div>
          <div class="field">
            <label for="confirm-new-password">确认新密码</label>
            <input id="confirm-new-password" type="password" placeholder="再次输入新密码" autocomplete="new-password" />
          </div>
          <div class="actions">
            <button id="change-password-btn" class="primary" type="button">保存新密码</button>
          </div>
        </section>
      </section>

      <section id="admin-panel" class="panel hidden">
        <div class="panel-head">
          <div>
            <span class="panel-kicker">Admin</span>
            <h2>管理区</h2>
          </div>
        </div>
        <div id="admin-users" class="admin-users"><div class="empty">暂无数据</div></div>
        <div class="field admin-field">
          <label for="admin-legal-text">条款内容</label>
          <textarea id="admin-legal-text" class="large-textarea" placeholder="输入新的条款正文"></textarea>
        </div>
        <div class="actions">
          <button id="save-legal-btn" class="primary" type="button">保存条款</button>
        </div>
        <div id="admin-legal-meta" class="meta-line"></div>
      </section>`;
}

function renderPageBody(page: AppPage): string {
  switch (page) {
    case "login":
      return renderLoginPage();
    case "account":
      return renderAccountPage();
    case "download":
    default:
      return renderDownloadPage();
  }
}

export function renderApp(appOrigin: string, page: AppPage): string {
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="data:," />
    <title>GoDingtalk</title>
    <style>
      :root {
        --bg: #f4ede4;
        --bg-strong: #efe4d8;
        --surface: rgba(255, 250, 244, 0.92);
        --surface-strong: #fffdf9;
        --line: rgba(53, 31, 12, 0.10);
        --line-strong: rgba(53, 31, 12, 0.18);
        --text: #1f140b;
        --muted: #6e5a48;
        --accent: #bf5b2c;
        --accent-strong: #9a4319;
        --ok: #18794e;
        --warn: #a85d11;
        --danger: #b42318;
        --shadow: 0 24px 60px rgba(49, 31, 16, 0.10);
        --radius-lg: 24px;
        --radius-md: 18px;
        --radius-sm: 14px;
      }
      * { box-sizing: border-box; }
      html, body {
        margin: 0;
        min-height: 100%;
        background:
          radial-gradient(circle at top left, rgba(252, 226, 186, 0.9), transparent 32%),
          linear-gradient(180deg, #fbf4eb 0%, #f4ede4 52%, #efe4d8 100%);
        color: var(--text);
        font-family: "Avenir Next", "PingFang SC", "Helvetica Neue", Arial, sans-serif;
      }
      body { padding: 0; }
      a { color: inherit; }
      button, input, textarea { font: inherit; }
      .hidden { display: none !important; }
      .app-shell {
        max-width: 1040px;
        margin: 0 auto;
        padding: 28px 18px 56px;
      }
      .app-header {
        display: flex;
        align-items: center;
        gap: 16px;
        justify-content: space-between;
        padding: 18px 0 24px;
      }
      .brand {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        text-decoration: none;
      }
      .brand-mark {
        width: 38px;
        height: 38px;
        border-radius: 14px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(180deg, #2a1a0e 0%, #5f3518 100%);
        color: #fff8ef;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.10em;
      }
      .brand-copy {
        display: grid;
        gap: 3px;
      }
      .brand-copy strong {
        font-size: 16px;
        letter-spacing: -0.02em;
      }
      .brand-copy span {
        color: var(--muted);
        font-size: 12px;
      }
      .header-right {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
        justify-content: flex-end;
      }
      .app-nav {
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .nav-link {
        text-decoration: none;
        padding: 10px 14px;
        border-radius: 999px;
        color: var(--muted);
        background: rgba(255, 255, 255, 0.52);
        border: 1px solid transparent;
        font-weight: 600;
      }
      .nav-link.active {
        color: var(--text);
        background: var(--surface-strong);
        border-color: var(--line);
      }
      .user-chip {
        color: var(--muted);
        font-size: 14px;
      }
      .page-intro {
        margin-bottom: 18px;
      }
      .page-intro h1 {
        margin: 10px 0 0;
        font-size: 42px;
        line-height: 1.02;
        letter-spacing: -0.04em;
      }
      .page-intro p {
        margin: 14px 0 0;
        max-width: 68ch;
        color: var(--muted);
        line-height: 1.75;
      }
      .eyebrow, .panel-kicker {
        color: var(--muted);
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 11px;
        font-weight: 700;
      }
      .auth-intro {
        padding-top: 32px;
      }
      .auth-grid,
      .account-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
      }
      .step-stack {
        display: grid;
        gap: 14px;
      }
      .step-card,
      .panel,
      .stat-card {
        background: var(--surface);
        border: 1px solid var(--line);
        box-shadow: var(--shadow);
        border-radius: var(--radius-lg);
      }
      .step-card {
        display: grid;
        grid-template-columns: 68px minmax(0, 1fr);
        overflow: hidden;
      }
      .step-card.done {
        border-color: rgba(24, 121, 78, 0.24);
      }
      .step-card.ready {
        border-color: rgba(191, 91, 44, 0.20);
      }
      .step-index {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding: 24px 0;
        font-size: 28px;
        font-weight: 800;
        letter-spacing: -0.04em;
        color: var(--accent);
        background: rgba(191, 91, 44, 0.08);
        border-right: 1px solid var(--line);
      }
      .step-content,
      .panel {
        padding: 22px;
      }
      .panel-head,
      .step-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
      }
      .panel-head h2,
      .step-head h2 {
        margin: 6px 0 0;
        font-size: 26px;
        letter-spacing: -0.03em;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        min-height: 32px;
        padding: 0 12px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 700;
        white-space: nowrap;
        border: 1px solid transparent;
      }
      .badge.warn {
        background: rgba(168, 93, 17, 0.12);
        color: var(--warn);
      }
      .badge.ok {
        background: rgba(24, 121, 78, 0.12);
        color: var(--ok);
      }
      .badge.locked {
        background: rgba(31, 20, 11, 0.06);
        color: var(--muted);
      }
      .field {
        display: grid;
        gap: 8px;
        margin-top: 16px;
      }
      .field > label {
        font-size: 13px;
        font-weight: 700;
      }
      input, textarea {
        width: 100%;
        border: 1px solid var(--line-strong);
        background: var(--surface-strong);
        color: var(--text);
        border-radius: var(--radius-md);
        padding: 14px 16px;
      }
      input:focus, textarea:focus {
        outline: none;
        border-color: rgba(191, 91, 44, 0.52);
        box-shadow: 0 0 0 4px rgba(191, 91, 44, 0.10);
      }
      textarea {
        min-height: 156px;
        resize: vertical;
        line-height: 1.7;
      }
      .large-textarea { min-height: 280px; }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 16px;
      }
      button, .button-link {
        appearance: none;
        border: 1px solid var(--line);
        background: rgba(255, 255, 255, 0.80);
        color: var(--text);
        border-radius: 999px;
        min-height: 42px;
        padding: 0 16px;
        font-weight: 700;
        text-decoration: none;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      button.primary, .button-link.primary {
        color: #fff7ef;
        border-color: transparent;
        background: linear-gradient(180deg, var(--accent) 0%, var(--accent-strong) 100%);
      }
      button:disabled {
        opacity: 0.62;
        cursor: wait;
      }
      .notice {
        margin-top: 14px;
        padding: 14px 16px;
        border-radius: var(--radius-md);
        line-height: 1.65;
        border: 1px solid transparent;
      }
      .notice.ok {
        background: rgba(24, 121, 78, 0.10);
        color: var(--ok);
        border-color: rgba(24, 121, 78, 0.16);
      }
      .notice.warn {
        background: rgba(168, 93, 17, 0.10);
        color: var(--warn);
        border-color: rgba(168, 93, 17, 0.18);
      }
      .notice.error {
        background: rgba(180, 35, 24, 0.08);
        color: var(--danger);
        border-color: rgba(180, 35, 24, 0.16);
      }
      .meta-line {
        margin-top: 12px;
        color: var(--muted);
        line-height: 1.7;
        font-size: 13px;
      }
      .muted {
        color: var(--muted);
        line-height: 1.7;
      }
      .checkbox-row {
        display: flex;
        gap: 10px;
        align-items: flex-start;
        margin-top: 16px;
        line-height: 1.7;
      }
      .checkbox-row input {
        width: 18px;
        height: 18px;
        margin-top: 3px;
      }
      .details-card {
        margin-top: 18px;
        border: 1px solid var(--line);
        border-radius: var(--radius-md);
        background: rgba(255, 255, 255, 0.50);
        padding: 0 16px 16px;
      }
      .details-card summary {
        cursor: pointer;
        list-style: none;
        padding: 16px 0 0;
        font-weight: 700;
      }
      .details-card summary::-webkit-details-marker {
        display: none;
      }
      .legal-text {
        display: grid;
        gap: 12px;
        line-height: 1.75;
        margin-top: 16px;
      }
      .legal-text h3 {
        margin: 12px 0 0;
        font-size: 17px;
      }
      .legal-text p {
        margin: 0;
      }
      .login-box {
        margin-top: 18px;
        padding: 16px;
        border-radius: var(--radius-md);
        border: 1px solid var(--line);
        background: rgba(255, 255, 255, 0.58);
      }
      .login-status {
        font-size: 20px;
        font-weight: 800;
        letter-spacing: -0.03em;
      }
      .qr-image {
        display: block;
        width: 260px;
        max-width: 100%;
        margin-top: 14px;
        border-radius: var(--radius-md);
        border: 1px solid var(--line);
        background: #fff;
      }
      .stats-row {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 14px;
        margin-top: 18px;
      }
      .stat-card {
        padding: 18px;
      }
      .stat-card span {
        color: var(--muted);
        font-size: 13px;
      }
      .stat-card strong {
        display: block;
        margin-top: 10px;
        font-size: 30px;
        letter-spacing: -0.04em;
      }
      .jobs-panel {
        margin-top: 18px;
      }
      .jobs-list {
        display: grid;
        gap: 12px;
        margin-top: 12px;
      }
      .job-card {
        border: 1px solid var(--line);
        border-radius: var(--radius-md);
        background: rgba(255, 255, 255, 0.58);
        padding: 16px;
      }
      .job-top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
      }
      .job-top h3 {
        margin: 6px 0 0;
        font-size: 18px;
        line-height: 1.4;
      }
      .progress-track {
        height: 8px;
        border-radius: 999px;
        background: rgba(31, 20, 11, 0.08);
        overflow: hidden;
        margin-top: 14px;
      }
      .progress-track > div {
        height: 100%;
        background: linear-gradient(90deg, var(--accent) 0%, #e38d48 100%);
      }
      .job-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 8px 14px;
        margin-top: 12px;
        color: var(--muted);
        font-size: 13px;
      }
      .file-list {
        display: grid;
        gap: 10px;
        margin-top: 14px;
      }
      .file-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 12px 14px;
        border-radius: var(--radius-sm);
        background: rgba(255, 255, 255, 0.68);
        border: 1px solid var(--line);
      }
      .file-name {
        font-weight: 600;
        word-break: break-word;
      }
      .file-link {
        text-decoration: none;
        font-weight: 700;
        color: var(--accent);
        white-space: nowrap;
      }
      .job-errors {
        margin-top: 14px;
        padding: 14px;
        border-radius: var(--radius-md);
        background: rgba(180, 35, 24, 0.08);
        color: var(--danger);
        line-height: 1.7;
      }
      .admin-users {
        display: grid;
        gap: 12px;
      }
      .admin-user {
        border: 1px solid var(--line);
        border-radius: var(--radius-md);
        background: rgba(255, 255, 255, 0.58);
        padding: 16px;
      }
      .admin-user-name {
        font-size: 17px;
        font-weight: 800;
      }
      .admin-field {
        margin-top: 18px;
      }
      .empty {
        padding: 24px 8px;
        text-align: center;
        color: var(--muted);
      }
      @media (max-width: 860px) {
        .auth-grid,
        .account-grid,
        .stats-row {
          grid-template-columns: 1fr;
        }
        .step-card {
          grid-template-columns: 1fr;
        }
        .step-index {
          padding: 14px 22px 0;
          justify-content: flex-start;
          border-right: 0;
          border-bottom: 1px solid var(--line);
        }
        .app-header {
          align-items: flex-start;
          flex-direction: column;
        }
        .header-right {
          justify-content: flex-start;
        }
      }
      @media (max-width: 560px) {
        .app-shell {
          padding: 20px 14px 40px;
        }
        .page-intro h1 {
          font-size: 34px;
        }
        .panel-head,
        .step-head,
        .job-top {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    </style>
  </head>
  <body>
    <div class="app-shell">
      <header class="app-header">
        <a class="brand" href="${page === "login" ? "/login" : "/download"}">
          <span class="brand-mark">GD</span>
          <span class="brand-copy">
            <strong>GoDingtalk</strong>
            <span>Private Console</span>
          </span>
        </a>
        <div class="header-right">
          ${renderNav(page)}
          <span id="user-chip" class="user-chip ${page === "login" ? "hidden" : ""}">未登录</span>
          <button id="topbar-logout-btn" type="button" class="hidden">退出登录</button>
        </div>
      </header>

      <div id="notice" class="notice ok hidden"></div>
      ${renderPageBody(page)}
    </div>

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
        cookiesReady: false,
        cookiesUpdatedAt: "",
        user: null,
        jobs: [],
        loginSessionId: "",
        loginSessionStatus: "",
        adminLegalDirty: false,
      };

      const el = {
        notice: document.getElementById("notice"),
        userChip: document.getElementById("user-chip"),
        topbarLogoutBtn: document.getElementById("topbar-logout-btn"),
        topbarLogoutBtnInline: document.getElementById("topbar-logout-btn-inline"),
        registerPanel: document.getElementById("register-panel"),
        loginUsername: document.getElementById("login-username"),
        loginPassword: document.getElementById("login-password"),
        registerUsername: document.getElementById("register-username"),
        registerPassword: document.getElementById("register-password"),
        registerCardHint: document.getElementById("register-card-hint"),
        loginBtn: document.getElementById("login-btn"),
        registerBtn: document.getElementById("register-btn"),
        legalStep: document.getElementById("legal-step"),
        legalBadge: document.getElementById("legal-badge"),
        legalState: document.getElementById("legal-state"),
        legalVersionMeta: document.getElementById("legal-version-meta"),
        legalText: document.getElementById("legal-text"),
        legalConfirmCheck: document.getElementById("legal-confirm-check"),
        legalCheckboxRow: document.getElementById("legal-checkbox-row"),
        acceptLegalBtn: document.getElementById("accept-legal-btn"),
        cookiesStep: document.getElementById("cookies-step"),
        cookieBadge: document.getElementById("cookie-badge"),
        cookieState: document.getElementById("cookie-state"),
        cookieMeta: document.getElementById("cookie-meta"),
        cookieInput: document.getElementById("cookie-input"),
        saveCookiesBtn: document.getElementById("save-cookies-btn"),
        startLoginWorkflowBtn: document.getElementById("start-login-workflow-btn"),
        loginBox: document.getElementById("login-box"),
        loginStatus: document.getElementById("login-status"),
        loginHint: document.getElementById("login-hint"),
        loginQRImage: document.getElementById("login-qr-image"),
        downloadStep: document.getElementById("download-step"),
        downloadBadge: document.getElementById("download-badge"),
        downloadLock: document.getElementById("download-lock"),
        downloadPanel: document.getElementById("download-panel"),
        flowSummary: document.getElementById("flow-summary"),
        urls: document.getElementById("urls"),
        createJobBtn: document.getElementById("create-job-btn"),
        refreshBtn: document.getElementById("refresh-btn"),
        statCookies: document.getElementById("stat-cookies"),
        statTotal: document.getElementById("stat-total"),
        statRunning: document.getElementById("stat-running"),
        statSuccess: document.getElementById("stat-success"),
        jobs: document.getElementById("jobs"),
        accountSummary: document.getElementById("account-summary"),
        currentPassword: document.getElementById("current-password"),
        newPassword: document.getElementById("new-password"),
        confirmNewPassword: document.getElementById("confirm-new-password"),
        changePasswordBtn: document.getElementById("change-password-btn"),
        adminPanel: document.getElementById("admin-panel"),
        adminUsers: document.getElementById("admin-users"),
        adminLegalText: document.getElementById("admin-legal-text"),
        saveLegalBtn: document.getElementById("save-legal-btn"),
        adminLegalMeta: document.getElementById("admin-legal-meta"),
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
          case "uploading_r2": return "上传中";
          case "completed": return "已完成";
          case "failed": return "失败";
          default: return stage || "-";
        }
      }

      function formatStatus(status) {
        switch (String(status || "").toLowerCase()) {
          case "queued": return "排队中";
          case "running": return "运行中";
          case "succeeded": return "已完成";
          case "failed": return "失败";
          default: return status || "-";
        }
      }

      function renderLegalText(text) {
        if (!el.legalText) return;
        const source = String(text || "").trim();
        if (!source) {
          el.legalText.innerHTML = '<div class="empty">暂无条款内容</div>';
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

      function qrImageURL(value) {
        if (!value) return "";
        return "https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=" + encodeURIComponent(value);
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

      function redirectTo(path) {
        window.location.href = path;
      }

      function parseCookieInput(raw) {
        const source = String(raw || "").trim();
        if (!source) {
          throw new Error("请先粘贴 Cookie。");
        }

        const sanitize = (input) => {
          const result = {};
          Object.entries(input || {}).forEach(([name, value]) => {
            const key = String(name || "").trim();
            const text = typeof value === "string" ? value.trim() : String(value || "").trim();
            if (key && text) {
              result[key] = text;
            }
          });
          return result;
        };

        if (source.startsWith("{")) {
          try {
            const parsed = JSON.parse(source);
            if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
              throw new Error("Cookie JSON 必须是对象。");
            }
            const jsonCookies = sanitize(parsed);
            if (Object.keys(jsonCookies).length === 0) {
              throw new Error("Cookie JSON 里没有有效字段。");
            }
            return jsonCookies;
          } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Cookie JSON 解析失败。");
          }
        }

        const cookies = {};
        source.split(/\\n|;/).forEach((part) => {
          const chunk = String(part || "").trim();
          if (!chunk) return;
          const index = chunk.indexOf("=");
          if (index === -1) return;
          const name = chunk.slice(0, index).trim();
          const value = chunk.slice(index + 1).trim();
          if (name && value) {
            cookies[name] = value;
          }
        });

        if (Object.keys(cookies).length === 0) {
          throw new Error("没有识别到有效的 Cookie。");
        }
        return cookies;
      }

      function setBadge(element, type, text) {
        if (!element) return;
        element.className = "badge " + type;
        element.textContent = text;
      }

      function renderShellState() {
        const username = state.authenticated && state.user ? state.user.username : "未登录";
        if (el.userChip) {
          el.userChip.textContent = state.authenticated && state.user
            ? ("已登录：" + username + (state.user.is_sudo ? " (sudo)" : ""))
            : "未登录";
        }
        if (el.topbarLogoutBtn) {
          if (state.authenticated) el.topbarLogoutBtn.classList.remove("hidden"); else el.topbarLogoutBtn.classList.add("hidden");
        }
      }

      function renderFlowState() {
        if (PAGE !== "download") return;

        if (el.flowSummary) {
          if (!state.legalAccepted) {
            el.flowSummary.textContent = "下一步：先同意当前条款。";
          } else if (!state.cookiesReady) {
            el.flowSummary.textContent = "下一步：保存 Cookie 或启动二维码登录。";
          } else {
            el.flowSummary.textContent = "前置步骤已完成，现在可以直接提交下载。";
          }
        }

        if (el.legalState) {
          el.legalState.textContent = state.legalAccepted
            ? ("已同意版本 " + (state.legalVersion || "-") + "，时间：" + formatTime(state.legalAcceptedAt))
            : "尚未同意当前条款。";
          el.legalState.className = "notice " + (state.legalAccepted ? "ok" : "warn");
          el.legalState.classList.remove("hidden");
        }
        if (el.legalVersionMeta) {
          el.legalVersionMeta.textContent = state.legalVersion ? ("当前版本：" + state.legalVersion) : "";
        }
        if (el.legalConfirmCheck && el.acceptLegalBtn) {
          if (state.legalAccepted) {
            el.legalConfirmCheck.checked = true;
            el.legalConfirmCheck.disabled = true;
            if (el.legalCheckboxRow) el.legalCheckboxRow.classList.add("hidden");
            el.acceptLegalBtn.classList.add("hidden");
          } else {
            if (el.legalCheckboxRow) el.legalCheckboxRow.classList.remove("hidden");
            el.legalConfirmCheck.disabled = false;
            el.legalConfirmCheck.checked = state.legalConfirmVersion === state.legalVersion && Boolean(state.legalVersion);
            el.acceptLegalBtn.classList.remove("hidden");
            el.acceptLegalBtn.disabled = !state.legalVersion || state.legalConfirmVersion !== state.legalVersion;
          }
        }
        if (el.legalStep) {
          el.legalStep.classList.toggle("done", state.legalAccepted);
          el.legalStep.classList.toggle("ready", !state.legalAccepted);
        }
        setBadge(el.legalBadge, state.legalAccepted ? "ok" : "warn", state.legalAccepted ? "已完成" : "未完成");

        if (el.cookieState) {
          el.cookieState.textContent = state.cookiesReady ? "Cookie 已就绪。" : "还没有可用 Cookie。";
          el.cookieState.className = "notice " + (state.cookiesReady ? "ok" : "warn");
          el.cookieState.classList.remove("hidden");
        }
        if (el.cookieMeta) {
          el.cookieMeta.textContent = state.cookiesUpdatedAt ? ("最近更新时间：" + formatTime(state.cookiesUpdatedAt)) : "尚未保存 Cookie。";
        }
        if (el.cookieInput) {
          el.cookieInput.disabled = !state.legalAccepted;
        }
        if (el.saveCookiesBtn) {
          el.saveCookiesBtn.disabled = !state.legalAccepted;
        }
        if (el.startLoginWorkflowBtn) {
          const loginBusy = state.loginSessionStatus === "pending" || state.loginSessionStatus === "qr_ready";
          el.startLoginWorkflowBtn.disabled = !state.legalAccepted || loginBusy;
        }
        if (el.cookiesStep) {
          el.cookiesStep.classList.toggle("done", state.cookiesReady);
          el.cookiesStep.classList.toggle("ready", state.legalAccepted && !state.cookiesReady);
        }
        setBadge(
          el.cookieBadge,
          state.cookiesReady ? "ok" : (state.legalAccepted ? "warn" : "locked"),
          state.cookiesReady ? "已完成" : (state.legalAccepted ? "待设置" : "等待上一步"),
        );

        const canDownload = state.legalAccepted && state.cookiesReady;
        if (el.downloadPanel) {
          if (canDownload) el.downloadPanel.classList.remove("hidden"); else el.downloadPanel.classList.add("hidden");
        }
        if (el.downloadLock) {
          if (canDownload) {
            el.downloadLock.classList.add("hidden");
          } else {
            el.downloadLock.textContent = !state.legalAccepted
              ? "先完成条款同意。"
              : "条款已完成，继续设置 Cookie 后开放下载。";
            el.downloadLock.classList.remove("hidden");
          }
        }
        if (el.downloadStep) {
          el.downloadStep.classList.toggle("done", canDownload);
          el.downloadStep.classList.toggle("ready", state.legalAccepted && !state.cookiesReady);
        }
        setBadge(
          el.downloadBadge,
          canDownload ? "ok" : (state.legalAccepted ? "warn" : "locked"),
          canDownload ? "已开放" : (state.legalAccepted ? "等待 Cookie" : "等待前置步骤"),
        );
      }

      function renderAccountState() {
        if (!el.accountSummary) return;
        if (!state.authenticated || !state.user) {
          el.accountSummary.textContent = "请先登录。";
          if (el.adminPanel) el.adminPanel.classList.add("hidden");
          return;
        }

        el.accountSummary.textContent = "当前用户：" + state.user.username + " · 条款：" + (state.legalAccepted ? "已同意" : "未同意") + " · Cookie：" + (state.cookiesReady ? "已就绪" : "未设置");
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
          '<div class="admin-user-name">' + escapeHTML(user.username) + (user.is_sudo ? ' (sudo)' : '') + '</div>',
          '<div class="meta-line">注册时间：' + escapeHTML(formatTime(user.created_at)) + '</div>',
          '<div class="meta-line">条款：' + escapeHTML(user.legal_accepted ? ('已同意 · ' + formatTime(user.legal_accepted_at)) : '未同意') + '</div>',
          '<div class="meta-line">Cookie：' + escapeHTML(user.cookies_ready ? '已就绪' : '未设置') + ' · 任务：' + escapeHTML(String(user.total_jobs || 0)) + '</div>',
          '</section>',
        ].join("")).join("");
      }

      function renderAdminLegal(version, text, force) {
        if (el.adminLegalText && (!state.adminLegalDirty || force)) {
          el.adminLegalText.value = text || "";
        }
        if (el.adminLegalMeta) {
          el.adminLegalMeta.textContent = version ? ("当前版本：" + version + "。保存后所有用户需要重新同意。") : "";
        }
      }

      function renderJobs(jobs) {
        if (!el.jobs) return;
        const records = Array.isArray(jobs) ? jobs : [];
        state.jobs = records;
        if (records.length === 0) {
          el.jobs.innerHTML = '<div class="empty">暂无任务</div>';
          return;
        }

        el.jobs.innerHTML = records.map((job) => {
          const title = job.current_title || (Array.isArray(job.titles) && job.titles[0]) || "下载任务";
          const progress = Math.max(0, Math.min(100, Number(job.progress_percent || 0)));
          const files = Array.isArray(job.files) ? job.files : [];
          const errors = Array.isArray(job.errors) ? job.errors : [];
          return [
            '<section class="job-card">',
            '<div class="job-top">',
            '<div><span class="panel-kicker">Task #' + escapeHTML(job.id) + '</span><h3>' + escapeHTML(title) + '</h3></div>',
            '<span class="badge ' + (job.status === 'succeeded' ? 'ok' : (job.status === 'failed' ? 'warn' : 'locked')) + '">' + escapeHTML(formatStatus(job.status)) + '</span>',
            '</div>',
            '<div class="progress-track"><div style="width:' + escapeHTML(progress.toFixed(1)) + '%"></div></div>',
            '<div class="job-meta"><span>阶段：' + escapeHTML(formatStage(job.stage)) + '</span><span>进度：' + escapeHTML(progress.toFixed(1)) + '%</span><span>创建时间：' + escapeHTML(formatTime(job.created_at)) + '</span></div>',
            files.length ? '<div class="file-list">' + files.map((file) => [
              '<div class="file-row">',
              '<div class="file-name">' + escapeHTML(file.name || file.relative_path || "未命名文件") + '</div>',
              file.download_url ? '<a class="file-link" href="' + escapeHTML(file.download_url) + '" target="_blank" rel="noreferrer">下载</a>' : '<span class="muted">处理中</span>',
              '</div>',
            ].join("")).join("") + '</div>' : '',
            errors.length ? '<div class="job-errors">' + errors.map(escapeHTML).join("<br/>") + '</div>' : '',
            '</section>',
          ].join("");
        }).join("");
      }

      function renderLoginSession(payload) {
        if (!el.loginBox || !el.loginStatus || !el.loginHint || !el.loginQRImage) return;
        const session = payload && payload.login_session ? payload.login_session : null;
        if (!session) {
          state.loginSessionId = "";
          state.loginSessionStatus = "";
          el.loginBox.classList.add("hidden");
          el.loginQRImage.classList.add("hidden");
          return;
        }

        state.loginSessionId = session.id || "";
        state.loginSessionStatus = session.status || "";
        el.loginBox.classList.remove("hidden");

        if (session.status === "pending") {
          el.loginStatus.textContent = "已启动，等待二维码";
          el.loginHint.textContent = "通常约 1 分钟内出现二维码，请保持页面开启。";
          el.loginQRImage.classList.add("hidden");
        } else if (session.status === "qr_ready") {
          el.loginStatus.textContent = "请扫码登录";
          el.loginHint.textContent = "扫码成功后，Cookie 会自动回传。";
          el.loginQRImage.src = qrImageURL(session.qr_url || "");
          el.loginQRImage.classList.remove("hidden");
        } else if (session.status === "completed") {
          el.loginStatus.textContent = "登录完成";
          el.loginHint.textContent = "Cookie 已自动回传，现在可以直接下载。";
          el.loginQRImage.classList.add("hidden");
        } else {
          el.loginStatus.textContent = "登录失败";
          el.loginHint.textContent = session.error_message || "请重试。";
          el.loginQRImage.classList.add("hidden");
        }
      }

      async function refreshAuth() {
        const payload = await request("/api/auth/me");
        state.authenticated = Boolean(payload.authenticated);
        state.registrationOpen = Boolean(payload.registration_open);
        state.legalAccepted = Boolean(payload.legal_accepted);
        state.legalAcceptedAt = payload.legal_accepted_at || "";
        state.legalVersion = payload.legal_version || "";
        state.cookiesReady = Boolean(payload.cookies_ready);
        state.cookiesUpdatedAt = payload.cookies_updated_at || "";
        state.user = payload.user || null;

        if (state.legalConfirmVersion && state.legalConfirmVersion !== state.legalVersion) {
          state.legalConfirmVersion = "";
        }

        if (PAGE !== "login" && !state.authenticated) {
          redirectTo("/login");
          return;
        }

        if (PAGE === "login" && el.registerCardHint) {
          el.registerCardHint.textContent = state.registrationOpen ? "创建账号后会自动进入工作台。" : "当前未开放注册。";
        }
        if (PAGE === "login" && el.registerPanel) {
          if (state.registrationOpen) {
            el.registerPanel.classList.remove("hidden");
          } else {
            el.registerPanel.classList.add("hidden");
          }
        }

        renderShellState();
        renderFlowState();
        renderAccountState();
      }

      async function refreshLegalConfig() {
        const payload = await request("/api/legal-config");
        state.legalVersion = payload.version || state.legalVersion;
        state.legalText = payload.text || "";
        renderLegalText(state.legalText);
        renderFlowState();
      }

      async function refreshStatusAndJobs() {
        if (!state.authenticated) return;
        const [status, jobsPayload] = await Promise.all([request("/api/status"), request("/api/jobs")]);
        state.cookiesReady = Boolean(status.cookies_ready);
        state.cookiesUpdatedAt = status.cookies_updated_at || state.cookiesUpdatedAt;
        if (el.statCookies) el.statCookies.textContent = state.cookiesReady ? "已就绪" : "未设置";
        if (el.statTotal) el.statTotal.textContent = String(status.total_jobs || 0);
        if (el.statRunning) el.statRunning.textContent = String((status.running_jobs || 0) + (status.queued_jobs || 0));
        if (el.statSuccess) el.statSuccess.textContent = String(status.succeeded_jobs || 0);
        renderJobs(jobsPayload.jobs || []);
        renderFlowState();
      }

      async function refreshLoginSession() {
        if (!state.authenticated || !el.loginBox) return;
        const suffix = state.loginSessionId ? ("?id=" + encodeURIComponent(state.loginSessionId)) : "";
        const payload = await request("/api/login-workflow" + suffix);
        renderLoginSession(payload);
        renderFlowState();
      }

      async function refreshAdminUsers() {
        if (!state.authenticated || !state.user || !state.user.is_sudo || !el.adminUsers) return;
        const payload = await request("/api/admin/users");
        renderAdminUsers(payload.users || []);
      }

      async function refreshAdminLegal() {
        if (!state.authenticated || !state.user || !state.user.is_sudo || !el.adminLegalText) return;
        const payload = await request("/api/admin/legal");
        state.legalText = payload.text || state.legalText;
        renderAdminLegal(payload.version || "", payload.text || "", false);
      }

      async function login() {
        await request("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({
            username: (el.loginUsername ? el.loginUsername.value : "").trim(),
            password: (el.loginPassword ? el.loginPassword.value : "").trim(),
          }),
        });
        redirectTo("/download");
      }

      async function registerUser() {
        await request("/api/auth/register", {
          method: "POST",
          body: JSON.stringify({
            username: (el.registerUsername ? el.registerUsername.value : "").trim(),
            password: (el.registerPassword ? el.registerPassword.value : "").trim(),
          }),
        });
        redirectTo("/download");
      }

      async function logout() {
        await request("/api/auth/logout", { method: "POST" });
        redirectTo("/login");
      }

      async function acceptLegal() {
        if (!state.authenticated) throw new Error("请先登录。");
        const payload = await request("/api/legal", { method: "POST", body: JSON.stringify({}) });
        state.legalAccepted = Boolean(payload.accepted);
        state.legalAcceptedAt = payload.accepted_at || "";
        state.legalVersion = payload.version || state.legalVersion;
        state.legalConfirmVersion = state.legalVersion;
        renderFlowState();
        setNotice("条款已同意。", "ok");
      }

      async function saveCookies() {
        if (!state.authenticated) throw new Error("请先登录。");
        if (!state.legalAccepted) throw new Error("请先同意条款。");
        const cookies = parseCookieInput(el.cookieInput ? el.cookieInput.value : "");
        const payload = await request("/api/cookies", {
          method: "POST",
          body: JSON.stringify({ cookies }),
        });
        setNotice(payload.message || "Cookie 已保存。", "ok");
        await refreshAll();
      }

      async function startLoginWorkflow() {
        if (!state.authenticated) throw new Error("请先登录。");
        if (!state.legalAccepted) throw new Error("请先同意条款。");
        const payload = await request("/api/login-workflow", { method: "POST", body: JSON.stringify({}) });
        renderLoginSession(payload);
        renderFlowState();
        setNotice(payload.message || "二维码登录已启动。", "ok");
      }

      async function createJob() {
        if (!state.authenticated) throw new Error("请先登录。");
        if (!state.legalAccepted || !state.cookiesReady) throw new Error("请先完成条款和 Cookie 设置。");
        const urls = (el.urls ? el.urls.value : "").split("\\n").map((item) => item.trim()).filter(Boolean);
        if (urls.length === 0) throw new Error("请先填入回放链接。");

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

      async function changePassword() {
        if (!state.authenticated) throw new Error("请先登录。");
        const currentPassword = (el.currentPassword ? el.currentPassword.value : "").trim();
        const newPassword = (el.newPassword ? el.newPassword.value : "").trim();
        const confirmPassword = (el.confirmNewPassword ? el.confirmNewPassword.value : "").trim();
        if (newPassword !== confirmPassword) {
          throw new Error("两次输入的新密码不一致。");
        }
        const payload = await request("/api/auth/password", {
          method: "POST",
          body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
        });
        if (el.currentPassword) el.currentPassword.value = "";
        if (el.newPassword) el.newPassword.value = "";
        if (el.confirmNewPassword) el.confirmNewPassword.value = "";
        setNotice(payload.message || "密码已更新。", "ok");
      }

      async function saveAdminLegal() {
        if (!state.authenticated || !state.user || !state.user.is_sudo) throw new Error("需要 sudo 权限。");
        const text = el.adminLegalText ? String(el.adminLegalText.value || "").trim() : "";
        if (!text) throw new Error("条款内容不能为空。");
        const payload = await request("/api/admin/legal", {
          method: "POST",
          body: JSON.stringify({ text }),
        });
        state.adminLegalDirty = false;
        renderAdminLegal(payload.version || "", payload.text || text, true);
        setNotice("条款已更新，所有用户需要重新同意。", "ok");
      }

      if (el.loginBtn) {
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
      }

      if (el.registerBtn) {
        el.registerBtn.addEventListener("click", async () => {
          setBusy(el.registerBtn, true);
          try {
            await registerUser();
          } catch (error) {
            setNotice(error.message, "error");
          } finally {
            setBusy(el.registerBtn, false);
          }
        });
      }

      if (el.topbarLogoutBtn) {
        el.topbarLogoutBtn.addEventListener("click", async () => {
          setBusy(el.topbarLogoutBtn, true);
          try {
            await logout();
          } catch (error) {
            setNotice(error.message, "error");
            setBusy(el.topbarLogoutBtn, false);
          }
        });
      }

      if (el.topbarLogoutBtnInline) {
        el.topbarLogoutBtnInline.addEventListener("click", async () => {
          setBusy(el.topbarLogoutBtnInline, true);
          try {
            await logout();
          } catch (error) {
            setNotice(error.message, "error");
            setBusy(el.topbarLogoutBtnInline, false);
          }
        });
      }

      if (el.legalConfirmCheck) {
        el.legalConfirmCheck.addEventListener("change", () => {
          state.legalConfirmVersion = el.legalConfirmCheck.checked ? (state.legalVersion || "") : "";
          if (el.acceptLegalBtn) {
            el.acceptLegalBtn.disabled = !state.legalVersion || state.legalConfirmVersion !== state.legalVersion;
          }
        });
      }

      if (el.acceptLegalBtn) {
        el.acceptLegalBtn.addEventListener("click", async () => {
          setBusy(el.acceptLegalBtn, true);
          try {
            await acceptLegal();
          } catch (error) {
            setNotice(error.message, "error");
          } finally {
            setBusy(el.acceptLegalBtn, false);
          }
        });
      }

      if (el.saveCookiesBtn) {
        el.saveCookiesBtn.addEventListener("click", async () => {
          setBusy(el.saveCookiesBtn, true);
          try {
            await saveCookies();
          } catch (error) {
            setNotice(error.message, "error");
          } finally {
            setBusy(el.saveCookiesBtn, false);
          }
        });
      }

      if (el.startLoginWorkflowBtn) {
        el.startLoginWorkflowBtn.addEventListener("click", async () => {
          setBusy(el.startLoginWorkflowBtn, true);
          try {
            await startLoginWorkflow();
          } catch (error) {
            setNotice(error.message, "error");
          } finally {
            setBusy(el.startLoginWorkflowBtn, false);
          }
        });
      }

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
            await refreshAll();
          } catch (error) {
            setNotice(error.message, "error");
          }
        });
      }

      if (el.changePasswordBtn) {
        el.changePasswordBtn.addEventListener("click", async () => {
          setBusy(el.changePasswordBtn, true);
          try {
            await changePassword();
          } catch (error) {
            setNotice(error.message, "error");
          } finally {
            setBusy(el.changePasswordBtn, false);
          }
        });
      }

      if (el.adminLegalText) {
        el.adminLegalText.addEventListener("input", () => {
          state.adminLegalDirty = true;
        });
      }

      if (el.saveLegalBtn) {
        el.saveLegalBtn.addEventListener("click", async () => {
          setBusy(el.saveLegalBtn, true);
          try {
            await saveAdminLegal();
          } catch (error) {
            setNotice(error.message, "error");
          } finally {
            setBusy(el.saveLegalBtn, false);
          }
        });
      }

      async function refreshAll() {
        await refreshAuth();

        if (PAGE === "download") {
          await refreshLegalConfig();
          await refreshStatusAndJobs();
          if (state.loginSessionId || state.legalAccepted) {
            await refreshLoginSession();
          }
        }

        if (PAGE === "account") {
          await refreshAdminUsers();
          await refreshAdminLegal();
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
