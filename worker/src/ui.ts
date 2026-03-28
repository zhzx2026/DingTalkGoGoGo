type AppPage = "overview" | "jobs" | "scan" | "login" | "account" | "legal" | "admin";

function renderSidebar(): string {
  return `
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-head">
          <a class="sidebar-brand" data-page-link href="/overview">
            <span class="brand-mark">S</span>
            <span class="brand-copy">
              <strong>GoDingtalk</strong>
              <span>Control Console</span>
            </span>
          </a>
        </div>

        <nav class="sidebar-nav">
          <a id="nav-overview" class="nav-item" data-page-link href="/overview"><span class="nav-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/></svg></span><span class="nav-label">仪表盘</span></a>
          <a id="nav-legal" class="nav-item" data-page-link href="/legal"><span class="nav-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M6 4h12v16H6z"/><path d="M9 8h6M9 12h6M9 16h4"/></svg></span><span class="nav-label">条款确认</span></a>
          <a id="nav-scan" class="nav-item" data-page-link href="/scan"><span class="nav-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4"/><path d="M9 12h6M12 9v6"/></svg></span><span class="nav-label">钉钉验证</span></a>
          <a id="nav-jobs" class="nav-item" data-page-link href="/jobs"><span class="nav-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M6 4h12M6 10h12M6 16h12"/><circle cx="4" cy="4" r="1.5"/><circle cx="4" cy="10" r="1.5"/><circle cx="4" cy="16" r="1.5"/></svg></span><span class="nav-label">详细记录</span></a>
          <a id="nav-account" class="nav-item" data-page-link href="/account"><span class="nav-icon"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.8-3.4 5-5 8-5s6.2 1.6 8 5"/></svg></span><span class="nav-label">账号设置</span></a>
          <a id="nav-admin" class="nav-item hidden" data-page-link href="/admin"><span class="nav-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4v5c0 5-3.4 8.2-8 9-4.6-.8-8-4-8-9V7z"/><path d="M9.5 12l2 2 3-3"/></svg></span><span class="nav-label">Admin</span></a>
        </nav>

        <div class="sidebar-foot">
          <div class="sidebar-ghost">企业模式</div>
          <button id="sidebar-toggle-btn" type="button" class="sidebar-toggle"><span class="sidebar-toggle-icon">〈〈</span><span class="sidebar-toggle-label">收起</span></button>
        </div>
      </aside>`;
}

function renderTopbar(title: string, subtitle: string): string {
  return `
      <header class="topbar">
        <div class="topbar-copy">
          <div class="eyebrow">Dashboard</div>
          <h1>${title}</h1>
          <p>${subtitle}</p>
        </div>

        <div class="topbar-actions">
          <span class="icon-chip" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none"><path d="M6 10a6 6 0 1 1 12 0v4l2 2H4l2-2zM10 18a2 2 0 0 0 4 0" /></svg>
          </span>
          <div class="top-chip top-chip-light">🇨🇳 ZH</div>
          <div id="top-jobs-chip" class="top-chip top-chip-light">🗂 0</div>
          <div id="top-balance-chip" class="top-chip top-chip-money">💵 $0.00</div>
          <div id="user-menu-wrap" class="user-menu-wrap hidden">
            <button id="user-menu-trigger" class="profile-trigger" type="button" aria-haspopup="menu" aria-expanded="false">
              <span id="avatar-fallback" class="avatar-fallback">U</span>
              <span class="profile-copy">
                <strong id="profile-name">未登录</strong>
                <span id="profile-role">User</span>
              </span>
              <span class="profile-caret">⌄</span>
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
          </div>
        </div>
      </header>`;
}

function renderMetricCards(): string {
  return `
      <section class="metric-grid">
        <article class="metric-card">
          <div class="metric-icon mint">✓</div>
          <div class="metric-copy">
            <span>钉钉验证</span>
            <strong id="stat-cookies">-</strong>
            <small>当前状态</small>
          </div>
        </article>
        <article class="metric-card">
          <div class="metric-icon blue">⌁</div>
          <div class="metric-copy">
            <span>总任务</span>
            <strong id="stat-total">0</strong>
            <small>全部下载任务</small>
          </div>
        </article>
        <article class="metric-card">
          <div class="metric-icon green">↗</div>
          <div class="metric-copy">
            <span>进行中</span>
            <strong id="stat-running">0</strong>
            <small>队列 + 运行中</small>
          </div>
        </article>
        <article class="metric-card">
          <div class="metric-icon purple">◆</div>
          <div class="metric-copy">
            <span>已完成</span>
            <strong id="stat-success">0</strong>
            <small>已完成下载</small>
          </div>
        </article>
        <article class="metric-card">
          <div class="metric-icon red">!</div>
          <div class="metric-copy">
            <span>失败任务</span>
            <strong id="stat-failed">0</strong>
            <small>需要处理</small>
          </div>
        </article>
        <article class="metric-card">
          <div class="metric-icon yellow">7</div>
          <div class="metric-copy">
            <span>近 7 天创建</span>
            <strong id="stat-created-week">0</strong>
            <small>滚动统计</small>
          </div>
        </article>
        <article class="metric-card">
          <div class="metric-icon blue">%</div>
          <div class="metric-copy">
            <span>完成率</span>
            <strong id="stat-completion-rate">0%</strong>
            <small>最近任务</small>
          </div>
        </article>
        <article class="metric-card">
          <div class="metric-icon mint">⏱</div>
          <div class="metric-copy">
            <span>最近验证</span>
            <strong id="stat-cookie-time">-</strong>
            <small>更新时间</small>
          </div>
        </article>
      </section>`;
}

function renderLoginPage(): string {
  return `
      <section class="login-shell">
        <section class="panel login-brand-panel">
          <div class="eyebrow">Private Console</div>
          <h1>钉钉回放下载控制台</h1>
          <p>沿用当前业务结构，但视觉语言切到更接近 Sub2API 的后台风格。登录后按顺序完成条款确认、钉钉验证与下载提交。</p>
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
              <button id="login-btn" class="button-link primary" type="button">登录</button>
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
              <button id="register-btn" class="button-link" type="button">注册</button>
            </div>
          </section>
        </section>
      </section>`;
}

function renderOverviewPage(): string {
  return `
      ${renderTopbar("仪表盘", "欢迎回来！这是当前账号的概览。")}

      ${renderMetricCards()}

      <section class="toolbar-card">
        <div class="toolbar-group">
          <strong>时间范围:</strong>
          <button id="overview-range-btn" type="button" class="select-chip">近 7 天</button>
        </div>
        <div class="toolbar-group">
          <strong>粒度:</strong>
          <button id="overview-granularity-btn" type="button" class="select-chip">按天</button>
        </div>
      </section>

      <section class="analytics-grid">
        <section class="chart-card">
          <div class="section-head">
            <h2>任务状态分布</h2>
          </div>
          <div class="donut-layout">
            <div id="overview-donut" class="donut"></div>
            <div id="overview-donut-table" class="mini-table"><div class="empty">正在加载...</div></div>
          </div>
        </section>

        <section class="chart-card">
          <div class="section-head">
            <h2 id="overview-trend-title">近 7 天任务趋势</h2>
          </div>
          <div class="trend-layout">
            <div class="trend-legend">
              <span><i class="legend-dot blue"></i>创建</span>
              <span><i class="legend-dot green"></i>完成</span>
              <span><i class="legend-dot red"></i>失败</span>
            </div>
            <div id="overview-trend" class="trend-chart"><div class="empty">正在加载...</div></div>
          </div>
        </section>
      </section>

      <section class="overview-grid">
        <section class="work-card">
          <div class="section-head">
            <div>
              <div class="eyebrow">Submit</div>
              <h2>提交下载</h2>
            </div>
          </div>

          <div id="overview-gate" class="gate-card">
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
              <button id="create-job-btn" class="button-link primary" type="button">开始下载</button>
              <button id="refresh-btn" class="button-link" type="button">刷新状态</button>
            </div>
          </div>
        </section>

        <aside class="overview-side-stack">
          <section class="card">
            <div class="section-head">
              <div>
                <div class="eyebrow">Recent</div>
                <h2>近 10 条记录</h2>
              </div>
              <a data-page-link href="/jobs" class="mini-link">详细记录</a>
            </div>
            <div id="recent-records" class="recent-list"><div class="empty">暂无记录</div></div>
          </section>

          <section class="card quick-actions-card">
            <div class="section-head">
              <div>
                <div class="eyebrow">Quick Actions</div>
                <h2>快捷操作</h2>
              </div>
            </div>
            <div class="quick-actions-list">
              <a data-page-link href="/scan" class="quick-action-item">
                <span class="quick-action-icon">⌁</span>
                <span class="quick-action-copy">
                  <strong>钉钉验证</strong>
                  <small>重新扫码刷新验证状态</small>
                </span>
                <span class="quick-action-arrow">›</span>
              </a>
              <a data-page-link href="/jobs" class="quick-action-item">
                <span class="quick-action-icon">☷</span>
                <span class="quick-action-copy">
                  <strong>查看记录</strong>
                  <small>进入详细任务列表</small>
                </span>
                <span class="quick-action-arrow">›</span>
              </a>
              <a data-page-link href="/account" class="quick-action-item">
                <span class="quick-action-icon">◌</span>
                <span class="quick-action-copy">
                  <strong>账号设置</strong>
                  <small>修改密码与退出登录</small>
                </span>
                <span class="quick-action-arrow">›</span>
              </a>
            </div>
          </section>
        </aside>
      </section>`;
}

function renderLegalPage(): string {
  return `
      ${renderTopbar("条款确认", "新注册用户先在这里完成当前版本条款确认，一经同意，在条款变更前不会再次显示。")}

      <section class="dual-grid">
        <section id="legal-step" class="card">
          <div class="section-head">
            <div>
              <div class="eyebrow">Step 1</div>
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
            <button id="accept-legal-btn" class="button-link primary" type="button" disabled>同意条款</button>
          </div>
        </section>

        <section class="card">
          <div class="section-head">
            <div>
              <div class="eyebrow">Document</div>
              <h2>条款全文</h2>
            </div>
          </div>
          <div id="legal-text" class="legal-text"><div class="empty">正在加载条款...</div></div>
        </section>
      </section>`;
}

function renderScanPage(): string {
  return `
      ${renderTopbar("钉钉验证", "这里仅支持二维码登录。即使当前已有验证态，也可以重新扫码，因为钉钉验证会过期。")}

      ${renderMetricCards()}

      <section class="scan-grid">
        <section class="scan-main-card">
          <div class="section-head">
            <div>
              <div class="eyebrow">Step 2</div>
              <h2>二维码登录</h2>
            </div>
            <span id="cookie-badge" class="badge warn">未完成</span>
          </div>
          <div id="cookie-state" class="notice hidden"></div>
          <div id="cookie-meta" class="meta-line"></div>
          <div class="actions">
            <button id="start-login-workflow-btn" class="button-link primary" type="button">启动二维码登录</button>
          </div>
          <div id="login-box" class="scan-box hidden">
            <div id="login-status" class="scan-title">正在生成二维码</div>
            <div id="login-hint" class="muted">二维码出现后，请使用钉钉扫码登录。</div>
            <div class="scan-qr-frame">
              <img id="login-qr-image" class="qr-image hidden" alt="登录二维码" />
            </div>
          </div>
        </section>

        <aside class="scan-side-card">
          <div class="section-head">
            <div>
              <div class="eyebrow">Flow</div>
              <h2>下一步</h2>
            </div>
          </div>
          <div class="scan-steps">
            <div class="scan-step"><strong>1</strong><span>等待二维码出现</span></div>
            <div class="scan-step"><strong>2</strong><span>使用钉钉扫码登录</span></div>
            <div class="scan-step"><strong>3</strong><span>验证成功后可以继续下载，也可随时重新扫码</span></div>
          </div>
        </aside>
      </section>`;
}

function renderJobsPage(): string {
  return `
      ${renderTopbar("详细记录", "记录采用单行列表展示，点击某一行后在下方展开详情。")}

      ${renderMetricCards()}

      <section class="records-card">
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
          <button id="jobs-prev-btn" class="button-link" type="button">上一页</button>
          <div id="jobs-page-indicator" class="muted">1 / 1</div>
          <button id="jobs-next-btn" class="button-link" type="button">下一页</button>
        </div>
      </section>`;
}

function renderAccountPage(): string {
  return `
      ${renderTopbar("账号设置", "这里只保留当前账号信息、修改密码和退出登录。")}

      <section class="dual-grid">
        <section class="card">
          <div class="section-head">
            <div>
              <div class="eyebrow">Profile</div>
              <h2>当前账号</h2>
            </div>
          </div>
          <p id="account-summary" class="muted">正在加载...</p>
          <div class="actions">
            <button id="topbar-logout-btn-inline" class="button-link" type="button">退出登录</button>
          </div>
        </section>

        <section class="card">
          <div class="section-head">
            <div>
              <div class="eyebrow">Security</div>
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
            <button id="change-password-btn" class="button-link primary" type="button">保存新密码</button>
          </div>
        </section>
      </section>`;
}

function renderAdminPage(): string {
  return `
      ${renderTopbar("管理页", "这里只展示 sudo 需要处理的内容：R2 文件、异常用户和条款管理。")}

      <section class="admin-grid">
        <section class="card">
          <div class="section-head">
            <div>
              <div class="eyebrow">R2 Storage</div>
              <h2>R2 文件</h2>
            </div>
          </div>
          <div class="storage-toolbar">
            <div class="field storage-search">
              <label for="admin-storage-prefix">对象前缀</label>
              <input id="admin-storage-prefix" placeholder="例如 dedup/" />
            </div>
            <div class="actions">
              <button id="admin-storage-refresh-btn" class="button-link primary" type="button">刷新文件</button>
            </div>
          </div>
          <div id="admin-storage-meta" class="meta-line"></div>
          <div id="admin-storage-list" class="storage-list"><div class="empty">正在加载 R2 文件...</div></div>
          <div class="actions">
            <button id="admin-storage-more-btn" class="button-link hidden" type="button">加载更多</button>
          </div>
        </section>

        <section class="card">
          <div class="section-head">
            <div>
              <div class="eyebrow">Users</div>
              <h2>需要处理的用户</h2>
            </div>
          </div>
          <div id="admin-user-meta" class="meta-line"></div>
          <div id="admin-users" class="admin-users"><div class="empty">正在加载用户数据...</div></div>
        </section>

        <section class="card">
          <div class="section-head">
            <div>
              <div class="eyebrow">Legal</div>
              <h2>条款管理</h2>
            </div>
          </div>
          <div class="field">
            <label for="admin-legal-text">条款内容</label>
            <textarea id="admin-legal-text" class="large-textarea" placeholder="输入新的条款正文"></textarea>
          </div>
          <div class="actions">
            <button id="save-legal-btn" class="button-link primary" type="button">保存条款</button>
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
        --bg: #f9fafb;
        --sidebar-bg: #ffffff;
        --surface: #ffffff;
        --surface-soft: #f8fafc;
        --line: #e5e7eb;
        --line-strong: #d1d5db;
        --text: #111827;
        --muted: #6b7280;
        --accent: #12a594;
        --accent-strong: #0e8b7d;
        --accent-soft: rgba(18,165,148,0.10);
        --blue: #3b82f6;
        --green: #10b981;
        --purple: #8b5cf6;
        --yellow: #f59e0b;
        --red: #ef4444;
        --warn: #d97706;
        --shadow: 0 8px 20px rgba(15, 23, 42, 0.05);
        --radius-xl: 24px;
        --radius-lg: 16px;
        --radius-md: 12px;
        --radius-sm: 10px;
        --sidebar-width: 256px;
        --sidebar-collapsed-width: 72px;
      }
      * { box-sizing: border-box; }
      html, body {
        margin: 0;
        min-height: 100%;
        background: var(--bg);
        color: var(--text);
        font-family: "SF Pro Text", "PingFang SC", "Helvetica Neue", Arial, sans-serif;
      }
      body { padding: 0; overflow-x: hidden; }
      a { color: inherit; }
      button, input, textarea { font: inherit; }
      .hidden { display: none !important; }
      body.page-ready .shell { opacity: 1; transform: none; }
      body.page-leaving .shell { opacity: 0; transform: translateY(8px); }
      .shell {
        min-height: 100vh;
        display: grid;
        grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
        opacity: 0;
        transform: translateY(6px);
        transition: opacity 180ms ease, transform 220ms ease;
      }
      body.sidebar-collapsed .shell {
        grid-template-columns: var(--sidebar-collapsed-width) minmax(0, 1fr);
      }
      .sidebar {
        padding: 0;
        background: var(--sidebar-bg);
        border-right: 1px solid var(--line);
        display: grid;
        grid-template-rows: auto 1fr auto;
        gap: 0;
      }
      .sidebar-head {
        display: flex;
        align-items: center;
        min-height: 64px;
        padding: 0 18px;
        border-bottom: 1px solid #f3f4f6;
      }
      .sidebar-brand {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 0;
        text-decoration: none;
        width: 100%;
      }
      .brand-mark {
        width: 36px;
        height: 36px;
        border-radius: 12px;
        border: 1px solid rgba(14, 139, 125, 0.24);
        background: linear-gradient(135deg, #0a57de, #14b8a6);
        color: white;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: 900;
      }
      .brand-copy strong {
        display: block;
        font-size: 18px;
        line-height: 1;
      }
      .brand-copy span {
        display: block;
        margin-top: 4px;
        color: var(--muted);
        font-size: 10px;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }
      body.sidebar-collapsed .brand-copy,
      body.sidebar-collapsed .nav-label,
      body.sidebar-collapsed .sidebar-toggle-label {
        display: none;
      }
      .sidebar-nav {
        display: grid;
        gap: 6px;
        align-content: start;
        padding: 12px;
      }
      .nav-item {
        min-height: 42px;
        border-radius: 12px;
        display: grid;
        grid-template-columns: 22px minmax(0, 1fr);
        align-items: center;
        gap: 10px;
        padding: 0 12px;
        color: #374151;
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
        border: 1px solid transparent;
        transition: background 140ms ease, border-color 140ms ease, color 140ms ease;
      }
      .nav-item.active {
        background: #e9f8f4;
        border-color: #d2efe8;
        color: var(--accent);
      }
      .nav-item:hover {
        background: #f5f8fc;
        border-color: #e3e8f0;
      }
      .nav-icon {
        width: auto;
        height: auto;
        border: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
      }
      .nav-icon svg {
        width: 18px;
        height: 18px;
      }
      .nav-icon svg * {
        stroke: currentColor;
        stroke-width: 1.8;
        stroke-linecap: round;
        stroke-linejoin: round;
        fill: none;
      }
      body.sidebar-collapsed .nav-item {
        grid-template-columns: 1fr;
        justify-items: center;
        padding: 0;
      }
      .sidebar-foot {
        display: grid;
        gap: 8px;
        border-top: 1px solid #f3f4f6;
        padding: 12px 12px 14px;
      }
      .sidebar-ghost {
        min-height: 38px;
        border-radius: 10px;
        border: 1px solid var(--line);
        background: #ffffff;
        color: #475467;
        font-size: 13px;
        font-weight: 700;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      }
      .sidebar-toggle {
        min-height: 38px;
        border-radius: 10px;
        border: 1px solid var(--line);
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        color: #475467;
        font-size: 13px;
        font-weight: 700;
      }
      .sidebar-toggle-icon {
        font-size: 11px;
        letter-spacing: -0.16em;
      }
      .main {
        padding: 18px 20px 24px;
        background:
          linear-gradient(180deg, #f4fbfb 0%, #f0f7f7 52%, #eff5f7 100%);
      }
      .topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        margin: -18px -20px 16px;
        padding: 12px 20px;
        min-height: 64px;
        border-bottom: 1px solid #e5e7eb;
        background: rgba(255, 255, 255, 0.84);
        backdrop-filter: blur(8px);
      }
      .topbar-copy .eyebrow {
        display: none;
      }
      .topbar-copy h1 {
        margin: 0;
        font-size: 18px;
        line-height: 1.22;
        letter-spacing: -0.02em;
        font-weight: 600;
      }
      .topbar-copy p {
        margin: 3px 0 0;
        color: var(--muted);
        font-size: 11px;
        line-height: 1.35;
      }
      .topbar-actions {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .icon-chip {
        width: 34px;
        height: 34px;
        border-radius: 10px;
        border: 1px solid var(--line);
        background: #f8fafc;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #667085;
      }
      .icon-chip svg {
        width: 15px;
        height: 15px;
      }
      .icon-chip svg path {
        stroke: currentColor;
        stroke-width: 1.8;
        stroke-linecap: round;
        stroke-linejoin: round;
        fill: none;
      }
      .top-chip {
        min-height: 34px;
        padding: 0 12px;
        border-radius: 10px;
        border: 1px solid var(--line);
        background: #f8fafc;
        display: inline-flex;
        align-items: center;
        color: var(--muted);
        font-size: 12px;
        font-weight: 700;
      }
      .top-chip-light {
        color: #374151;
      }
      .top-chip-money {
        color: var(--accent);
      }
      .user-menu-wrap {
        position: relative;
      }
      .profile-trigger {
        min-height: 40px;
        padding: 0 12px 0 0;
        border-radius: 999px;
        border: 0;
        background: transparent;
        color: var(--text);
        display: inline-flex;
        align-items: center;
        gap: 10px;
      }
      .profile-trigger:hover {
        background: rgba(255,255,255,0.76);
      }
      .avatar-fallback {
        width: 34px;
        height: 34px;
        border-radius: 999px;
        border: 1px solid var(--line-strong);
        background: linear-gradient(135deg, #0f766e, #14b8a6);
        color: white;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 900;
        box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);
      }
      .profile-copy {
        display: grid;
        text-align: left;
        line-height: 1.15;
      }
      .profile-copy strong {
        font-size: 14px;
      }
      .profile-copy span {
        font-size: 11px;
        color: var(--muted);
      }
      .profile-caret {
        color: #94a3b8;
        font-size: 14px;
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
        width: 100%;
      }
      .metric-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 14px;
        margin-top: 14px;
      }
      .metric-card {
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 16px;
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03);
        padding: 14px 16px;
        display: grid;
        grid-template-columns: 44px minmax(0, 1fr);
        gap: 12px;
        align-items: center;
        min-height: 96px;
      }
      .metric-icon {
        width: 38px;
        height: 38px;
        border-radius: 12px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 900;
        font-size: 15px;
      }
      .metric-icon.mint { background: rgba(16,185,129,0.14); color: var(--green); }
      .metric-icon.blue { background: rgba(59,130,246,0.14); color: var(--blue); }
      .metric-icon.green { background: rgba(34,197,94,0.14); color: var(--green); }
      .metric-icon.purple { background: rgba(139,92,246,0.14); color: var(--purple); }
      .metric-copy span {
        display: block;
        color: var(--muted);
        font-size: 12px;
      }
      .metric-copy strong {
        display: block;
        margin-top: 3px;
        font-size: 27px;
        line-height: 1.1;
      }
      .metric-copy small {
        display: block;
        margin-top: 4px;
        font-size: 12px;
        color: var(--muted);
      }
      .toolbar-card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 12px 14px;
        margin-top: 14px;
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 16px;
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03);
      }
      .toolbar-group {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .toolbar-group strong {
        font-size: 15px;
      }
      .select-chip,
      .button-link,
      .mini-link,
      .size-chip {
        min-height: 36px;
        padding: 0 12px;
        border-radius: 10px;
        border: 1px solid var(--line);
        background: #ffffff;
        color: #374151;
        font-size: 13px;
        font-weight: 600;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 140ms ease, border-color 140ms ease, box-shadow 140ms ease;
      }
      .button-link.primary {
        border-color: transparent;
        background: linear-gradient(180deg, var(--accent) 0%, var(--accent-strong) 100%);
        color: white;
      }
      .button-link:hover,
      .mini-link:hover,
      .size-chip:hover,
      .select-chip:hover {
        border-color: var(--line-strong);
        background: #f8fafc;
      }
      .button-link:disabled,
      .size-chip:disabled {
        opacity: 0.55;
        cursor: not-allowed;
        box-shadow: none;
      }
      .select-chip.active {
        border-color: rgba(18,165,148,0.35);
        background: rgba(18,165,148,0.08);
        color: var(--accent-strong);
      }
      .analytics-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: 14px;
        margin-top: 14px;
      }
      .chart-card,
      .card,
      .records-card {
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 16px;
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03);
        padding: 16px;
      }
      .section-head {
        display: flex;
        justify-content: space-between;
        align-items: start;
        gap: 12px;
      }
      .section-head h2 {
        margin: 6px 0 0;
        font-size: 18px;
      }
      .mini-table {
        display: grid;
        gap: 10px;
      }
      .donut-layout {
        display: grid;
        grid-template-columns: 210px minmax(0, 1fr);
        gap: 16px;
        align-items: center;
        margin-top: 12px;
        min-height: 252px;
      }
      .donut {
        width: 170px;
        height: 170px;
        border-radius: 999px;
        background: conic-gradient(var(--blue) 0 88%, var(--green) 88% 96%, var(--red) 96% 100%);
        display: grid;
        place-items: center;
        margin: 0 auto;
      }
      .donut::after {
        content: "";
        width: 80px;
        height: 80px;
        border-radius: 999px;
        background: white;
      }
      .mini-table-head,
      .mini-table-row {
        display: grid;
        grid-template-columns: 1.15fr 0.7fr 0.7fr 0.8fr;
        gap: 10px;
        font-size: 13px;
      }
      .mini-table-head {
        color: var(--muted);
        font-weight: 700;
      }
      .mini-table-row {
        min-height: 32px;
        align-items: center;
        padding: 0 8px;
        border-radius: 8px;
        background: var(--surface-soft);
        border: 1px solid #edf2f7;
      }
      .trend-layout {
        margin-top: 12px;
        display: grid;
        gap: 12px;
        min-height: 252px;
      }
      .trend-legend {
        display: flex;
        gap: 14px;
        flex-wrap: wrap;
        font-size: 12px;
        color: var(--muted);
      }
      .legend-dot {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 999px;
        margin-right: 6px;
      }
      .legend-dot.blue { background: var(--blue); }
      .legend-dot.green { background: var(--green); }
      .legend-dot.red { background: var(--red); }
      .trend-chart {
        min-height: 228px;
        border: 1px solid #eef2f7;
        border-radius: 12px;
        background: linear-gradient(180deg, rgba(22,163,163,0.05), transparent 70%), #ffffff;
        overflow: hidden;
        position: relative;
      }
      .trend-chart::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
          linear-gradient(to right, transparent 0, transparent calc(33.333% - 1px), rgba(211,218,228,0.7) calc(33.333% - 1px), rgba(211,218,228,0.7) 33.333%, transparent 33.333%) 0 0 / 100% 100%,
          linear-gradient(to top, rgba(211,218,228,0.55) 1px, transparent 1px) 0 0 / 100% 22%;
        pointer-events: none;
      }
      .trend-chart svg {
        width: 100%;
        height: 100%;
        display: block;
        position: relative;
        z-index: 1;
      }
      .overview-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.15fr) 360px;
        gap: 14px;
        margin-top: 14px;
      }
      .overview-side-stack {
        display: grid;
        gap: 14px;
      }
      .work-card,
      .scan-main-card,
      .scan-side-card {
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 16px;
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03);
        padding: 16px;
      }
      .field {
        display: grid;
        gap: 8px;
        margin-top: 16px;
      }
      .field > label {
        font-size: 12px;
        color: var(--muted);
        font-weight: 700;
      }
      input, textarea {
        width: 100%;
        border: 1px solid var(--line-strong);
        background: #ffffff;
        color: var(--text);
        border-radius: var(--radius-md);
        padding: 12px 14px;
      }
      textarea {
        min-height: 160px;
        resize: vertical;
        line-height: 1.65;
      }
      input:focus, textarea:focus {
        outline: none;
        border-color: rgba(22, 163, 163, 0.42);
        box-shadow: 0 0 0 4px rgba(22, 163, 163, 0.10);
      }
      .gate-card {
        margin-top: 12px;
        padding: 12px;
        border-radius: 12px;
        border: 1px dashed rgba(22,163,163,0.28);
        background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(246,252,252,0.98));
      }
      .gate-title {
        font-size: 16px;
        font-weight: 800;
        letter-spacing: -0.02em;
      }
      .recent-list {
        display: grid;
        gap: 8px;
        margin-top: 10px;
      }
      .recent-row {
        min-height: 72px;
        display: grid;
        grid-template-columns: 40px minmax(0, 1fr) auto;
        gap: 10px;
        align-items: center;
        padding: 0 14px;
        border-radius: 14px;
        background: #f8fafc;
        border: 1px solid var(--line);
        transition: background 120ms ease, border-color 120ms ease;
      }
      .recent-row:hover {
        background: #ffffff;
        border-color: var(--line-strong);
      }
      .recent-icon {
        width: 36px;
        height: 36px;
        border-radius: 12px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: rgba(22,163,163,0.14);
        color: var(--accent);
        font-size: 14px;
        font-weight: 900;
      }
      .recent-main {
        min-width: 0;
      }
      .recent-title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
        font-weight: 700;
      }
      .recent-subtitle {
        margin-top: 2px;
        color: var(--muted);
        font-size: 12px;
      }
      .recent-side {
        text-align: right;
      }
      .recent-amount {
        font-size: 13px;
        font-weight: 800;
        color: var(--green);
      }
      .recent-amount.ok { color: #16a34a; }
      .recent-amount.warn { color: #dc2626; }
      .recent-amount.active { color: #2563eb; }
      .recent-meta {
        margin-top: 2px;
        color: var(--muted);
        font-size: 11px;
      }
      .legal-layout,
      .scan-grid {
        display: grid;
        grid-template-columns: minmax(320px, 0.72fr) minmax(0, 1.28fr);
        gap: 16px;
        margin-top: 16px;
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
      .notice {
        margin-top: 14px;
        padding: 12px 14px;
        border-radius: 14px;
        line-height: 1.6;
        border: 1px solid transparent;
        font-size: 13px;
      }
      .notice.ok {
        background: rgba(16,185,129,0.08);
        color: var(--green);
        border-color: rgba(16,185,129,0.16);
      }
      .notice.warn {
        background: rgba(245,158,11,0.08);
        color: var(--warn);
        border-color: rgba(245,158,11,0.16);
      }
      .notice.error {
        background: rgba(239,68,68,0.08);
        color: var(--red);
        border-color: rgba(239,68,68,0.16);
      }
      .meta-line, .muted {
        color: var(--muted);
        line-height: 1.6;
        font-size: 12px;
      }
      .legal-text {
        display: grid;
        gap: 10px;
        line-height: 1.68;
      }
      .legal-text h3 {
        margin: 0;
        font-size: 16px;
      }
      .legal-text p {
        margin: 0;
      }
      .scan-box {
        margin-top: 16px;
        border-radius: 14px;
        border: 1px solid rgba(22,163,163,0.18);
        background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(245,252,252,0.95));
        padding: 14px;
      }
      .scan-title {
        font-size: 20px;
        font-weight: 800;
        letter-spacing: -0.02em;
      }
      .scan-qr-frame {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 250px;
        margin-top: 14px;
        border-radius: 14px;
        background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
        border: 1px dashed rgba(22,163,163,0.24);
      }
      .qr-image {
        display: block;
        width: 220px;
        max-width: 100%;
        border-radius: 12px;
        border: 1px solid var(--line);
        background: #fff;
      }
      .scan-steps {
        display: grid;
        gap: 12px;
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
      .records-card {
        margin-top: 16px;
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 16px;
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03);
        padding: 16px;
      }
      .quick-actions-card {
        padding: 14px;
      }
      .quick-actions-list {
        margin-top: 8px;
        display: grid;
        gap: 8px;
      }
      .quick-action-item {
        min-height: 72px;
        border: 1px solid var(--line);
        border-radius: 14px;
        background: #f8fafc;
        display: grid;
        grid-template-columns: 38px minmax(0, 1fr) 18px;
        align-items: center;
        gap: 10px;
        padding: 0 12px;
        text-decoration: none;
        transition: background 120ms ease, border-color 120ms ease;
      }
      .quick-action-item:hover {
        background: #ffffff;
        border-color: var(--line-strong);
      }
      .quick-action-icon {
        width: 34px;
        height: 34px;
        border-radius: 12px;
        background: rgba(18,165,148,0.14);
        color: var(--accent);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 900;
      }
      .quick-action-copy {
        min-width: 0;
        display: grid;
        gap: 2px;
      }
      .quick-action-copy strong {
        font-size: 14px;
        line-height: 1.2;
      }
      .quick-action-copy small {
        color: var(--muted);
        font-size: 11px;
        line-height: 1.3;
      }
      .quick-action-arrow {
        color: #98a2b3;
        font-size: 18px;
        font-weight: 700;
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
      }
      .size-chip.active {
        border-color: rgba(22,163,163,0.24);
        background: rgba(22,163,163,0.08);
        color: var(--accent);
      }
      .records-list {
        display: grid;
        gap: 10px;
        margin-top: 16px;
      }
      .job-row {
        border: 1px solid var(--line);
        border-radius: 14px;
        background: var(--surface-soft);
        overflow: hidden;
      }
      .job-row-main {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 96px 120px 72px auto;
        gap: 10px;
        align-items: center;
        min-height: 48px;
        padding: 0 12px;
        cursor: pointer;
      }
      .job-row-main:hover {
        background: #f3faf9;
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
        gap: 10px;
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
        border-radius: 10px;
        background: var(--surface-soft);
        padding: 8px 10px;
      }
      .job-inline-errors {
        color: var(--red);
        line-height: 1.7;
      }
      .dual-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
        margin-top: 16px;
      }
      .admin-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 16px;
        margin-top: 16px;
      }
      .admin-users,
      .storage-list {
        display: grid;
        gap: 10px;
      }
      .admin-user,
      .storage-item {
        border: 1px solid var(--line);
        border-radius: 14px;
        background: var(--surface-soft);
        padding: 14px;
      }
      .admin-user-name,
      .storage-name {
        font-size: 15px;
        font-weight: 800;
      }
      .storage-toolbar {
        display: flex;
        align-items: end;
        gap: 12px;
        flex-wrap: wrap;
      }
      .storage-search {
        flex: 1 1 220px;
      }
      .storage-head {
        display: flex;
        align-items: start;
        justify-content: space-between;
        gap: 12px;
      }
      .storage-key {
        color: var(--muted);
        font-size: 11px;
        word-break: break-all;
      }
      .storage-meta-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 6px 12px;
        color: var(--muted);
        font-size: 12px;
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
        min-height: 24px;
        align-items: center;
        padding: 0 8px;
        border-radius: 999px;
        background: rgba(22,163,163,0.08);
        color: var(--accent);
        font-size: 11px;
        font-weight: 700;
      }
      .empty {
        padding: 24px 12px;
        text-align: center;
        color: var(--muted);
        font-size: 13px;
      }
      @media (max-width: 1280px) {
        .metric-grid,
        .analytics-grid,
        .overview-grid,
        .scan-grid,
        .dual-grid,
        .admin-grid {
          grid-template-columns: 1fr 1fr;
        }
        .metric-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .overview-grid,
        .scan-grid,
        .dual-grid,
        .admin-grid {
          grid-template-columns: 1fr;
        }
        .donut-layout {
          grid-template-columns: 1fr;
        }
      }
      @media (max-width: 980px) {
        .sidebar {
          grid-template-rows: auto;
        }
        .sidebar-nav {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        body.sidebar-collapsed .shell {
          grid-template-columns: 1fr;
        }
        body.sidebar-collapsed .nav-label,
        body.sidebar-collapsed .brand-copy,
        body.sidebar-collapsed .sidebar-toggle-label {
          display: unset;
        }
      }
      @media (max-width: 720px) {
        .metric-grid,
        .sidebar-nav {
          grid-template-columns: 1fr;
        }
        .main {
          padding-left: 14px;
          padding-right: 14px;
        }
        .topbar,
        .toolbar-card,
        .records-toolbar,
        .records-footer,
        .section-head,
        .panel-head,
        .storage-head {
          flex-direction: column;
          align-items: start;
        }
        .job-row-main,
        .recent-row {
          grid-template-columns: 1fr;
          min-height: auto;
          padding-top: 10px;
          padding-bottom: 10px;
        }
      }
    </style>
  </head>
  <body data-page="${page}">
    <div class="shell">
      ${page === "login" ? "" : renderSidebar()}
      <main class="main">
        <div id="notice" class="notice ok hidden"></div>
        ${renderPageBody(page)}
      </main>
    </div>

    <script>
      const PAGE = ${JSON.stringify(page)};
      const SIDEBAR_KEY = "godingtalk_sidebar_collapsed";
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
        overviewJobs: [],
        overviewRangeDays: 7,
        overviewGranularity: "day",
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
        shell: document.querySelector(".shell"),
        sidebar: document.getElementById("sidebar"),
        sidebarToggleBtn: document.getElementById("sidebar-toggle-btn"),
        navOverview: document.getElementById("nav-overview"),
        navLegal: document.getElementById("nav-legal"),
        navScan: document.getElementById("nav-scan"),
        navJobs: document.getElementById("nav-jobs"),
        navAccount: document.getElementById("nav-account"),
        navAdmin: document.getElementById("nav-admin"),
        topStatusChip: document.getElementById("top-status-chip"),
        topJobsChip: document.getElementById("top-jobs-chip"),
        topBalanceChip: document.getElementById("top-balance-chip"),
        userMenuWrap: document.getElementById("user-menu-wrap"),
        userMenuTrigger: document.getElementById("user-menu-trigger"),
        userMenu: document.getElementById("user-menu"),
        userMenuName: document.getElementById("user-menu-name"),
        userMenuRole: document.getElementById("user-menu-role"),
        userMenuAdminLink: document.getElementById("user-menu-admin-link"),
        avatarFallback: document.getElementById("avatar-fallback"),
        profileName: document.getElementById("profile-name"),
        profileRole: document.getElementById("profile-role"),
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
        statFailed: document.getElementById("stat-failed"),
        statCreatedWeek: document.getElementById("stat-created-week"),
        statCompletionRate: document.getElementById("stat-completion-rate"),
        statCookieTime: document.getElementById("stat-cookie-time"),
        overviewGate: document.getElementById("overview-gate"),
        overviewGateTitle: document.getElementById("overview-gate-title"),
        overviewGateCopy: document.getElementById("overview-gate-copy"),
        overviewGateLink: document.getElementById("overview-gate-link"),
        overviewDownloadForm: document.getElementById("overview-download-form"),
        overviewDonut: document.getElementById("overview-donut"),
        overviewDonutTable: document.getElementById("overview-donut-table"),
        overviewTrend: document.getElementById("overview-trend"),
        overviewTrendTitle: document.getElementById("overview-trend-title"),
        overviewRangeBtn: document.getElementById("overview-range-btn"),
        overviewGranularityBtn: document.getElementById("overview-granularity-btn"),
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
          case "running": return "进行中";
          case "succeeded": return "已完成";
          case "failed": return "失败";
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

      function setSidebarCollapsed(collapsed) {
        document.body.classList.toggle("sidebar-collapsed", collapsed);
        if (el.sidebarToggleBtn) {
          el.sidebarToggleBtn.innerHTML = collapsed
            ? '<span class="sidebar-toggle-icon">〉〉</span><span class="sidebar-toggle-label">展开</span>'
            : '<span class="sidebar-toggle-icon">〈〈</span><span class="sidebar-toggle-label">收起</span>';
        }
        localStorage.setItem(SIDEBAR_KEY, collapsed ? "1" : "0");
      }

      function setupSidebar() {
        if (!el.sidebarToggleBtn) return;
        const initial = localStorage.getItem(SIDEBAR_KEY) === "1";
        setSidebarCollapsed(initial);
        el.sidebarToggleBtn.addEventListener("click", () => {
          setSidebarCollapsed(!document.body.classList.contains("sidebar-collapsed"));
        });
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
            }, 120);
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
        if (el.profileName) el.profileName.textContent = username;
        if (el.profileRole) el.profileRole.textContent = state.user.is_sudo ? "Sudo" : "User";
        if (el.userMenuName) el.userMenuName.textContent = username;
        if (el.userMenuRole) el.userMenuRole.textContent = state.user.is_sudo ? "sudo" : "user";
        if (el.userMenuAdminLink) {
          if (state.user.is_sudo) el.userMenuAdminLink.classList.remove("hidden"); else el.userMenuAdminLink.classList.add("hidden");
        }
        if (el.navAdmin) {
          if (state.user.is_sudo) el.navAdmin.classList.remove("hidden"); else el.navAdmin.classList.add("hidden");
        }
        if (el.navLegal) {
          if (state.legalAccepted) el.navLegal.classList.add("hidden"); else el.navLegal.classList.remove("hidden");
        }
        if (el.topStatusChip) {
          if (!state.legalAccepted) {
            el.topStatusChip.textContent = "待同意条款";
          } else if (!state.cookiesReady) {
            el.topStatusChip.textContent = "待钉钉验证";
          } else {
            el.topStatusChip.textContent = "钉钉验证已就绪";
          }
        }
        if (el.topJobsChip) {
          el.topJobsChip.textContent = "🗂 " + (state.overviewJobs.length || 0);
        }
        if (el.topBalanceChip) {
          el.topBalanceChip.textContent = "💵 " + (state.cookiesReady ? "$0.00" : "$-.--");
        }
        [
          [el.navOverview, PAGE === "overview"],
          [el.navLegal, PAGE === "legal"],
          [el.navScan, PAGE === "scan"],
          [el.navJobs, PAGE === "jobs"],
          [el.navAccount, PAGE === "account"],
          [el.navAdmin, PAGE === "admin"],
        ].forEach(([element, active]) => {
          if (element) element.classList.toggle("active", active);
        });
      }

      function renderMetricStrip(payload) {
        if (el.statCookies) el.statCookies.textContent = state.cookiesReady ? "已就绪" : "未验证";
        if (el.statTotal) el.statTotal.textContent = String(payload.total_jobs || 0);
        if (el.statRunning) el.statRunning.textContent = String((payload.running_jobs || 0) + (payload.queued_jobs || 0));
        if (el.statSuccess) el.statSuccess.textContent = String(payload.succeeded_jobs || 0);
        if (el.statFailed) el.statFailed.textContent = String(payload.failed_jobs || 0);
        if (el.statCookieTime) el.statCookieTime.textContent = state.cookiesUpdatedAt ? formatTime(state.cookiesUpdatedAt).replace(/.*\s/, "") : "-";
        const recentJobs = Array.isArray(state.overviewJobs) ? state.overviewJobs : [];
        const weekCutoff = Date.now() - (7 * 24 * 60 * 60 * 1000);
        const weeklyCreated = recentJobs.filter((job) => {
          const ts = new Date(job.created_at || "").getTime();
          return Number.isFinite(ts) && ts >= weekCutoff;
        }).length;
        const completed = recentJobs.filter((job) => String(job.status).toLowerCase() === "succeeded").length;
        const completionRate = recentJobs.length ? Math.round((completed / recentJobs.length) * 100) : 0;
        if (el.statCreatedWeek) el.statCreatedWeek.textContent = String(weeklyCreated);
        if (el.statCompletionRate) el.statCompletionRate.textContent = completionRate + "%";
      }

      function renderOverviewGate() {
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

      function renderOverviewToolbar() {
        if (el.overviewRangeBtn) {
          el.overviewRangeBtn.textContent = state.overviewRangeDays === 30 ? "近 30 天" : "近 7 天";
          el.overviewRangeBtn.classList.toggle("active", state.overviewRangeDays === 30);
        }
        if (el.overviewGranularityBtn) {
          el.overviewGranularityBtn.textContent = state.overviewGranularity === "hour" ? "按小时" : "按天";
          el.overviewGranularityBtn.classList.toggle("active", state.overviewGranularity === "hour");
        }
        if (el.overviewTrendTitle) {
          if (state.overviewGranularity === "hour") {
            el.overviewTrendTitle.textContent = "近 24 小时任务趋势";
          } else {
            el.overviewTrendTitle.textContent = state.overviewRangeDays === 30 ? "近 30 天任务趋势" : "近 7 天任务趋势";
          }
        }
      }

      function renderOverviewCharts(jobs) {
        if (!el.overviewDonut || !el.overviewDonutTable || !el.overviewTrend) return;
        renderOverviewToolbar();
        const records = Array.isArray(jobs) ? jobs : [];
        const counts = {
          succeeded: records.filter((job) => String(job.status).toLowerCase() === "succeeded").length,
          running: records.filter((job) => ["running", "queued"].includes(String(job.status).toLowerCase())).length,
          failed: records.filter((job) => String(job.status).toLowerCase() === "failed").length,
        };
        const total = Math.max(1, counts.succeeded + counts.running + counts.failed);
        const succeededPct = (counts.succeeded / total) * 100;
        const runningPct = (counts.running / total) * 100;
        el.overviewDonut.style.background = "conic-gradient(var(--blue) 0 " + succeededPct + "%, var(--green) " + succeededPct + "% " + (succeededPct + runningPct) + "%, var(--red) " + (succeededPct + runningPct) + "% 100%)";
        el.overviewDonutTable.innerHTML = [
          '<div class="mini-table-head"><div>状态</div><div>数量</div><div>占比</div><div>说明</div></div>',
          '<div class="mini-table-row"><div>已完成</div><div>' + counts.succeeded + '</div><div>' + Math.round((counts.succeeded / total) * 100) + '%</div><div style="color:var(--green);">可下载</div></div>',
          '<div class="mini-table-row"><div>进行中</div><div>' + counts.running + '</div><div>' + Math.round((counts.running / total) * 100) + '%</div><div style="color:var(--blue);">处理中</div></div>',
          '<div class="mini-table-row"><div>失败</div><div>' + counts.failed + '</div><div>' + Math.round((counts.failed / total) * 100) + '%</div><div style="color:var(--red);">需重试</div></div>',
        ].join("");

        const timeline = [];
        if (state.overviewGranularity === "hour") {
          for (let offset = 23; offset >= 0; offset -= 1) {
            const date = new Date();
            date.setMinutes(0, 0, 0);
            date.setHours(date.getHours() - offset);
            const key = date.toISOString().slice(0, 13);
            timeline.push({
              key,
              label: String(date.getHours()).padStart(2, "0") + ":00",
              created: 0,
              done: 0,
              failed: 0,
            });
          }
          records.forEach((job) => {
            const raw = job.updated_at || job.created_at || "";
            const ts = new Date(raw);
            if (Number.isNaN(ts.getTime())) return;
            const key = ts.toISOString().slice(0, 13);
            const target = timeline.find((entry) => entry.key === key);
            if (!target) return;
            target.created += 1;
            if (String(job.status).toLowerCase() === "succeeded") target.done += 1;
            if (String(job.status).toLowerCase() === "failed") target.failed += 1;
          });
        } else {
          for (let offset = state.overviewRangeDays - 1; offset >= 0; offset -= 1) {
            const date = new Date();
            date.setHours(0, 0, 0, 0);
            date.setDate(date.getDate() - offset);
            const key = date.toISOString().slice(0, 10);
            timeline.push({
              key,
              label: key.slice(5),
              created: 0,
              done: 0,
              failed: 0,
            });
          }
          records.forEach((job) => {
            const raw = job.updated_at || job.created_at || "";
            const ts = new Date(raw);
            if (Number.isNaN(ts.getTime())) return;
            const key = ts.toISOString().slice(0, 10);
            const target = timeline.find((entry) => entry.key === key);
            if (!target) return;
            target.created += 1;
            if (String(job.status).toLowerCase() === "succeeded") target.done += 1;
            if (String(job.status).toLowerCase() === "failed") target.failed += 1;
          });
        }
        const maxValue = Math.max(1, ...timeline.flatMap((item) => [item.created, item.done, item.failed]));
        const width = 640;
        const height = 220;
        const paddingX = 36;
        const paddingY = 24;
        const step = (width - paddingX * 2) / Math.max(1, timeline.length - 1);
        const pathFor = (key) => timeline
          .map((item, index) => {
            const x = paddingX + step * index;
            const y = height - paddingY - ((item[key] / maxValue) * (height - paddingY * 2));
            return (index === 0 ? "M" : "L") + x + " " + y;
          })
          .join(" ");
        const areaFor = (key) => {
          const points = timeline.map((item, index) => {
            const x = paddingX + step * index;
            const y = height - paddingY - ((item[key] / maxValue) * (height - paddingY * 2));
            return x + " " + y;
          });
          const startX = paddingX;
          const endX = paddingX + step * Math.max(0, timeline.length - 1);
          const baselineY = height - paddingY;
          return "M " + startX + " " + baselineY + " L " + points.join(" L ") + " L " + endX + " " + baselineY + " Z";
        };
        const pointsFor = (key, color) => timeline.map((item, index) => {
          const x = paddingX + step * index;
          const y = height - paddingY - ((item[key] / maxValue) * (height - paddingY * 2));
          return '<circle cx="' + x + '" cy="' + y + '" r="3" fill="' + color + '" stroke="white" stroke-width="1.5"></circle>';
        }).join("");
        const labelStep = state.overviewGranularity === "hour"
          ? 3
          : (timeline.length > 14 ? 4 : 1);
        const labels = timeline.map((item, index) => {
          if (index !== timeline.length - 1 && index % labelStep !== 0) return "";
          const x = paddingX + step * index;
          return '<text x="' + x + '" y="' + (height - 4) + '" text-anchor="middle" fill="#94a3b8" font-size="11">' + item.label + '</text>';
        }).join("");
        el.overviewTrend.innerHTML = [
          '<svg viewBox="0 0 ' + width + ' ' + height + '" preserveAspectRatio="none">',
          '<path d="' + areaFor("created") + '" fill="rgba(59,130,246,0.16)"></path>',
          '<path d="' + pathFor("created") + '" fill="none" stroke="var(--blue)" stroke-width="3" stroke-linecap="round"></path>',
          '<path d="' + pathFor("done") + '" fill="none" stroke="var(--green)" stroke-width="3" stroke-linecap="round"></path>',
          '<path d="' + pathFor("failed") + '" fill="none" stroke="var(--red)" stroke-width="3" stroke-linecap="round"></path>',
          pointsFor("created", "var(--blue)"),
          pointsFor("done", "var(--green)"),
          pointsFor("failed", "var(--red)"),
          labels,
          '</svg>',
        ].join("");
      }

      function renderRecentJobs(jobs) {
        if (!el.recentRecords) return;
        const records = Array.isArray(jobs) ? jobs : [];
        if (records.length === 0) {
          el.recentRecords.innerHTML = '<div class="empty">暂无记录</div>';
          return;
        }
        el.recentRecords.innerHTML = records.slice(0, 10).map((job) => {
          const title = job.current_title || (Array.isArray(job.titles) && job.titles[0]) || "下载任务";
          const badgeClass = job.status === "succeeded" ? "ok" : (job.status === "failed" ? "warn" : "active");
          const amountText = job.status === "succeeded"
            ? "已完成"
            : (job.status === "failed" ? "失败" : "进行中");
          const subtitle = formatTime(job.updated_at || job.created_at);
          return [
            '<div class="recent-row">',
            '<div class="recent-icon">⌁</div>',
            '<div class="recent-main"><div class="recent-title">' + escapeHTML(title) + '</div><div class="recent-subtitle">' + escapeHTML(subtitle) + '</div></div>',
            '<div class="recent-side"><div class="recent-amount ' + badgeClass + '">' + escapeHTML(amountText) + '</div><div class="recent-meta">' + escapeHTML(String(Math.round(Number(job.progress_percent || 0)))) + '%</div></div>',
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
          return payload;
        });
      }

      function refreshStatus() {
        if (!state.authenticated) return Promise.resolve(null);
        return request("/api/status").then((payload) => {
          renderMetricStrip(payload);
          renderOverviewGate();
          return payload;
        });
      }

      function refreshOverviewData() {
        if (!state.authenticated || (!el.recentRecords && !el.overviewDonut)) return Promise.resolve(null);
        return request("/api/jobs?page=1&page_size=50").then((payload) => {
          state.overviewJobs = Array.isArray(payload.jobs) ? payload.jobs : [];
          renderRecentJobs(state.overviewJobs.slice(0, 10));
          renderOverviewCharts(state.overviewJobs);
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
          return refreshOverviewData();
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
        setupSidebar();
        setupUserMenu();
        setupPageTransitions();
        switchAuthTab("login");

        if (el.loginBtn) el.loginBtn.addEventListener("click", () => {
          setBusy(el.loginBtn, true);
          login().catch((error) => setNotice(normalizeErrorMessage(error.message), "error")).finally(() => setBusy(el.loginBtn, false));
        });
        if (el.registerBtn) el.registerBtn.addEventListener("click", () => {
          setBusy(el.registerBtn, true);
          registerUser().catch((error) => setNotice(normalizeErrorMessage(error.message), "error")).finally(() => setBusy(el.registerBtn, false));
        });
        if (el.authTabLogin) el.authTabLogin.addEventListener("click", () => switchAuthTab("login"));
        if (el.authTabRegister) el.authTabRegister.addEventListener("click", () => switchAuthTab("register"));
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
        if (el.overviewRangeBtn) el.overviewRangeBtn.addEventListener("click", () => {
          state.overviewRangeDays = state.overviewRangeDays === 7 ? 30 : 7;
          renderOverviewCharts(state.overviewJobs);
        });
        if (el.overviewGranularityBtn) el.overviewGranularityBtn.addEventListener("click", () => {
          state.overviewGranularity = state.overviewGranularity === "day" ? "hour" : "day";
          renderOverviewCharts(state.overviewJobs);
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
        if (!state.authenticated) return false;
        if (PAGE === "legal" && state.legalAccepted) {
          redirectTo(state.cookiesReady ? "/overview" : "/scan");
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
          if (PAGE !== "login" && !state.authenticated) return;
          if (applyRouteGuards()) return;

          const tasks = [];
          if (PAGE === "overview") {
            tasks.push(refreshStatus());
            tasks.push(refreshOverviewData());
          }
          if (PAGE === "jobs") {
            tasks.push(refreshStatus());
            tasks.push(refreshJobsPage());
          }
          if (PAGE === "legal") {
            tasks.push(refreshLegalConfig());
          }
          if (PAGE === "scan") {
            tasks.push(refreshStatus());
            tasks.push(refreshLoginSession());
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
