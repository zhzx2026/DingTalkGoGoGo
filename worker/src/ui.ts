export function renderApp(appOrigin: string): string {
  const installURL = `${appOrigin.replace(/\/$/, "")}/tampermonkey/godingtalk-helper.user.js`;

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>GoDingtalk 公益远程下载台</title>
    <style>
      :root {
        --paper: #f3efe7;
        --paper-2: #faf7f0;
        --card: rgba(255, 250, 243, 0.88);
        --card-strong: #fffaf4;
        --ink: #172126;
        --muted: #617079;
        --line: rgba(23, 33, 38, 0.12);
        --accent: #d6622a;
        --accent-2: #0e7b72;
        --accent-3: #d1a44f;
        --danger: #b13928;
        --ok: #136d60;
        --shadow: 0 24px 70px rgba(23, 33, 38, 0.12);
        --radius-xl: 34px;
        --radius-lg: 24px;
        --radius-md: 18px;
        --radius-sm: 12px;
      }

      * {
        box-sizing: border-box;
      }

      html, body {
        margin: 0;
        min-height: 100%;
        color: var(--ink);
        font-family: "IBM Plex Sans", "Space Grotesk", "Avenir Next", sans-serif;
        background:
          radial-gradient(circle at 15% 0%, rgba(214, 98, 42, 0.18), transparent 24%),
          radial-gradient(circle at 85% 10%, rgba(14, 123, 114, 0.14), transparent 26%),
          linear-gradient(180deg, var(--paper-2) 0%, var(--paper) 100%);
      }

      body {
        padding: 22px;
      }

      .shell {
        max-width: 1380px;
        margin: 0 auto;
      }

      .shell[data-mode="basic"] .advanced-only {
        display: none !important;
      }

      .shell[data-mode="pro"] .basic-only {
        display: none !important;
      }

      .hero {
        position: relative;
        overflow: hidden;
        padding: 32px;
        border: 1px solid var(--line);
        border-radius: 40px;
        background:
          linear-gradient(140deg, rgba(255, 251, 244, 0.96), rgba(255, 245, 231, 0.84)),
          linear-gradient(120deg, rgba(214, 98, 42, 0.08), rgba(14, 123, 114, 0.08));
        box-shadow: var(--shadow);
      }

      .hero::before {
        content: "";
        position: absolute;
        inset: auto auto -120px -100px;
        width: 280px;
        height: 280px;
        border-radius: 999px;
        background: radial-gradient(circle, rgba(214, 98, 42, 0.12), transparent 72%);
        pointer-events: none;
      }

      .hero::after {
        content: "";
        position: absolute;
        inset: -80px -40px auto auto;
        width: 260px;
        height: 260px;
        border-radius: 999px;
        background: radial-gradient(circle, rgba(14, 123, 114, 0.12), transparent 70%);
        pointer-events: none;
      }

      .hero-top {
        display: grid;
        gap: 20px;
        grid-template-columns: minmax(0, 1.2fr) auto;
        align-items: start;
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 9px 13px;
        border-radius: 999px;
        background: rgba(23, 33, 38, 0.06);
        color: var(--muted);
        font-size: 12px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      h1 {
        margin: 16px 0 10px;
        font-family: "IBM Plex Serif", "Iowan Old Style", Georgia, serif;
        font-size: clamp(40px, 5vw, 68px);
        line-height: 0.92;
        letter-spacing: -0.05em;
      }

      .hero-copy {
        max-width: 760px;
        margin: 0;
        color: var(--muted);
        font-size: 16px;
        line-height: 1.7;
      }

      .mode-switch {
        display: inline-grid;
        grid-auto-flow: column;
        gap: 8px;
        padding: 8px;
        border: 1px solid rgba(23, 33, 38, 0.08);
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.56);
        backdrop-filter: blur(12px);
      }

      .mode-button {
        min-height: 48px;
        padding: 0 18px;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: var(--muted);
        font: inherit;
        font-weight: 700;
        cursor: pointer;
      }

      .mode-button.active {
        background: linear-gradient(135deg, var(--ink), #334047);
        color: white;
        box-shadow: 0 14px 34px rgba(23, 33, 38, 0.2);
      }

      .hero-band {
        display: grid;
        gap: 14px;
        margin-top: 24px;
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }

      .hero-stat {
        padding: 18px 20px;
        border: 1px solid rgba(23, 33, 38, 0.08);
        border-radius: 22px;
        background: rgba(255, 255, 255, 0.58);
        backdrop-filter: blur(12px);
      }

      .hero-stat label {
        display: block;
        color: var(--muted);
        font-size: 12px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }

      .hero-stat strong {
        display: block;
        margin-top: 8px;
        font-size: 28px;
        font-weight: 700;
      }

      .edition-row {
        display: grid;
        gap: 16px;
        margin-top: 20px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .edition-card {
        position: relative;
        overflow: hidden;
        padding: 22px;
        border-radius: 26px;
        border: 1px solid rgba(23, 33, 38, 0.08);
        background: rgba(255, 255, 255, 0.6);
      }

      .edition-card::after {
        content: "";
        position: absolute;
        inset: auto -40px -40px auto;
        width: 140px;
        height: 140px;
        border-radius: 999px;
        pointer-events: none;
        opacity: 0.5;
      }

      .edition-card.basic-card::after {
        background: radial-gradient(circle, rgba(214, 98, 42, 0.18), transparent 68%);
      }

      .edition-card.pro-card::after {
        background: radial-gradient(circle, rgba(14, 123, 114, 0.18), transparent 68%);
      }

      .edition-kicker {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 7px 11px;
        border-radius: 999px;
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .edition-kicker.basic {
        background: rgba(214, 98, 42, 0.12);
        color: #9b481f;
      }

      .edition-kicker.pro {
        background: rgba(14, 123, 114, 0.12);
        color: #0d655d;
      }

      .edition-card h2 {
        margin: 14px 0 8px;
        font-size: 26px;
        font-family: "IBM Plex Serif", Georgia, serif;
      }

      .edition-card p {
        margin: 0;
        color: var(--muted);
        line-height: 1.7;
      }

      .edition-list {
        display: grid;
        gap: 10px;
        margin-top: 16px;
      }

      .edition-list div {
        padding: 12px 14px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.62);
        color: var(--ink);
      }

      .notice {
        margin-top: 18px;
        padding: 13px 15px;
        border-radius: 16px;
        font-size: 14px;
      }

      .notice.ok {
        background: rgba(14, 123, 114, 0.12);
        color: #0d655d;
      }

      .notice.error {
        background: rgba(177, 57, 40, 0.12);
        color: #8d2d21;
      }

      .workspace {
        display: grid;
        gap: 20px;
        margin-top: 22px;
        grid-template-columns: 1.08fr 0.92fr;
      }

      .stack {
        display: grid;
        gap: 20px;
      }

      .panel {
        padding: 24px;
        border: 1px solid var(--line);
        border-radius: var(--radius-xl);
        background: var(--card);
        box-shadow: var(--shadow);
        backdrop-filter: blur(12px);
      }

      .panel-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 14px;
        margin-bottom: 18px;
      }

      .panel-header h2 {
        margin: 0;
        font-size: 24px;
        font-family: "IBM Plex Serif", Georgia, serif;
      }

      .panel-subtitle {
        margin: 8px 0 0;
        color: var(--muted);
        font-size: 14px;
        line-height: 1.65;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 999px;
        font-size: 13px;
        font-weight: 700;
      }

      .badge.ok {
        background: rgba(14, 123, 114, 0.12);
        color: #0d655d;
      }

      .badge.warn {
        background: rgba(214, 98, 42, 0.14);
        color: #9b481f;
      }

      .badge.idle {
        background: rgba(23, 33, 38, 0.08);
        color: var(--muted);
      }

      .feature-grid {
        display: grid;
        gap: 14px;
        grid-template-columns: 1.05fr 0.95fr;
      }

      .feature-card {
        padding: 18px;
        border-radius: 22px;
        border: 1px solid rgba(23, 33, 38, 0.08);
        background: rgba(255, 255, 255, 0.58);
      }

      .feature-card strong {
        display: block;
        margin-bottom: 8px;
        font-size: 17px;
      }

      .feature-card p {
        margin: 0;
        color: var(--muted);
        line-height: 1.7;
      }

      .quick-steps {
        display: grid;
        gap: 10px;
        margin-top: 14px;
      }

      .quick-steps div {
        padding: 11px 13px;
        border-radius: 14px;
        background: rgba(23, 33, 38, 0.05);
        color: var(--muted);
      }

      .fields {
        display: grid;
        gap: 14px;
      }

      .field {
        display: grid;
        gap: 8px;
      }

      .field-row {
        display: grid;
        gap: 14px;
        grid-template-columns: 1fr 160px 190px;
      }

      .helper-grid {
        display: grid;
        gap: 14px;
        grid-template-columns: 1.15fr 0.85fr;
      }

      label {
        font-size: 13px;
        font-weight: 700;
        color: #334148;
      }

      input, textarea, select {
        width: 100%;
        border: 1px solid rgba(23, 33, 38, 0.12);
        border-radius: var(--radius-md);
        background: var(--card-strong);
        color: var(--ink);
        font: inherit;
        transition: border-color 120ms ease, transform 120ms ease, box-shadow 120ms ease;
      }

      input, select {
        min-height: 52px;
        padding: 12px 14px;
      }

      textarea {
        min-height: 160px;
        padding: 14px;
        line-height: 1.6;
        resize: vertical;
      }

      input:focus, textarea:focus, select:focus {
        outline: none;
        border-color: rgba(14, 123, 114, 0.42);
        box-shadow: 0 0 0 5px rgba(14, 123, 114, 0.08);
        transform: translateY(-1px);
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
        min-height: 48px;
        padding: 0 18px;
        border: 0;
        border-radius: 999px;
        font: inherit;
        font-weight: 700;
        cursor: pointer;
        text-decoration: none;
      }

      button.primary, .button-link.primary {
        background: linear-gradient(135deg, var(--accent), #e07f3f);
        color: white;
        box-shadow: 0 16px 34px rgba(214, 98, 42, 0.22);
      }

      button.secondary, .button-link.secondary {
        background: rgba(23, 33, 38, 0.08);
        color: var(--ink);
      }

      button.ghost {
        background: rgba(14, 123, 114, 0.1);
        color: #0d655d;
      }

      button:disabled {
        opacity: 0.7;
        cursor: wait;
      }

      .hint {
        color: var(--muted);
        font-size: 13px;
        line-height: 1.65;
      }

      .mode-note {
        padding: 16px;
        border-radius: 20px;
        border: 1px dashed rgba(23, 33, 38, 0.14);
        background: rgba(255, 255, 255, 0.5);
        color: var(--muted);
        line-height: 1.7;
      }

      .status-grid {
        display: grid;
        gap: 12px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .status-item {
        padding: 16px;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.58);
        border: 1px solid rgba(23, 33, 38, 0.08);
      }

      .status-item label {
        display: block;
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--muted);
      }

      .status-item strong {
        display: block;
        margin-top: 8px;
        font-size: 17px;
      }

      .jobs {
        display: grid;
        gap: 16px;
      }

      .job-card {
        padding: 18px;
        border-radius: 24px;
        border: 1px solid rgba(23, 33, 38, 0.08);
        background: rgba(255, 255, 255, 0.58);
      }

      .job-top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
      }

      .job-id {
        color: var(--muted);
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .job-title {
        margin: 8px 0 0;
        font-size: 20px;
      }

      .job-meta, .job-files, .job-errors {
        margin-top: 10px;
        color: var(--muted);
        font-size: 14px;
        line-height: 1.6;
      }

      .job-progress {
        margin-top: 14px;
      }

      .progress-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
        font-size: 14px;
        color: var(--muted);
      }

      .progress-track {
        height: 10px;
        overflow: hidden;
        border-radius: 999px;
        background: rgba(23, 33, 38, 0.08);
      }

      .progress-fill {
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(135deg, var(--accent), var(--accent-2));
      }

      .job-files a {
        color: var(--accent-2);
        text-decoration: none;
        font-weight: 700;
      }

      .job-files a:hover {
        text-decoration: underline;
      }

      .job-errors {
        color: var(--danger);
      }

      .empty {
        padding: 18px;
        border-radius: 20px;
        border: 1px dashed rgba(23, 33, 38, 0.14);
        color: var(--muted);
        background: rgba(255, 255, 255, 0.44);
        line-height: 1.7;
      }

      code {
        padding: 2px 6px;
        border-radius: 8px;
        background: rgba(23, 33, 38, 0.06);
        font-family: "IBM Plex Mono", "SFMono-Regular", monospace;
      }

      @media (max-width: 1120px) {
        .workspace,
        .hero-top,
        .edition-row,
        .feature-grid,
        .helper-grid,
        .field-row,
        .hero-band {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 720px) {
        body {
          padding: 14px;
        }

        .hero,
        .panel {
          padding: 20px;
          border-radius: 28px;
        }

        .mode-switch {
          width: 100%;
          grid-auto-flow: row;
        }
      }
    </style>
  </head>
  <body>
    <main id="app-shell" class="shell" data-mode="basic">
      <section class="hero">
        <div class="hero-top">
          <div>
            <span class="eyebrow">GoDingtalk Public Console</span>
            <h1>公益远程下载台</h1>
            <p id="hero-copy" class="hero-copy">普通版保留最短路径：装脚本、补 cookies、贴链接、等成品。适合先把下载跑通，不想碰并发和任务参数。</p>
          </div>
          <div class="mode-switch" role="tablist" aria-label="界面模式">
            <button id="mode-basic" class="mode-button active" type="button">普通版</button>
            <button id="mode-pro" class="mode-button" type="button">高级版</button>
          </div>
        </div>

        <div class="hero-band">
          <div class="hero-stat">
            <label>Cookies</label>
            <strong id="hero-cookies">未准备</strong>
          </div>
          <div class="hero-stat">
            <label>总任务数</label>
            <strong id="hero-total">0</strong>
          </div>
          <div class="hero-stat">
            <label>运行中</label>
            <strong id="hero-running">0</strong>
          </div>
          <div class="hero-stat">
            <label>已完成</label>
            <strong id="hero-success">0</strong>
          </div>
        </div>

        <div class="edition-row">
          <article class="edition-card basic-card">
            <span class="edition-kicker basic">普通版</span>
            <h2>少填参数，先把结果拿到。</h2>
            <p>固定用默认线程和标准流程，你只需要处理 cookies 和回放链接。适合第一次上手，或者临时帮别人拉一条视频。</p>
            <div class="edition-list">
              <div>1. 安装 Tampermonkey 脚本</div>
              <div>2. 上传 cookies 或让脚本带入</div>
              <div>3. 粘贴链接后直接开始远程下载</div>
            </div>
          </article>

          <article class="edition-card pro-card">
            <span class="edition-kicker pro">高级版</span>
            <h2>显式控制任务行为。</h2>
            <p>开放线程数、输出标识、生成视频列表等参数，适合批量下载、问题定位和多任务并发调度时做更细的控制。</p>
            <div class="edition-list">
              <div>可调整并发线程，便于压榨远程 runner</div>
              <div>可区分输出标识，方便后续审计和归档</div>
              <div>可看更多系统状态，适合排错</div>
            </div>
          </article>
        </div>

        <div id="status-notice" class="notice ok" hidden></div>
      </section>

      <section class="workspace">
        <div class="stack">
          <article class="panel">
            <div class="panel-header">
              <div>
                <h2>浏览器辅助</h2>
                <p class="panel-subtitle">先装脚本，再去钉钉直播页点右下角按钮。它会把当前链接和可见 cookies 带回这里；浏览器拿不到的 HttpOnly cookies，仍需要你手动补。</p>
              </div>
              <span class="badge idle">Tampermonkey</span>
            </div>

            <div class="feature-grid">
              <div class="feature-card">
                <strong>安装辅助脚本</strong>
                <p>脚本只负责把当前页面上下文带回控制台，不在你的电脑上执行下载。真正的下载仍由远程 GitHub Actions runner 完成。</p>
                <div class="actions" style="margin-top: 14px;">
                  <a class="button-link primary" href="${installURL}" target="_blank" rel="noreferrer">安装 Tampermonkey 脚本</a>
                </div>
              </div>
              <div class="feature-card">
                <strong>入口说明</strong>
                <div class="quick-steps">
                  <div>入口公开，不再依赖 Quick Tunnel</div>
                  <div>任务写入数据库后远程执行</div>
                  <div>成品通过网页直接下载</div>
                </div>
              </div>
            </div>
          </article>

          <article class="panel">
            <div class="panel-header">
              <div>
                <h2>Cookies</h2>
                <p class="panel-subtitle">支持 JSON 对象、JSON 数组和原始 cookie header。最少需要 <code>LV_PC_SESSION</code>。</p>
              </div>
              <span class="badge warn" id="cookie-badge">未上传</span>
            </div>

            <div class="helper-grid">
              <div class="fields">
                <div class="field">
                  <label for="cookies">Cookies 内容</label>
                  <textarea id="cookies" placeholder='{"LV_PC_SESSION":"replace-me"}'></textarea>
                </div>
                <div class="actions">
                  <button class="primary" id="upload-cookies" type="button">上传 Cookies</button>
                  <button class="secondary" id="example-cookies" type="button">填入示例</button>
                </div>
              </div>

              <div class="mode-note basic-only">
                <strong style="display:block; margin-bottom:8px; color:var(--ink);">普通版建议</strong>
                只要能把有效 cookies 交进来，后面就按默认流程跑。第一次测试时别急着开很多参数，先拿到一条成品最重要。
              </div>

              <div class="mode-note advanced-only">
                <strong style="display:block; margin-bottom:8px; color:var(--ink);">高级版建议</strong>
                如果脚本导入后依然缺少关键字段，直接在这里手动补齐。高级版更适合把 cookie 导出结果当作原始输入源来维护。
              </div>
            </div>
          </article>

          <article class="panel">
            <div class="panel-header">
              <div>
                <h2 id="job-panel-title">创建下载任务</h2>
                <p id="job-panel-subtitle" class="panel-subtitle">普通版只保留最少输入。贴回放链接后直接发往远程 runner。</p>
              </div>
              <span id="mode-chip" class="badge idle">普通版流程</span>
            </div>

            <div class="fields">
              <div class="field">
                <label for="urls">回放链接</label>
                <textarea id="urls" placeholder="每行一个钉钉回放链接"></textarea>
              </div>

              <div class="mode-note basic-only">
                普通版固定使用默认线程 <code>10</code>、自动输出标识，并保持生成视频列表。你只管贴链接，剩下的按标准配置跑。
              </div>

              <div class="field-row advanced-only">
                <div class="field">
                  <label for="output-subdir">输出标识</label>
                  <input id="output-subdir" placeholder="留空自动生成" />
                </div>
                <div class="field">
                  <label for="threads">线程数</label>
                  <input id="threads" type="number" min="1" max="100" value="10" />
                </div>
                <div class="field">
                  <label for="video-list">生成视频列表</label>
                  <select id="video-list">
                    <option value="true">生成</option>
                    <option value="false">不生成</option>
                  </select>
                </div>
              </div>

              <div class="actions">
                <button class="primary" id="create-job" type="button">开始远程下载</button>
                <button class="secondary" id="refresh-status" type="button">刷新状态</button>
                <button class="secondary" id="load-jobs" type="button">刷新任务列表</button>
              </div>
            </div>
          </article>
        </div>

        <aside class="stack">
          <article class="panel">
            <div class="panel-header">
              <div>
                <h2>系统状态</h2>
                <p class="panel-subtitle">普通版给你结论；高级版顺带暴露控制面和 GitHub workflow 的更多细节。</p>
              </div>
              <span class="badge idle" id="polling-badge">自动轮询中</span>
            </div>
            <div id="status-card" class="empty">还没拿到状态，通常是 Worker 正在部署，或者数据库 / GitHub Actions secrets 还没完全就绪。</div>
          </article>

          <article class="panel">
            <div class="panel-header">
              <div>
                <h2>任务列表</h2>
                <p class="panel-subtitle">这里只显示最近 20 分钟内更新过的最新 5 条任务。已完成任务会直接给网页下载链接。</p>
              </div>
            </div>
            <div id="jobs" class="jobs">
              <div class="empty">最近 20 分钟内还没有任务。先上传 cookies，再贴一条回放链接试跑。</div>
            </div>
          </article>
        </aside>
      </section>
    </main>

    <script>
      const MODE_STORAGE_KEY = "godingtalk-ui-mode";
      const editionCopy = {
        basic: {
          hero: "普通版保留最短路径：装脚本、补 cookies、贴链接、等成品。适合先把下载跑通，不想碰并发和任务参数。",
          title: "快速创建下载任务",
          subtitle: "普通版只保留最少输入。贴回放链接后直接发往远程 runner。",
          chip: "普通版流程",
        },
        pro: {
          hero: "高级版把远程 runner 的关键控制项都放出来，适合批量任务、排错和你想自己掌控线程、输出标识的时候。",
          title: "高级任务编排",
          subtitle: "高级版开放线程、输出标识和附加选项，适合多任务并发或专门做一次精细化下载。",
          chip: "高级版流程",
        },
      };

      const elements = {
        shell: document.getElementById("app-shell"),
        modeBasic: document.getElementById("mode-basic"),
        modePro: document.getElementById("mode-pro"),
        heroCopy: document.getElementById("hero-copy"),
        jobPanelTitle: document.getElementById("job-panel-title"),
        jobPanelSubtitle: document.getElementById("job-panel-subtitle"),
        modeChip: document.getElementById("mode-chip"),
        refreshStatus: document.getElementById("refresh-status"),
        statusNotice: document.getElementById("status-notice"),
        cookies: document.getElementById("cookies"),
        uploadCookies: document.getElementById("upload-cookies"),
        exampleCookies: document.getElementById("example-cookies"),
        cookieBadge: document.getElementById("cookie-badge"),
        urls: document.getElementById("urls"),
        outputSubdir: document.getElementById("output-subdir"),
        threads: document.getElementById("threads"),
        videoList: document.getElementById("video-list"),
        createJob: document.getElementById("create-job"),
        loadJobs: document.getElementById("load-jobs"),
        jobs: document.getElementById("jobs"),
        statusCard: document.getElementById("status-card"),
        heroCookies: document.getElementById("hero-cookies"),
        heroTotal: document.getElementById("hero-total"),
        heroRunning: document.getElementById("hero-running"),
        heroSuccess: document.getElementById("hero-success"),
        pollingBadge: document.getElementById("polling-badge"),
      };

      let currentMode = "basic";
      let pollingHandle = null;

      function safeLocalStorageGet(key) {
        try {
          return window.localStorage.getItem(key);
        } catch {
          return null;
        }
      }

      function safeLocalStorageSet(key, value) {
        try {
          window.localStorage.setItem(key, value);
        } catch {}
      }

      function setNotice(message, type) {
        elements.statusNotice.hidden = false;
        elements.statusNotice.className = "notice " + (type || "ok");
        elements.statusNotice.textContent = message;
      }

      function clearNotice() {
        elements.statusNotice.hidden = true;
        elements.statusNotice.textContent = "";
      }

      function buildHeaders(json) {
        const headers = new Headers();
        if (json) {
          headers.set("Content-Type", "application/json");
        }
        return headers;
      }

      async function request(path, options) {
        const response = await fetch(path, {
          ...(options || {}),
          headers: (options && options.headers) || buildHeaders(Boolean(options && options.body)),
        });

        const contentType = response.headers.get("content-type") || "";
        const payload = contentType.includes("application/json")
          ? await response.json()
          : await response.text();

        if (!response.ok) {
          const message = typeof payload === "string"
            ? payload
            : payload.error || payload.message || ("Request failed: " + response.status);
          throw new Error(message);
        }

        return payload;
      }

      function escapeHTML(value) {
        return String(value)
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;");
      }

      function formatTime(value) {
        if (!value) {
          return "未开始";
        }
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
      }

      function formatStage(stage) {
        switch (stage) {
          case "waiting_runner":
            return "等待远程 runner";
          case "preparing":
            return "准备环境";
          case "queued":
            return "排队中";
          case "resolving":
            return "解析回放";
          case "downloading":
            return "下载分片";
          case "converting":
            return "转换 MP4";
          case "completed":
            return "已完成";
          case "failed":
            return "失败";
          default:
            return stage || "未知";
        }
      }

      function parseCookiesInput(raw) {
        const input = raw.trim();
        if (!input) {
          throw new Error("先粘贴 cookies 内容。");
        }

        if (input.startsWith("{")) {
          const parsed = JSON.parse(input);
          if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
            return parsed;
          }
          throw new Error("JSON 对象格式不对。");
        }

        if (input.startsWith("[")) {
          const parsed = JSON.parse(input);
          if (!Array.isArray(parsed)) {
            throw new Error("JSON 数组格式不对。");
          }
          return parsed.reduce((result, item) => {
            if (!item || typeof item !== "object") {
              return result;
            }
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
          if (!chunk) {
            return;
          }
          const index = chunk.indexOf("=");
          if (index === -1) {
            return;
          }
          const name = chunk.slice(0, index).trim();
          const value = chunk.slice(index + 1).trim();
          if (name) {
            cookieMap[name] = value;
          }
        });

        if (Object.keys(cookieMap).length === 0) {
          throw new Error("没解析出任何 cookie 键值对。");
        }

        return cookieMap;
      }

      function applyMode(mode) {
        currentMode = mode === "pro" ? "pro" : "basic";
        elements.shell.dataset.mode = currentMode;
        elements.modeBasic.classList.toggle("active", currentMode === "basic");
        elements.modePro.classList.toggle("active", currentMode === "pro");
        elements.heroCopy.textContent = editionCopy[currentMode].hero;
        elements.jobPanelTitle.textContent = editionCopy[currentMode].title;
        elements.jobPanelSubtitle.textContent = editionCopy[currentMode].subtitle;
        elements.modeChip.textContent = editionCopy[currentMode].chip;
        safeLocalStorageSet(MODE_STORAGE_KEY, currentMode);
      }

      function renderStatus(status) {
        const cookiesReady = Boolean(status.cookies_ready);
        const totalJobs = Number(status.total_jobs || 0);
        const runningJobs = Number(status.running_jobs || 0);
        const succeededJobs = Number(status.succeeded_jobs || 0);

        elements.heroCookies.textContent = cookiesReady ? "已就绪" : "未准备";
        elements.heroTotal.textContent = String(totalJobs);
        elements.heroRunning.textContent = String(runningJobs);
        elements.heroSuccess.textContent = String(succeededJobs);
        elements.cookieBadge.textContent = cookiesReady ? "已上传" : "未上传";
        elements.cookieBadge.className = "badge " + (cookiesReady ? "ok" : "warn");

        const cards = [
          '<div class="status-item"><label>当前模式</label><strong>' + escapeHTML(status.mode || "-") + '</strong></div>',
          '<div class="status-item"><label>Cookies 更新时间</label><strong>' + escapeHTML(formatTime(status.cookies_updated_at)) + '</strong></div>',
          '<div class="status-item"><label>等待中</label><strong>' + escapeHTML(String(status.queued_jobs || 0)) + '</strong></div>',
          '<div class="status-item"><label>失败任务</label><strong>' + escapeHTML(String(status.failed_jobs || 0)) + '</strong></div>',
        ];

        if (currentMode === "pro") {
          cards.push('<div class="status-item"><label>GitHub 仓库</label><strong>' + escapeHTML(status.workflow_repository || "未配置") + '</strong></div>');
          cards.push('<div class="status-item"><label>工作流文件</label><strong>' + escapeHTML(status.workflow_file || "-") + '</strong></div>');
        }

        elements.statusCard.innerHTML = '<div class="status-grid">' + cards.join("") + '</div>';
      }

      function renderJobs(jobs) {
        if (!Array.isArray(jobs) || jobs.length === 0) {
          elements.jobs.innerHTML = '<div class="empty">最近 20 分钟内还没有任务。先上传 cookies，再贴一条回放链接试跑。</div>';
          return;
        }

        elements.jobs.innerHTML = jobs.map((job) => {
          const files = Array.isArray(job.files) ? job.files : [];
          const titles = Array.isArray(job.titles) ? job.titles : [];
          const errors = Array.isArray(job.errors) ? job.errors : [];
          const statusClass = job.status === "succeeded" ? "ok" : (job.status === "failed" ? "warn" : "idle");
          const progress = Math.max(0, Math.min(100, Number(job.progress_percent || 0)));
          const stageText = formatStage(job.stage);
          const completedParts = Number(job.completed_parts || 0);
          const totalParts = Number(job.total_parts || 0);
          const titleText = job.current_title || titles[0] || "下载任务";

          return [
            '<section class="job-card">',
            '<div class="job-top">',
            '<div>',
            '<div class="job-id">' + escapeHTML(job.id) + '</div>',
            '<h3 class="job-title">' + escapeHTML(titleText) + '</h3>',
            '</div>',
            '<span class="badge ' + statusClass + '">' + escapeHTML(job.status || "unknown") + '</span>',
            '</div>',
            '<div class="job-progress">',
            '<div class="progress-top"><span>' + escapeHTML(stageText) + '</span><strong>' + escapeHTML(progress.toFixed(1)) + '%</strong></div>',
            '<div class="progress-track"><div class="progress-fill" style="width:' + escapeHTML(progress.toFixed(1)) + '%"></div></div>',
            totalParts > 0 ? '<div class="job-meta">分片进度：' + escapeHTML(String(completedParts)) + ' / ' + escapeHTML(String(totalParts)) + '</div>' : '',
            '</div>',
            '<div class="job-meta">创建时间：' + escapeHTML(formatTime(job.created_at)) + '</div>',
            '<div class="job-meta">开始时间：' + escapeHTML(formatTime(job.started_at)) + '</div>',
            '<div class="job-meta">完成时间：' + escapeHTML(formatTime(job.finished_at)) + '</div>',
            currentMode === "pro" ? '<div class="job-meta">输出标识：' + escapeHTML(job.output_subdir || "-") + '</div>' : '',
            currentMode === "pro" && job.runner_run_id ? '<div class="job-meta">Runner Run ID：' + escapeHTML(job.runner_run_id) + '</div>' : '',
            titles.length > 1 ? '<div class="job-meta">标题：' + titles.map(escapeHTML).join(" / ") + '</div>' : '',
            files.length ? '<div class="job-files">' + files.map((file) => '<div><a href="' + escapeHTML(file.download_url || "#") + '" target="_blank" rel="noreferrer">' + escapeHTML(file.name) + '</a></div>').join("") + '</div>' : '',
            errors.length ? '<div class="job-errors">' + errors.map(escapeHTML).join("<br/>") + '</div>' : '',
            '</section>',
          ].join("");
        }).join("");
      }

      function decodeImportPayload() {
        const hash = window.location.hash || "";
        if (!hash.startsWith("#import=")) {
          return;
        }

        try {
          const encoded = hash.slice("#import=".length);
          const decoded = decodeURIComponent(escape(atob(encoded)));
          const payload = JSON.parse(decoded);

          if (payload.url) {
            elements.urls.value = payload.url + (elements.urls.value ? "\\n" + elements.urls.value : "");
          }

          if (payload.cookies && Object.keys(payload.cookies).length > 0) {
            elements.cookies.value = JSON.stringify(payload.cookies, null, 2);
          } else if (payload.cookie_header) {
            elements.cookies.value = payload.cookie_header;
          }

          setNotice("已从 Tampermonkey 带入当前页面链接和可见 cookies。", "ok");
          history.replaceState(null, "", window.location.pathname);
        } catch {
          setNotice("Tampermonkey 导入失败，请手动粘贴 cookies。", "error");
        }
      }

      async function refreshStatus() {
        try {
          const status = await request("/api/status");
          renderStatus(status);
          clearNotice();
        } catch (error) {
          elements.statusCard.innerHTML = '<div class="empty"><strong style="display:block; margin-bottom:8px; color:var(--ink);">状态暂时不可用</strong>通常是 Worker 还没部署完成，或者数据库 / GitHub Actions secrets 还没完全就绪。</div>';
          setNotice(error.message, "error");
        }
      }

      async function refreshJobs() {
        try {
          const payload = await request("/api/jobs");
          renderJobs(payload.jobs || []);
        } catch (error) {
          renderJobs([]);
          setNotice(error.message, "error");
        }
      }

      async function uploadCookies() {
        const parsed = parseCookiesInput(elements.cookies.value);
        const payload = await request("/api/cookies", {
          method: "POST",
          headers: buildHeaders(true),
          body: JSON.stringify({ cookies: parsed }),
        });
        setNotice(payload.message || "Cookies 已上传。");
        await refreshStatus();
      }

      async function createJob() {
        const urls = elements.urls.value
          .split("\\n")
          .map((item) => item.trim())
          .filter(Boolean);

        if (urls.length === 0) {
          throw new Error("先填至少一个回放链接。");
        }

        const body = {};
        if (currentMode === "pro") {
          body.thread = Number(elements.threads.value || "10");
          body.output_subdir = elements.outputSubdir.value.trim();
          body.create_video_list = elements.videoList.value === "true";
        } else {
          body.thread = 10;
          body.output_subdir = "";
          body.create_video_list = true;
        }

        if (urls.length === 1) {
          body.url = urls[0];
        } else {
          body.urls = urls;
        }

        const payload = await request("/api/jobs", {
          method: "POST",
          headers: buildHeaders(true),
          body: JSON.stringify(body),
        });

        setNotice("任务已创建：" + payload.id);
        if (currentMode === "pro") {
          elements.outputSubdir.value = "";
        }
        await refreshJobs();
        await refreshStatus();
      }

      function setBusy(button, busy) {
        button.disabled = busy;
      }

      function installPolling() {
        if (pollingHandle) {
          clearInterval(pollingHandle);
        }
        pollingHandle = setInterval(() => {
          refreshStatus();
          refreshJobs();
        }, 5000);
      }

      elements.modeBasic.addEventListener("click", () => applyMode("basic"));
      elements.modePro.addEventListener("click", () => applyMode("pro"));

      elements.refreshStatus.addEventListener("click", async () => {
        await refreshStatus();
        await refreshJobs();
      });

      elements.uploadCookies.addEventListener("click", async () => {
        setBusy(elements.uploadCookies, true);
        try {
          await uploadCookies();
        } catch (error) {
          setNotice(error.message, "error");
        } finally {
          setBusy(elements.uploadCookies, false);
        }
      });

      elements.exampleCookies.addEventListener("click", () => {
        elements.cookies.value = JSON.stringify({
          LV_PC_SESSION: "replace-me",
          csrfToken: "optional",
        }, null, 2);
      });

      elements.createJob.addEventListener("click", async () => {
        setBusy(elements.createJob, true);
        try {
          await createJob();
        } catch (error) {
          setNotice(error.message, "error");
        } finally {
          setBusy(elements.createJob, false);
        }
      });

      elements.loadJobs.addEventListener("click", refreshJobs);

      applyMode(safeLocalStorageGet(MODE_STORAGE_KEY) || "basic");
      decodeImportPayload();
      installPolling();
      refreshStatus();
      refreshJobs();
    </script>
  </body>
</html>`;
}
