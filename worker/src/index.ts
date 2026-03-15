import { renderApp } from "./ui";

interface Env {
  ORIGIN_BASE_URL: string;
  CORS_ALLOW_ORIGIN?: string;
  WORKER_API_TOKEN?: string;
  ORIGIN_SHARED_TOKEN?: string;
}

function jsonResponse(body: unknown, init?: ResponseInit): Response {
  const headers = new Headers(init?.headers);
  headers.set("content-type", "application/json; charset=utf-8");
  return new Response(JSON.stringify(body, null, 2), {
    ...init,
    headers,
  });
}

function applyCors(request: Request, response: Response, env: Env): Response {
  const headers = new Headers(response.headers);
  const allowedOrigin = env.CORS_ALLOW_ORIGIN?.trim() || "*";
  const requestOrigin = request.headers.get("Origin");

  if (allowedOrigin === "*") {
    headers.set("Access-Control-Allow-Origin", requestOrigin || "*");
  } else if (requestOrigin === allowedOrigin) {
    headers.set("Access-Control-Allow-Origin", requestOrigin);
  }

  headers.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Vary", "Origin");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function isAuthorized(request: Request, env: Env): boolean {
  if (!env.WORKER_API_TOKEN) {
    return true;
  }

  const authorization = request.headers.get("Authorization") || "";
  const token = authorization.replace(/^Bearer\s+/i, "").trim();
  return token !== "" && token === env.WORKER_API_TOKEN;
}

function buildOriginRequest(request: Request, env: Env): Request {
  const incomingURL = new URL(request.url);
  const originURL = new URL(env.ORIGIN_BASE_URL);
  originURL.pathname = incomingURL.pathname;
  originURL.search = incomingURL.search;

  const headers = new Headers(request.headers);
  headers.set("Authorization", `Bearer ${env.ORIGIN_SHARED_TOKEN || env.WORKER_API_TOKEN || ""}`);
  headers.set("X-Forwarded-Host", incomingURL.host);
  headers.set("X-Forwarded-Proto", incomingURL.protocol.replace(":", ""));

  return new Request(originURL.toString(), {
    method: request.method,
    headers,
    body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body,
    redirect: "manual",
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return applyCors(
        request,
        new Response(null, { status: 204 }),
        env,
      );
    }

    if (!env.ORIGIN_BASE_URL) {
      return applyCors(
        request,
        jsonResponse({ error: "ORIGIN_BASE_URL is not configured" }, { status: 500 }),
        env,
      );
    }

    const { pathname } = new URL(request.url);
    if (pathname === "/") {
      return new Response(renderApp(), {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store",
        },
      });
    }

    const publicPath = pathname === "/healthz";
    if (!publicPath && !isAuthorized(request, env)) {
      return applyCors(
        request,
        jsonResponse({ error: "unauthorized" }, { status: 401 }),
        env,
      );
    }

    const upstreamRequest = buildOriginRequest(request, env);
    const upstreamResponse = await fetch(upstreamRequest);
    return applyCors(request, upstreamResponse, env);
  },
};
