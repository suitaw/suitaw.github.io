# API 中转站

一个部署在 Cloudflare Workers 上的多服务商 API 反向代理。把本仓库里
`vocab-ai-v5.html`、`codepath.html` 等页面直连的 AI API 换成走中转，解决
浏览器 CORS 限制和部分 API 域名访问不稳定的问题。

## 支持的服务

| 前缀 | 上游 |
|---|---|
| `/anthropic/*` | `https://api.anthropic.com` |
| `/openai/*` | `https://api.openai.com` |
| `/deepseek/*` | `https://api.deepseek.com` |
| `/kimi/*` | `https://api.moonshot.cn` |
| `/openrouter/*` | `https://openrouter.ai` |
| `/doubao/*` | `https://ark.cn-beijing.volces.com` |
| `/gemini/*` | `https://generativelanguage.googleapis.com` |
| `/groq/*` | `https://api.groq.com` |

请求方法、路径、查询参数、请求头（含 `Authorization` / `x-api-key`）、请求体
全部原样透传，SSE 流式输出（`stream: true`）正常工作。API Key 仍由调用方自己
携带，中转站不存储任何密钥。

## 部署（推荐：网页版，两分钟）

1. 注册/登录 [Cloudflare](https://dash.cloudflare.com)（免费套餐即可，每天 10 万次请求）。
2. 左侧 **Workers 和 Pages** → **创建** → **创建 Worker** → 随便起个名字（如 `api-relay`）→ **部署**。
3. 点 **编辑代码**，把 `worker.js` 的全部内容粘贴进去覆盖，**保存并部署**。
4. 得到地址 `https://api-relay.<你的子域>.workers.dev`，用浏览器打开应能看到"API 中转站运行中 ✅"。

> 提示：`*.workers.dev` 域名在部分地区访问不稳定。如果你有自己的域名托管在
> Cloudflare，可在 Worker 的 **设置 → 域和路由** 里绑定一个自定义域名（如
> `api.你的域名.com`），会稳定很多。

### 命令行部署（可选）

```bash
npm i -g wrangler
cd api-relay
wrangler login
wrangler deploy
```

## 使用

把原来的 API 地址前缀替换成中转地址即可，其余全部不变：

```
https://api.anthropic.com/v1/messages
→ https://你的worker地址/anthropic/v1/messages

https://api.deepseek.com/v1/chat/completions
→ https://你的worker地址/deepseek/v1/chat/completions
```

curl 验证（以 DeepSeek 为例）：

```bash
curl https://你的worker地址/deepseek/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-你的key" \
  -d '{"model":"deepseek-chat","messages":[{"role":"user","content":"你好"}]}'
```

## 可选：加访问口令

默认任何人知道地址都能用你的中转站（虽然 Key 是他们自己的，但流量算你的额度）。
如需限制，在 Worker 的 **设置 → 变量和机密** 里添加机密 `RELAY_KEY`（或命令行
`wrangler secret put RELAY_KEY`），之后所有请求需带请求头：

```
x-relay-key: 你设置的口令
```

不方便加请求头的场景也可以用查询参数 `?relay_key=口令`。

## 新增服务商

编辑 `worker.js` 顶部的 `UPSTREAMS` 表，加一行前缀和上游地址，重新部署即可。
