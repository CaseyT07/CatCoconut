var CACHE_NAME = "traffic-signs-v3";
var urlsToCache = [
  "index.html", "manifest.json",
  "css/style.css",
  "js/data.js", "js/quiz.js", "js/app.js", "js/knowledge.js",
  "icons/icon-192.png", "icons/icon-512.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
    return cache.addAll(urlsToCache);
  }));
  self.skipWaiting();
});

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

// Network-first: always try network, fall back to cache
self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).then(function (response) {
      var clone = response.clone();
      caches.open(CACHE_NAME).then(function (cache) {
        cache.put(event.request, clone);
      });
      return response;
    }).catch(function () {
      return caches.match(event.request);
    })
  );
});
