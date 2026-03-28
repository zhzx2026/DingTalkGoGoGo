# DingTalkGoGoGo

一个以公益使用场景为主的钉钉直播回放下载控制台。

当前仓库保留三层能力：

- Go 下载器：负责真正下载和转码
- Cloudflare Worker 控制台：负责登录、条款、任务面板、文件下载
- GitHub Actions 远程执行：负责远程跑任务、扫码登录、自动部署、自动审查

## UI 说明

当前 Worker 前端 UI 参考了 [Wei-Shaw/sub2api](https://github.com/Wei-Shaw/sub2api) 的控制台视觉风格，主要参考了它的：

- `AuthLayout`
- `AppLayout`
- `AppHeader`
- `AppSidebar`
- `LocaleSwitcher`
- 用户 Dashboard 统计卡视觉层

这里采用的是“参考视觉并重写到单文件 Worker HTML”的方式，没有把 Sub2API 的 Vue/Tailwind 运行时直接搬进来。

Sub2API 仓库使用 MIT License，源码见其仓库根目录 `LICENSE`。

## 当前页面

Worker 控制台保留这些页面和流程：

- `/login`
- `/overview`
- `/legal`
- `/scan`
- `/jobs`
- `/account`
- `/admin`

当前 UI 已支持真实中英文切换，语言会保存在浏览器本地 `godingtalk_locale`。

## 推荐架构

```text
Browser
  -> Cloudflare Worker (UI + API + auth)
  -> D1 (用户 / 会话 / 条款 / 任务状态)
  -> GitHub Actions workflow_dispatch
  -> GitHub Runner
  -> GoDingtalk 下载与转码
  -> R2 私有对象存储
  -> Worker 登录态下载
```

这套结构的重点：

- 用户登录后才能操作
- 条款确认和钉钉扫码状态按账号隔离
- 下载任务交给 GitHub Actions runner，不依赖本地电脑常驻
- 文件保存到私有 R2，通过 Worker 登录态下载

## 部署

### 1. Cloudflare 资源

需要准备：

- 一个 Worker
- 一个 D1 数据库
- 一个 R2 Bucket

当前配置文件在 [`worker/wrangler.toml`](/Users/zhong/repo/DingTalkGoGoGo/worker/wrangler.toml)。

至少需要确认这些字段：

- `name`
- `d1_databases[].database_id`
- `r2_buckets[].bucket_name`
- `r2_buckets[].preview_bucket_name`

### 2. Worker 依赖与部署

在 `worker/` 目录执行：

```bash
npm install
npx wrangler d1 migrations apply DB --remote
npx wrangler deploy
```

### 3. Worker secrets

建议在 `worker/` 目录配置这些 secret：

```bash
printf '%s' 'change-this-internal-token' | npx wrangler secret put INTERNAL_API_TOKEN
printf '%s' 'ghp_xxx' | npx wrangler secret put GITHUB_ACTIONS_TOKEN
printf '%s' 'change-this-auth-salt' | npx wrangler secret put AUTH_SALT
```

可选：

- `BOOTSTRAP_USERNAME`
- `BOOTSTRAP_PASSWORD`

### 4. GitHub Secrets

至少配置这些 GitHub Secrets：

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `GODINGTALK_CONTROL_URL`
- `GODINGTALK_INTERNAL_TOKEN`
- `GODINGTALK_GITHUB_ACTIONS_TOKEN`
- `GODINGTALK_R2_BUCKET`
- `GODINGTALK_R2_ACCESS_KEY_ID`
- `GODINGTALK_R2_SECRET_ACCESS_KEY`
- `OPENAI_API_KEY`

可选：

- `CODEX_RESPONSES_API_ENDPOINT`
- `GODINGTALK_AUTH_SALT`
- `GODINGTALK_BOOTSTRAP_USERNAME`
- `GODINGTALK_BOOTSTRAP_PASSWORD`
- `GODINGTALK_CONTROL_URL` 也可同时用于 Android 首次预填

说明：

- `OPENAI_API_KEY`：给 `Codex 处理 Issue` 和 `Codex 审核 PR` workflow 使用
- `CODEX_RESPONSES_API_ENDPOINT`：如果你有兼容 Responses API 的自定义端点，可以填；不填则走默认 OpenAI Responses API

## 保留的 Workflow

当前仓库保留并中文化了这些 workflow：

- `ci.yml`：持续集成检查
- `deploy-worker.yml`：部署 Worker
- `remote-runner.yml`：远程任务执行
- `windows-login.yml`：Windows 二维码登录
- `check-upstream.yml`：检查上游更新
- `release.yml`：发布软件
- `codex-issue.yml`：Codex 处理 Issue
- `codex-pr-review.yml`：Codex 审核 PR

已删除：

- `purge-r2.yml`
- `s3-region-benchmark.yml`

## Codex 自动化

### 1. Issue 自动改代码

`codex-issue.yml` 在 `issues.opened` 时触发。

行为：

- 跳过 bot issue，避免上游更新提醒类 issue 误触发
- 使用 `openai/codex-action@v1` 在仓库里直接改代码
- 如果有改动：
  - 新建 `codex/issue-<编号>-<slug>` 分支
  - 提交并推送
  - 自动创建 PR
  - 自动 dispatch 独立的 PR 审核 workflow
  - 回帖通知 issue
- 如果没有改动：
  - 直接回帖说明

### 2. PR 自动审核

`codex-pr-review.yml` 负责 AI 审核，不负责改代码。

触发方式：

- 普通人工 PR：`pull_request` 自动触发
- Issue workflow 自动创建的 PR：由 `codex-issue.yml` 手动 `workflow_dispatch`

这样做的原因是：

- 你要求 issue 改代码 和 PR 审核 必须分成两个独立 Codex workflow
- 当前方案只使用 `GITHUB_TOKEN`，所以 issue workflow 自动创建的 PR 不依赖自然的下游触发，而是显式 dispatch 审核 workflow

## 本地开发

### Go

```bash
go test ./...
```

### Worker

```bash
cd worker
npm install
npm run typecheck
```

## 远程任务与扫码登录

### 远程下载

Worker 会通过 `workflow_dispatch` 触发 `remote-runner.yml`。

这条 workflow 负责：

- 构建 GoDingtalk
- 领取任务
- 下载回放
- 上传结果到 R2
- 回写任务状态

### Windows 二维码登录

网页里的 `/scan` 页面依赖 `windows-login.yml`。

这条 workflow 不要删。它负责：

- 在 Windows runner 上启动二维码登录
- 把二维码 URL 回传给 Worker
- 扫码成功后把 cookies 回传给 Worker

## 仓库整理

本次整理后，以下本地缓存会被忽略：

- `.playwright-cli/`
- `.wrangler/`
- `worker/.wrangler/`

## 兼容说明

- 当前前端仍然集中在 [`worker/src/ui.ts`](/Users/zhong/repo/DingTalkGoGoGo/worker/src/ui.ts)
- 现有后端 API 没有改成新协议，前端只是重做 UI 外壳和中英切换
- `windows-login.yml` 与 `remote-runner.yml` 文件名保持不变，避免 Worker 里的 dispatch 配置失效

## 建议的后续检查

部署前建议手动确认：

- `go test ./...`
- `cd worker && npm run typecheck`
- Worker secrets 是否配置完整
- GitHub secrets 是否包含 `OPENAI_API_KEY`
- `Codex 处理 Issue` 创建 PR 后，`Codex 审核 PR` 是否能正常收到 dispatch
