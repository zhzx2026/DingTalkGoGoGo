type AppPage = "download" | "login" | "settings" | "account" | "legal";

function renderNav(page: AppPage): string {
  const items: Array<{ key: AppPage; href: string; label: string; note: string }> = [
    { key: "download", href: "/download", label: "任务台", note: "提交与跟踪任务" },
    { key: "settings", href: "/settings", label: "扫码登录", note: "二维码工作流" },
    { key: "account", href: "/account", label: "账号中心", note: "密码与管理" },
    { key: "legal", href: "/legal", label: "法律声明", note: "查看并接受条款" },
    { key: "login", href: "/login", label: "登录入口", note: "登录或注册账号" },
  ];

  return `<nav class="rail-nav">${items.map((item, index) => `<a href="${item.href}" data-nav="${item.key}" class="rail-link ${page === item.key ? "active" : ""}"><span class="rail-index">${String(index + 1).padStart(2, "0")}</span><span class="rail-copy"><strong>${item.label}</strong><span>${item.note}</span></span></a>`).join("")}</nav>`;
}

function renderDownloadPage(): string {
  return `
      <section class="page-header">
        <div>
          <div class="page-eyebrow">Operations Ledger</div>
          <h2>下载指挥台</h2>
          <p class="page-lead">集中提交直播回放链接，统一查看进度、文件与错误记录。</p>
        </div>
        <div class="header-actions">
          <button id="refresh-btn" type="button">同步状态</button>
        </div>
      </section>

      <section class="download-board">
        <section class="panel compose-panel">
          <div class="panel-head">
            <div>
              <div class="panel-kicker">Create Job</div>
              <h3>提交下载任务</h3>
            </div>
          </div>
          <div id="legal-warning" class="notice error hidden"></div>
          <div class="field">
            <label for="urls">回放链接</label>
            <textarea id="urls" placeholder="每行一个钉钉回放链接"></textarea>
          </div>
          <div class="compose-footer">
            <div class="muted compact-copy">每行一个链接。提交后系统会拆成独立任务。</div>
            <div class="actions">
              <button id="create-job-btn" class="primary" type="button">创建任务</button>
            </div>
          </div>
        </section>

        <aside class="panel insight-panel">
          <div class="panel-head">
            <div>
              <div class="panel-kicker">Overview</div>
              <h3>运行概览</h3>
            </div>
          </div>
          <div class="metric-grid">
            <div class="metric-box"><span>Cookies</span><strong id="stat-cookies">-</strong></div>
            <div class="metric-box"><span>总任务</span><strong id="stat-total">0</strong></div>
            <div class="metric-box"><span>运行中</span><strong id="stat-running">0</strong></div>
            <div class="metric-box"><span>已完成</span><strong id="stat-success">0</strong></div>
          </div>
          <div class="insight-note">
            <div class="insight-label">控制建议</div>
            <p>先确认 Cookies 已就绪并接受免责声明，再批量提交链接。</p>
          </div>
        </aside>
      </section>

      <section class="panel archive-panel">
        <div class="panel-head">
          <div>
            <div class="panel-kicker">Archive</div>
            <h2>任务档案</h2>
          </div>
          <div class="archive-summary">
            <span id="jobs-range" class="muted">暂无任务</span>
          </div>
        </div>
        <div id="jobs" class="record-list"><div class="empty">暂无任务</div></div>
        <div id="jobs-pagination" class="pagination hidden">
          <button id="jobs-prev-btn" type="button">上一页</button>
          <div id="jobs-page-info" class="pagination-info">第 1 / 1 页</div>
          <button id="jobs-next-btn" type="button">下一页</button>
        </div>
      </section>`;
}

function renderLoginPage(): string {
  return `
      <section class="page-header">
        <div>
          <div class="page-eyebrow">Identity Desk</div>
          <h2>登录与注册</h2>
          <p class="page-lead">统一的账号入口。登录后即可进入下载、扫码登录与账号管理。</p>
        </div>
      </section>

      <section class="auth-board">
        <section class="panel auth-panel" id="login-panel">
          <div class="panel-head">
            <div>
              <div class="panel-kicker">Sign In</div>
              <h3>登录</h3>
            </div>
          </div>
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
        </section>

        <section class="panel auth-panel" id="register-panel">
          <div class="panel-head">
            <div>
              <div class="panel-kicker">Create Account</div>
              <h3>注册</h3>
            </div>
          </div>
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
        </section>

        <section class="panel auth-session hidden" id="auth-session-card">
          <div class="panel-head">
            <div>
              <div class="panel-kicker">Current Session</div>
              <h3>当前会话</h3>
            </div>
          </div>
          <p class="muted" id="auth-session-summary">已登录</p>
          <div class="actions">
            <a class="button-link primary" href="/download">前往下载页</a>
            <button id="logout-btn" type="button">退出登录</button>
          </div>
        </section>
      </section>`;
}

function renderSettingsPage(installURL: string): string {
  return `
      <section class="page-header">
        <div>
          <div class="page-eyebrow">Access Workflow</div>
          <h2>二维码登录台</h2>
          <p class="page-lead">在这里启动登录工作流，获取二维码并等待 Cookies 自动回传。</p>
        </div>
      </section>

      <section class="settings-board">
        <section class="panel launch-panel">
          <div class="panel-head">
            <div>
              <div class="panel-kicker">Launch</div>
              <h3>启动登录流程</h3>
            </div>
          </div>
          <div id="login-legal-warning" class="notice error hidden"></div>
          <div class="notice warn">如当前 Cookies 仍然有效，请不要重复扫码，以免触发平台风控。</div>
          <div class="actions">
            <button id="start-login-workflow-btn" class="primary" type="button">启动二维码登录</button>
          </div>
          <div id="login-box" class="login-box hidden">
            <div id="login-status" class="login-status">等待开始</div>
            <img id="login-qr-image" class="qr-image hidden" alt="登录二维码" />
            <div id="login-hint" class="muted small">工作流启动后，通常约 1 分钟内出现二维码。</div>
          </div>
        </section>

        <aside class="panel guide-panel">
          <div class="panel-head">
            <div>
              <div class="panel-kicker">Guide</div>
              <h3>使用说明</h3>
            </div>
          </div>
          <div class="guide-list">
            <div class="guide-item"><strong>01</strong><span>先确认账号已登录，并接受当前免责声明。</span></div>
            <div class="guide-item"><strong>02</strong><span>启动工作流后等待二维码出现，再用钉钉扫码。</span></div>
            <div class="guide-item"><strong>03</strong><span>扫码成功后，Cookies 会自动回传到 Worker。</span></div>
          </div>
          <a class="button-link" href="${installURL}">安装辅助脚本</a>
        </aside>
      </section>`;
}

function renderAccountPage(): string {
  return `
      <section class="page-header">
        <div>
          <div class="page-eyebrow">Profile Registry</div>
          <h2>账号中心</h2>
          <p class="page-lead">查看当前账号状态，更新密码，并在 sudo 模式下管理用户与免责声明。</p>
        </div>
      </section>

      <section class="account-board">
        <section class="panel account-summary-panel">
          <div class="panel-head">
            <div>
              <div class="panel-kicker">Profile</div>
              <h3>账号信息</h3>
            </div>
          </div>
          <p id="account-summary" class="muted">未登录</p>
        </section>

        <section class="panel password-panel">
          <div class="panel-head">
            <div>
              <div class="panel-kicker">Security</div>
              <h3>修改密码</h3>
            </div>
          </div>
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
        </section>
      </section>

      <section id="admin-panel" class="panel admin-panel hidden">
        <div class="panel-head">
          <div>
            <div class="panel-kicker">Administration</div>
            <h3>用户与条款管理</h3>
          </div>
        </div>
        <div id="admin-users" class="admin-users"><div class="empty">暂无数据</div></div>
        <div class="admin-legal-editor">
          <div class="panel-head nested">
            <div>
              <div class="panel-kicker">Legal Content</div>
              <h3>免责内容管理</h3>
            </div>
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
      </section>`;
}

function renderLegalPage(): string {
  return `
      <section class="page-header">
        <div>
          <div class="page-eyebrow">Legal Ledger</div>
          <h2>法律免责声明</h2>
          <p class="page-lead">在创建下载任务或启动二维码登录前，必须先完整阅读并接受当前版本的条款。</p>
        </div>
      </section>

      <section class="legal-board">
        <aside class="panel legal-action-panel">
          <div class="panel-head">
            <div>
              <div class="panel-kicker">Acceptance</div>
              <h3>接受状态</h3>
            </div>
          </div>
          <div id="legal-state" class="notice ok hidden"></div>
          <div id="legal-version-meta" class="muted small"></div>
          <label class="checkbox-row">
            <input id="legal-confirm-check" type="checkbox" />
            <span>我已完整阅读、理解风险，并自愿承担全部责任。</span>
          </label>
          <div class="actions">
            <button id="accept-legal-btn" class="primary" type="button" disabled>接受当前版本</button>
          </div>
        </aside>

        <section class="panel legal-copy-panel">
          <div class="panel-head">
            <div>
              <div class="panel-kicker">Document</div>
              <h3>条款正文</h3>
            </div>
          </div>
          <div id="legal-text" class="legal-text"><div class="empty">正在加载免责内容...</div></div>
          <div class="notice warn">点击接受后，系统会记录你的接受时间和版本号，并将其视为有效电子记录。</div>
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
        --bg: #e7ddd0;
        --bg-soft: #f5efe6;
        --rail: #18222d;
        --rail-soft: #24313f;
        --panel: #fbf7f1;
        --panel-strong: #ffffff;
        --line: #dacdbe;
        --text: #1d232b;
        --muted: #6b675f;
        --primary: #9c5d2f;
        --primary-dark: #7f4821;
        --primary-soft: #f1e1cf;
        --danger: #a63d32;
        --ok: #0f7a66;
        --warning: #9b691e;
        --shadow: 0 24px 70px rgba(23, 30, 38, 0.14);
        --radius: 24px;
      }
      * { box-sizing: border-box; }
      html, body { margin: 0; min-height: 100%; background: linear-gradient(135deg, var(--bg) 0%, var(--bg-soft) 48%, #dfd4c5 100%); color: var(--text); font-family: "Avenir Next", "PingFang SC", "Noto Sans SC", "Microsoft YaHei", sans-serif; }
      body { padding: 26px; }
      a { color: inherit; }
      .site-shell { max-width: 1380px; margin: 0 auto; display: grid; grid-template-columns: 300px minmax(0, 1fr); gap: 24px; }
      .rail { background: linear-gradient(180deg, var(--rail) 0%, #111920 100%); color: #eef3f7; border-radius: 30px; padding: 28px 24px; box-shadow: var(--shadow); display: grid; gap: 22px; align-content: start; position: sticky; top: 24px; }
      .brand-block { display: grid; grid-template-columns: 68px minmax(0, 1fr); gap: 14px; align-items: center; }
      .brand-mark { width: 68px; height: 68px; border-radius: 18px; background: linear-gradient(135deg, #b06a34 0%, #7d4720 100%); display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 800; color: #fff8ef; letter-spacing: 0.08em; }
      .brand-copy h1 { margin: 6px 0 0; font-size: 32px; line-height: 1; font-family: "Iowan Old Style", "Palatino Linotype", "Songti SC", serif; letter-spacing: -0.03em; }
      .brand-kicker { margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; color: rgba(238, 243, 247, 0.7); }
      .brand-copy p:last-child { margin: 8px 0 0; color: rgba(238, 243, 247, 0.72); line-height: 1.6; font-size: 13px; }
      .rail-session { padding: 16px 18px; border-radius: 20px; background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.08); }
      .rail-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: rgba(238, 243, 247, 0.62); }
      #user-chip { margin: 10px 0 0; font-size: 18px; font-weight: 700; color: #fff; }
      .rail-nav { display: grid; gap: 10px; }
      .rail-link { display: grid; grid-template-columns: 40px minmax(0, 1fr); gap: 14px; align-items: start; padding: 14px 16px; border-radius: 18px; color: rgba(238, 243, 247, 0.84); text-decoration: none; background: transparent; border: 1px solid transparent; transition: background-color 120ms ease, border-color 120ms ease, transform 120ms ease; }
      .rail-link:hover { background: rgba(255, 255, 255, 0.06); border-color: rgba(255, 255, 255, 0.08); transform: translateY(-1px); }
      .rail-link.active { background: linear-gradient(135deg, rgba(176, 106, 52, 0.28) 0%, rgba(127, 72, 33, 0.22) 100%); border-color: rgba(205, 152, 108, 0.38); color: #fff; }
      .rail-index { font-size: 12px; font-weight: 800; letter-spacing: 0.12em; opacity: 0.68; padding-top: 2px; }
      .rail-copy { display: grid; gap: 4px; }
      .rail-copy strong { font-size: 15px; }
      .rail-copy span:last-child { font-size: 12px; color: rgba(238, 243, 247, 0.66); line-height: 1.5; }
      .rail-footer { display: grid; gap: 12px; margin-top: auto; }
      .stage { display: grid; gap: 20px; min-width: 0; }
      .page-header { display: flex; justify-content: space-between; align-items: end; gap: 18px; padding: 6px 4px 0; }
      .page-eyebrow { color: var(--primary-dark); font-size: 11px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; }
      .page-header h2 { margin: 10px 0 0; font-size: 52px; line-height: 0.98; font-family: "Iowan Old Style", "Palatino Linotype", "Songti SC", serif; letter-spacing: -0.04em; }
      .page-lead { margin: 14px 0 0; max-width: 64ch; color: var(--muted); line-height: 1.75; font-size: 15px; }
      .header-actions { display: flex; gap: 10px; flex-wrap: wrap; }
      .panel { background: var(--panel); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); padding: 24px; position: relative; overflow: hidden; }
      .panel::before { content: ""; position: absolute; inset: 0 auto auto 0; width: 100%; height: 5px; background: linear-gradient(90deg, rgba(156, 93, 47, 0.85) 0%, rgba(156, 93, 47, 0) 72%); opacity: 0.8; }
      .panel-head { display: flex; justify-content: space-between; align-items: start; gap: 16px; }
      .panel-head h2, .panel-head h3 { margin: 8px 0 0; font-size: 28px; font-family: "Iowan Old Style", "Palatino Linotype", "Songti SC", serif; letter-spacing: -0.03em; }
      .panel-head.nested { margin-top: 26px; }
      .panel-kicker { color: var(--primary-dark); font-size: 11px; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; }
      .notice { padding: 13px 15px; border-radius: 16px; font-size: 14px; line-height: 1.7; }
      .notice.ok { background: #edf8f4; color: var(--ok); border: 1px solid #c7eadf; }
      .notice.error { background: #fdf1ef; color: var(--danger); border: 1px solid #f3c9c2; }
      .notice.warn { background: #fbf3e5; color: var(--warning); border: 1px solid #ead5ae; }
      .muted { color: var(--muted); }
      .field { display: grid; gap: 9px; margin-top: 16px; }
      label { color: var(--text); }
      .field > label { font-size: 13px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: var(--muted); }
      input, textarea { width: 100%; border: 1px solid #d8cab8; border-radius: 16px; padding: 14px 16px; font: inherit; background: rgba(255, 255, 255, 0.92); color: var(--text); box-shadow: inset 0 1px 0 rgba(255,255,255,0.6); }
      textarea { min-height: 180px; resize: vertical; line-height: 1.7; }
      input:focus, textarea:focus { outline: none; border-color: #b98257; box-shadow: 0 0 0 4px rgba(156, 93, 47, 0.12); }
      .actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px; }
      button, .button-link { border: 1px solid #cbb9a4; background: var(--panel-strong); color: var(--text); min-height: 46px; padding: 0 16px; border-radius: 14px; font: inherit; font-weight: 700; text-decoration: none; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
      button.primary, .button-link.primary { background: var(--primary); border-color: var(--primary); color: #fff9f3; }
      button.primary:hover, .button-link.primary:hover { background: var(--primary-dark); border-color: var(--primary-dark); }
      button:disabled { opacity: 0.65; cursor: wait; }
      .download-board, .settings-board, .account-board, .legal-board { display: grid; gap: 18px; }
      .download-board { grid-template-columns: minmax(0, 1.2fr) 340px; }
      .settings-board { grid-template-columns: minmax(0, 1.08fr) 340px; }
      .account-board { grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); }
      .legal-board { grid-template-columns: 340px minmax(0, 1fr); }
      .auth-board { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
      .auth-panel, .auth-session { min-height: 100%; }
      .compose-footer { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-top: 18px; }
      .compact-copy, .small { font-size: 13px; }
      .metric-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 18px; }
      .metric-box { padding: 16px; border-radius: 18px; border: 1px solid #e2d4c5; background: linear-gradient(180deg, #fffdfa 0%, #f7f1e9 100%); }
      .metric-box span { display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); }
      .metric-box strong { display: block; margin-top: 10px; font-size: 30px; font-family: "Iowan Old Style", "Palatino Linotype", "Songti SC", serif; }
      .insight-note { margin-top: 18px; padding: 16px; border-radius: 18px; background: #f5ede4; border: 1px solid #e1d2bf; }
      .insight-label { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.14em; color: var(--primary-dark); }
      .insight-note p { margin: 8px 0 0; color: var(--muted); line-height: 1.7; }
      .archive-panel { display: grid; gap: 16px; }
      .archive-summary { display: flex; align-items: center; min-height: 44px; }
      .record-list { display: grid; gap: 14px; }
      .record-card { padding: 22px; border-radius: 20px; background: linear-gradient(180deg, #fffdfa 0%, #f8f2ea 100%); border: 1px solid #ddcfbe; }
      .record-header { display: flex; justify-content: space-between; align-items: start; gap: 16px; }
      .record-overline { font-size: 11px; text-transform: uppercase; letter-spacing: 0.16em; color: var(--muted); }
      .record-title { margin: 10px 0 0; font-size: 28px; line-height: 1.12; font-family: "Iowan Old Style", "Palatino Linotype", "Songti SC", serif; letter-spacing: -0.03em; }
      .status { padding: 7px 12px; border-radius: 999px; font-size: 12px; font-weight: 800; background: #eee4d9; color: var(--primary-dark); border: 1px solid #dcc8b2; }
      .status.succeeded { background: #edf8f4; color: var(--ok); border-color: #c7eadf; }
      .status.failed { background: #fdf1ef; color: var(--danger); border-color: #f3c9c2; }
      .status.queued { background: #fbf3e5; color: var(--warning); border-color: #ead5ae; }
      .record-grid { display: grid; grid-template-columns: minmax(0, 1fr) 230px; gap: 18px; margin-top: 18px; }
      .record-main { display: grid; gap: 14px; }
      .detail-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
      .detail-item { padding: 14px; border-radius: 18px; background: rgba(255,255,255,0.72); border: 1px solid #e6dbcf; }
      .detail-item dt { font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--muted); }
      .detail-item dd { margin: 8px 0 0; font-size: 15px; font-weight: 700; line-height: 1.5; }
      .progress-track { height: 12px; border-radius: 999px; background: #e7dbcd; overflow: hidden; }
      .progress-track > div { height: 100%; background: linear-gradient(90deg, var(--primary) 0%, #c68550 100%); }
      .progress-caption { display: flex; justify-content: space-between; align-items: center; gap: 12px; color: var(--muted); font-size: 13px; }
      .record-meter { padding: 16px; border-radius: 20px; background: #f3ebe2; border: 1px solid #dccdba; display: grid; align-content: start; gap: 8px; }
      .meter-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: var(--muted); }
      .meter-value { font-size: 38px; line-height: 1; font-weight: 800; font-family: "Iowan Old Style", "Palatino Linotype", "Songti SC", serif; }
      .meter-note { color: var(--muted); font-size: 13px; line-height: 1.6; }
      .file-cluster { display: grid; gap: 12px; margin-top: 18px; }
      .file-box { padding: 15px 16px; border-radius: 18px; border: 1px solid #e3d7c9; background: rgba(255,255,255,0.74); }
      .file-label { color: var(--muted); font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.14em; }
      .file-links { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
      .file-links a { padding: 8px 12px; border-radius: 999px; background: var(--primary-soft); color: var(--primary-dark); text-decoration: none; font-weight: 700; border: 1px solid #dfc7ae; }
      .job-errors { margin-top: 16px; padding: 14px 16px; border-radius: 18px; background: #fdf1ef; color: var(--danger); line-height: 1.8; font-size: 14px; border: 1px solid #f3c9c2; }
      .empty { padding: 16px; border-radius: 16px; border: 1px dashed #ccbca8; color: var(--muted); background: rgba(255,255,255,0.4); }
      .pagination { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
      .pagination-info { color: var(--muted); font-size: 14px; text-align: center; flex: 1; }
      .guide-list { display: grid; gap: 12px; margin: 4px 0 18px; }
      .guide-item { display: grid; grid-template-columns: 42px minmax(0, 1fr); gap: 12px; align-items: start; padding: 14px 0; border-bottom: 1px solid #e5d7c7; }
      .guide-item:last-child { border-bottom: 0; padding-bottom: 0; }
      .guide-item strong { display: inline-flex; width: 42px; height: 42px; align-items: center; justify-content: center; border-radius: 14px; background: var(--primary-soft); color: var(--primary-dark); }
      .guide-item span { color: var(--muted); line-height: 1.7; }
      .login-box { margin-top: 18px; padding: 16px; border-radius: 18px; background: rgba(255,255,255,0.6); border: 1px solid #dfcfbd; }
      .login-status { font-size: 20px; font-weight: 800; font-family: "Iowan Old Style", "Palatino Linotype", "Songti SC", serif; }
      .qr-image { display: block; width: 280px; max-width: 100%; margin-top: 14px; border-radius: 16px; border: 1px solid #d9c7b3; background: #fff; }
      .legal-text { display: grid; gap: 12px; line-height: 1.85; }
      .legal-text h3 { margin: 12px 0 0; font-size: 18px; font-family: "Iowan Old Style", "Palatino Linotype", "Songti SC", serif; }
      .legal-text p { margin: 0; color: var(--text); }
      .admin-users { display: grid; gap: 12px; margin-top: 18px; }
      .admin-user { padding: 16px; border: 1px solid #e1d4c4; border-radius: 18px; background: rgba(255,255,255,0.72); }
      .admin-user-top { display: flex; justify-content: space-between; gap: 16px; align-items: start; }
      .admin-user-name { font-weight: 700; font-size: 17px; }
      .admin-user-meta { margin-top: 8px; color: var(--muted); line-height: 1.8; font-size: 14px; }
      .admin-legal-editor { margin-top: 28px; padding-top: 24px; border-top: 1px solid #ddcfbe; }
      .legal-editor { min-height: 320px; }
      .checkbox-row { display: flex; gap: 10px; align-items: flex-start; margin-top: 16px; line-height: 1.8; color: var(--text); font-size: 15px; font-weight: 600; }
      .checkbox-row input { width: 18px; height: 18px; margin-top: 4px; }
      .hidden { display: none !important; }
      @media (max-width: 1100px) {
        .site-shell { grid-template-columns: 1fr; }
        .rail { position: static; }
        .download-board,
        .settings-board,
        .account-board,
        .legal-board,
        .auth-board,
        .record-grid { grid-template-columns: 1fr; }
      }
      @media (max-width: 760px) {
        body { padding: 14px; }
        .site-shell { gap: 16px; }
        .rail { padding: 20px 18px; }
        .brand-block { grid-template-columns: 52px minmax(0, 1fr); }
        .brand-mark { width: 52px; height: 52px; font-size: 18px; border-radius: 14px; }
        .brand-copy h1 { font-size: 26px; }
        .page-header { flex-direction: column; align-items: stretch; }
        .page-header h2 { font-size: 38px; }
        .panel { padding: 18px; }
        .record-header,
        .pagination,
        .compose-footer,
        .panel-head { flex-direction: column; align-items: stretch; }
        .metric-grid,
        .detail-grid { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>
    <main class="site-shell">
      <aside class="rail">
        <div class="brand-block">
          <div class="brand-mark">GD</div>
          <div class="brand-copy">
            <p class="brand-kicker">Private Console</p>
            <h1>GoDingtalk</h1>
            <p>正式、集中、可追踪的内部下载控制台。</p>
          </div>
        </div>
        <section class="rail-session">
          <div class="rail-label">当前会话</div>
          <p id="user-chip">未登录</p>
        </section>
        ${renderNav(page)}
        <div class="rail-footer">
          <a class="button-link" href="/download">返回任务台</a>
          <button id="topbar-logout-btn" type="button" class="hidden">退出登录</button>
        </div>
      </aside>
      <section class="stage">
        <div id="notice" class="notice ok hidden"></div>
        ${renderPageBody(page, installURL)}
      </section>
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
          return [
            '<section class="record-card">',
            '<div class="record-header">',
            '<div><div class="record-overline">Task ' + escapeHTML(job.id) + '</div><div class="record-title">' + escapeHTML(title) + '</div></div>',
            '<span class="status ' + escapeHTML(String(job.status || '').toLowerCase()) + '">' + escapeHTML(job.status || '-') + '</span>',
            '</div>',
            '<div class="record-grid">',
            '<div class="record-main">',
            '<div class="detail-grid">',
            '<div class="detail-item"><dt>阶段</dt><dd>' + escapeHTML(formatStage(job.stage)) + '</dd></div>',
            '<div class="detail-item"><dt>创建时间</dt><dd>' + escapeHTML(formatTime(job.created_at)) + '</dd></div>',
            '<div class="detail-item"><dt>文件数</dt><dd>' + escapeHTML(String(files.length)) + '</dd></div>',
            '</div>',
            '<div class="progress-track"><div style="width:' + escapeHTML(progress.toFixed(1)) + '%"></div></div>',
            '<div class="progress-caption"><span>进度 ' + escapeHTML(progress.toFixed(1)) + '%</span><span>状态 ' + escapeHTML(String(job.status || '-')) + '</span></div>',
            '</div>',
            '<aside class="record-meter"><div class="meter-label">Progress</div><div class="meter-value">' + escapeHTML(progress.toFixed(0)) + '%</div><div class="meter-note">当前阶段：' + escapeHTML(formatStage(job.stage)) + '</div></aside>',
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
