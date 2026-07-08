const CACHE_NAME = "traffic-signs-v7";

// Network-first strategy: try network, fall back to cache
// Ensures users always get the latest content while staying offline-capable
self.addEventListener("fetch", function (event) {
  // Only handle GET requests
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request).then(function (response) {
      // Cache successful responses (JS, CSS, HTML, images, icons)
      if (response.status === 200) {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, clone);
        });
      }
      return response;
    }).catch(function () {
      // Network failed — try cache
      return caches.match(event.request).then(function (cached) {
        return cached || new Response("", { status: 200 });
      });
    })
  );
});

// Activate: clean old caches
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
