/**
 * API 中转站（Cloudflare Worker）
 *
 * 用法：把 https://api.anthropic.com/v1/messages 换成
 *       https://你的worker域名/anthropic/v1/messages
 * 其它服务同理，前缀见下面 UPSTREAMS 表。
 *
 * 特性：
 *  - 多服务商一站中转（按路径第一段区分）
 *  - 完整透传请求方法 / 路径 / 查询参数 / 请求头 / 请求体
 *  - 支持 SSE 流式输出（stream: true 正常工作）
 *  - 自动处理浏览器 CORS 预检
 *  - 可选访问口令（RELAY_KEY），防止别人白嫖你的中转站
 */

const UPSTREAMS = {
  anthropic:  "https://api.anthropic.com",
  openai:     "https://api.openai.com",
  deepseek:   "https://api.deepseek.com",
  kimi:       "https://api.moonshot.cn",
  openrouter: "https://openrouter.ai",
  doubao:     "https://ark.cn-beijing.volces.com",
  gemini:     "https://generativelanguage.googleapis.com",
  groq:       "https://api.groq.com",
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Max-Age": "86400",
};

// 这些头由中转站自己生成，不透传给上游
const DROP_REQUEST_HEADERS = [
  "host", "x-relay-key",
  "cf-connecting-ip", "cf-ipcountry", "cf-ray", "cf-visitor", "cf-worker",
  "x-forwarded-for", "x-forwarded-proto", "x-real-ip",
];

export default {
  async fetch(request, env) {
    // 浏览器 CORS 预检
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const segments = url.pathname.split("/").filter(Boolean);

    // 根路径：显示简单说明
    if (segments.length === 0) {
      const list = Object.entries(UPSTREAMS)
        .map(([k, v]) => `  /${k}/*  →  ${v}`)
        .join("\n");
      return text(`API 中转站运行中 ✅\n\n可用前缀：\n${list}\n\n示例：POST /anthropic/v1/messages`);
    }

    // 可选访问口令：在 Worker 设置里配了 RELAY_KEY 才启用
    if (env.RELAY_KEY) {
      const provided = request.headers.get("x-relay-key") || url.searchParams.get("relay_key");
      if (provided !== env.RELAY_KEY) {
        return text("403：缺少或错误的中转站口令（x-relay-key）", 403);
      }
    }

    const provider = segments[0].toLowerCase();
    const upstream = UPSTREAMS[provider];
    if (!upstream) {
      return text(`404：未知服务前缀 "/${provider}"，可用：${Object.keys(UPSTREAMS).join(", ")}`, 404);
    }

    // 拼出上游地址：去掉第一段前缀，其余原样保留（含查询参数）
    url.searchParams.delete("relay_key");
    const search = url.searchParams.toString();
    const targetUrl = upstream + "/" + segments.slice(1).join("/") + (search ? "?" + search : "");

    // 透传请求头，去掉不该转发的
    const headers = new Headers(request.headers);
    for (const h of DROP_REQUEST_HEADERS) headers.delete(h);

    let upstreamResp;
    try {
      upstreamResp = await fetch(targetUrl, {
        method: request.method,
        headers,
        body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
      });
    } catch (e) {
      return text(`502：连接上游失败（${provider}）：${e.message}`, 502);
    }

    // 原样回传（含流式 body），补上 CORS 头
    const respHeaders = new Headers(upstreamResp.headers);
    for (const [k, v] of Object.entries(CORS_HEADERS)) respHeaders.set(k, v);
    return new Response(upstreamResp.body, {
      status: upstreamResp.status,
      statusText: upstreamResp.statusText,
      headers: respHeaders,
    });
  },
};

function text(msg, status = 200) {
  return new Response(msg, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8", ...CORS_HEADERS },
  });
}
