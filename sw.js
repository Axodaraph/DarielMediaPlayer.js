const VERSION = "v1";


self.addEventListener('install', event => {
    event.waitUntil(precache());
});

self.addEventListener('fetch', event => {
    const request = event.request;
    //get
    if (request.method !== "GET"){
        return;
    }

    //buscar en el cache
    event.respondWith(cachedResponse(request));

    //actualizar el cache
    event.waitUntil(updateCache(request));
});

async function precache () {
    const cache = await caches.open(VERSION);
    return cache.addAll([
        '/',
        '/index.html',
        '/src/index.js',
        '/src/MediaPlayerInit.js',
        '/plugins/AutoPlay.js',
        '/plugins/AutoPause.js',
        '/assets/index.css',
        '/assets/Idilio.mp4',
        //ya parcel se encarga de redireccionar
    ]);
}

async function cachedResponse(request) {
    const cache = await caches.open(VERSION);
    const response = await cache.match(request);
    return response || fetch(request);
}

async function updateCache(request) {
    const cache = await caches.open(VERSION);
    const response = await fetch(request);
    return cache.put(request, response);
}