// Vocab AI 的 Service Worker —— 它只为一件事存在：
// 让这个页面能被"安装到桌面"，装了才会出现在 Android 的系统分享菜单里（Web Share Target）。
//
// **它故意不缓存任何东西。** 这个应用已经靠 BUILD_STAMP 自查线上版本，
// 再叠一层 SW 缓存，只会让"明明改了代码、手机上还是旧版"这种事更难排查。
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
// 空的 fetch 监听：不调 respondWith 就是走浏览器默认网络路径，行为零改变。
// 留着它是保险 —— 早期 Chrome 要求 PWA 必须有 fetch handler 才判定为可安装。
self.addEventListener("fetch", () => {});
