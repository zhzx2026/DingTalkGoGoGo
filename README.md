# GoDingtalk

钉钉直播回放下载工具，支持两种运行方式：

- CLI 模式：本地直接下载单个或批量回放
- Server 模式：跑在 Linux 服务器上，通过 HTTP API 提交下载任务，再配合 Cloudflare Tunnel + Worker 对外暴露

## 架构说明

这个项目的实际下载依赖 `ffmpeg` 和 `Chrome/chromedp`，所以不能直接部署到 Cloudflare Worker。

推荐部署结构：

1. GoDingtalk Server 跑在你的服务器或 Docker 容器中，负责实际下载
2. Cloudflare Tunnel 把服务器的 `:8080` 暴露到 Cloudflare
3. Cloudflare Worker 作为公网入口，做二次鉴权并转发到 Tunnel
4. GitHub Actions 负责测试、发布二进制、发布 Docker 镜像、部署 Worker

## CLI 模式

### 前提条件

- `ffmpeg`
- `Google Chrome` 或 `Chromium`

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

首次运行会自动生成 `.goDingtalkConfig/config.json`。

## Server 模式

### 直接启动

```bash
GODINGTALK_SERVER_AUTH_TOKEN=change-this-origin-token \
GODINGTALK_PUBLIC_BASE_URL=https://api.example.com \
./GoDingtalk -serve -listen :8080 -saveDir /data/video
```

### Docker 启动

```bash
docker compose up -d godingtalk
```

默认使用：

- 配置目录：`/data/config`
- 视频目录：`/data/video`
- API 监听：`:8080`

### Server API

公开健康检查：

```bash
curl http://127.0.0.1:8080/healthz
```

查询状态：

```bash
curl http://127.0.0.1:8080/api/status \
  -H "Authorization: Bearer change-this-origin-token"
```

上传 cookies：

```bash
curl http://127.0.0.1:8080/api/cookies \
  -H "Authorization: Bearer change-this-origin-token" \
  -H "Content-Type: application/json" \
  -d '{
    "cookies": {
      "LV_PC_SESSION": "your-session",
      "other_cookie": "value"
    }
  }'
```

创建下载任务：

```bash
curl http://127.0.0.1:8080/api/downloads \
  -H "Authorization: Bearer change-this-origin-token" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://n.dingtalk.com/dingding/live-room/index.html?roomId=XXXX&liveUuid=XXXX",
    "thread": 10,
    "output_subdir": "job-001"
  }'
```

查询任务：

```bash
curl http://127.0.0.1:8080/api/downloads/job-1710000000-0001 \
  -H "Authorization: Bearer change-this-origin-token"
```

下载生成的视频文件：

```bash
curl -L http://127.0.0.1:8080/files/job-001/example.mp4 \
  -H "Authorization: Bearer change-this-origin-token" \
  -o example.mp4
```

## Cloudflare Tunnel

仓库提供了 Tunnel 模板文件：

- [deploy/cloudflared/config.yml.example](/Users/zhong/repo/DingTalkGoGoGo/deploy/cloudflared/config.yml.example)
- [docker-compose.yml](/Users/zhong/repo/DingTalkGoGoGo/docker-compose.yml)

部署步骤：

1. 在 Cloudflare 创建 Tunnel
2. 下载 Tunnel 的 `credentials.json`
3. 复制 `deploy/cloudflared/config.yml.example` 为 `deploy/cloudflared/config.yml`
4. 把 hostname 改成你自己的源站域名，例如 `origin.godingtalk.example.com`
5. 把 `credentials.json` 放到 `deploy/cloudflared/credentials.json`
6. 启动：

```bash
docker compose up -d
```

## Cloudflare Worker

Worker 代码位于：

- [worker/src/index.ts](/Users/zhong/repo/DingTalkGoGoGo/worker/src/index.ts)
- [worker/wrangler.toml](/Users/zhong/repo/DingTalkGoGoGo/worker/wrangler.toml)

它的职责只有两件事：

1. 作为公网统一入口
2. 校验公网 Token，再转发到 Tunnel 源站

部署前需要先修改 `worker/wrangler.toml` 中的：

- `name`
- `ORIGIN_BASE_URL`
- `CORS_ALLOW_ORIGIN`

然后设置 Worker secrets：

```bash
cd worker
npm install
printf '%s' 'change-this-public-token' | npx wrangler secret put WORKER_API_TOKEN
printf '%s' 'change-this-origin-token' | npx wrangler secret put ORIGIN_SHARED_TOKEN
npx wrangler deploy
```

推荐令牌分层：

- `WORKER_API_TOKEN`：给外部调用方使用
- `ORIGIN_SHARED_TOKEN`：只让 Worker 和 Go 服务之间使用
- `GODINGTALK_SERVER_AUTH_TOKEN`：设置成和 `ORIGIN_SHARED_TOKEN` 一样

## GitHub Actions

仓库新增了三条工作流：

- [ci.yml](/Users/zhong/repo/DingTalkGoGoGo/.github/workflows/ci.yml)：推送和 PR 时执行 `go test ./...`
- [release.yml](/Users/zhong/repo/DingTalkGoGoGo/.github/workflows/release.yml)：打 `v*` tag 时发布二进制并推送 GHCR Docker 镜像
- [deploy-worker.yml](/Users/zhong/repo/DingTalkGoGoGo/.github/workflows/deploy-worker.yml)：Worker 目录变更时自动部署 Worker

需要在 GitHub 仓库里配置这些 secrets：

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `WORKER_API_TOKEN`
- `ORIGIN_SHARED_TOKEN`

Docker 镜像会在 tag 发布时推送到：

```text
ghcr.io/<github-owner>/godingtalk-server:<tag>
ghcr.io/<github-owner>/godingtalk-server:latest
```

## 配置项

示例配置见 [config.example.json](/Users/zhong/repo/DingTalkGoGoGo/config.example.json)。

新增服务端相关字段：

- `server_listen`
- `server_auth_token`
- `server_max_concurrent_jobs`
- `public_base_url`
- `server_enable_cors`

同时支持环境变量覆盖：

- `GODINGTALK_CONFIG_DIR`
- `GODINGTALK_SAVE_DIR`
- `GODINGTALK_COOKIES_FILE`
- `GODINGTALK_SERVER_LISTEN`
- `GODINGTALK_SERVER_AUTH_TOKEN`
- `GODINGTALK_SERVER_MAX_CONCURRENT_JOBS`
- `GODINGTALK_PUBLIC_BASE_URL`

## 注意事项

- 服务端模式建议直接上传已有 cookies，不要依赖服务器弹出浏览器登录
- Cloudflare Worker 不负责下载，只负责入口、鉴权和转发
- 下载结果默认保存在服务端 `save_directory` 下，并通过 `/files/*` 暴露

## 许可证

MIT License
