type AppPage = "overview" | "jobs" | "scan" | "login" | "account" | "legal" | "admin";

function renderLoginPage(): string {
  return `
      <section class="login-shell">
        <section class="panel login-brand-panel">
          <span class="eyebrow">Private Console</span>
          <h1>钉钉回放下载控制台</h1>
          <p>登录后按顺序完成条款确认、钉钉验证与下载提交。</p>
          <div class="login-points">
            <div class="login-point"><strong>1</strong><span>同意当前条款</span></div>
            <div class="login-point"><strong>2</strong><span>二维码登录获取钉钉验证</span></div>
            <div class="login-point"><strong>3</strong><span>提交回放链接开始下载</span></div>
          </div>
        </section>

        <section class="panel login-form-panel">
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
            <div class="muted form-note">登录后需完成条款确认与扫码验证</div>
            <div class="actions">
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
            <p id="register-card-hint" class="muted form-note">注册成功后将直接进入条款确认</p>
            <div class="actions">
              <button id="register-btn" class="auth-main-btn" type="button">注册</button>
            </div>
          </section>
        </section>
      </section>`;
}

function renderUserMenu(): string {
  return `
      <div id="user-menu-wrap" class="user-menu-wrap hidden">
        <button id="user-menu-trigger" class="avatar-trigger" type="button" aria-haspopup="menu" aria-expanded="false">
          <span id="avatar-fallback" class="avatar-fallback">U</span>
        </button>
        <div id="user-menu" class="user-menu hidden">
          <div class="user-menu-head">
            <div id="user-menu-name" class="user-menu-name">未登录</div>
            <div id="user-menu-role" class="user-menu-role">user</div>
          </div>
          <div class="user-menu-list">
            <a id="user-menu-account-link" data-page-link href="/account" class="user-menu-link">账号设置</a>
            <a id="user-menu-scan-link" data-page-link href="/scan" class="user-menu-link">钉钉验证</a>
            <a id="user-menu-jobs-link" data-page-link href="/jobs" class="user-menu-link">详细记录</a>
            <a id="user-menu-admin-link" data-page-link href="/admin" class="user-menu-link hidden">Admin</a>
            <button id="topbar-logout-btn" class="user-menu-link user-menu-action" type="button">退出登录</button>
          </div>
        </div>
      </div>`;
}

function renderHeader(page: AppPage): string {
  return `
      <header class="app-header">
        <a class="brand" data-page-link href="${page === "login" ? "/login" : "/overview"}">
          <span class="brand-mark">GD</span>
          <span class="brand-copy">
            <strong>GoDingtalk</strong>
            <span>Private Console</span>
          </span>
        </a>
        ${page === "login" ? "" : renderUserMenu()}
      </header>`;
}

function renderStatusStrip(): string {
  return `
      <section class="panel status-strip">
        <div class="status-copy">
          <span class="eyebrow">Current State</span>
          <h2 id="user-status-line">请先同意使用条款</h2>
          <p id="status-helper" class="muted">完成条款确认后，再进行钉钉验证与下载。</p>
        </div>
        <div class="status-stats">
          <article class="stat-tile">
            <span>钉钉验证</span>
            <strong id="stat-cookies">-</strong>
          </article>
          <article class="stat-tile">
            <span>总任务</span>
            <strong id="stat-total">0</strong>
          </article>
          <article class="stat-tile">
            <span>进行中</span>
            <strong id="stat-running">0</strong>
          </article>
          <article class="stat-tile">
            <span>已完成</span>
            <strong id="stat-success">0</strong>
          </article>
        </div>
      </section>`;
}

function renderOverviewPage(): string {
  return `
      <section class="page-intro">
        <span class="eyebrow">Overview</span>
        <h1>下载页面</h1>
        <p>左侧处理链接提交，右侧只保留最近 10 条简洁记录。完整记录请进入详细记录页面。</p>
      </section>

      ${renderStatusStrip()}

      <section class="overview-grid">
        <section class="panel composer-panel">
          <div class="panel-head">
            <div>
              <span class="panel-kicker">Submit</span>
              <h2>提交下载</h2>
            </div>
          </div>

          <div id="overview-gate" class="gate-box">
            <div id="overview-gate-title" class="gate-title">请先同意条款</div>
            <p id="overview-gate-copy" class="muted">完成条款确认后，才可以继续完成钉钉验证。</p>
            <div class="actions">
              <a id="overview-gate-link" data-page-link href="/legal" class="button-link primary">去同意条款</a>
            </div>
          </div>

          <div id="overview-download-form" class="hidden">
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

        <aside class="panel recent-panel">
          <div class="panel-head">
            <div>
              <span class="panel-kicker">Recent</span>
              <h2>近 10 条记录</h2>
            </div>
            <a data-page-link href="/jobs" class="mini-link">详细记录</a>
          </div>
          <div id="recent-records" class="recent-list"><div class="empty">暂无记录</div></div>
        </aside>
      </section>`;
}

function renderLegalPage(): string {
  return `
      <section class="page-intro">
        <span class="eyebrow">Legal</span>
        <h1>条款确认</h1>
        <p>新注册用户先在这里完成当前版本条款确认，一经同意，在条款变更前不会再次显示。</p>
      </section>

      <section class="legal-layout">
        <section id="legal-step" class="panel legal-action-panel">
          <div class="panel-head">
            <div>
              <span class="panel-kicker">Step 1</span>
              <h2>同意当前条款</h2>
            </div>
            <span id="legal-badge" class="badge warn">未完成</span>
          </div>
          <div id="legal-state" class="notice hidden"></div>
          <div id="legal-version-meta" class="meta-line"></div>
          <label id="legal-checkbox-row" class="checkbox-row">
            <input id="legal-confirm-check" type="checkbox" />
            <span>我已阅读并同意条款</span>
          </label>
          <div class="actions">
            <button id="accept-legal-btn" class="primary" type="button" disabled>同意条款</button>
          </div>
        </section>

        <section class="panel legal-doc-panel">
          <div class="panel-head">
            <div>
              <span class="panel-kicker">Document</span>
              <h2>条款全文</h2>
            </div>
          </div>
          <div id="legal-text" class="legal-text"><div class="empty">正在加载条款...</div></div>
        </section>
      </section>`;
}

function renderScanPage(): string {
  return `
      <section class="page-intro">
        <span class="eyebrow">Verification</span>
        <h1>钉钉验证</h1>
        <p>这里仅支持二维码登录。即使当前已有验证态，也可以重新扫码，因为钉钉验证会过期。</p>
      </section>

      <section class="scan-layout">
        <section class="panel scan-focus-panel">
          <div class="panel-head">
            <div>
              <span class="panel-kicker">Step 2</span>
              <h2>二维码登录</h2>
            </div>
            <span id="cookie-badge" class="badge warn">未完成</span>
          </div>

          <div id="cookie-state" class="notice hidden"></div>
          <div id="cookie-meta" class="meta-line"></div>

          <div class="actions">
            <button id="start-login-workflow-btn" class="primary" type="button">启动二维码登录</button>
          </div>

          <div id="login-box" class="scan-box hidden">
            <div id="login-status" class="scan-title">正在生成二维码</div>
            <div id="login-hint" class="muted">二维码出现后，请使用钉钉扫码登录。</div>
            <div class="scan-qr-frame">
              <img id="login-qr-image" class="qr-image hidden" alt="登录二维码" />
            </div>
          </div>
        </section>

        <aside class="panel scan-side-panel">
          <div class="panel-head">
            <div>
              <span class="panel-kicker">Flow</span>
              <h2>下一步</h2>
            </div>
          </div>
          <div class="scan-steps">
            <div class="scan-step"><strong>1</strong><span>等待二维码出现</span></div>
            <div class="scan-step"><strong>2</strong><span>使用钉钉扫码登录</span></div>
            <div class="scan-step"><strong>3</strong><span>登录成功后进入下载页面</span></div>
          </div>
        </aside>
      </section>`;
}

function renderJobsPage(): string {
  return `
      <section class="page-intro">
        <span class="eyebrow">Records</span>
        <h1>详细记录</h1>
        <p>记录采用单行列表展示，点击某一行后在下方展开详情。</p>
      </section>

      ${renderStatusStrip()}

      <section class="panel records-panel">
        <div class="records-toolbar">
          <div class="records-size-group">
            <span class="muted">每页显示</span>
            <div class="records-size-buttons">
              <button class="size-chip active" data-page-size="10" type="button">10</button>
              <button class="size-chip" data-page-size="20" type="button">20</button>
              <button class="size-chip" data-page-size="50" type="button">50</button>
            </div>
          </div>
          <div id="jobs-pagination-summary" class="muted">第 1 页</div>
        </div>

        <div id="jobs-detail-list" class="records-list"><div class="empty">正在加载记录...</div></div>

        <div class="records-footer">
          <button id="jobs-prev-btn" type="button">上一页</button>
          <div id="jobs-page-indicator" class="muted">1 / 1</div>
          <button id="jobs-next-btn" type="button">下一页</button>
        </div>
      </section>`;
}

function renderAccountPage(): string {
  return `
      <section class="page-intro">
        <span class="eyebrow">Account</span>
        <h1>账号设置</h1>
        <p>这里只保留当前账号信息、修改密码和退出登录。</p>
      </section>

      <section class="account-layout">
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
      </section>`;
}

function renderAdminPage(): string {
  return `
      <section class="page-intro">
        <span class="eyebrow">Admin</span>
        <h1>管理页</h1>
        <p>这里只展示 sudo 需要处理的内容：R2 文件、异常用户和条款管理。</p>
      </section>

      <section class="admin-layout">
        <section class="panel">
          <div class="panel-head">
            <div>
              <span class="panel-kicker">R2 Storage</span>
              <h2>R2 文件</h2>
            </div>
          </div>
          <div class="storage-toolbar">
            <div class="field storage-search">
              <label for="admin-storage-prefix">对象前缀</label>
              <input id="admin-storage-prefix" placeholder="例如 dedup/" />
            </div>
            <div class="actions">
              <button id="admin-storage-refresh-btn" class="primary" type="button">刷新文件</button>
            </div>
          </div>
          <div id="admin-storage-meta" class="meta-line"></div>
          <div id="admin-storage-list" class="storage-list"><div class="empty">正在加载 R2 文件...</div></div>
          <div class="actions">
            <button id="admin-storage-more-btn" class="hidden" type="button">加载更多</button>
          </div>
        </section>

        <section class="panel">
          <div class="panel-head">
            <div>
              <span class="panel-kicker">Users</span>
              <h2>需要处理的用户</h2>
            </div>
          </div>
          <div id="admin-user-meta" class="meta-line"></div>
          <div id="admin-users" class="admin-users"><div class="empty">正在加载用户数据...</div></div>
        </section>

        <section class="panel">
          <div class="panel-head">
            <div>
              <span class="panel-kicker">Legal</span>
              <h2>条款管理</h2>
            </div>
          </div>
          <div class="field">
            <label for="admin-legal-text">条款内容</label>
            <textarea id="admin-legal-text" class="large-textarea" placeholder="输入新的条款正文"></textarea>
          </div>
          <div class="actions">
            <button id="save-legal-btn" class="primary" type="button">保存条款</button>
          </div>
          <div id="admin-legal-meta" class="meta-line"></div>
        </section>
      </section>`;
}

function renderPageBody(page: AppPage): string {
  switch (page) {
    case "login":
      return renderLoginPage();
    case "legal":
      return renderLegalPage();
    case "scan":
      return renderScanPage();
    case "jobs":
      return renderJobsPage();
    case "account":
      return renderAccountPage();
    case "admin":
      return renderAdminPage();
    case "overview":
    default:
      return renderOverviewPage();
  }
}

export function renderApp(_appOrigin: string, page: AppPage): string {
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="data:," />
    <title>GoDingtalk</title>
    <style>
      :root {
        --bg: #f4f6fb;
        --surface: #ffffff;
        --surface-soft: #f8fbff;
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
        --shadow: 0 18px 44px rgba(15, 23, 42, 0.06);
        --radius-lg: 22px;
        --radius-md: 16px;
        --radius-sm: 12px;
      }
      * { box-sizing: border-box; }
      html, body {
        margin: 0;
        min-height: 100%;
        background:
          radial-gradient(circle at top left, rgba(37, 99, 235, 0.08), transparent 28%),
          linear-gradient(180deg, #f8fbff 0%, #f4f6fb 48%, #edf2f7 100%);
        color: var(--text);
        font-family: "Avenir Next", "PingFang SC", "Helvetica Neue", Arial, sans-serif;
      }
      body { padding: 0; overflow-x: hidden; }
      body.page-ready .app-shell { opacity: 1; transform: none; }
      body.page-leaving .app-shell { opacity: 0; transform: translateY(8px); }
      a { color: inherit; }
      button, input, textarea { font: inherit; }
      .hidden { display: none !important; }
      .app-shell {
        max-width: 1180px;
        margin: 0 auto;
        padding: 24px 18px 64px;
        opacity: 0;
        transform: translateY(6px);
        transition: opacity 180ms ease, transform 220ms ease;
      }
      .app-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 10px 0 26px;
      }
      .brand {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        text-decoration: none;
      }
      .brand-mark {
        width: 42px;
        height: 42px;
        border-radius: 14px;
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
        font-size: 17px;
        letter-spacing: -0.02em;
      }
      .brand-copy span {
        color: var(--muted);
        font-size: 12px;
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
      .panel {
        background: var(--surface);
        border: 1px solid var(--line);
        box-shadow: var(--shadow);
        border-radius: var(--radius-lg);
        padding: 22px;
      }
      .panel-head {
        display: flex;
        align-items: start;
        justify-content: space-between;
        gap: 12px;
      }
      .panel-head h2 {
        margin: 6px 0 0;
        font-size: 24px;
        letter-spacing: -0.03em;
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
        background: #ffffff;
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
        min-height: 150px;
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
      button, .button-link, .mini-link {
        appearance: none;
        border: 1px solid var(--line);
        background: rgba(255, 255, 255, 0.95);
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
        transition: box-shadow 140ms ease, border-color 140ms ease, background 140ms ease;
      }
      .mini-link {
        min-height: 34px;
        padding: 0 12px;
        font-size: 13px;
      }
      button.primary, .button-link.primary {
        color: #eff6ff;
        border-color: transparent;
        background: linear-gradient(180deg, var(--accent) 0%, var(--accent-strong) 100%);
      }
      button:hover, .button-link:hover, .mini-link:hover {
        box-shadow: 0 6px 16px rgba(37, 99, 235, 0.10);
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
      .meta-line, .muted {
        color: var(--muted);
        line-height: 1.7;
        font-size: 13px;
      }
      .badge {
        display: inline-flex;
        align-items: center;
        min-height: 30px;
        padding: 0 12px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 700;
        white-space: nowrap;
        border: 1px solid transparent;
      }
      .badge.ok {
        background: rgba(21, 127, 59, 0.10);
        color: var(--ok);
      }
      .badge.warn {
        background: rgba(181, 71, 8, 0.10);
        color: var(--warn);
      }
      .badge.active {
        background: rgba(37, 99, 235, 0.08);
        color: var(--accent);
      }
      .user-menu-wrap {
        position: relative;
      }
      .avatar-trigger {
        width: 44px;
        height: 44px;
        padding: 0;
        border-radius: 999px;
        background: #ffffff;
        border: 1px solid var(--line-strong);
        box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);
      }
      .avatar-fallback {
        display: inline-flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        font-weight: 800;
      }
      .user-menu {
        position: absolute;
        top: calc(100% + 10px);
        right: 0;
        width: 240px;
        border-radius: 18px;
        border: 1px solid var(--line);
        background: rgba(255,255,255,0.98);
        box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
        padding: 14px;
        z-index: 30;
      }
      .user-menu-head {
        padding: 4px 4px 12px;
        border-bottom: 1px solid var(--line);
      }
      .user-menu-name {
        font-weight: 800;
      }
      .user-menu-role {
        margin-top: 6px;
        color: var(--muted);
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }
      .user-menu-list {
        display: grid;
        gap: 8px;
        margin-top: 12px;
      }
      .user-menu-link {
        min-height: 40px;
        border-radius: 12px;
        padding: 0 12px;
        text-decoration: none;
        display: flex;
        align-items: center;
        color: var(--text);
        border: 1px solid transparent;
        background: transparent;
      }
      .user-menu-link:hover {
        background: var(--surface-soft);
        border-color: rgba(207, 216, 227, 0.8);
      }
      .user-menu-action {
        justify-content: flex-start;
      }
      .login-shell {
        display: grid;
        grid-template-columns: minmax(0, 1.1fr) minmax(380px, 0.9fr);
        gap: 18px;
        align-items: stretch;
      }
      .login-brand-panel {
        display: grid;
        align-content: start;
        gap: 18px;
      }
      .login-brand-panel h1 {
        margin: 8px 0 0;
        font-size: 42px;
        line-height: 1.04;
        letter-spacing: -0.04em;
      }
      .login-brand-panel p {
        margin: 0;
        color: var(--muted);
        line-height: 1.76;
      }
      .login-points {
        display: grid;
        gap: 14px;
      }
      .login-point {
        display: grid;
        grid-template-columns: 34px minmax(0, 1fr);
        gap: 12px;
        align-items: start;
      }
      .login-point strong {
        width: 34px;
        height: 34px;
        border-radius: 999px;
        background: var(--accent-soft);
        color: var(--accent);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      }
      .auth-tabs {
        display: inline-flex;
        gap: 6px;
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
      }
      .auth-tab.active {
        background: #ffffff;
        color: var(--text);
        box-shadow: 0 2px 10px rgba(15, 23, 42, 0.08);
      }
      .auth-form-panel {
        margin-top: 22px;
      }
      .auth-main-btn {
        min-width: 132px;
      }
      .status-strip {
        display: grid;
        gap: 18px;
      }
      .status-copy h2 {
        margin: 8px 0 0;
        font-size: 30px;
        letter-spacing: -0.04em;
      }
      .status-copy p {
        margin: 12px 0 0;
      }
      .status-stats {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 14px;
      }
      .stat-tile {
        border: 1px solid var(--line);
        border-radius: var(--radius-md);
        background: var(--surface-soft);
        padding: 16px;
      }
      .stat-tile span {
        color: var(--muted);
        font-size: 13px;
      }
      .stat-tile strong {
        display: block;
        margin-top: 8px;
        font-size: 28px;
        letter-spacing: -0.04em;
      }
      .overview-grid,
      .legal-layout,
      .scan-layout,
      .account-layout,
      .admin-layout {
        display: grid;
        gap: 18px;
        margin-top: 18px;
      }
      .overview-grid {
        grid-template-columns: minmax(0, 1.15fr) 380px;
        align-items: start;
      }
      .legal-layout {
        grid-template-columns: minmax(320px, 0.7fr) minmax(0, 1.3fr);
      }
      .scan-layout {
        grid-template-columns: minmax(0, 1.15fr) 320px;
      }
      .account-layout {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .admin-layout {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      .gate-box {
        margin-top: 8px;
        border: 1px dashed rgba(37, 99, 235, 0.24);
        border-radius: var(--radius-md);
        background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(248,251,255,0.95));
        padding: 22px;
      }
      .gate-title {
        font-size: 22px;
        font-weight: 800;
        letter-spacing: -0.03em;
      }
      .recent-panel {
        display: grid;
        gap: 12px;
      }
      .recent-list {
        display: grid;
        gap: 10px;
      }
      .recent-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto auto;
        gap: 10px;
        align-items: center;
        min-height: 42px;
        padding: 0 10px;
        border-radius: 12px;
        background: var(--surface-soft);
        border: 1px solid var(--line);
      }
      .recent-title {
        min-width: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: 600;
      }
      .recent-time {
        color: var(--muted);
        font-size: 12px;
        white-space: nowrap;
      }
      .legal-action-panel, .legal-doc-panel, .scan-focus-panel, .scan-side-panel {
        min-height: 100%;
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
      .legal-text {
        display: grid;
        gap: 12px;
        line-height: 1.75;
      }
      .legal-text h3 {
        margin: 0;
        font-size: 18px;
      }
      .legal-text p {
        margin: 0;
      }
      .scan-box {
        margin-top: 18px;
        border-radius: var(--radius-md);
        border: 1px solid rgba(37, 99, 235, 0.18);
        background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(245,248,255,0.95));
        padding: 18px;
      }
      .scan-title {
        font-size: 22px;
        font-weight: 800;
        letter-spacing: -0.03em;
      }
      .scan-qr-frame {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 320px;
        margin-top: 16px;
        border-radius: 18px;
        background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
        border: 1px dashed rgba(37, 99, 235, 0.22);
      }
      .qr-image {
        display: block;
        width: 280px;
        max-width: 100%;
        border-radius: var(--radius-md);
        border: 1px solid var(--line);
        background: #fff;
      }
      .scan-steps {
        display: grid;
        gap: 14px;
      }
      .scan-step {
        display: grid;
        grid-template-columns: 34px minmax(0, 1fr);
        gap: 12px;
        align-items: start;
      }
      .scan-step strong {
        width: 34px;
        height: 34px;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: var(--accent-soft);
        color: var(--accent);
        font-size: 12px;
      }
      .records-panel {
        margin-top: 18px;
      }
      .records-toolbar,
      .records-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        flex-wrap: wrap;
      }
      .records-size-group {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
      }
      .records-size-buttons {
        display: flex;
        gap: 8px;
      }
      .size-chip {
        min-height: 36px;
        padding: 0 14px;
        border-radius: 999px;
        border: 1px solid var(--line);
        background: #ffffff;
        color: var(--muted);
        font-weight: 700;
      }
      .size-chip.active {
        border-color: rgba(37, 99, 235, 0.22);
        background: rgba(37, 99, 235, 0.08);
        color: var(--accent);
      }
      .records-list {
        display: grid;
        gap: 12px;
        margin-top: 16px;
      }
      .job-row {
        border: 1px solid var(--line);
        border-radius: var(--radius-md);
        background: var(--surface-soft);
        overflow: hidden;
      }
      .job-row-main {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 100px 110px 70px auto;
        gap: 10px;
        align-items: center;
        min-height: 52px;
        padding: 0 14px;
        cursor: pointer;
      }
      .job-row-title {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 600;
      }
      .job-row-meta {
        color: var(--muted);
        font-size: 12px;
        white-space: nowrap;
      }
      .job-row-detail {
        border-top: 1px solid var(--line);
        padding: 14px;
        background: #ffffff;
      }
      .job-row-detail-grid {
        display: grid;
        gap: 12px;
      }
      .job-inline-files {
        display: grid;
        gap: 8px;
      }
      .job-inline-file {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        border: 1px solid var(--line);
        border-radius: 12px;
        background: var(--surface-soft);
        padding: 10px 12px;
      }
      .job-inline-errors {
        color: var(--danger);
        line-height: 1.7;
      }
      .admin-users,
      .storage-list {
        display: grid;
        gap: 12px;
      }
      .admin-user,
      .storage-item {
        border: 1px solid var(--line);
        border-radius: var(--radius-md);
        background: var(--surface-soft);
        padding: 16px;
      }
      .admin-user-name,
      .storage-name {
        font-size: 17px;
        font-weight: 800;
      }
      .storage-toolbar {
        display: flex;
        align-items: end;
        gap: 14px;
        flex-wrap: wrap;
      }
      .storage-search {
        flex: 1 1 260px;
      }
      .storage-head {
        display: flex;
        align-items: start;
        justify-content: space-between;
        gap: 12px;
      }
      .storage-key {
        color: var(--muted);
        font-size: 12px;
        word-break: break-all;
      }
      .storage-meta-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 8px 14px;
        color: var(--muted);
        font-size: 13px;
      }
      .storage-meta-grid strong {
        color: var(--text);
      }
      .storage-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .storage-tag {
        display: inline-flex;
        min-height: 28px;
        align-items: center;
        padding: 0 10px;
        border-radius: 999px;
        background: rgba(37, 99, 235, 0.08);
        color: var(--accent);
        font-size: 12px;
        font-weight: 700;
      }
      .empty {
        padding: 28px 12px;
        text-align: center;
        color: var(--muted);
      }
      @media (max-width: 980px) {
        .overview-grid,
        .legal-layout,
        .scan-layout,
        .account-layout,
        .admin-layout,
        .login-shell {
          grid-template-columns: 1fr;
        }
        .status-stats {
          grid-template-columns: 1fr 1fr;
        }
        .job-row-main {
          grid-template-columns: minmax(0, 1fr);
          padding-top: 12px;
          padding-bottom: 12px;
        }
      }
      @media (max-width: 640px) {
        .app-shell {
          padding: 18px 14px 40px;
        }
        .page-intro h1,
        .login-brand-panel h1 {
          font-size: 32px;
        }
        .status-stats {
          grid-template-columns: 1fr;
        }
        .recent-row {
          grid-template-columns: minmax(0, 1fr);
          gap: 6px;
          padding-top: 10px;
          padding-bottom: 10px;
        }
        .storage-head,
        .records-toolbar,
        .records-footer,
        .panel-head {
          flex-direction: column;
          align-items: start;
        }
      }
    </style>
  </head>
  <body data-page="${page}">
    <div class="app-shell">
      ${renderHeader(page)}
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
        loginSessionId: "",
        loginSessionStatus: "",
        recentJobs: [],
        jobsPageItems: [],
        jobsPage: 1,
        jobsPageSize: 10,
        jobsTotal: 0,
        jobsTotalPages: 1,
        expandedJobId: "",
        adminStorageItems: [],
        adminStorageCursor: "",
        adminStorageHasMore: false,
        adminStoragePrefix: "",
        adminLegalDirty: false,
      };

      const el = {
        notice: document.getElementById("notice"),
        userMenuWrap: document.getElementById("user-menu-wrap"),
        userMenuTrigger: document.getElementById("user-menu-trigger"),
        userMenu: document.getElementById("user-menu"),
        userMenuName: document.getElementById("user-menu-name"),
        userMenuRole: document.getElementById("user-menu-role"),
        userMenuAdminLink: document.getElementById("user-menu-admin-link"),
        userMenuAccountLink: document.getElementById("user-menu-account-link"),
        userMenuScanLink: document.getElementById("user-menu-scan-link"),
        userMenuJobsLink: document.getElementById("user-menu-jobs-link"),
        avatarFallback: document.getElementById("avatar-fallback"),
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
        statCookies: document.getElementById("stat-cookies"),
        statTotal: document.getElementById("stat-total"),
        statRunning: document.getElementById("stat-running"),
        statSuccess: document.getElementById("stat-success"),
        overviewGate: document.getElementById("overview-gate"),
        overviewGateTitle: document.getElementById("overview-gate-title"),
        overviewGateCopy: document.getElementById("overview-gate-copy"),
        overviewGateLink: document.getElementById("overview-gate-link"),
        overviewDownloadForm: document.getElementById("overview-download-form"),
        urls: document.getElementById("urls"),
        createJobBtn: document.getElementById("create-job-btn"),
        refreshBtn: document.getElementById("refresh-btn"),
        recentRecords: document.getElementById("recent-records"),
        legalBadge: document.getElementById("legal-badge"),
        legalState: document.getElementById("legal-state"),
        legalVersionMeta: document.getElementById("legal-version-meta"),
        legalText: document.getElementById("legal-text"),
        legalConfirmCheck: document.getElementById("legal-confirm-check"),
        legalCheckboxRow: document.getElementById("legal-checkbox-row"),
        acceptLegalBtn: document.getElementById("accept-legal-btn"),
        cookieBadge: document.getElementById("cookie-badge"),
        cookieState: document.getElementById("cookie-state"),
        cookieMeta: document.getElementById("cookie-meta"),
        startLoginWorkflowBtn: document.getElementById("start-login-workflow-btn"),
        loginBox: document.getElementById("login-box"),
        loginStatus: document.getElementById("login-status"),
        loginHint: document.getElementById("login-hint"),
        loginQRImage: document.getElementById("login-qr-image"),
        jobsDetailList: document.getElementById("jobs-detail-list"),
        jobsPaginationSummary: document.getElementById("jobs-pagination-summary"),
        jobsPageIndicator: document.getElementById("jobs-page-indicator"),
        jobsPrevBtn: document.getElementById("jobs-prev-btn"),
        jobsNextBtn: document.getElementById("jobs-next-btn"),
        pageSizeButtons: Array.from(document.querySelectorAll("[data-page-size]")),
        accountSummary: document.getElementById("account-summary"),
        currentPassword: document.getElementById("current-password"),
        newPassword: document.getElementById("new-password"),
        confirmNewPassword: document.getElementById("confirm-new-password"),
        changePasswordBtn: document.getElementById("change-password-btn"),
        adminUsers: document.getElementById("admin-users"),
        adminUserMeta: document.getElementById("admin-user-meta"),
        adminStoragePrefix: document.getElementById("admin-storage-prefix"),
        adminStorageRefreshBtn: document.getElementById("admin-storage-refresh-btn"),
        adminStorageMeta: document.getElementById("admin-storage-meta"),
        adminStorageList: document.getElementById("admin-storage-list"),
        adminStorageMoreBtn: document.getElementById("admin-storage-more-btn"),
        adminLegalText: document.getElementById("admin-legal-text"),
        saveLegalBtn: document.getElementById("save-legal-btn"),
        adminLegalMeta: document.getElementById("admin-legal-meta"),
      };

      let pollingHandle = null;
      let userMenuOpen = false;

      function setNotice(message, type) {
        if (!el.notice) return;
        el.notice.textContent = message;
        el.notice.className = "notice " + (type || "ok");
        el.notice.classList.remove("hidden");
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
          "legal disclaimer must be accepted before starting QR login": "请先同意条款",
          "legal disclaimer must be accepted before creating jobs": "请先同意条款",
          "cookies are missing or invalid": "请先完成扫码登录",
          "manual cookie upload disabled; use QR login": "钉钉验证仅支持二维码登录获取",
          "sudo required": "需要 sudo 权限",
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

      function formatBytes(value) {
        const size = Number(value || 0);
        if (!Number.isFinite(size) || size <= 0) return "0 B";
        const units = ["B", "KB", "MB", "GB", "TB"];
        let current = size;
        let index = 0;
        while (current >= 1024 && index < units.length - 1) {
          current /= 1024;
          index += 1;
        }
        const digits = current >= 100 || index === 0 ? 0 : 1;
        return current.toFixed(digits) + " " + units[index];
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

      function request(path, options) {
        return fetch(path, {
          ...(options || {}),
          headers: {
            ...(options && options.headers ? options.headers : {}),
            ...(options && options.body ? { "Content-Type": "application/json" } : {}),
          },
        }).then(async (response) => {
          const contentType = response.headers.get("content-type") || "";
          const payload = contentType.includes("application/json") ? await response.json() : await response.text();
          if (!response.ok) {
            const message = typeof payload === "string" ? payload : (payload.error || payload.message || ("Request failed: " + response.status));
            throw new Error(message);
          }
          return payload;
        });
      }

      function redirectTo(path) {
        window.location.href = path;
      }

      function setBadge(element, type, text) {
        if (!element) return;
        element.className = "badge " + type;
        element.textContent = text;
      }

      function setUserMenuOpen(nextOpen) {
        userMenuOpen = Boolean(nextOpen);
        if (!el.userMenu || !el.userMenuTrigger) return;
        if (userMenuOpen) {
          el.userMenu.classList.remove("hidden");
          el.userMenuTrigger.setAttribute("aria-expanded", "true");
        } else {
          el.userMenu.classList.add("hidden");
          el.userMenuTrigger.setAttribute("aria-expanded", "false");
        }
      }

      function setupUserMenu() {
        if (!el.userMenuWrap || !el.userMenuTrigger || !el.userMenu) return;

        const prefersHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        if (prefersHover) {
          el.userMenuWrap.addEventListener("mouseenter", () => setUserMenuOpen(true));
          el.userMenuWrap.addEventListener("mouseleave", () => setUserMenuOpen(false));
        }

        el.userMenuTrigger.addEventListener("click", (event) => {
          event.stopPropagation();
          setUserMenuOpen(!userMenuOpen);
        });

        document.addEventListener("click", (event) => {
          if (!el.userMenuWrap.contains(event.target)) {
            setUserMenuOpen(false);
          }
        });
      }

      function setupPageTransitions() {
        requestAnimationFrame(() => {
          document.body.classList.add("page-ready");
        });

        document.querySelectorAll("[data-page-link]").forEach((link) => {
          const anchor = link;
          if (anchor.dataset.transitionBound === "1") return;
          anchor.dataset.transitionBound = "1";
          anchor.addEventListener("click", (event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            if (anchor.target && anchor.target !== "_self") return;
            const href = anchor.getAttribute("href") || "";
            if (!href.startsWith("/")) return;
            event.preventDefault();
            setUserMenuOpen(false);
            document.body.classList.add("page-leaving");
            window.setTimeout(() => {
              window.location.href = href;
            }, 140);
          });
        });
      }

      function switchAuthTab(nextTab) {
        state.authTab = nextTab === "register" ? "register" : "login";
        if (el.authTabLogin) el.authTabLogin.classList.toggle("active", state.authTab === "login");
        if (el.authTabRegister) el.authTabRegister.classList.toggle("active", state.authTab === "register");
        if (el.loginFormPanel) el.loginFormPanel.classList.toggle("hidden", state.authTab !== "login");
        if (el.registerFormPanel) el.registerFormPanel.classList.toggle("hidden", state.authTab !== "register");
      }

      function renderHeaderState() {
        if (!el.userMenuWrap) return;
        if (!state.authenticated || !state.user) {
          el.userMenuWrap.classList.add("hidden");
          return;
        }
        el.userMenuWrap.classList.remove("hidden");
        const username = state.user.username || "";
        const initials = username.slice(0, 2).toUpperCase() || "U";
        if (el.avatarFallback) el.avatarFallback.textContent = initials;
        if (el.userMenuName) el.userMenuName.textContent = username;
        if (el.userMenuRole) el.userMenuRole.textContent = state.user.is_sudo ? "sudo" : "user";
        if (el.userMenuAdminLink) {
          if (state.user.is_sudo) el.userMenuAdminLink.classList.remove("hidden"); else el.userMenuAdminLink.classList.add("hidden");
        }
      }

      function renderStatusStrip(payload) {
        if (!el.userStatusLine || !el.statusHelper) return;
        let title = "请先同意使用条款";
        let helper = "完成条款确认后，再进行钉钉验证与下载。";

        if (!state.legalAccepted) {
          title = "请先同意使用条款";
          helper = "条款确认完成后才会继续下一步。";
        } else if (!state.cookiesReady) {
          title = "请先完成钉钉验证";
          helper = "当前仅支持二维码登录获取钉钉验证。";
        } else {
          title = "可以开始下载";
          helper = "现在可以直接粘贴回放链接并提交下载。";
        }

        el.userStatusLine.textContent = title;
        el.statusHelper.textContent = helper;

        if (el.statCookies) el.statCookies.textContent = state.cookiesReady ? "已就绪" : "未验证";
        if (el.statTotal) el.statTotal.textContent = String(payload.total_jobs || 0);
        if (el.statRunning) el.statRunning.textContent = String((payload.running_jobs || 0) + (payload.queued_jobs || 0));
        if (el.statSuccess) el.statSuccess.textContent = String(payload.succeeded_jobs || 0);
      }

      function renderOverviewState() {
        if (!el.overviewGate || !el.overviewGateTitle || !el.overviewGateCopy || !el.overviewGateLink || !el.overviewDownloadForm) return;

        if (!state.legalAccepted) {
          el.overviewGate.classList.remove("hidden");
          el.overviewDownloadForm.classList.add("hidden");
          el.overviewGateTitle.textContent = "请先同意条款";
          el.overviewGateCopy.textContent = "当前版本条款尚未确认，先去完成条款确认。";
          el.overviewGateLink.textContent = "去同意条款";
          el.overviewGateLink.setAttribute("href", "/legal");
          return;
        }

        if (!state.cookiesReady) {
          el.overviewGate.classList.remove("hidden");
          el.overviewDownloadForm.classList.add("hidden");
          el.overviewGateTitle.textContent = "请先完成钉钉验证";
          el.overviewGateCopy.textContent = "当前仅支持二维码登录获取钉钉验证。";
          el.overviewGateLink.textContent = "去钉钉验证";
          el.overviewGateLink.setAttribute("href", "/scan");
          return;
        }

        el.overviewGate.classList.add("hidden");
        el.overviewDownloadForm.classList.remove("hidden");
      }

      function renderRecentJobs(jobs) {
        if (!el.recentRecords) return;
        const records = Array.isArray(jobs) ? jobs : [];
        if (records.length === 0) {
          el.recentRecords.innerHTML = '<div class="empty">暂无记录</div>';
          return;
        }

        el.recentRecords.innerHTML = records.map((job) => {
          const title = job.current_title || (Array.isArray(job.titles) && job.titles[0]) || "下载任务";
          const badgeClass = job.status === "succeeded" ? "ok" : (job.status === "failed" ? "warn" : "active");
          return [
            '<div class="recent-row">',
            '<div class="recent-title">' + escapeHTML(title) + '</div>',
            '<span class="badge ' + badgeClass + '">' + escapeHTML(formatStatus(job.status)) + '</span>',
            '<div class="recent-time">' + escapeHTML(formatTime(job.updated_at || job.created_at)) + '</div>',
            '</div>',
          ].join("");
        }).join("");
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

      function renderLegalState() {
        if (!el.legalBadge || !el.legalState || !el.legalVersionMeta || !el.acceptLegalBtn || !el.legalConfirmCheck || !el.legalCheckboxRow) return;
        el.legalVersionMeta.textContent = state.legalVersion ? ("当前版本：" + state.legalVersion) : "";
        if (state.legalAccepted) {
          setBadge(el.legalBadge, "ok", "已完成");
          el.legalState.textContent = "当前版本已同意";
          el.legalState.className = "notice ok";
          el.legalState.classList.remove("hidden");
          el.legalCheckboxRow.classList.add("hidden");
          el.acceptLegalBtn.classList.add("hidden");
        } else {
          setBadge(el.legalBadge, "warn", "未完成");
          el.legalState.textContent = "同意当前版本后，将自动进入钉钉验证";
          el.legalState.className = "notice warn";
          el.legalState.classList.remove("hidden");
          el.legalCheckboxRow.classList.remove("hidden");
          el.acceptLegalBtn.classList.remove("hidden");
          el.legalConfirmCheck.disabled = false;
          el.legalConfirmCheck.checked = state.legalConfirmVersion === state.legalVersion && Boolean(state.legalVersion);
          el.acceptLegalBtn.disabled = !state.legalVersion || state.legalConfirmVersion !== state.legalVersion;
        }
      }

      function qrImageURL(value) {
        if (!value) return "";
        return "https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=" + encodeURIComponent(value);
      }

      function renderScanState() {
        if (!el.cookieBadge || !el.cookieState || !el.cookieMeta || !el.startLoginWorkflowBtn) return;
        const loginBusy = state.loginSessionStatus === "pending" || state.loginSessionStatus === "qr_ready";
        if (state.cookiesReady) {
          setBadge(el.cookieBadge, "ok", "已完成");
          el.cookieState.textContent = "钉钉验证已就绪";
          el.cookieState.className = "notice ok";
          el.cookieState.classList.remove("hidden");
          el.cookieMeta.textContent = state.cookiesUpdatedAt ? ("最近更新时间：" + formatTime(state.cookiesUpdatedAt)) : "";
          el.startLoginWorkflowBtn.textContent = "重新二维码登录";
        } else {
          setBadge(el.cookieBadge, loginBusy ? "active" : "warn", loginBusy ? "进行中" : "未完成");
          el.cookieState.textContent = "钉钉验证尚未就绪";
          el.cookieState.className = "notice warn";
          el.cookieState.classList.remove("hidden");
          el.cookieMeta.textContent = "仅支持通过二维码登录获取钉钉验证";
          el.startLoginWorkflowBtn.textContent = "启动二维码登录";
        }
        el.startLoginWorkflowBtn.disabled = !state.legalAccepted || loginBusy;
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
          el.loginHint.textContent = "扫码成功后，钉钉验证会自动绑定到当前账号。";
          el.loginQRImage.src = qrImageURL(session.qr_url || "");
          el.loginQRImage.classList.remove("hidden");
        } else if (session.status === "completed") {
          el.loginStatus.textContent = "钉钉验证完成";
          el.loginHint.textContent = "二维码登录成功，你现在可以返回下载页面，或随时重新扫码刷新验证态。";
          el.loginQRImage.classList.add("hidden");
        } else {
          el.loginStatus.textContent = "登录失败";
          el.loginHint.textContent = session.error_message || "登录失败，请重试。";
          el.loginQRImage.classList.add("hidden");
        }
      }

      function renderJobsPageList(payload) {
        if (!el.jobsDetailList || !el.jobsPageIndicator || !el.jobsPaginationSummary || !el.jobsPrevBtn || !el.jobsNextBtn) return;
        const jobs = Array.isArray(payload.jobs) ? payload.jobs : [];
        state.jobsPageItems = jobs;
        state.jobsTotal = Number(payload.total || 0);
        state.jobsTotalPages = Math.max(1, Number(payload.total_pages || 1));
        state.jobsPage = Number(payload.page || 1);
        state.jobsPageSize = Number(payload.page_size || 10);

        el.pageSizeButtons.forEach((button) => {
          button.classList.toggle("active", Number(button.getAttribute("data-page-size") || 10) === state.jobsPageSize);
        });
        el.jobsPageIndicator.textContent = state.jobsPage + " / " + state.jobsTotalPages;
        el.jobsPaginationSummary.textContent = "共 " + state.jobsTotal + " 条 · 每页 " + state.jobsPageSize + " 条";
        el.jobsPrevBtn.disabled = state.jobsPage <= 1;
        el.jobsNextBtn.disabled = state.jobsPage >= state.jobsTotalPages;

        if (jobs.length === 0) {
          el.jobsDetailList.innerHTML = '<div class="empty">暂无记录</div>';
          return;
        }

        el.jobsDetailList.innerHTML = jobs.map((job) => {
          const title = job.current_title || (Array.isArray(job.titles) && job.titles[0]) || "下载任务";
          const badgeClass = job.status === "succeeded" ? "ok" : (job.status === "failed" ? "warn" : "active");
          const isExpanded = state.expandedJobId === job.id;
          const files = Array.isArray(job.files) ? job.files : [];
          const errors = Array.isArray(job.errors) ? job.errors : [];
          return [
            '<section class="job-row">',
            '<div class="job-row-main" data-job-toggle="' + escapeHTML(job.id) + '">',
            '<div class="job-row-title">' + escapeHTML(title) + '</div>',
            '<div class="job-row-meta">' + escapeHTML(formatStatus(job.status)) + '</div>',
            '<div class="job-row-meta">' + escapeHTML(formatTime(job.updated_at || job.created_at)) + '</div>',
            '<div class="job-row-meta">' + escapeHTML(String(Math.round(Number(job.progress_percent || 0)))) + '%</div>',
            '<span class="badge ' + badgeClass + '">' + escapeHTML(formatStage(job.stage)) + '</span>',
            '</div>',
            isExpanded ? '<div class="job-row-detail"><div class="job-row-detail-grid">' + [
              '<div class="meta-line">任务 ID：' + escapeHTML(job.id) + '</div>',
              '<div class="meta-line">创建时间：' + escapeHTML(formatTime(job.created_at)) + '</div>',
              files.length ? '<div class="job-inline-files">' + files.map((file) => [
                '<div class="job-inline-file">',
                '<div class="file-name">' + escapeHTML(file.name || file.relative_path || "未命名文件") + '</div>',
                file.download_url ? '<a class="mini-link" href="' + escapeHTML(file.download_url) + '" target="_blank" rel="noreferrer">下载文件</a>' : '<span class="muted">处理中</span>',
                '</div>',
              ].join("")).join("") + '</div>' : '',
              errors.length ? '<div class="job-inline-errors">' + errors.map(escapeHTML).join("<br/>") + '</div>' : '',
            ].join("") + '</div></div>' : '',
            '</section>',
          ].join("");
        }).join("");

        el.jobsDetailList.querySelectorAll("[data-job-toggle]").forEach((item) => {
          item.addEventListener("click", () => {
            const jobId = item.getAttribute("data-job-toggle") || "";
            state.expandedJobId = state.expandedJobId === jobId ? "" : jobId;
            renderJobsPageList({
              jobs: state.jobsPageItems,
              page: state.jobsPage,
              page_size: state.jobsPageSize,
              total: state.jobsTotal,
              total_pages: state.jobsTotalPages,
            });
          });
        });
      }

      function renderAccountState() {
        if (!el.accountSummary) return;
        if (!state.authenticated || !state.user) {
          el.accountSummary.textContent = "请先登录。";
          return;
        }
        const status = [];
        if (!state.legalAccepted) status.push("待同意条款");
        if (!state.cookiesReady) status.push("待钉钉验证");
        if (status.length === 0) status.push("状态正常");
        el.accountSummary.textContent = "当前用户：" + state.user.username + " · " + status.join(" · ");
      }

      function renderAdminUsers(users) {
        if (!el.adminUsers || !el.adminUserMeta) return;
        const records = Array.isArray(users) ? users : [];
        const needingAttention = records.filter((user) => !user.legal_accepted || !user.cookies_ready);
        const normalCount = records.length - needingAttention.length;
        el.adminUserMeta.textContent = "需要处理 " + needingAttention.length + " 人 · 状态正常 " + normalCount + " 人";

        if (needingAttention.length === 0) {
          el.adminUsers.innerHTML = '<div class="empty">当前没有需要处理的用户</div>';
          return;
        }

        el.adminUsers.innerHTML = needingAttention.map((user) => [
          '<section class="admin-user">',
          '<div class="admin-user-name">' + escapeHTML(user.username) + (user.is_sudo ? ' (sudo)' : '') + '</div>',
          '<div class="meta-line">注册时间：' + escapeHTML(formatTime(user.created_at)) + '</div>',
          (!user.legal_accepted ? '<div class="meta-line">待同意条款</div>' : ''),
          (!user.cookies_ready ? '<div class="meta-line">待钉钉验证</div>' : ''),
          '<div class="meta-line">任务数：' + escapeHTML(String(user.total_jobs || 0)) + '</div>',
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

      function renderAdminStorage() {
        if (!el.adminStorageList || !el.adminStorageMeta) return;
        const items = Array.isArray(state.adminStorageItems) ? state.adminStorageItems : [];
        const prefix = String(state.adminStoragePrefix || "").trim();
        el.adminStorageMeta.textContent = (prefix ? ("前缀：" + prefix + " · ") : "") + "当前已加载 " + items.length + " 个对象";

        if (items.length === 0) {
          el.adminStorageList.innerHTML = '<div class="empty">当前没有匹配的 R2 文件</div>';
        } else {
          el.adminStorageList.innerHTML = items.map((item) => {
            const names = Array.isArray(item.names) ? item.names : [];
            const owners = Array.isArray(item.owners) ? item.owners : [];
            const extraNames = names.length > 1 ? names.slice(1, 4) : [];
            return [
              '<section class="storage-item">',
              '<div class="storage-head">',
              '<div>',
              '<div class="storage-name">' + escapeHTML(names[0] || item.key) + '</div>',
              '<div class="storage-key">' + escapeHTML(item.key || "-") + '</div>',
              '</div>',
              item.download_url ? '<a class="button-link primary" href="' + escapeHTML(item.download_url) + '" target="_blank" rel="noreferrer">下载文件</a>' : '',
              '</div>',
              '<div class="storage-meta-grid">',
              '<span><strong>大小</strong> ' + escapeHTML(formatBytes(item.size)) + '</span>',
              '<span><strong>上传时间</strong> ' + escapeHTML(formatTime(item.uploaded_at)) + '</span>',
              '<span><strong>引用</strong> ' + escapeHTML(String(item.refs || 0)) + '</span>',
              '</div>',
              owners.length ? '<div class="storage-tags">' + owners.slice(0, 6).map((owner) => '<span class="storage-tag">' + escapeHTML(owner) + '</span>').join("") + '</div>' : '',
              extraNames.length ? '<div class="meta-line">别名：' + extraNames.map(escapeHTML).join(" / ") + '</div>' : '',
              '</section>',
            ].join("");
          }).join("");
        }

        if (el.adminStorageMoreBtn) {
          if (state.adminStorageHasMore) el.adminStorageMoreBtn.classList.remove("hidden"); else el.adminStorageMoreBtn.classList.add("hidden");
        }
      }

      function refreshAuth() {
        return request("/api/auth/me").then((payload) => {
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
            return payload;
          }

          if (PAGE === "login" && el.registerCardHint) {
            el.registerCardHint.textContent = state.registrationOpen ? "注册成功后将直接进入条款确认" : "当前未开放注册";
          }
          if (PAGE === "login" && el.authTabRegister && el.registerFormPanel) {
            if (state.registrationOpen) {
              el.authTabRegister.classList.remove("hidden");
            } else {
              el.authTabRegister.classList.add("hidden");
              switchAuthTab("login");
            }
          }

          renderHeaderState();
          renderAccountState();
          return payload;
        });
      }

      function refreshStatus() {
        if (!state.authenticated) return Promise.resolve(null);
        return request("/api/status").then((payload) => {
          renderStatusStrip(payload);
          renderOverviewState();
          return payload;
        });
      }

      function refreshRecentJobs() {
        if (!state.authenticated || !el.recentRecords) return Promise.resolve(null);
        return request("/api/jobs?page=1&page_size=10").then((payload) => {
          state.recentJobs = Array.isArray(payload.jobs) ? payload.jobs : [];
          renderRecentJobs(state.recentJobs);
          return payload;
        });
      }

      function refreshJobsPage() {
        if (!state.authenticated || !el.jobsDetailList) return Promise.resolve(null);
        return request("/api/jobs?page=" + encodeURIComponent(String(state.jobsPage)) + "&page_size=" + encodeURIComponent(String(state.jobsPageSize))).then((payload) => {
          renderJobsPageList(payload);
          return payload;
        });
      }

      function refreshLegalConfig() {
        if (!el.legalText && !el.legalVersionMeta) return Promise.resolve(null);
        return request("/api/legal-config").then((payload) => {
          state.legalVersion = payload.version || state.legalVersion;
          state.legalText = payload.text || "";
          renderLegalText(state.legalText);
          renderLegalState();
          return payload;
        });
      }

      function refreshLoginSession() {
        if (!state.authenticated) return Promise.resolve(null);
        const suffix = state.loginSessionId ? ("?id=" + encodeURIComponent(state.loginSessionId)) : "";
        return request("/api/login-workflow" + suffix).then((payload) => {
          if (el.loginBox) {
            renderLoginSession(payload);
          } else {
            const session = payload && payload.login_session ? payload.login_session : null;
            state.loginSessionId = session ? (session.id || "") : "";
            state.loginSessionStatus = session ? (session.status || "") : "";
          }
          renderScanState();
          return payload;
        });
      }

      function refreshAdminUsers() {
        if (!state.authenticated || !state.user || !state.user.is_sudo || !el.adminUsers) return Promise.resolve(null);
        return request("/api/admin/users").then((payload) => {
          renderAdminUsers(payload.users || []);
          return payload;
        });
      }

      function refreshAdminLegal() {
        if (!state.authenticated || !state.user || !state.user.is_sudo || !el.adminLegalText) return Promise.resolve(null);
        return request("/api/admin/legal").then((payload) => {
          renderAdminLegal(payload.version || "", payload.text || "", false);
          return payload;
        });
      }

      function refreshAdminStorage(reset) {
        if (!state.authenticated || !state.user || !state.user.is_sudo || !el.adminStorageList) return Promise.resolve(null);
        const prefix = (el.adminStoragePrefix ? el.adminStoragePrefix.value : state.adminStoragePrefix || "").trim();
        const params = new URLSearchParams();
        if (prefix) params.set("prefix", prefix);
        if (!reset && state.adminStorageCursor) params.set("cursor", state.adminStorageCursor);
        return request("/api/admin/storage" + (params.toString() ? ("?" + params.toString()) : "")).then((payload) => {
          state.adminStoragePrefix = prefix;
          state.adminStorageCursor = payload.cursor || "";
          state.adminStorageHasMore = Boolean(payload.has_more);
          state.adminStorageItems = reset ? (payload.items || []) : state.adminStorageItems.concat(payload.items || []);
          renderAdminStorage();
          return payload;
        });
      }

      function login() {
        return request("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({
            username: (el.loginUsername ? el.loginUsername.value : "").trim(),
            password: (el.loginPassword ? el.loginPassword.value : "").trim(),
          }),
        }).then(() => {
          redirectTo("/overview");
        });
      }

      function registerUser() {
        const username = (el.registerUsername ? el.registerUsername.value : "").trim();
        const password = (el.registerPassword ? el.registerPassword.value : "").trim();
        const confirmPassword = (el.registerPasswordConfirm ? el.registerPasswordConfirm.value : "").trim();
        if (password !== confirmPassword) {
          return Promise.reject(new Error("两次输入的密码不一致"));
        }

        return request("/api/auth/register", {
          method: "POST",
          body: JSON.stringify({ username, password }),
        }).then(() => {
          redirectTo("/legal");
        });
      }

      function logout() {
        return request("/api/auth/logout", { method: "POST" }).then(() => {
          redirectTo("/login");
        });
      }

      function acceptLegal() {
        return request("/api/legal", { method: "POST", body: JSON.stringify({}) }).then((payload) => {
          state.legalAccepted = Boolean(payload.accepted);
          state.legalAcceptedAt = payload.accepted_at || "";
          state.legalVersion = payload.version || state.legalVersion;
          state.legalConfirmVersion = state.legalVersion;
          renderLegalState();
          redirectTo("/scan");
        });
      }

      function startLoginWorkflow() {
        return request("/api/login-workflow", { method: "POST", body: JSON.stringify({}) }).then((payload) => {
          renderLoginSession(payload);
          renderScanState();
          setNotice(payload.message || "二维码登录已启动。", "ok");
        });
      }

      function createJob() {
        const urls = (el.urls ? el.urls.value : "").split("\\n").map((item) => item.trim()).filter(Boolean);
        if (urls.length === 0) {
          return Promise.reject(new Error("请先填入回放链接"));
        }

        return urls.reduce((chain, url) => {
          return chain.then((jobIDs) => {
            return request("/api/jobs", {
              method: "POST",
              body: JSON.stringify({ url, thread: 100, create_video_list: true, output_subdir: "" }),
            }).then((payload) => {
              jobIDs.push(payload.id);
              return jobIDs;
            });
          });
        }, Promise.resolve([])).then((jobIDs) => {
          setNotice(jobIDs.length === 1 ? ("任务已创建：" + jobIDs[0]) : ("已创建 " + jobIDs.length + " 个任务。"), "ok");
          return refreshRecentJobs();
        });
      }

      function changePassword() {
        const currentPassword = (el.currentPassword ? el.currentPassword.value : "").trim();
        const newPassword = (el.newPassword ? el.newPassword.value : "").trim();
        const confirmPassword = (el.confirmNewPassword ? el.confirmNewPassword.value : "").trim();
        if (newPassword !== confirmPassword) {
          return Promise.reject(new Error("两次输入的新密码不一致"));
        }
        return request("/api/auth/password", {
          method: "POST",
          body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
        }).then((payload) => {
          if (el.currentPassword) el.currentPassword.value = "";
          if (el.newPassword) el.newPassword.value = "";
          if (el.confirmNewPassword) el.confirmNewPassword.value = "";
          setNotice(payload.message || "密码已更新。", "ok");
        });
      }

      function saveAdminLegal() {
        const text = el.adminLegalText ? String(el.adminLegalText.value || "").trim() : "";
        if (!text) {
          return Promise.reject(new Error("条款内容不能为空"));
        }
        return request("/api/admin/legal", {
          method: "POST",
          body: JSON.stringify({ text }),
        }).then((payload) => {
          state.adminLegalDirty = false;
          renderAdminLegal(payload.version || "", payload.text || text, true);
          setNotice("条款已更新，所有用户需要重新同意。", "ok");
        });
      }

      function bindEvents() {
        setupUserMenu();
        setupPageTransitions();
        switchAuthTab("login");

        if (el.authTabLogin) el.authTabLogin.addEventListener("click", () => switchAuthTab("login"));
        if (el.authTabRegister) el.authTabRegister.addEventListener("click", () => switchAuthTab("register"));

        if (el.loginBtn) el.loginBtn.addEventListener("click", () => {
          setBusy(el.loginBtn, true);
          login().catch((error) => setNotice(normalizeErrorMessage(error.message), "error")).finally(() => setBusy(el.loginBtn, false));
        });
        if (el.registerBtn) el.registerBtn.addEventListener("click", () => {
          setBusy(el.registerBtn, true);
          registerUser().catch((error) => setNotice(normalizeErrorMessage(error.message), "error")).finally(() => setBusy(el.registerBtn, false));
        });
        if (el.topbarLogoutBtn) el.topbarLogoutBtn.addEventListener("click", () => {
          setBusy(el.topbarLogoutBtn, true);
          logout().catch((error) => setNotice(normalizeErrorMessage(error.message), "error")).finally(() => setBusy(el.topbarLogoutBtn, false));
        });
        if (el.topbarLogoutBtnInline) el.topbarLogoutBtnInline.addEventListener("click", () => {
          setBusy(el.topbarLogoutBtnInline, true);
          logout().catch((error) => setNotice(normalizeErrorMessage(error.message), "error")).finally(() => setBusy(el.topbarLogoutBtnInline, false));
        });
        if (el.legalConfirmCheck) el.legalConfirmCheck.addEventListener("change", () => {
          state.legalConfirmVersion = el.legalConfirmCheck.checked ? (state.legalVersion || "") : "";
          if (el.acceptLegalBtn) {
            el.acceptLegalBtn.disabled = !state.legalVersion || state.legalConfirmVersion !== state.legalVersion;
          }
        });
        if (el.acceptLegalBtn) el.acceptLegalBtn.addEventListener("click", () => {
          setBusy(el.acceptLegalBtn, true);
          acceptLegal().catch((error) => setNotice(normalizeErrorMessage(error.message), "error")).finally(() => setBusy(el.acceptLegalBtn, false));
        });
        if (el.startLoginWorkflowBtn) el.startLoginWorkflowBtn.addEventListener("click", () => {
          setBusy(el.startLoginWorkflowBtn, true);
          startLoginWorkflow().catch((error) => setNotice(normalizeErrorMessage(error.message), "error")).finally(() => setBusy(el.startLoginWorkflowBtn, false));
        });
        if (el.createJobBtn) el.createJobBtn.addEventListener("click", () => {
          setBusy(el.createJobBtn, true);
          createJob().catch((error) => setNotice(normalizeErrorMessage(error.message), "error")).finally(() => setBusy(el.createJobBtn, false));
        });
        if (el.refreshBtn) el.refreshBtn.addEventListener("click", () => {
          refreshAll().catch((error) => setNotice(normalizeErrorMessage(error.message), "error"));
        });
        if (el.changePasswordBtn) el.changePasswordBtn.addEventListener("click", () => {
          setBusy(el.changePasswordBtn, true);
          changePassword().catch((error) => setNotice(normalizeErrorMessage(error.message), "error")).finally(() => setBusy(el.changePasswordBtn, false));
        });
        if (el.saveLegalBtn) el.saveLegalBtn.addEventListener("click", () => {
          setBusy(el.saveLegalBtn, true);
          saveAdminLegal().catch((error) => setNotice(normalizeErrorMessage(error.message), "error")).finally(() => setBusy(el.saveLegalBtn, false));
        });
        if (el.adminLegalText) el.adminLegalText.addEventListener("input", () => { state.adminLegalDirty = true; });
        if (el.adminStorageRefreshBtn) el.adminStorageRefreshBtn.addEventListener("click", () => {
          setBusy(el.adminStorageRefreshBtn, true);
          refreshAdminStorage(true).catch((error) => setNotice(normalizeErrorMessage(error.message), "error")).finally(() => setBusy(el.adminStorageRefreshBtn, false));
        });
        if (el.adminStorageMoreBtn) el.adminStorageMoreBtn.addEventListener("click", () => {
          setBusy(el.adminStorageMoreBtn, true);
          refreshAdminStorage(false).catch((error) => setNotice(normalizeErrorMessage(error.message), "error")).finally(() => setBusy(el.adminStorageMoreBtn, false));
        });
        if (el.adminStoragePrefix) el.adminStoragePrefix.addEventListener("keydown", (event) => {
          if (event.key !== "Enter") return;
          event.preventDefault();
          if (!el.adminStorageRefreshBtn) return;
          setBusy(el.adminStorageRefreshBtn, true);
          refreshAdminStorage(true).catch((error) => setNotice(normalizeErrorMessage(error.message), "error")).finally(() => setBusy(el.adminStorageRefreshBtn, false));
        });
        el.pageSizeButtons.forEach((button) => {
          button.addEventListener("click", () => {
            state.jobsPageSize = Number(button.getAttribute("data-page-size") || 10);
            state.jobsPage = 1;
            refreshJobsPage().catch((error) => setNotice(normalizeErrorMessage(error.message), "error"));
          });
        });
        if (el.jobsPrevBtn) el.jobsPrevBtn.addEventListener("click", () => {
          if (state.jobsPage <= 1) return;
          state.jobsPage -= 1;
          refreshJobsPage().catch((error) => setNotice(normalizeErrorMessage(error.message), "error"));
        });
        if (el.jobsNextBtn) el.jobsNextBtn.addEventListener("click", () => {
          if (state.jobsPage >= state.jobsTotalPages) return;
          state.jobsPage += 1;
          refreshJobsPage().catch((error) => setNotice(normalizeErrorMessage(error.message), "error"));
        });
      }

      function applyRouteGuards() {
        if (!state.authenticated) return;
        if (!state.legalAccepted && PAGE !== "legal" && PAGE !== "account" && PAGE !== "admin" && PAGE !== "jobs") {
          redirectTo("/legal");
          return true;
        }
        if (state.legalAccepted && !state.cookiesReady && PAGE === "overview") {
          redirectTo("/scan");
          return true;
        }
        if (PAGE === "legal" && state.legalAccepted) {
          redirectTo(state.cookiesReady ? "/overview" : "/scan");
          return true;
        }
        if (PAGE === "scan" && !state.legalAccepted) {
          redirectTo("/legal");
          return true;
        }
        if (PAGE === "admin" && state.user && !state.user.is_sudo) {
          redirectTo("/overview");
          return true;
        }
        return false;
      }

      function refreshAll() {
        return refreshAuth().then(() => {
          if (applyRouteGuards()) return;

          const tasks = [];
          if (PAGE === "overview" || PAGE === "jobs") {
            tasks.push(refreshStatus());
          }
          if (PAGE === "overview") {
            tasks.push(refreshRecentJobs());
          }
          if (PAGE === "legal") {
            tasks.push(refreshLegalConfig());
          }
          if (PAGE === "scan") {
            tasks.push(refreshStatus());
            tasks.push(refreshLoginSession());
          }
          if (PAGE === "jobs") {
            tasks.push(refreshJobsPage());
          }
          if (PAGE === "account") {
            tasks.push(refreshStatus());
          }
          if (PAGE === "admin") {
            tasks.push(refreshAdminUsers());
            tasks.push(refreshAdminLegal());
            tasks.push(refreshAdminStorage(true));
          }
          return Promise.all(tasks);
        });
      }

      bindEvents();
      refreshAll().catch((error) => setNotice(normalizeErrorMessage(error.message), "error"));
      if (pollingHandle) clearInterval(pollingHandle);
      pollingHandle = setInterval(() => {
        refreshAll().catch(() => {});
      }, 5000);
    </script>
  </body>
</html>`;
}
