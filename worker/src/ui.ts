type AppPage = "download" | "login" | "settings" | "account" | "legal";

function renderNav(page: AppPage): string {
  const items: Array<{ key: AppPage; href: string; label: string }> = [
    { key: "download", href: "/download", label: "Tasks" },
    { key: "settings", href: "/settings", label: "QR Login" },
    { key: "account", href: "/account", label: "Account" },
    { key: "legal", href: "/legal", label: "Legal" },
    { key: "login", href: "/login", label: "Sign in" },
  ];

  return `<nav class="app-nav">${items.map((item) => `<a href="${item.href}" data-nav="${item.key}" class="app-nav-link ${page === item.key ? "active" : ""}">${item.label}</a>`).join("")}</nav>`;
}

function renderDownloadPage(): string {
  return `
      <section class="pagehead">
        <div>
          <div class="pagehead-eyebrow">Repository / Downloads</div>
          <h1 class="pagehead-title">下载任务</h1>
          <p class="pagehead-description">提交直播回放链接，集中查看任务状态、文件输出和错误记录。</p>
        </div>
        <div class="pagehead-actions">
          <button id="refresh-btn" type="button">Refresh</button>
        </div>
      </section>

      <section class="dashboard-grid">
        <section class="box composer-box">
          <div class="box-header">
            <div>
              <h2 class="box-title">Create new job</h2>
            </div>
          </div>
          <div class="box-body">
            <div id="legal-warning" class="notice error hidden"></div>
            <div class="field">
              <label for="urls">回放链接</label>
            </div>
            <textarea id="urls" placeholder="每行一个钉钉回放链接"></textarea>
            <div class="composer-footer">
              <div class="muted compact-copy">一行一个链接，系统会自动拆成独立任务。</div>
              <button id="create-job-btn" class="primary" type="button">创建任务</button>
            </div>
          </div>
        </section>

        <aside class="stats-column">
          <section class="box">
            <div class="box-header">
              <h2 class="box-title">Overview</h2>
            </div>
            <div class="box-body">
              <div class="stats-grid">
                <div class="stat-card"><span>Cookies</span><strong id="stat-cookies">-</strong></div>
                <div class="stat-card"><span>Total</span><strong id="stat-total">0</strong></div>
                <div class="stat-card"><span>Running</span><strong id="stat-running">0</strong></div>
                <div class="stat-card"><span>Succeeded</span><strong id="stat-success">0</strong></div>
              </div>
            </div>
          </section>
          <section class="box">
            <div class="box-header">
              <h2 class="box-title">Quick note</h2>
            </div>
            <div class="box-body prose-copy">
              先确认 Cookies 已就绪，并完成免责声明接受，再提交任务。
            </div>
          </section>
        </aside>
      </section>

      <section class="box jobs-box">
        <div class="box-header jobs-header">
          <div>
            <h2 class="box-title">Jobs</h2>
          </div>
          <div class="jobs-range-wrap">
            <span id="jobs-range" class="muted">暂无任务</span>
          </div>
        </div>
        <div class="box-body no-padding">
          <div id="jobs" class="job-list"><div class="empty">暂无任务</div></div>
        </div>
        <div id="jobs-pagination" class="pagination hidden">
          <button id="jobs-prev-btn" type="button">Previous</button>
          <div id="jobs-page-info" class="pagination-info">Page 1 of 1</div>
          <button id="jobs-next-btn" type="button">Next</button>
        </div>
      </section>`;
}

function renderLoginPage(): string {
  return `
      <section class="pagehead">
        <div>
          <div class="pagehead-eyebrow">Authentication</div>
          <h1 class="pagehead-title">Sign in</h1>
          <p class="pagehead-description">登录后即可进入下载、二维码登录和账号管理。</p>
        </div>
      </section>

      <section class="split-layout">
        <section class="box auth-box" id="login-panel">
          <div class="box-header">
            <h2 class="box-title">Sign in to GoDingtalk</h2>
          </div>
          <div class="box-body">
            <div class="field">
              <label for="login-username">用户名</label>
              <input id="login-username" placeholder="输入用户名" />
            </div>
            <div class="field">
              <label for="login-password">密码</label>
              <input id="login-password" type="password" placeholder="输入密码" />
            </div>
            <div class="actions">
              <button id="login-btn" class="primary" type="button">登录</button>
            </div>
          </div>
        </section>

        <section class="box auth-box" id="register-panel">
          <div class="box-header">
            <div>
              <h2 class="box-title">Create an account</h2>
            </div>
          </div>
          <div class="box-body">
            <p class="muted" id="register-card-hint">创建新账号后即可登录使用</p>
            <div class="field">
              <label for="register-username">用户名</label>
              <input id="register-username" placeholder="至少 3 位" />
            </div>
            <div class="field">
              <label for="register-password">密码</label>
              <input id="register-password" type="password" placeholder="至少 6 位" />
            </div>
            <div class="actions">
              <button id="register-btn" type="button">注册</button>
            </div>
          </div>
        </section>

        <section class="box auth-session hidden" id="auth-session-card">
          <div class="box-header">
            <h2 class="box-title">Current session</h2>
          </div>
          <div class="box-body">
            <p class="muted" id="auth-session-summary">已登录</p>
            <div class="actions">
              <a class="button-link primary" href="/download">前往下载页</a>
              <button id="logout-btn" type="button">退出登录</button>
            </div>
          </div>
        </section>
      </section>`;
}

function renderSettingsPage(installURL: string): string {
  return `
      <section class="pagehead">
        <div>
          <div class="pagehead-eyebrow">Workflow</div>
          <h1 class="pagehead-title">二维码登录</h1>
          <p class="pagehead-description">启动登录工作流，等待二维码出现并回传 Cookies。</p>
        </div>
      </section>

      <section class="split-layout">
        <section class="box">
          <div class="box-header">
            <h2 class="box-title">Start workflow</h2>
          </div>
          <div class="box-body">
            <div id="login-legal-warning" class="notice error hidden"></div>
            <div class="notice warn">如果当前 Cookies 仍然有效，请不要重复扫码登录，以免触发风控。</div>
            <div class="actions">
              <button id="start-login-workflow-btn" class="primary" type="button">启动二维码登录</button>
            </div>
            <div id="login-box" class="login-box hidden">
              <div id="login-status" class="login-status">等待开始</div>
              <img id="login-qr-image" class="qr-image hidden" alt="登录二维码" />
              <div id="login-hint" class="muted small">启动后通常约 1 分钟内出现二维码。</div>
            </div>
          </div>
        </section>

        <aside class="box">
          <div class="box-header">
            <h2 class="box-title">Guide</h2>
          </div>
          <div class="box-body guide-body">
            <div class="guide-item"><strong>1</strong><span>先确认账号已登录，并接受当前免责声明。</span></div>
            <div class="guide-item"><strong>2</strong><span>点击启动后等待二维码出现，再用钉钉扫码。</span></div>
            <div class="guide-item"><strong>3</strong><span>扫码成功后，Cookies 会自动回传到 Worker。</span></div>
            <div class="actions">
              <a class="button-link" href="${installURL}">安装辅助脚本</a>
            </div>
          </div>
        </aside>
      </section>`;
}

function renderAccountPage(): string {
  return `
      <section class="pagehead">
        <div>
          <div class="pagehead-eyebrow">Settings</div>
          <h1 class="pagehead-title">账号中心</h1>
          <p class="pagehead-description">查看当前账号状态，更新密码，并在 sudo 模式下管理用户与免责声明。</p>
        </div>
      </section>

      <section class="split-layout">
        <section class="box">
          <div class="box-header">
            <h2 class="box-title">Profile</h2>
          </div>
          <div class="box-body">
            <p id="account-summary" class="muted">未登录</p>
          </div>
        </section>

        <section class="box">
          <div class="box-header">
            <h2 class="box-title">Change password</h2>
          </div>
          <div class="box-body">
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
              <button id="change-password-btn" class="primary" type="button">保存新密码</button>
            </div>
          </div>
        </section>
      </section>`;
}

function renderAccountAdminPanel(): string {
  return `
      <section id="admin-panel" class="box admin-box hidden">
        <div class="box-header">
          <h2 class="box-title">Admin</h2>
        </div>
        <div class="box-body">
          <div id="admin-users" class="admin-users"><div class="empty">暂无数据</div></div>
          <div class="admin-legal-editor">
            <div class="box-header nested-header">
              <h2 class="box-title">免责内容管理</h2>
            </div>
            <div class="field">
              <label for="admin-legal-text">免责文本</label>
              <textarea id="admin-legal-text" class="legal-editor" placeholder="输入新的免责条款"></textarea>
            </div>
            <div class="actions">
              <button id="save-legal-btn" class="primary" type="button">保存免责</button>
            </div>
            <p id="admin-legal-meta" class="muted small"></p>
          </div>
        </div>
      </section>`;
}

function renderLegalPage(): string {
  return `
      <section class="pagehead">
        <div>
          <div class="pagehead-eyebrow">Policy</div>
          <h1 class="pagehead-title">法律免责声明</h1>
          <p class="pagehead-description">创建下载任务或启动二维码登录前，必须先完整阅读并接受当前版本的条款。</p>
        </div>
      </section>

      <section class="split-layout legal-layout">
        <aside class="box">
          <div class="box-header">
            <h2 class="box-title">Acceptance</h2>
          </div>
          <div class="box-body">
            <div id="legal-state" class="notice ok hidden"></div>
            <div id="legal-version-meta" class="muted small"></div>
            <label class="checkbox-row">
              <input id="legal-confirm-check" type="checkbox" />
              <span>我已完整阅读、理解风险，并自愿承担全部责任。</span>
            </label>
            <div class="actions">
              <button id="accept-legal-btn" class="primary" type="button" disabled>接受当前版本</button>
            </div>
          </div>
        </aside>

        <section class="box">
          <div class="box-header">
            <h2 class="box-title">Document</h2>
          </div>
          <div class="box-body">
            <div id="legal-text" class="legal-text"><div class="empty">正在加载免责内容...</div></div>
            <div class="notice warn" style="margin-top:16px;">点击接受后，系统会记录你的接受时间和版本号，并将其视为有效电子记录。</div>
          </div>
        </section>
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
      return renderAccountPage() + renderAccountAdminPanel();
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
        --bg-default: #f6f8fa;
        --bg-subtle: #f6f8fa;
        --bg-overlay: #ffffff;
        --bg-inset: #f6f8fa;
        --border-default: #d0d7de;
        --border-muted: #d8dee4;
        --fg-default: #1f2328;
        --fg-muted: #59636e;
        --fg-on-emphasis: #ffffff;
        --canvas-inset-shadow: inset 0 1px 0 rgba(27,31,36,0.04);
        --accent-emphasis: #1f883d;
        --accent-emphasis-hover: #1a7f37;
        --accent-subtle: #dafbe1;
        --danger-emphasis: #cf222e;
        --danger-subtle: #ffebe9;
        --warning-subtle: #fff8c5;
        --header-bg: #24292f;
        --header-fg: #f0f6fc;
        --radius: 6px;
      }
      * { box-sizing: border-box; }
      html, body { margin: 0; min-height: 100%; background: var(--bg-default); color: var(--fg-default); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif; }
      body { padding: 0; }
      a { color: inherit; }
      .app-header { background: var(--header-bg); color: var(--header-fg); }
      .app-header-inner { max-width: 1280px; margin: 0 auto; height: 62px; padding: 0 16px; display: flex; align-items: center; gap: 16px; }
      .app-brand { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; color: var(--header-fg); font-weight: 600; }
      .app-brand-mark { width: 28px; height: 28px; border-radius: 999px; background: #f6f8fa; color: #24292f; display: inline-flex; align-items: center; justify-content: center; font-weight: 800; font-size: 12px; }
      .app-nav { display: flex; align-items: center; gap: 4px; flex: 1; min-width: 0; }
      .app-nav-link { color: rgba(240,246,252,0.88); text-decoration: none; font-size: 14px; font-weight: 600; padding: 6px 10px; border-radius: 6px; }
      .app-nav-link:hover, .app-nav-link.active { background: rgba(255,255,255,0.08); color: var(--header-fg); }
      .app-header-actions { display: flex; align-items: center; gap: 12px; }
      .user-chip { color: rgba(240,246,252,0.78); font-size: 13px; white-space: nowrap; }
      .app-main { max-width: 1280px; margin: 0 auto; padding: 24px 16px 40px; display: grid; gap: 16px; }
      .pagehead { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; }
      .pagehead-eyebrow { color: var(--fg-muted); font-size: 12px; font-weight: 600; }
      .pagehead-title { margin: 4px 0 0; font-size: 32px; line-height: 1.25; font-weight: 600; }
      .pagehead-description { margin: 8px 0 0; font-size: 14px; color: var(--fg-muted); max-width: 72ch; line-height: 1.5; }
      .pagehead-actions { display: flex; align-items: center; gap: 8px; }
      .box { background: var(--bg-overlay); border: 1px solid var(--border-default); border-radius: var(--radius); box-shadow: 0 1px 0 rgba(27,31,36,0.04); }
      .box-header { padding: 16px; border-bottom: 1px solid var(--border-default); background: var(--bg-subtle); border-top-left-radius: var(--radius); border-top-right-radius: var(--radius); display: flex; align-items: center; justify-content: space-between; gap: 12px; }
      .box-body { padding: 16px; }
      .box-body.no-padding { padding: 0; }
      .box-title { margin: 0; font-size: 16px; font-weight: 600; }
      .jobs-header { align-items: center; }
      .jobs-range-wrap { display: flex; align-items: center; }
      .muted { color: var(--fg-muted); }
      .field { display: grid; gap: 9px; margin-top: 16px; }
      label { color: var(--fg-default); }
      .field > label { font-size: 12px; font-weight: 600; color: var(--fg-default); }
      input, textarea { width: 100%; border: 1px solid var(--border-default); border-radius: 6px; padding: 10px 12px; font: inherit; background: var(--bg-overlay); color: var(--fg-default); box-shadow: var(--canvas-inset-shadow); }
      textarea { min-height: 180px; resize: vertical; line-height: 1.6; }
      input:focus, textarea:focus { outline: none; border-color: #0969da; box-shadow: 0 0 0 3px rgba(9,105,218,0.15); }
      .actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px; }
      button, .button-link { border: 1px solid var(--border-default); background: var(--bg-overlay); color: var(--fg-default); min-height: 32px; padding: 0 12px; border-radius: 6px; font: inherit; font-weight: 500; text-decoration: none; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 1px 0 rgba(27,31,36,0.04); }
      button.primary, .button-link.primary { background: var(--accent-emphasis); border-color: rgba(27,31,36,0.15); color: var(--fg-on-emphasis); }
      button.primary:hover, .button-link.primary:hover { background: var(--accent-emphasis-hover); }
      button:disabled { opacity: 0.65; cursor: wait; }
      .dashboard-grid, .split-layout, .legal-layout { display: grid; gap: 16px; }
      .dashboard-grid { grid-template-columns: minmax(0, 1.25fr) 320px; }
      .split-layout { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .legal-layout { grid-template-columns: 320px minmax(0, 1fr); }
      .stats-column { display: grid; gap: 16px; }
      .composer-footer { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 16px; }
      .compact-copy, .small, .prose-copy { font-size: 13px; line-height: 1.5; }
      .stats-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
      .stat-card { padding: 12px; border: 1px solid var(--border-muted); border-radius: 6px; background: var(--bg-default); }
      .stat-card span { display: block; font-size: 12px; color: var(--fg-muted); }
      .stat-card strong { display: block; margin-top: 6px; font-size: 24px; font-weight: 600; }
      .job-list { display: grid; }
      .record-card { padding: 16px; border-top: 1px solid var(--border-default); background: var(--bg-overlay); }
      .record-card:hover { background: #f6f8fa; }
      .record-card:first-child { border-top: 0; }
      .record-header { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; gap: 12px; align-items: start; }
      .state-dot { width: 14px; height: 14px; margin-top: 4px; border-radius: 999px; background: var(--border-default); border: 2px solid var(--bg-overlay); box-shadow: 0 0 0 1px var(--border-default); }
      .state-dot.succeeded { background: var(--accent-emphasis); box-shadow: 0 0 0 1px #1f883d; }
      .state-dot.failed { background: var(--danger-emphasis); box-shadow: 0 0 0 1px #cf222e; }
      .state-dot.queued { background: #9a6700; box-shadow: 0 0 0 1px #9a6700; }
      .state-dot.running { background: #0969da; box-shadow: 0 0 0 1px #0969da; }
      .record-overline { font-size: 12px; color: var(--fg-muted); }
      .record-title { margin: 2px 0 0; font-size: 16px; line-height: 1.4; font-weight: 600; color: #0969da; }
      .record-title:hover { text-decoration: underline; }
      .status { display: inline-flex; align-items: center; padding: 2px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; background: var(--bg-inset); color: var(--fg-muted); border: 1px solid var(--border-default); white-space: nowrap; }
      .status.succeeded { background: var(--accent-subtle); color: var(--accent-emphasis); border-color: #4ac26b33; }
      .status.failed { background: var(--danger-subtle); color: var(--danger-emphasis); border-color: #ff818266; }
      .status.queued { background: var(--warning-subtle); color: #9a6700; border-color: #d4a72c66; }
      .record-grid { display: grid; grid-template-columns: minmax(0, 1fr) 190px; gap: 16px; margin-top: 12px; }
      .record-main { display: grid; gap: 10px; }
      .meta-line { display: flex; flex-wrap: wrap; gap: 8px 16px; color: var(--fg-muted); font-size: 12px; }
      .meta-line strong { color: var(--fg-default); font-weight: 500; }
      .progress-track { height: 6px; border-radius: 999px; background: #d8dee4; overflow: hidden; }
      .progress-track > div { height: 100%; background: #2da44e; }
      .progress-caption { display: flex; justify-content: space-between; align-items: center; gap: 12px; color: var(--fg-muted); font-size: 12px; }
      .record-side { display: grid; gap: 6px; justify-items: end; align-content: start; }
      .side-number { font-size: 28px; line-height: 1; font-weight: 600; color: var(--fg-default); }
      .side-label { font-size: 12px; color: var(--fg-muted); }
      .file-cluster { display: grid; gap: 10px; margin-top: 12px; }
      .file-box { padding: 12px; border: 1px solid var(--border-muted); border-radius: 6px; background: var(--bg-subtle); }
      .file-label { color: var(--fg-muted); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em; }
      .file-links { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
      .file-links a { padding: 5px 10px; border-radius: 999px; background: var(--bg-overlay); color: #0969da; text-decoration: none; font-weight: 500; border: 1px solid var(--border-default); }
      .job-errors { margin-top: 14px; padding: 12px; border-radius: 6px; background: var(--danger-subtle); color: var(--danger-emphasis); line-height: 1.7; font-size: 13px; border: 1px solid #ffcecb; }
      .empty { padding: 24px 16px; color: var(--fg-muted); text-align: center; }
      .pagination { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 16px 16px; border-top: 1px solid var(--border-default); }
      .pagination-info { color: var(--muted); font-size: 14px; text-align: center; flex: 1; }
      .guide-body { display: grid; gap: 12px; }
      .guide-item { display: grid; grid-template-columns: 32px minmax(0, 1fr); gap: 12px; align-items: start; padding: 12px 0; border-bottom: 1px solid var(--border-muted); }
      .guide-item:last-child { border-bottom: 0; padding-bottom: 0; }
      .guide-item strong { display: inline-flex; width: 32px; height: 32px; align-items: center; justify-content: center; border-radius: 999px; background: var(--bg-subtle); border: 1px solid var(--border-default); font-size: 12px; }
      .guide-item span { color: var(--fg-muted); line-height: 1.6; font-size: 13px; }
      .login-box { margin-top: 16px; padding: 12px; border-radius: 6px; background: var(--bg-subtle); border: 1px solid var(--border-default); }
      .login-status { font-size: 18px; font-weight: 600; }
      .qr-image { display: block; width: 280px; max-width: 100%; margin-top: 14px; border-radius: 6px; border: 1px solid var(--border-default); background: #fff; }
      .legal-text { display: grid; gap: 12px; line-height: 1.7; }
      .legal-text h3 { margin: 12px 0 0; font-size: 16px; font-weight: 600; }
      .legal-text p { margin: 0; color: var(--text); }
      .admin-users { display: grid; gap: 12px; }
      .admin-user { padding: 16px; border: 1px solid var(--border-default); border-radius: 6px; background: var(--bg-default); }
      .admin-user-top { display: flex; justify-content: space-between; gap: 16px; align-items: start; }
      .admin-user-name { font-weight: 700; font-size: 17px; }
      .admin-user-meta { margin-top: 8px; color: var(--fg-muted); line-height: 1.8; font-size: 14px; }
      .admin-legal-editor { margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border-default); }
      .legal-editor { min-height: 320px; }
      .checkbox-row { display: flex; gap: 10px; align-items: flex-start; margin-top: 16px; line-height: 1.6; color: var(--fg-default); font-size: 14px; font-weight: 400; }
      .checkbox-row input { width: 18px; height: 18px; margin-top: 4px; }
      .hidden { display: none !important; }
      @media (max-width: 1100px) {
        .dashboard-grid,
        .split-layout,
        .legal-layout,
        .record-grid { grid-template-columns: 1fr; }
      }
      @media (max-width: 760px) {
        .app-header-inner { height: auto; padding-top: 12px; padding-bottom: 12px; flex-wrap: wrap; }
        .app-nav { order: 3; width: 100%; overflow-x: auto; padding-bottom: 4px; }
        .app-main { padding: 16px; }
        .pagehead { flex-direction: column; align-items: stretch; }
        .pagehead-title { font-size: 28px; }
        .record-header,
        .pagination,
        .composer-footer,
        .box-header,
        .progress-caption { flex-direction: column; align-items: stretch; }
        .record-header { grid-template-columns: 1fr; }
        .record-side { justify-items: start; }
        .stats-grid { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>
    <header class="app-header">
      <div class="app-header-inner">
        <a class="app-brand" href="/download">
          <span class="app-brand-mark">GD</span>
          <span>GoDingtalk</span>
        </a>
        ${renderNav(page)}
        <div class="app-header-actions">
          <span id="user-chip" class="user-chip">未登录</span>
          <button id="topbar-logout-btn" type="button" class="hidden">退出登录</button>
        </div>
      </div>
    </header>
    <main class="app-main">
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
        jobs: [],
        jobsPage: 1,
        jobsPageSize: 6,
      };

      const el = {
        notice: document.getElementById("notice"),
        userChip: document.getElementById("user-chip"),
        loginPanel: document.getElementById("login-panel"),
        registerPanel: document.getElementById("register-panel"),
        authSessionCard: document.getElementById("auth-session-card"),
        authSessionSummary: document.getElementById("auth-session-summary"),
        loginUsername: document.getElementById("login-username"),
        loginPassword: document.getElementById("login-password"),
        registerUsername: document.getElementById("register-username"),
        registerPassword: document.getElementById("register-password"),
        registerCardHint: document.getElementById("register-card-hint"),
        loginBtn: document.getElementById("login-btn"),
        registerBtn: document.getElementById("register-btn"),
        logoutBtn: document.getElementById("logout-btn"),
        topbarLogoutBtn: document.getElementById("topbar-logout-btn"),
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
        jobsRange: document.getElementById("jobs-range"),
        jobsPagination: document.getElementById("jobs-pagination"),
        jobsPageInfo: document.getElementById("jobs-page-info"),
        jobsPrevBtn: document.getElementById("jobs-prev-btn"),
        jobsNextBtn: document.getElementById("jobs-next-btn"),
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

      function formatNumber(value) {
        const num = Number(value || 0);
        return Number.isFinite(num) ? num.toLocaleString() : "0";
      }

      function paginateJobs(jobs) {
        const safeJobs = Array.isArray(jobs) ? jobs : [];
        const totalPages = Math.max(1, Math.ceil(safeJobs.length / state.jobsPageSize));
        state.jobsPage = Math.min(Math.max(1, state.jobsPage), totalPages);
        const start = (state.jobsPage - 1) * state.jobsPageSize;
        const end = start + state.jobsPageSize;
        return {
          items: safeJobs.slice(start, end),
          total: safeJobs.length,
          totalPages,
          start: safeJobs.length ? start + 1 : 0,
          end: Math.min(end, safeJobs.length),
        };
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
          if (el.loginPanel) el.loginPanel.classList.add("hidden");
          if (el.registerPanel) el.registerPanel.classList.add("hidden");
          if (el.authSessionCard) el.authSessionCard.classList.remove("hidden");
          if (el.authSessionSummary) el.authSessionSummary.textContent = "已登录账号：" + state.user.username + (state.user.is_sudo ? "（sudo）" : "");
          if (el.logoutBtn) el.logoutBtn.classList.remove("hidden");
          if (el.topbarLogoutBtn) el.topbarLogoutBtn.classList.remove("hidden");
          if (el.loginNavLink) el.loginNavLink.classList.add("hidden");
        } else {
          if (el.userChip) el.userChip.textContent = "未登录";
          if (el.loginPanel) el.loginPanel.classList.remove("hidden");
          if (el.authSessionCard) el.authSessionCard.classList.add("hidden");
          if (el.logoutBtn) el.logoutBtn.classList.add("hidden");
          if (el.topbarLogoutBtn) el.topbarLogoutBtn.classList.add("hidden");
          if (el.loginNavLink) el.loginNavLink.classList.remove("hidden");
          if (el.registerPanel) {
            if (state.registrationOpen) {
              el.registerPanel.classList.remove("hidden");
              if (el.registerCardHint) el.registerCardHint.textContent = "创建新账号后即可登录使用";
            } else {
              el.registerPanel.classList.add("hidden");
              if (el.registerCardHint) el.registerCardHint.textContent = "当前未开放注册";
            }
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
        state.jobs = Array.isArray(jobs) ? jobs : [];
        const page = paginateJobs(state.jobs);
        if (el.jobsRange) {
          el.jobsRange.textContent = page.total ? ("显示 " + page.start + "-" + page.end + " / 共 " + page.total + " 条") : "暂无任务";
        }
        if (el.jobsPagination && el.jobsPageInfo && el.jobsPrevBtn && el.jobsNextBtn) {
          if (page.total > state.jobsPageSize) {
            el.jobsPagination.classList.remove("hidden");
            el.jobsPageInfo.textContent = "第 " + state.jobsPage + " / " + page.totalPages + " 页";
            el.jobsPrevBtn.disabled = state.jobsPage <= 1;
            el.jobsNextBtn.disabled = state.jobsPage >= page.totalPages;
          } else {
            el.jobsPagination.classList.add("hidden");
            el.jobsPageInfo.textContent = "第 1 / 1 页";
          }
        }
        if (!page.total) {
          el.jobs.innerHTML = '<div class="empty">暂无任务</div>';
          return;
        }
        el.jobs.innerHTML = page.items.map((job) => {
          const title = job.current_title || (Array.isArray(job.titles) && job.titles[0]) || "下载任务";
          const progress = Math.max(0, Math.min(100, Number(job.progress_percent || 0)));
          const files = Array.isArray(job.files) ? job.files : [];
          const mp4Files = files.filter((file) => String(file.name || "").toLowerCase().endsWith(".mp4"));
          const errors = Array.isArray(job.errors) ? job.errors : [];
          const statusClass = escapeHTML(String(job.status || "").toLowerCase());
          return [
            '<section class="record-card">',
            '<div class="record-header">',
            '<span class="state-dot ' + statusClass + '"></span>',
            '<div><div class="record-overline">Task #' + escapeHTML(job.id) + '</div><div class="record-title">' + escapeHTML(title) + '</div></div>',
            '<span class="status ' + statusClass + '">' + escapeHTML(job.status || '-') + '</span>',
            '</div>',
            '<div class="record-grid">',
            '<div class="record-main">',
            '<div class="meta-line"><span><strong>Stage</strong> ' + escapeHTML(formatStage(job.stage)) + '</span><span><strong>Created</strong> ' + escapeHTML(formatTime(job.created_at)) + '</span><span><strong>Files</strong> ' + escapeHTML(String(files.length)) + '</span></div>',
            '<div class="progress-track"><div style="width:' + escapeHTML(progress.toFixed(1)) + '%"></div></div>',
            '<div class="progress-caption"><span>进度 ' + escapeHTML(progress.toFixed(1)) + '%</span><span>状态 ' + escapeHTML(String(job.status || '-')) + '</span></div>',
            '</div>',
            '<aside class="record-side"><div class="side-number">' + escapeHTML(progress.toFixed(0)) + '%</div><div class="side-label">Progress</div></aside>',
            '</div>',
            (mp4Files.length || files.length) ? '<div class="file-cluster">' : '',
            mp4Files.length ? '<div class="file-box"><div class="file-label">直播 MP4</div><div class="file-links">' + mp4Files.map((file) => '<a href="' + escapeHTML(file.download_url || '#') + '" target="_blank" rel="noreferrer">' + escapeHTML(file.name) + '</a>').join('') + '</div></div>' : '',
            files.length ? '<div class="file-box"><div class="file-label">全部文件</div><div class="file-links">' + files.map((file) => '<a href="' + escapeHTML(file.download_url || '#') + '" target="_blank" rel="noreferrer">' + escapeHTML(file.name) + '</a>').join('') + '</div></div>' : '',
            (mp4Files.length || files.length) ? '</div>' : '',
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
          state.jobsPage = 1;
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
        await request("/api/auth/login", { method: "POST", body: JSON.stringify({ username: (el.loginUsername.value || "").trim(), password: (el.loginPassword.value || "").trim() }) });
        await refreshAll();
        clearNotice();
      }

      async function registerUser() {
        await request("/api/auth/register", { method: "POST", body: JSON.stringify({ username: (el.registerUsername.value || "").trim(), password: (el.registerPassword.value || "").trim() }) });
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
      if (el.topbarLogoutBtn) el.topbarLogoutBtn.addEventListener("click", async () => { setBusy(el.topbarLogoutBtn, true); try { await logout(); setNotice("已退出登录。", "ok"); } catch (error) { setNotice(error.message, "error"); } finally { setBusy(el.topbarLogoutBtn, false); } });
      if (el.createJobBtn) el.createJobBtn.addEventListener("click", async () => { setBusy(el.createJobBtn, true); try { await createJob(); } catch (error) { setNotice(error.message, "error"); } finally { setBusy(el.createJobBtn, false); } });
      if (el.refreshBtn) el.refreshBtn.addEventListener("click", async () => { try { await refreshAll(); } catch (error) { setNotice(error.message, "error"); } });
      if (el.jobsPrevBtn) el.jobsPrevBtn.addEventListener("click", () => {
        state.jobsPage = Math.max(1, state.jobsPage - 1);
        renderJobs(state.jobs);
      });
      if (el.jobsNextBtn) el.jobsNextBtn.addEventListener("click", () => {
        state.jobsPage += 1;
        renderJobs(state.jobs);
      });
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
