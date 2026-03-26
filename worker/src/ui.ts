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
      <section class="auth-shell panel">
        <div class="auth-copy">
          <span class="eyebrow">Private Console</span>
          <h1>钉钉回放下载控制台</h1>
          <p>安全获取会议回放。登录后需完成条款确认与扫码验证。</p>
        </div>

        <div class="auth-tabs" role="tablist" aria-label="登录注册切换">
          <button id="auth-tab-login" class="auth-tab active" type="button">登录</button>
          <button id="auth-tab-register" class="auth-tab" type="button">注册</button>
        </div>

        <section id="login-form-panel" class="auth-form-panel">
          <div class="field">
            <label for="login-username">用户名</label>
            <input id="login-username" placeholder="输入用户名" autocomplete="username" />
          </div>
          <div class="field">
            <label for="login-password">密码</label>
            <input id="login-password" type="password" placeholder="输入密码" autocomplete="current-password" />
          </div>
          <div class="auth-help muted">登录后需完成条款确认与扫码验证</div>
          <div class="actions auth-actions">
            <button id="login-btn" class="primary auth-main-btn" type="button">登录</button>
          </div>
        </section>

        <section id="register-form-panel" class="auth-form-panel hidden">
          <div class="field">
            <label for="register-username">用户名</label>
            <input id="register-username" placeholder="至少 3 位" autocomplete="username" />
          </div>
          <div class="field">
            <label for="register-password">密码</label>
            <input id="register-password" type="password" placeholder="至少 6 位" autocomplete="new-password" />
          </div>
          <div class="field">
            <label for="register-password-confirm">确认密码</label>
            <input id="register-password-confirm" type="password" placeholder="再次输入密码" autocomplete="new-password" />
          </div>
          <p id="register-card-hint" class="muted auth-help">注册成功后请使用新账号登录</p>
          <div class="actions auth-actions">
            <button id="register-btn" class="auth-main-btn" type="button">注册</button>
          </div>
        </section>
      </section>`;
}

function renderDownloadPage(): string {
  return `
      <section class="page-intro">
        <span class="eyebrow">Workspace</span>
        <h1>钉钉回放下载</h1>
        <p>所有核心操作集中在这里。按顺序完成条款确认、扫码登录、提交下载即可。</p>
      </section>

      <section class="panel status-panel">
        <div class="panel-head">
          <div>
            <span class="panel-kicker">Current State</span>
            <h2>当前状态</h2>
          </div>
        </div>
        <div class="status-summary">
          <div class="status-label">当前状态</div>
          <div id="user-status-line" class="status-title">请先同意使用条款</div>
          <div id="status-helper" class="muted">登录后先完成条款确认与扫码验证。</div>
        </div>
        <div class="stats-row">
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
        </div>
      </section>

      <section class="panel flow-panel">
        <div class="panel-head">
          <div>
            <span class="panel-kicker">Progress</span>
            <h2>三步流程</h2>
          </div>
        </div>
        <div class="flow-steps">
          <div id="flow-chip-legal" class="flow-chip active">
            <span class="flow-step-no">1</span>
            <div class="flow-copy">
              <strong>条款</strong>
              <span>先确认使用条款</span>
            </div>
          </div>
          <div id="flow-chip-cookies" class="flow-chip">
            <span class="flow-step-no">2</span>
            <div class="flow-copy">
              <strong>扫码登录</strong>
              <span>只通过二维码获取登录态</span>
            </div>
          </div>
          <div id="flow-chip-download" class="flow-chip">
            <span class="flow-step-no">3</span>
            <div class="flow-copy">
              <strong>下载</strong>
              <span>完成前两步后开始下载</span>
            </div>
          </div>
        </div>
        <p id="flow-summary" class="muted flow-summary">请按顺序完成三步操作。</p>
      </section>

      <section class="step-stack">
        <section id="legal-step" class="step-card">
          <div class="step-head">
            <div>
              <span class="step-kicker">Step 1</span>
              <h2>使用条款</h2>
            </div>
            <span id="legal-badge" class="badge warn">未完成</span>
          </div>
          <p class="muted">使用本工具前，请确认你拥有相关内容的下载权限。</p>
          <div id="legal-state" class="notice hidden"></div>
          <div id="legal-version-meta" class="meta-line"></div>
          <label id="legal-checkbox-row" class="checkbox-row">
            <input id="legal-confirm-check" type="checkbox" />
            <span>我已阅读并同意条款</span>
          </label>
          <div class="actions">
            <button id="accept-legal-btn" class="primary" type="button" disabled>同意条款</button>
          </div>
          <details class="details-card">
            <summary>查看全文</summary>
            <div id="legal-text" class="legal-text"><div class="empty">正在加载条款...</div></div>
          </details>
        </section>

        <section id="cookies-step" class="step-card">
          <div class="step-head">
            <div>
              <span class="step-kicker">Step 2</span>
              <h2>扫码登录</h2>
            </div>
            <span id="cookie-badge" class="badge warn">未完成</span>
          </div>
          <p class="muted">这里只保留二维码登录。扫码成功后，登录态会自动绑定到当前账号。</p>
          <div id="cookie-state" class="notice hidden"></div>
          <div id="cookie-meta" class="meta-line"></div>
          <div class="actions">
            <button id="start-login-workflow-btn" class="primary" type="button">启动二维码登录</button>
          </div>
          <div id="login-box" class="login-box hidden">
            <div id="login-status" class="login-status">正在生成二维码</div>
            <div id="login-hint" class="muted">二维码出现后，请使用钉钉扫码登录。</div>
            <img id="login-qr-image" class="qr-image hidden" alt="登录二维码" />
          </div>
        </section>

        <section id="download-step" class="step-card">
          <div class="step-head">
            <div>
              <span class="step-kicker">Step 3</span>
              <h2>下载</h2>
            </div>
            <span id="download-badge" class="badge warn">等待前置步骤</span>
          </div>
          <p class="muted">完成前两步后，这里才会开放。</p>
          <div id="download-lock" class="notice warn">请先同意条款并完成二维码登录。</div>
          <div id="download-panel" class="hidden">
            <div class="field">
              <label for="urls">回放链接</label>
              <textarea id="urls" placeholder="粘贴回放链接，每行一个"></textarea>
            </div>
            <div class="actions">
              <button id="create-job-btn" class="primary" type="button">开始下载</button>
              <button id="refresh-btn" type="button">刷新状态</button>
            </div>
          </div>
        </section>
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
        <p>查看当前账号、修改密码。管理员条款管理默认保持弱化，不干扰主流程。</p>
      </section>

      <section class="account-grid">
        <section class="panel">
          <div class="panel-head">
            <div>
              <span class="panel-kicker">Profile</span>
              <h2>账号信息</h2>
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
            <h2>条款管理</h2>
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
        --bg: #f5f7fb;
        --surface: rgba(255, 255, 255, 0.96);
        --surface-strong: #ffffff;
        --line: #e5e7eb;
        --line-strong: #cfd8e3;
        --text: #101828;
        --muted: #667085;
        --accent: #2563eb;
        --accent-strong: #1d4ed8;
        --accent-soft: rgba(37, 99, 235, 0.08);
        --ok: #157f3b;
        --warn: #b54708;
        --danger: #b42318;
        --shadow: 0 18px 40px rgba(15, 23, 42, 0.06);
        --radius-lg: 22px;
        --radius-md: 16px;
        --radius-sm: 12px;
      }
      * { box-sizing: border-box; }
      html, body {
        margin: 0;
        min-height: 100%;
        background:
          radial-gradient(circle at top left, rgba(37, 99, 235, 0.10), transparent 28%),
          linear-gradient(180deg, #f8fbff 0%, #f5f7fb 48%, #eef2f7 100%);
        color: var(--text);
        font-family: "Avenir Next", "PingFang SC", "Helvetica Neue", Arial, sans-serif;
      }
      body { padding: 0; }
      a { color: inherit; }
      button, input, textarea { font: inherit; }
      .hidden { display: none !important; }
      .app-shell {
        max-width: 1100px;
        margin: 0 auto;
        padding: 24px 18px 64px;
      }
      .app-header {
        display: flex;
        align-items: center;
        gap: 16px;
        justify-content: space-between;
        padding: 14px 0 22px;
      }
      .brand {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        text-decoration: none;
      }
      .brand-mark {
        width: 40px;
        height: 40px;
        border-radius: 13px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(180deg, var(--accent) 0%, var(--accent-strong) 100%);
        color: #eff6ff;
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
        padding: 9px 14px;
        border-radius: 999px;
        color: var(--muted);
        background: rgba(255, 255, 255, 0.72);
        border: 1px solid var(--line);
        font-weight: 600;
      }
      .nav-link.active {
        color: var(--text);
        background: var(--surface-strong);
        border-color: var(--line-strong);
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
        font-size: 40px;
        line-height: 1.04;
        letter-spacing: -0.04em;
      }
      .page-intro p {
        margin: 14px 0 0;
        max-width: 64ch;
        color: var(--muted);
        line-height: 1.72;
      }
      .eyebrow, .panel-kicker {
        color: var(--muted);
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 11px;
        font-weight: 700;
      }
      .step-kicker {
        color: var(--muted);
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 11px;
        font-weight: 700;
      }
      .auth-shell {
        max-width: 560px;
        margin: 72px auto 0;
        padding: 28px;
      }
      .auth-copy h1 {
        margin: 10px 0 0;
        font-size: 38px;
        line-height: 1.06;
        letter-spacing: -0.04em;
      }
      .auth-copy p {
        margin: 14px 0 0;
        color: var(--muted);
        line-height: 1.7;
      }
      .auth-tabs {
        display: inline-flex;
        gap: 6px;
        margin-top: 24px;
        padding: 6px;
        border-radius: 999px;
        background: #f8fafc;
        border: 1px solid var(--line);
      }
      .auth-tab {
        min-height: 40px;
        padding: 0 16px;
        border-radius: 999px;
        border: 0;
        background: transparent;
        color: var(--muted);
        font-weight: 700;
        cursor: pointer;
      }
      .auth-tab.active {
        background: var(--surface-strong);
        color: var(--text);
        box-shadow: 0 2px 10px rgba(15, 23, 42, 0.08);
      }
      .auth-form-panel {
        margin-top: 22px;
      }
      .auth-help {
        margin-top: 16px;
      }
      .auth-actions {
        margin-top: 22px;
      }
      .auth-main-btn {
        min-width: 132px;
      }
      .account-grid,
      .account-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
      }
      .status-panel,
      .flow-panel,
      .jobs-panel,
      .step-card,
      .panel {
        margin-top: 16px;
      }
      .step-stack {
        display: grid;
        gap: 14px;
        margin-top: 16px;
      }
      .panel,
      .step-card,
      .stat-card {
        background: var(--surface);
        border: 1px solid var(--line);
        box-shadow: var(--shadow);
        border-radius: var(--radius-lg);
      }
      .step-card {
        padding: 22px;
      }
      .step-card.done {
        border-color: rgba(21, 127, 59, 0.22);
      }
      .step-card.active {
        border-color: rgba(37, 99, 235, 0.22);
        box-shadow: 0 18px 40px rgba(37, 99, 235, 0.08);
      }
      .step-card.ready {
        border-color: rgba(37, 99, 235, 0.20);
      }
      .step-card.locked {
        opacity: 0.72;
      }
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
        font-size: 24px;
        letter-spacing: -0.03em;
      }
      .status-summary {
        display: grid;
        gap: 8px;
        margin-top: 10px;
      }
      .status-label {
        color: var(--muted);
        font-size: 13px;
        font-weight: 700;
      }
      .status-title {
        font-size: 30px;
        line-height: 1.15;
        font-weight: 800;
        letter-spacing: -0.04em;
      }
      .flow-steps {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
        margin-top: 8px;
      }
      .flow-chip {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px;
        border-radius: var(--radius-md);
        border: 1px solid var(--line);
        background: #fbfcfe;
      }
      .flow-chip.active,
      .flow-chip.ready {
        border-color: rgba(37, 99, 235, 0.24);
        background: rgba(37, 99, 235, 0.05);
      }
      .flow-chip.done {
        border-color: rgba(21, 127, 59, 0.22);
        background: rgba(21, 127, 59, 0.06);
      }
      .flow-chip.locked {
        opacity: 0.66;
      }
      .flow-step-no {
        flex: 0 0 34px;
        width: 34px;
        height: 34px;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: #eef2ff;
        color: var(--accent);
        font-weight: 800;
        font-size: 13px;
      }
      .flow-copy {
        display: grid;
        gap: 4px;
        min-width: 0;
      }
      .flow-copy strong {
        font-size: 15px;
      }
      .flow-copy span {
        color: var(--muted);
        font-size: 13px;
        line-height: 1.45;
      }
      .flow-summary {
        margin: 14px 0 0;
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
        background: rgba(181, 71, 8, 0.10);
        color: var(--warn);
      }
      .badge.ok {
        background: rgba(21, 127, 59, 0.10);
        color: var(--ok);
      }
      .badge.active {
        background: rgba(37, 99, 235, 0.08);
        color: var(--accent);
      }
      .badge.locked {
        background: rgba(15, 23, 42, 0.05);
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
        border-color: rgba(37, 99, 235, 0.42);
        box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.10);
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
        background: rgba(255, 255, 255, 0.92);
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
        color: #eff6ff;
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
        background: rgba(21, 127, 59, 0.08);
        color: var(--ok);
        border-color: rgba(21, 127, 59, 0.14);
      }
      .notice.warn {
        background: rgba(181, 71, 8, 0.08);
        color: var(--warn);
        border-color: rgba(181, 71, 8, 0.14);
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
        background: #fbfcfe;
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
        background: #fbfcfe;
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
        padding: 16px 18px;
        border-radius: var(--radius-md);
        box-shadow: none;
        background: #fbfcfe;
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
        background: #fbfcfe;
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
        background: linear-gradient(90deg, var(--accent) 0%, #60a5fa 100%);
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
        background: #ffffff;
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
        background: #fbfcfe;
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
        .account-grid,
        .stats-row {
          grid-template-columns: 1fr;
        }
        .flow-steps {
          grid-template-columns: 1fr;
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
        .auth-shell {
          margin-top: 28px;
          padding: 22px;
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
        .status-title {
          font-size: 26px;
        }
        .auth-copy h1 {
          font-size: 32px;
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
        authTab: "login",
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
        authTabLogin: document.getElementById("auth-tab-login"),
        authTabRegister: document.getElementById("auth-tab-register"),
        loginFormPanel: document.getElementById("login-form-panel"),
        registerFormPanel: document.getElementById("register-form-panel"),
        loginUsername: document.getElementById("login-username"),
        loginPassword: document.getElementById("login-password"),
        registerUsername: document.getElementById("register-username"),
        registerPassword: document.getElementById("register-password"),
        registerPasswordConfirm: document.getElementById("register-password-confirm"),
        registerCardHint: document.getElementById("register-card-hint"),
        loginBtn: document.getElementById("login-btn"),
        registerBtn: document.getElementById("register-btn"),
        userStatusLine: document.getElementById("user-status-line"),
        statusHelper: document.getElementById("status-helper"),
        flowChipLegal: document.getElementById("flow-chip-legal"),
        flowChipCookies: document.getElementById("flow-chip-cookies"),
        flowChipDownload: document.getElementById("flow-chip-download"),
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

      function normalizeErrorMessage(message) {
        const source = String(message || "").trim();
        const mapping = {
          "invalid username or password": "账号或密码错误",
          "username >= 3 and password >= 6 are required": "用户名至少 3 位，密码至少 6 位",
          "username already exists": "用户名已存在",
          "registration is closed": "当前未开放注册",
          "current password is incorrect": "当前密码错误",
          "new password must be at least 6 characters": "新密码至少 6 位",
          "current_password and new_password are required": "请完整填写密码信息",
          "username and password are required": "请填写用户名和密码",
          "login required": "请登录后继续",
          "legal disclaimer must be accepted before starting QR login": "请先同意使用条款",
          "legal disclaimer must be accepted before creating jobs": "请先同意使用条款",
          "cookies are missing or invalid": "请先完成扫码登录",
          "manual cookie upload disabled; use QR login": "Cookie 仅支持二维码登录获取",
        };
        return mapping[source] || source || "操作失败，请重试";
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
          case "queued": return "等待开始";
          case "running": return "正在下载";
          case "succeeded": return "下载完成";
          case "failed": return "下载失败";
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

      function setBadge(element, type, text) {
        if (!element) return;
        element.className = "badge " + type;
        element.textContent = text;
      }

      function switchAuthTab(nextTab) {
        state.authTab = nextTab === "register" ? "register" : "login";
        if (el.authTabLogin) el.authTabLogin.classList.toggle("active", state.authTab === "login");
        if (el.authTabRegister) el.authTabRegister.classList.toggle("active", state.authTab === "register");
        if (el.loginFormPanel) el.loginFormPanel.classList.toggle("hidden", state.authTab !== "login");
        if (el.registerFormPanel) el.registerFormPanel.classList.toggle("hidden", state.authTab !== "register");
      }

      function setFlowChipState(element, phase) {
        if (!element) return;
        element.className = "flow-chip " + phase;
      }

      function setStepState(element, phase) {
        if (!element) return;
        element.className = "step-card " + phase;
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

        const loginPhase = state.loginSessionStatus || "";
        let statusTitle = "请先同意使用条款";
        let statusHelper = "登录后先完成条款确认与扫码验证。";

        if (!state.legalAccepted) {
          statusTitle = "请先同意使用条款";
          statusHelper = "完成条款确认后才会生成二维码。";
        } else if (loginPhase === "pending") {
          statusTitle = "正在生成二维码";
          statusHelper = "二维码通常会在 1 分钟内出现。";
        } else if (loginPhase === "qr_ready") {
          statusTitle = "等待扫码登录";
          statusHelper = "请使用钉钉扫码登录。";
        } else if (loginPhase === "failed") {
          statusTitle = "登录失败";
          statusHelper = "二维码登录失败，请重新发起。";
        } else if (!state.cookiesReady) {
          statusTitle = "请完成扫码登录";
          statusHelper = "Cookie 只通过二维码登录获取。";
        } else {
          statusTitle = "可以开始下载";
          statusHelper = "现在可以粘贴回放链接并开始下载。";
        }

        if (el.userStatusLine) el.userStatusLine.textContent = statusTitle;
        if (el.statusHelper) el.statusHelper.textContent = statusHelper;

        if (el.flowSummary) {
          if (!state.legalAccepted) {
            el.flowSummary.textContent = "下一步：先同意使用条款。";
          } else if (loginPhase === "pending") {
            el.flowSummary.textContent = "下一步：等待二维码生成。";
          } else if (loginPhase === "qr_ready") {
            el.flowSummary.textContent = "下一步：请使用钉钉扫码登录。";
          } else if (!state.cookiesReady) {
            el.flowSummary.textContent = "下一步：启动二维码登录并完成扫码。";
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
          setStepState(el.legalStep, state.legalAccepted ? "done" : "ready");
        }
        setBadge(el.legalBadge, state.legalAccepted ? "ok" : "warn", state.legalAccepted ? "已完成" : "未完成");
        setFlowChipState(el.flowChipLegal, state.legalAccepted ? "done" : "active");

        if (el.cookieState) {
          el.cookieState.textContent = state.cookiesReady ? "Cookie 已就绪。" : "还没有通过二维码登录获取到 Cookie。";
          el.cookieState.className = "notice " + (state.cookiesReady ? "ok" : "warn");
          el.cookieState.classList.remove("hidden");
        }
        if (el.cookieMeta) {
          el.cookieMeta.textContent = state.cookiesUpdatedAt ? ("最近更新时间：" + formatTime(state.cookiesUpdatedAt)) : "尚未完成二维码登录。";
        }
        if (el.startLoginWorkflowBtn) {
          const loginBusy = state.loginSessionStatus === "pending" || state.loginSessionStatus === "qr_ready";
          el.startLoginWorkflowBtn.textContent = state.cookiesReady ? "重新二维码登录" : "启动二维码登录";
          el.startLoginWorkflowBtn.disabled = !state.legalAccepted || loginBusy;
        }
        if (el.cookiesStep) {
          if (!state.legalAccepted) {
            setStepState(el.cookiesStep, "locked");
          } else if (state.cookiesReady) {
            setStepState(el.cookiesStep, "done");
          } else {
            setStepState(el.cookiesStep, "active");
          }
        }
        setBadge(
          el.cookieBadge,
          state.cookiesReady ? "ok" : (state.legalAccepted ? "warn" : "locked"),
          state.cookiesReady ? "已完成" : (state.legalAccepted ? "等待扫码" : "等待上一步"),
        );
        if (!state.legalAccepted) {
          setFlowChipState(el.flowChipCookies, "locked");
        } else if (state.cookiesReady) {
          setFlowChipState(el.flowChipCookies, "done");
        } else {
          setFlowChipState(el.flowChipCookies, loginPhase === "qr_ready" ? "active" : "ready");
        }

        const canDownload = state.legalAccepted && state.cookiesReady;
        if (el.downloadPanel) {
          if (canDownload) el.downloadPanel.classList.remove("hidden"); else el.downloadPanel.classList.add("hidden");
        }
        if (el.downloadLock) {
          if (canDownload) {
            el.downloadLock.classList.add("hidden");
          } else {
            el.downloadLock.textContent = !state.legalAccepted
              ? "请先完成条款确认。"
              : "请先完成二维码登录。";
            el.downloadLock.classList.remove("hidden");
          }
        }
        if (el.downloadStep) {
          if (canDownload) {
            setStepState(el.downloadStep, "active");
          } else if (state.legalAccepted) {
            setStepState(el.downloadStep, "locked");
          } else {
            setStepState(el.downloadStep, "locked");
          }
        }
        setBadge(
          el.downloadBadge,
          canDownload ? "ok" : (state.legalAccepted ? "warn" : "locked"),
          canDownload ? "可下载" : (state.legalAccepted ? "等待扫码" : "等待前置步骤"),
        );
        if (canDownload) {
          setFlowChipState(el.flowChipDownload, "active");
        } else if (state.legalAccepted) {
          setFlowChipState(el.flowChipDownload, "locked");
        } else {
          setFlowChipState(el.flowChipDownload, "locked");
        }
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
          const badgeClass = job.status === "succeeded"
            ? "ok"
            : (job.status === "failed" ? "warn" : "active");
          return [
            '<section class="job-card">',
            '<div class="job-top">',
            '<div><span class="panel-kicker">Task #' + escapeHTML(job.id) + '</span><h3>' + escapeHTML(title) + '</h3></div>',
            '<span class="badge ' + badgeClass + '">' + escapeHTML(formatStatus(job.status)) + '</span>',
            '</div>',
            '<div class="progress-track"><div style="width:' + escapeHTML(progress.toFixed(1)) + '%"></div></div>',
            '<div class="job-meta"><span>阶段：' + escapeHTML(formatStage(job.stage)) + '</span><span>进度：' + escapeHTML(progress.toFixed(1)) + '%</span><span>创建时间：' + escapeHTML(formatTime(job.created_at)) + '</span></div>',
            files.length ? '<div class="file-list">' + files.map((file) => [
              '<div class="file-row">',
              '<div class="file-name">' + escapeHTML(file.name || file.relative_path || "未命名文件") + '</div>',
              file.download_url ? '<a class="file-link" href="' + escapeHTML(file.download_url) + '" target="_blank" rel="noreferrer">下载文件</a>' : '<span class="muted">处理中</span>',
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
          el.loginStatus.textContent = "正在生成二维码";
          el.loginHint.textContent = "通常约 1 分钟内出现二维码，请保持页面开启。";
          el.loginQRImage.classList.add("hidden");
        } else if (session.status === "qr_ready") {
          el.loginStatus.textContent = "请使用钉钉扫码登录";
          el.loginHint.textContent = "扫码成功后，登录态会自动绑定到当前账号。";
          el.loginQRImage.src = qrImageURL(session.qr_url || "");
          el.loginQRImage.classList.remove("hidden");
        } else if (session.status === "completed") {
          el.loginStatus.textContent = "登录成功";
          el.loginHint.textContent = "扫码验证已完成，现在可以开始下载。";
          el.loginQRImage.classList.add("hidden");
        } else {
          el.loginStatus.textContent = "登录失败";
          el.loginHint.textContent = session.error_message || "登录失败，请重试。";
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
          el.registerCardHint.textContent = state.registrationOpen ? "注册成功后请使用新账号登录" : "当前未开放注册";
        }
        if (PAGE === "login" && el.authTabRegister && el.registerFormPanel) {
          if (state.registrationOpen) {
            el.authTabRegister.classList.remove("hidden");
          } else {
            el.authTabRegister.classList.add("hidden");
            switchAuthTab("login");
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
        const username = (el.registerUsername ? el.registerUsername.value : "").trim();
        const password = (el.registerPassword ? el.registerPassword.value : "").trim();
        const confirmPassword = (el.registerPasswordConfirm ? el.registerPasswordConfirm.value : "").trim();
        if (password !== confirmPassword) {
          throw new Error("两次输入的密码不一致");
        }
        await request("/api/auth/register", {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
        });
        await request("/api/auth/logout", { method: "POST" });
        if (el.registerUsername) el.registerUsername.value = "";
        if (el.registerPassword) el.registerPassword.value = "";
        if (el.registerPasswordConfirm) el.registerPasswordConfirm.value = "";
        switchAuthTab("login");
        setNotice("注册成功，请登录", "ok");
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
        if (!state.legalAccepted || !state.cookiesReady) throw new Error("请先完成条款确认和扫码登录。");
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
            setNotice(normalizeErrorMessage(error.message), "error");
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
            setNotice(normalizeErrorMessage(error.message), "error");
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
            setNotice(normalizeErrorMessage(error.message), "error");
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
            setNotice(normalizeErrorMessage(error.message), "error");
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
            setNotice(normalizeErrorMessage(error.message), "error");
          } finally {
            setBusy(el.acceptLegalBtn, false);
          }
        });
      }

      if (el.startLoginWorkflowBtn) {
        el.startLoginWorkflowBtn.addEventListener("click", async () => {
          setBusy(el.startLoginWorkflowBtn, true);
          try {
            await startLoginWorkflow();
          } catch (error) {
            setNotice(normalizeErrorMessage(error.message), "error");
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
            setNotice(normalizeErrorMessage(error.message), "error");
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
            setNotice(normalizeErrorMessage(error.message), "error");
          }
        });
      }

      if (el.changePasswordBtn) {
        el.changePasswordBtn.addEventListener("click", async () => {
          setBusy(el.changePasswordBtn, true);
          try {
            await changePassword();
          } catch (error) {
            setNotice(normalizeErrorMessage(error.message), "error");
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
            setNotice(normalizeErrorMessage(error.message), "error");
          } finally {
            setBusy(el.saveLegalBtn, false);
          }
        });
      }

      if (el.authTabLogin) {
        el.authTabLogin.addEventListener("click", () => switchAuthTab("login"));
      }

      if (el.authTabRegister) {
        el.authTabRegister.addEventListener("click", () => switchAuthTab("register"));
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

      switchAuthTab("login");
      refreshAll().catch((error) => setNotice(normalizeErrorMessage(error.message), "error"));
      if (pollingHandle) clearInterval(pollingHandle);
      pollingHandle = setInterval(() => {
        refreshAll().catch(() => {});
      }, 5000);
    </script>
  </body>
</html>`;
}
