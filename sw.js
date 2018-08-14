const arqs = [
    'style.css',
    'manifest.json',
    'index.html',
    'app.js'
]

self.addEventListener('install', async function installSw(e) {
    var cached2 = await caches.open('aquaPush');
    cached2.addAll(arqs);

    setInterval(noti, 10000);
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

function noti()
{
    import {push} from 'classe';
    if(push)
    {
        var pushOps = 
        {
            "body": "Já está na hora de tomar mais um copo d'água!",
            "icon": "imagens/icon.jpg",
            "vibrate": [200, 100, 200, 100, 200, 100, 400],
            "tag": "request"
            // ,
            // "actions": [
            //   { "action": "yes", "title": "Yes", "icon": "images/yes.png" },
            //   { "action": "no", "title": "No", "icon": "images/no.png" }
            // ]
        };
        ServiceWorkerRegistration.showNotification('Tome água!', pushOps);
    }
}