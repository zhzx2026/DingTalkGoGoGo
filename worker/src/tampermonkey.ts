export function renderTampermonkeyScript(appOrigin: string): string {
  const consoleURL = `${appOrigin.replace(/\/$/, "")}/settings`;
  return `// ==UserScript==
// @name         GoDingtalk Cookie Helper
// @namespace    https://github.com/zhzx2026/DingTalkGoGoGo
// @version      0.1.0
// @description  在钉钉页面快速把当前链接和可见 cookie 带到 GoDingtalk 公益版控制台
// @match        https://*.dingtalk.com/*
// @grant        GM_setClipboard
// @grant        GM_notification
// ==/UserScript==

(function () {
  "use strict";

  const CONSOLE_URL = ${JSON.stringify(consoleURL)};

  function parseCookies() {
    const cookies = {};
    const raw = document.cookie || "";
    raw.split(";").forEach((part) => {
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
        cookies[name] = value;
      }
    });
    return cookies;
  }

  function encodePayload(payload) {
    return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  }

  function openConsole() {
    const payload = {
      source: "tampermonkey",
      url: location.href,
      title: document.title,
      cookies: parseCookies(),
      cookie_header: document.cookie || "",
      captured_at: new Date().toISOString(),
    };

    const encoded = encodePayload(payload);
    const target = CONSOLE_URL + "#import=" + encoded;
    const prettyCookies = JSON.stringify(payload.cookies, null, 2);

    if (typeof GM_setClipboard === "function") {
      GM_setClipboard(prettyCookies || payload.cookie_header || "");
    }

    if (typeof GM_notification === "function") {
      GM_notification({
        title: "GoDingtalk",
        text: "已把当前页面信息带到控制台，新窗口会自动打开。",
        timeout: 1800,
      });
    }

    window.open(target, "_blank", "noopener,noreferrer");
  }

  function ensureButton() {
    if (document.getElementById("godingtalk-helper-button")) {
      return;
    }

    const button = document.createElement("button");
    button.id = "godingtalk-helper-button";
    button.textContent = "发送到 GoDingtalk";
    button.type = "button";
    button.style.position = "fixed";
    button.style.right = "18px";
    button.style.bottom = "18px";
    button.style.zIndex = "999999";
    button.style.padding = "12px 16px";
    button.style.border = "0";
    button.style.borderRadius = "999px";
    button.style.background = "linear-gradient(135deg, #d26a2e, #157a6e)";
    button.style.color = "#fff";
    button.style.fontSize = "14px";
    button.style.fontWeight = "700";
    button.style.boxShadow = "0 16px 38px rgba(0, 0, 0, 0.18)";
    button.style.cursor = "pointer";
    button.addEventListener("click", openConsole);
    document.body.appendChild(button);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureButton, { once: true });
  } else {
    ensureButton();
  }
})();
`;
}
