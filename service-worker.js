const cacheName = 'v0.0.1';
const filesToCache = [
    './',
    './index.html',
    './icons/apple-touch-icon.png',
    './icons/favicon-32x32.png',
    './icons/favicon-16x16.png',
];

// install service worker and cache all the apps content
self.addEventListener('install', event => {
    const preCache = async() => {
        const cache = await caches.open(cacheName);
        return cache.addAll(filesToCache);
    }

    event.waitUntil(preCache());
});

// serve cached content when offline
self.addEventListener('fetch', event => {
    const cachedResponse = async event => {
        const cache = await caches.match(event.request);
        return cache || fetch(event.request);
    };

    event.respondWith(cachedResponse(event));
})