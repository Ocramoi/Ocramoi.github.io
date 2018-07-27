const arqs = [
    'index.html',
    'sw.js',
    'app.js',
    'style.css'
]

self.addEventListener('install', async function installSw(e) {
    var cached2 = await caches.open('eco-ring');
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