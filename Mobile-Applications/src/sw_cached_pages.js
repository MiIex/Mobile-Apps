const cacheName = 'v2';

const cacheAssets = [
    '../index.html',
    './Login-Area/view/LoginView.vue',
    './Login-Area/component/Login.vue',
    './registry-Area/view/registryView.vue',
    './registry-Area/component/registry.vue',
];

self.addEventListener('install', e => {
    console.log('Service Worker installed');

    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log('Caching files');
            return cache.addAll(cacheAssets); // "return" hinzufügen
        })
        .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e => {
    console.log('Service Worker activated');

    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        console.log('Service Worker: Clearing old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');

    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
