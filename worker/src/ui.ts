type AppPage = "overview" | "download" | "jobs" | "scan" | "login" | "account" | "legal";

function renderNav(page: AppPage): string {
  if (page === "login") {
    return "";
  }

  const items: Array<{ key: AppPage; href: string; label: string }> = [
    { key: "overview", href: "/overview", label: "概览" },
    { key: "legal", href: "/legal", label: "条款" },
    { key: "scan", href: "/scan", label: "扫码登录" },
    { key: "download", href: "/download", label: "下载" },
    { key: "jobs", href: "/jobs", label: "任务" },
    { key: "account", href: "/account", label: "账号" },
  ];

  return `<nav class="app-nav">${items.map((item) => `<a href="${item.href}" data-page-link data-nav-link class="nav-link ${page === item.key ? "active" : ""}">${item.label}</a>`).join("")}<span id="nav-indicator" class="nav-indicator"></span></nav>`;
}

function renderStatsRow(): string {
  return `
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
        </div>`;
}

function renderFlowNavigator(): string {
  return `
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
      </section>`;
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

function renderOverviewPage(): string {
  return `
      <section class="page-intro">
        <span class="eyebrow">Workspace</span>
        <h1>下载控制台</h1>
        <p>这是总览页。你可以先看当前状态，再按流程去完成条款确认、扫码登录和下载。</p>
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
        ${renderStatsRow()}
      </section>

      ${renderFlowNavigator()}

      <section class="route-grid">
        <a class="route-card" data-page-link href="/legal">
          <span class="route-kicker">Step 1</span>
          <h3>条款确认</h3>
          <p>先阅读并确认当前版本条款。</p>
        </a>
        <a class="route-card" data-page-link href="/scan">
          <span class="route-kicker">Step 2</span>
          <h3>扫码登录</h3>
          <p>通过钉钉扫码获取当前账号的登录态。</p>
        </a>
        <a class="route-card" data-page-link href="/download">
          <span class="route-kicker">Step 3</span>
          <h3>开始下载</h3>
          <p>完成前两步后粘贴回放链接开始下载。</p>
        </a>
        <a class="route-card" data-page-link href="/jobs">
          <span class="route-kicker">Archive</span>
          <h3>任务列表</h3>
          <p>查看任务进度、错误信息和最终文件。</p>
        </a>
      </section>`;
}

function renderLegalPage(): string {
  return `
      <section class="page-intro">
        <span class="eyebrow">Legal</span>
        <h1>使用条款</h1>
        <p>创建下载任务或启动二维码登录前，必须先完成当前版本条款确认。</p>
      </section>

      ${renderFlowNavigator()}

      <section class="content-grid">
        <section id="legal-step" class="step-card">
          <div class="step-head">
            <div>
              <span class="step-kicker">Step 1</span>
              <h2>同意条款</h2>
            </div>
            <span id="legal-badge" class="badge warn">未完成</span>
          </div>
          <p class="muted">请确认你对相关内容拥有合法访问和下载权限。</p>
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

        <section class="panel legal-panel">
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
        <span class="eyebrow">Scan Login</span>
        <h1>二维码登录</h1>
        <p>这里专门处理扫码登录。Cookie 只会通过二维码登录自动绑定到当前账号。</p>
      </section>

      ${renderFlowNavigator()}

      <section class="content-grid scan-grid">
        <section id="cookies-step" class="step-card scan-focus-card">
          <div class="scan-glow"></div>
          <div class="step-head">
            <div>
              <span class="step-kicker">Step 2</span>
              <h2>扫码登录</h2>
            </div>
            <span id="cookie-badge" class="badge warn">未完成</span>
          </div>
          <p class="muted">扫码成功后，登录态会自动回传并绑定到当前账号。</p>
          <div class="scan-focus-shell">
            <div class="scan-focus-copy">
              <div id="cookie-state" class="notice hidden"></div>
              <div id="cookie-meta" class="meta-line"></div>
              <div class="actions">
                <button id="start-login-workflow-btn" class="primary" type="button">启动二维码登录</button>
              </div>
            </div>
            <div id="login-box" class="login-box scan-login-box hidden">
              <div id="login-status" class="login-status">正在生成二维码</div>
              <div id="login-hint" class="muted">二维码出现后，请使用钉钉扫码登录。</div>
              <div class="scan-qr-frame">
                <img id="login-qr-image" class="qr-image hidden" alt="登录二维码" />
              </div>
            </div>
          </div>
        </section>

        <section class="panel guide-panel">
          <div class="panel-head">
            <div>
              <span class="panel-kicker">Guide</span>
              <h2>操作说明</h2>
            </div>
          </div>
          <div class="guide-list">
            <div class="guide-item"><strong>1</strong><span>先到条款页完成确认。</span></div>
            <div class="guide-item"><strong>2</strong><span>点击“启动二维码登录”并等待二维码出现。</span></div>
            <div class="guide-item"><strong>3</strong><span>扫码成功后，回到下载页开始下载。</span></div>
          </div>
        </section>
      </section>
      `;
}

function renderDownloadPage(): string {
  return `
      <section class="page-intro">
        <span class="eyebrow">Download</span>
        <h1>开始下载</h1>
        <p>这里专门提交回放链接。只有完成条款确认和扫码登录后，下载区才会开放。</p>
      </section>

      ${renderFlowNavigator()}

      <section id="download-step" class="step-card">
        <div class="step-head">
          <div>
            <span class="step-kicker">Step 3</span>
            <h2>下载</h2>
          </div>
          <span id="download-badge" class="badge warn">等待前置步骤</span>
        </div>
        <p class="muted">完成前两步后，你就可以在这里粘贴回放链接。</p>
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
      </section>`;
}

function renderJobsPage(): string {
  return `
      <section class="page-intro">
        <span class="eyebrow">Jobs</span>
        <h1>任务列表</h1>
        <p>这里集中查看任务状态、进度、失败原因和最终文件。</p>
      </section>

      <section class="panel status-panel">
        <div class="panel-head">
          <div>
            <span class="panel-kicker">Archive</span>
            <h2>任务概览</h2>
          </div>
        </div>
        ${renderStatsRow()}
      </section>

      <section class="panel jobs-panel">
        <div class="panel-head">
          <div>
            <span class="panel-kicker">Jobs</span>
            <h2>任务列表</h2>
          </div>
        </div>
        <div class="jobs-toolbar">
          <div id="jobs-filter-summary" class="muted">全部任务</div>
          <div class="jobs-filters">
            <button class="filter-chip active" data-jobs-filter="all" data-filter-label="全部" type="button">全部</button>
            <button class="filter-chip" data-jobs-filter="active" data-filter-label="进行中" type="button">进行中</button>
            <button class="filter-chip" data-jobs-filter="completed" data-filter-label="已完成" type="button">已完成</button>
            <button class="filter-chip" data-jobs-filter="failed" data-filter-label="失败" type="button">失败</button>
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
            <h2>管理区</h2>
          </div>
        </div>
        <section class="admin-section">
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
            <div class="actions storage-actions">
              <button id="admin-storage-refresh-btn" class="primary" type="button">刷新文件</button>
            </div>
          </div>
          <div id="admin-storage-meta" class="meta-line"></div>
          <div id="admin-storage-list" class="storage-list"><div class="empty">正在加载 R2 文件...</div></div>
          <div class="actions">
            <button id="admin-storage-more-btn" class="hidden" type="button">加载更多</button>
          </div>
        </section>

        <section class="admin-section">
          <div class="panel-head">
            <div>
              <span class="panel-kicker">Users</span>
              <h2>用户状态</h2>
            </div>
          </div>
          <div id="admin-users" class="admin-users"><div class="empty">暂无数据</div></div>
        </section>

        <section class="admin-section">
          <div class="panel-head">
            <div>
              <span class="panel-kicker">Legal</span>
              <h2>条款管理</h2>
            </div>
          </div>
        <div class="field admin-field">
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
    case "overview":
      return renderOverviewPage();
    case "legal":
      return renderLegalPage();
    case "scan":
      return renderScanPage();
    case "login":
      return renderLoginPage();
    case "jobs":
      return renderJobsPage();
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
      body {
        padding: 0;
        overflow-x: hidden;
      }
      a { color: inherit; }
      button, input, textarea { font: inherit; }
      .hidden { display: none !important; }
      .app-shell {
        max-width: 1100px;
        margin: 0 auto;
        padding: 24px 18px 64px;
        opacity: 0;
        transform: translateY(14px) scale(0.995);
        transition: opacity 280ms ease, transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      body.page-ready .app-shell {
        opacity: 1;
        transform: none;
      }
      body.page-leaving .app-shell {
        opacity: 0;
        transform: translateY(18px) scale(0.992);
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
        position: relative;
        padding: 4px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.64);
        border: 1px solid rgba(207, 216, 227, 0.8);
      }
      .nav-link {
        position: relative;
        z-index: 1;
        text-decoration: none;
        padding: 9px 14px;
        border-radius: 999px;
        color: var(--muted);
        background: transparent;
        border: 1px solid transparent;
        font-weight: 600;
        transition: border-color 160ms ease, color 160ms ease, background 160ms ease, transform 160ms ease;
      }
      .nav-link:hover {
        color: var(--text);
        border-color: var(--line-strong);
        transform: translateY(-1px);
      }
      .nav-link.active {
        color: var(--text);
        background: transparent;
        border-color: transparent;
      }
      .nav-indicator {
        position: absolute;
        top: 4px;
        left: 4px;
        height: calc(100% - 8px);
        width: 0;
        border-radius: 999px;
        background: #ffffff;
        border: 1px solid rgba(207, 216, 227, 0.9);
        box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);
        opacity: 0;
        transform: translateX(0);
        transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1), width 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 140ms ease;
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
        position: relative;
        overflow: hidden;
        transition: transform 180ms ease, box-shadow 200ms ease, border-color 200ms ease, background-image 200ms ease;
        transform: perspective(1200px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(var(--lift, 0px));
        background-image: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(37, 99, 235, 0.08), transparent 42%);
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
        position: relative;
        overflow: hidden;
        transition: transform 180ms ease, box-shadow 200ms ease, border-color 200ms ease, background 200ms ease;
        transform: perspective(1200px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(var(--lift, 0px));
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
        transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease, background 160ms ease;
      }
      button.primary, .button-link.primary {
        color: #eff6ff;
        border-color: transparent;
        background: linear-gradient(180deg, var(--accent) 0%, var(--accent-strong) 100%);
      }
      button:hover, .button-link:hover {
        transform: translateY(-1px);
        box-shadow: 0 10px 24px rgba(37, 99, 235, 0.14);
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
      .route-grid,
      .content-grid {
        display: grid;
        gap: 16px;
        margin-top: 16px;
      }
      .route-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .content-grid {
        grid-template-columns: minmax(320px, 0.82fr) minmax(0, 1.18fr);
      }
      .route-card {
        display: block;
        padding: 20px;
        text-decoration: none;
        color: var(--text);
        background: var(--surface);
        border: 1px solid var(--line);
        box-shadow: var(--shadow);
        border-radius: var(--radius-lg);
        position: relative;
        overflow: hidden;
        transition: transform 180ms ease, box-shadow 200ms ease, border-color 200ms ease;
        transform: perspective(1200px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(var(--lift, 0px));
      }
      .route-card:hover {
        border-color: rgba(37, 99, 235, 0.20);
        box-shadow: 0 22px 50px rgba(15, 23, 42, 0.10);
      }
      .route-kicker {
        display: inline-flex;
        color: var(--muted);
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 11px;
        font-weight: 700;
      }
      .route-card h3 {
        margin: 10px 0 0;
        font-size: 22px;
        letter-spacing: -0.03em;
      }
      .route-card p {
        margin: 12px 0 0;
        color: var(--muted);
        line-height: 1.68;
      }
      .jobs-toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        flex-wrap: wrap;
        margin-top: 10px;
      }
      .jobs-filters {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .filter-chip {
        min-height: 38px;
        padding: 0 14px;
        border-radius: 999px;
        border: 1px solid var(--line);
        background: #ffffff;
        color: var(--muted);
        font-weight: 700;
        transition: transform 160ms ease, border-color 160ms ease, color 160ms ease, background 160ms ease;
      }
      .filter-chip.active {
        border-color: rgba(37, 99, 235, 0.22);
        background: rgba(37, 99, 235, 0.08);
        color: var(--accent);
      }
      .jobs-list {
        display: grid;
        gap: 12px;
        margin-top: 12px;
      }
      .jobs-group {
        display: grid;
        gap: 12px;
      }
      .jobs-group-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      .jobs-group-title {
        margin: 0;
        font-size: 18px;
        letter-spacing: -0.02em;
      }
      .jobs-group-count {
        color: var(--muted);
        font-size: 13px;
        font-weight: 700;
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
      .admin-section {
        margin-top: 22px;
        padding-top: 22px;
        border-top: 1px solid rgba(207, 216, 227, 0.65);
      }
      .admin-section:first-of-type {
        margin-top: 0;
        padding-top: 0;
        border-top: 0;
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
      .storage-toolbar {
        display: flex;
        gap: 14px;
        align-items: end;
        flex-wrap: wrap;
      }
      .storage-search {
        flex: 1 1 280px;
      }
      .storage-actions {
        margin-top: 0;
      }
      .storage-list {
        display: grid;
        gap: 12px;
        margin-top: 14px;
      }
      .storage-item {
        border: 1px solid var(--line);
        border-radius: var(--radius-md);
        background: #fbfcfe;
        padding: 16px;
        display: grid;
        gap: 10px;
      }
      .storage-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
      }
      .storage-name {
        font-size: 17px;
        font-weight: 800;
        line-height: 1.45;
        word-break: break-word;
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
      .guide-list {
        display: grid;
        gap: 14px;
        margin-top: 8px;
      }
      .guide-item {
        display: grid;
        grid-template-columns: 36px minmax(0, 1fr);
        gap: 12px;
        align-items: start;
      }
      .guide-item strong {
        width: 36px;
        height: 36px;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: var(--accent-soft);
        color: var(--accent);
        font-size: 12px;
      }
      .guide-item span {
        color: var(--muted);
        line-height: 1.7;
      }
      .scan-grid {
        grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
      }
      .scan-focus-card {
        isolation: isolate;
      }
      .scan-glow {
        position: absolute;
        inset: -30% auto auto -10%;
        width: 320px;
        height: 320px;
        border-radius: 999px;
        background: radial-gradient(circle, rgba(37, 99, 235, 0.18), transparent 70%);
        pointer-events: none;
        z-index: 0;
      }
      .scan-focus-shell {
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns: minmax(0, 0.8fr) minmax(280px, 0.9fr);
        gap: 20px;
        align-items: start;
      }
      .scan-login-box {
        margin-top: 0;
        min-height: 100%;
        display: grid;
        gap: 14px;
        align-content: start;
        background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(244,247,255,0.92));
        border-color: rgba(37, 99, 235, 0.18);
        box-shadow: 0 18px 36px rgba(37, 99, 235, 0.10);
      }
      .scan-qr-frame {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 360px;
        border-radius: 18px;
        background:
          radial-gradient(circle at center, rgba(37,99,235,0.08), transparent 64%),
          linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
        border: 1px dashed rgba(37, 99, 235, 0.22);
      }
      body[data-page="scan"] .qr-image {
        width: 320px;
        margin-top: 0;
        box-shadow: 0 22px 44px rgba(15, 23, 42, 0.10);
      }
      body[data-page="scan"] .login-status {
        font-size: 24px;
      }
      .empty {
        padding: 24px 8px;
        text-align: center;
        color: var(--muted);
      }
      .empty-state {
        padding: 30px 22px;
        border-radius: var(--radius-md);
        border: 1px dashed rgba(37, 99, 235, 0.20);
        background: linear-gradient(180deg, rgba(255,255,255,0.92), rgba(248,251,255,0.92));
        text-align: center;
      }
      .empty-state h3 {
        margin: 10px 0 0;
        font-size: 22px;
        letter-spacing: -0.03em;
      }
      .empty-state p {
        margin: 12px auto 0;
        max-width: 42ch;
        color: var(--muted);
        line-height: 1.72;
      }
      @media (max-width: 860px) {
        .account-grid,
        .stats-row {
          grid-template-columns: 1fr;
        }
        .content-grid,
        .scan-focus-shell,
        .flow-steps {
          grid-template-columns: 1fr;
        }
        .route-grid {
          grid-template-columns: 1fr;
        }
        .app-header {
          align-items: flex-start;
          flex-direction: column;
        }
        .header-right {
          justify-content: flex-start;
        }
        .storage-head {
          flex-direction: column;
          align-items: flex-start;
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
  <body data-page="${page}">
    <div class="app-shell">
      <header class="app-header">
        <a class="brand" data-page-link href="${page === "login" ? "/login" : "/overview"}">
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
        jobsFilter: "all",
        adminStorageItems: [],
        adminStorageCursor: "",
        adminStorageHasMore: false,
        adminStoragePrefix: "",
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
        navIndicator: document.getElementById("nav-indicator"),
        navLinks: Array.from(document.querySelectorAll("[data-nav-link]")),
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
        jobsFilterSummary: document.getElementById("jobs-filter-summary"),
        jobsFilterButtons: Array.from(document.querySelectorAll("[data-jobs-filter]")),
        accountSummary: document.getElementById("account-summary"),
        currentPassword: document.getElementById("current-password"),
        newPassword: document.getElementById("new-password"),
        confirmNewPassword: document.getElementById("confirm-new-password"),
        changePasswordBtn: document.getElementById("change-password-btn"),
        adminPanel: document.getElementById("admin-panel"),
        adminUsers: document.getElementById("admin-users"),
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

      function setJobsFilter(nextFilter) {
        state.jobsFilter = nextFilter || "all";
        el.jobsFilterButtons.forEach((button) => {
          button.classList.toggle("active", button.getAttribute("data-jobs-filter") === state.jobsFilter);
        });
        renderJobs(state.jobs);
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

      function renderJobs(jobs) {
        if (!el.jobs) return;
        const records = Array.isArray(jobs) ? jobs : [];
        state.jobs = records;

        const groupedRecords = {
          active: records.filter((job) => ["queued", "running"].includes(String(job.status || "").toLowerCase())),
          completed: records.filter((job) => String(job.status || "").toLowerCase() === "succeeded"),
          failed: records.filter((job) => String(job.status || "").toLowerCase() === "failed"),
        };
        const visibleRecords = state.jobsFilter === "all"
          ? records
          : (groupedRecords[state.jobsFilter] || []);

        if (el.jobsFilterSummary) {
          const labels = {
            all: "全部任务",
            active: "进行中的任务",
            completed: "已完成的任务",
            failed: "失败的任务",
          };
          el.jobsFilterSummary.textContent = (labels[state.jobsFilter] || labels.all) + " · " + visibleRecords.length + " 条";
        }

        el.jobsFilterButtons.forEach((button) => {
          const key = button.getAttribute("data-jobs-filter") || "all";
          const base = button.getAttribute("data-filter-label") || button.textContent || "";
          const count = key === "all" ? records.length : (groupedRecords[key] || []).length;
          button.textContent = base + " " + count;
        });

        if (records.length === 0) {
          el.jobs.innerHTML = [
            '<section class="empty-state">',
            '<div class="eyebrow">No Jobs</div>',
            '<h3>暂无任务</h3>',
            '<p>当前还没有下载任务。完成条款确认与扫码登录后，去下载页提交第一条回放链接。</p>',
            '</section>',
          ].join("");
          setupSurfaceMotion();
          return;
        }

        if (visibleRecords.length === 0) {
          el.jobs.innerHTML = [
            '<section class="empty-state">',
            '<div class="eyebrow">Filtered</div>',
            '<h3>当前筛选下暂无任务</h3>',
            '<p>你可以切换筛选条件，或者返回下载页创建新的任务。</p>',
            '</section>',
          ].join("");
          setupSurfaceMotion();
          return;
        }

        const renderJobCard = (job) => {
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
        };

        const sections = state.jobsFilter === "all"
          ? [
            { title: "进行中", items: groupedRecords.active },
            { title: "已完成", items: groupedRecords.completed },
            { title: "失败", items: groupedRecords.failed },
          ]
          : [
            {
              title: state.jobsFilter === "active" ? "进行中" : (state.jobsFilter === "completed" ? "已完成" : "失败"),
              items: visibleRecords,
            },
          ];

        el.jobs.innerHTML = sections
          .filter((section) => section.items.length > 0)
          .map((section) => [
            '<section class="jobs-group">',
            '<div class="jobs-group-header">',
            '<h3 class="jobs-group-title">' + escapeHTML(section.title) + '</h3>',
            '<span class="jobs-group-count">' + escapeHTML(String(section.items.length)) + ' 条</span>',
            '</div>',
            section.items.map(renderJobCard).join(""),
            '</section>',
          ].join(""))
          .join("");
        setupSurfaceMotion();
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
        if (!state.authenticated) return;
        const suffix = state.loginSessionId ? ("?id=" + encodeURIComponent(state.loginSessionId)) : "";
        const payload = await request("/api/login-workflow" + suffix);
        if (el.loginBox) {
          renderLoginSession(payload);
        } else {
          const session = payload && payload.login_session ? payload.login_session : null;
          state.loginSessionId = session ? (session.id || "") : "";
          state.loginSessionStatus = session ? (session.status || "") : "";
        }
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

      async function refreshAdminStorage(reset) {
        if (!state.authenticated || !state.user || !state.user.is_sudo || !el.adminStorageList) return;
        const prefix = (el.adminStoragePrefix ? el.adminStoragePrefix.value : state.adminStoragePrefix || "").trim();
        const params = new URLSearchParams();
        if (prefix) params.set("prefix", prefix);
        if (!reset && state.adminStorageCursor) params.set("cursor", state.adminStorageCursor);
        const payload = await request("/api/admin/storage" + (params.toString() ? ("?" + params.toString()) : ""));
        state.adminStoragePrefix = prefix;
        state.adminStorageCursor = payload.cursor || "";
        state.adminStorageHasMore = Boolean(payload.has_more);
        state.adminStorageItems = reset ? (payload.items || []) : state.adminStorageItems.concat(payload.items || []);
        renderAdminStorage();
      }

      async function login() {
        await request("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({
            username: (el.loginUsername ? el.loginUsername.value : "").trim(),
            password: (el.loginPassword ? el.loginPassword.value : "").trim(),
          }),
        });
        redirectTo("/overview");
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

      if (el.adminStorageRefreshBtn) {
        el.adminStorageRefreshBtn.addEventListener("click", async () => {
          setBusy(el.adminStorageRefreshBtn, true);
          try {
            await refreshAdminStorage(true);
          } catch (error) {
            setNotice(normalizeErrorMessage(error.message), "error");
          } finally {
            setBusy(el.adminStorageRefreshBtn, false);
          }
        });
      }

      if (el.adminStoragePrefix) {
        el.adminStoragePrefix.addEventListener("keydown", async (event) => {
          if (event.key !== "Enter") return;
          event.preventDefault();
          if (!el.adminStorageRefreshBtn) return;
          setBusy(el.adminStorageRefreshBtn, true);
          try {
            await refreshAdminStorage(true);
          } catch (error) {
            setNotice(normalizeErrorMessage(error.message), "error");
          } finally {
            setBusy(el.adminStorageRefreshBtn, false);
          }
        });
      }

      if (el.adminStorageMoreBtn) {
        el.adminStorageMoreBtn.addEventListener("click", async () => {
          setBusy(el.adminStorageMoreBtn, true);
          try {
            await refreshAdminStorage(false);
          } catch (error) {
            setNotice(normalizeErrorMessage(error.message), "error");
          } finally {
            setBusy(el.adminStorageMoreBtn, false);
          }
        });
      }

      if (el.authTabLogin) {
        el.authTabLogin.addEventListener("click", () => switchAuthTab("login"));
      }

      if (el.authTabRegister) {
        el.authTabRegister.addEventListener("click", () => switchAuthTab("register"));
      }

      function setupSurfaceMotion() {
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const surfaces = document.querySelectorAll(".panel, .step-card, .stat-card, .job-card, .flow-chip, .route-card");
        surfaces.forEach((surface) => {
          const element = surface;
          if (element.dataset.motionBound === "1") return;
          element.dataset.motionBound = "1";
          element.addEventListener("mousemove", (event) => {
            const rect = element.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;
            element.style.setProperty("--mx", (x * 100).toFixed(2) + "%");
            element.style.setProperty("--my", (y * 100).toFixed(2) + "%");
            element.style.setProperty("--rx", ((0.5 - y) * 4).toFixed(2) + "deg");
            element.style.setProperty("--ry", ((x - 0.5) * 5).toFixed(2) + "deg");
            element.style.setProperty("--lift", "-2px");
          });
          element.addEventListener("mouseleave", () => {
            element.style.removeProperty("--mx");
            element.style.removeProperty("--my");
            element.style.removeProperty("--rx");
            element.style.removeProperty("--ry");
            element.style.removeProperty("--lift");
          });
        });
      }

      function updateNavIndicator(target) {
        if (!el.navIndicator || !el.navLinks.length) return;
        const activeTarget = target || el.navLinks.find((link) => link.classList.contains("active"));
        if (!activeTarget) {
          el.navIndicator.style.opacity = "0";
          return;
        }
        const navRect = activeTarget.parentElement.getBoundingClientRect();
        const linkRect = activeTarget.getBoundingClientRect();
        el.navIndicator.style.opacity = "1";
        el.navIndicator.style.width = linkRect.width + "px";
        el.navIndicator.style.transform = "translateX(" + (linkRect.left - navRect.left) + "px)";
      }

      function setupNavIndicator() {
        if (!el.navIndicator || !el.navLinks.length) return;
        updateNavIndicator();
        el.navLinks.forEach((link) => {
          link.addEventListener("mouseenter", () => updateNavIndicator(link));
        });
        const nav = el.navLinks[0].parentElement;
        if (nav) {
          nav.addEventListener("mouseleave", () => updateNavIndicator());
        }
        window.addEventListener("resize", () => updateNavIndicator());
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
            document.body.classList.add("page-leaving");
            window.setTimeout(() => {
              window.location.href = href;
            }, 170);
          });
        });
      }

      async function refreshAll() {
        await refreshAuth();

        if (PAGE === "legal") {
          await refreshLegalConfig();
        }

        if (PAGE !== "login" && PAGE !== "account") {
          await refreshStatusAndJobs();
          await refreshLoginSession();
        }

        if (PAGE === "account") {
          await refreshAdminUsers();
          await refreshAdminLegal();
          await refreshAdminStorage(true);
        }

        setupSurfaceMotion();
      }

      switchAuthTab("login");
      setupNavIndicator();
      setupPageTransitions();
      if (el.jobsFilterButtons.length) {
        el.jobsFilterButtons.forEach((button) => {
          button.addEventListener("click", () => {
            setJobsFilter(button.getAttribute("data-jobs-filter") || "all");
          });
        });
      }
      refreshAll().catch((error) => setNotice(normalizeErrorMessage(error.message), "error"));
      if (pollingHandle) clearInterval(pollingHandle);
      pollingHandle = setInterval(() => {
        refreshAll().catch(() => {});
      }, 5000);
    </script>
  </body>
</html>`;
}
