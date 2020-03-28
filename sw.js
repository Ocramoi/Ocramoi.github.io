const CACHE_NAME = 'cache_bcc_020';

const FILES_TO_CACHE = [
    '/index.html',
    '/app.js',
    '/infos.js',
    '/style.css'
];

this.addEventListener("install", event => {
    this.skipWaiting();
  
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => {
          return cache.addAll(FILES_TO_CACHE);
      })
    )
});

this.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => (cacheName.startsWith('cache_')))
            .filter(cacheName => (cacheName !== CACHE_NAME))
            .map(cacheName => caches.delete(cacheName))
        );
      })
    );
});

this.addEventListener("fetch", event => {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        })
        .catch(() => {
            return caches.match('/index.html');
        })
    )
});