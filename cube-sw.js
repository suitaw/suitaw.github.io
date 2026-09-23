// 魔方复原助手的 Service Worker：让它能装到桌面、断网也能打开。
//
// 策略是「网络优先，断网才用缓存」：
// - 联网时每次都去拿最新的，拿到顺手存一份 —— 不会出现「改了代码手机上还是旧版」
//   （Vocab 那个 SW 故意不缓存，就是怕这个；网络优先没有这个问题）
// - 断网时拿上次存下的那份，页面、three.js、图标都在
// 只管同源的 GET；别的请求（比如以后接的接口）原样放行
const CACHE = 'cube-v1';
const CORE = ['/cube-solver.html', '/three.min.js', '/cube-icon-192.png', '/cube-manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k.startsWith('cube-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if(req.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(
    fetch(req).then(res => {
      if(res.ok){ const copy = res.clone(); caches.open(CACHE).then(c => c.put(url.pathname, copy)); }
      return res;
    }).catch(() => caches.match(url.pathname))   // 按路径取：「强制刷新」会在地址后面加参数
  );
});
