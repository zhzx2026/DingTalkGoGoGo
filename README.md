# GoDingtalk

钉钉直播回放下载工具，现在支持三种运行方式：

- `CLI`：本地直接下载单个或批量回放
- `Remote Private Mode`：Cloudflare Worker + D1 + R2 + GitHub Actions，多用户登录隔离，远程 runner 下载，不占你的电脑
- `Server Mode`：保留原来的 Go HTTP 服务模式，适合你自己有 VPS 的场景

## 推荐架构

这次默认推荐的是远程私有版，不再依赖 Quick Tunnel，也不要求终端用户提供 token。

```text
Browser / Tampermonkey
        |
        v
Cloudflare Worker (UI + API + 登录鉴权)
        |
        +--> D1 保存用户 / 会话 / cookies 元数据 / 任务状态
        +--> GitHub Actions workflow_dispatch
        |
        v
GitHub Actions Runner
        |
        +--> GoDingtalk 下载 m3u8 / ffmpeg 转 mp4
        +--> 回写进度到 Worker
        +--> 上传成品到私有 R2
        |
        v
R2 私有对象
        |
        v
登录后网页内下载
```

这套链路的特点：

- 用户登录后才能操作，Cookie 与视频按用户隔离
- 视频存储在私有 R2，对外不暴露公共直链
- 任务和状态保存在数据库里，不再是进程内存
- 下载执行在 GitHub runner 上，不依赖你的电脑常驻
- 每个任务会触发独立的 Actions 运行，天然可以并行

## 远程私有版部署

### 1. Cloudflare 资源

先准备：

- 一个 Worker
- 一个 D1 数据库
- 一个 R2 Bucket（用于保存下载后的视频文件）

`worker/wrangler.toml` 里要填真实值：

- `name`
- `d1_databases[].database_id`
- `r2_buckets[].bucket_name`
- `r2_buckets[].preview_bucket_name`

### 2. Worker secrets

在 `worker/` 目录执行：

```bash
npm install
printf '%s' 'change-this-internal-token' | npx wrangler secret put INTERNAL_API_TOKEN
printf '%s' 'ghp_xxx' | npx wrangler secret put GITHUB_ACTIONS_TOKEN
printf '%s' 'change-this-auth-salt' | npx wrangler secret put AUTH_SALT
npx wrangler d1 migrations apply DB --remote
npx wrangler deploy
```

说明：

- `INTERNAL_API_TOKEN`：只给 Worker 和 GitHub runner 之间使用
- `GITHUB_ACTIONS_TOKEN`：Worker 用它去触发仓库里的 `remote-runner.yml`
- `AUTH_SALT`：登录密码和会话哈希的盐值，建议自定义
- `BOOTSTRAP_USERNAME` / `BOOTSTRAP_PASSWORD`（可选）：预置一个初始账号

### 3. GitHub secrets / variables

在仓库里配置这些 `Secrets`：

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `GODINGTALK_CONTROL_URL`
- `GODINGTALK_INTERNAL_TOKEN`
- `GODINGTALK_GITHUB_ACTIONS_TOKEN`
- `GODINGTALK_R2_ACCESS_KEY_ID`
- `GODINGTALK_R2_SECRET_ACCESS_KEY`
- `GODINGTALK_R2_BUCKET`（可选，不填默认 `godingtalk-files`）

建议它们的含义如下：

- `GODINGTALK_CONTROL_URL`：你部署好的 Worker 地址，例如 `https://godingtalk-worker.example.workers.dev`
- `GODINGTALK_INTERNAL_TOKEN`：和 Worker secret `INTERNAL_API_TOKEN` 保持一致
- `GODINGTALK_GITHUB_ACTIONS_TOKEN`：给 `deploy-worker.yml` 用，用来同步 Worker secret
- `GODINGTALK_R2_ACCESS_KEY_ID` / `GODINGTALK_R2_SECRET_ACCESS_KEY`：给远程 runner 上传 R2
- `GODINGTALK_R2_BUCKET`：真实的 R2 bucket 名称

### 4. 自动工作流

仓库现在有这几条工作流：

- `.github/workflows/ci.yml`
  - `go test ./...`
  - `npm run typecheck`
- `.github/workflows/deploy-worker.yml`
  - 同步 Worker secrets
  - 执行 D1 migrations
  - 部署 Worker
- `.github/workflows/remote-runner.yml`
  - 被 Worker 远程触发
  - 领取任务
  - 用 GoDingtalk 下载
  - 上传 mp4 到私有 R2
  - 回写最终状态
- `.github/workflows/release.yml`
  - 打 tag 时构建二进制和 Docker 镜像

### 5. 使用方式

部署完成后，直接打开 Worker 根地址即可：

- 注册/登录账号（默认开放注册）
- 上传 cookies
- 粘贴一个或多个回放链接
- 提交任务
- 网页轮询看进度
- 成功后在登录态内直接点下载链接

如果要关闭公开注册，把 `worker/wrangler.toml` 里的 `ALLOW_PUBLIC_REGISTRATION` 改成 `"false"`，再重新部署。

如果你习惯用 Tampermonkey：

- 打开 `/tampermonkey/godingtalk-helper.user.js`
- 安装脚本
- 在钉钉页面点右下角按钮
- 当前链接和可见 cookies 会自动带到控制台

注意：Tampermonkey 依然拿不到 `HttpOnly` cookie，所以它只是辅助入口，不是唯一来源。

## Remote API

登录态 API：

- `GET /api/auth/me`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/status`
- `POST /api/cookies`
- `GET /api/jobs`
- `POST /api/jobs`
- `GET /api/jobs/{jobId}`
- `GET /api/files?job_id=...&path=...`

内部 API：

- `GET /internal/jobs/{jobId}/claim`
- `POST /internal/jobs/{jobId}/progress`
- `POST /internal/jobs/{jobId}/complete`

## CLI 模式

### 前提条件

- `ffmpeg`
- `Google Chrome` 或 `Chromium`（只在 `-login` 时需要）

### 从源码构建

```bash
git clone https://github.com/NAXG/GoDingtalk.git
cd GoDingtalk
go build -o GoDingtalk .
```

### 下载单个视频

```bash
./GoDingtalk -url="https://n.dingtalk.com/dingding/live-room/index.html?roomId=XXXX&liveUuid=XXXX"
```

### 批量下载

```bash
./GoDingtalk -urlFile="urls.txt"
```

### 只登录并生成 cookies

```bash
./GoDingtalk -login
```

### 无头二维码登录（适合 GitHub Actions / 远程 Windows）

```bash
./GoDingtalk -loginQR -loginQRFile login-qr.png
```

它会：

1. 打开钉钉登录页并自动识别页面里的登录二维码
2. 解出登录 URL 后重新生成一张本地二维码图片
3. 在终端打印可扫码的 ASCII 二维码
4. 等待你用钉钉扫码确认后自动保存 `cookies.json`

如果你使用 GitHub Actions，可以直接手动触发 `.github/workflows/windows-login.yml`：

1. 进入仓库 Actions 页面
2. 运行 `Windows Login`
3. 在日志里查看二维码链接 / 终端二维码，或下载 `windows-login-qr` artifact
4. 扫码完成后下载 `windows-login-cookies` artifact

注意：

- `windows-latest` 位于美国网络，打开的通常是国际版 DingTalk 登录页
- 如果你希望复用中国网络下的登录链路，可以再切回中国网络环境的 `self-hosted Windows runner`

## GitHub Runner 远程执行

`remote-runner.yml` 实际调用的是新的 runner 模式：

```bash
./GoDingtalk \
  -runRemoteJob \
  -controlURL "https://your-worker.example.workers.dev" \
  -internalToken "change-this-internal-token" \
  -jobID "job-123"
```

它会：

1. 从 Worker 领取任务和 cookies
2. 本地执行真实下载
3. 持续回写进度
4. 生成结果清单给工作流后续上传 R2

## Server Mode

老的 Go HTTP 服务模式还保留着，适合你自己有 VPS 或 Docker 主机的时候用。

启动示例：

```bash
GODINGTALK_SERVER_AUTH_TOKEN=change-this-origin-token \
GODINGTALK_PUBLIC_BASE_URL=https://api.example.com \
./GoDingtalk -serve -listen :8080 -saveDir /data/video
```

可用接口：

- `GET /healthz`
- `GET /api/status`
- `POST /api/cookies`
- `POST /api/downloads`
- `GET /api/downloads`
- `GET /api/downloads/{jobId}`
- `GET /files/{path}`

这套模式现在属于兼容层，不是推荐的私有登录隔离部署方式。

## 配置项

示例见 `config.example.json`。

新增字段：

- `server_listen`
- `server_auth_token`
- `server_max_concurrent_jobs`
- `public_base_url`
- `server_enable_cors`
- `control_base_url`
- `internal_api_token`

可用环境变量：

- `GODINGTALK_CONFIG_DIR`
- `GODINGTALK_SAVE_DIR`
- `GODINGTALK_COOKIES_FILE`
- `GODINGTALK_SERVER_LISTEN`
- `GODINGTALK_SERVER_AUTH_TOKEN`
- `GODINGTALK_SERVER_MAX_CONCURRENT_JOBS`
- `GODINGTALK_PUBLIC_BASE_URL`
- `GODINGTALK_CONTROL_URL`
- `GODINGTALK_INTERNAL_API_TOKEN`

## 注意事项

- Worker 不负责下载视频，它只负责 UI、状态、触发远程任务和分发成品
- 真正下载依赖 `ffmpeg`，所以执行节点仍然是 GitHub runner 或你自己的服务器
- Tampermonkey 只能辅助导入浏览器可见 cookie，不能替代完整登录态
- GitHub Actions 并发能力受你的 GitHub 计划额度限制
- 视频文件现在走私有 R2，不再依赖 GitHub Release 公共直链

## 许可证

MIT License
