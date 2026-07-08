var CACHE_NAME = "traffic-signs-v6";

// Cache-first: 缓存优先，网络做后备，确保 PWA 稳定打开
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) return cached;
      return fetch(event.request).then(function (response) {
        // 只缓存成功的 GET 请求
        if (response.status === 200 && event.request.method === "GET") {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, clone);
          });
        }
        return response;
      }).catch(function () {
        // 网络失败且无缓存，返回空（避免白屏）
        return new Response("", { status: 200 });
      });
    })
  );
});

// 激活时清理旧缓存
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(names.map(function (name) {
        if (name !== CACHE_NAME) return caches.delete(name);
      }));
    })
  );
  self.clients.claim();
});
