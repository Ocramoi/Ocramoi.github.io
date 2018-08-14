const arqs = [
    'sw.js',
    'style.css',
    'manifest.json',
    'index.html',
    'app.js'
]

self.addEventListener('install', async function installSw(e) {
    var cached2 = await caches.open('aquaPush');
    cached2.addAll(arqs);
});

self.addEventListener('fetch', event =>
{
    event.respondWith(checkCache(event.request));
});

async function checkCache(req)
{
    const cachedResponse = await caches.match(req);
    return fetch(req) || cachedResponse;
}