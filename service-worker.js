// FitOut Quotation System — service worker
// Offline is "nice to have" here, not required: this caches the app
// shell (this page + icons) so it opens even with a weak/no signal,
// and lets everything else (like the jsPDF library from its CDN)
// fall through to the network normally.

const CACHE_NAME = 'fitout-quote-app-v1';
const APP_SHELL = [
    './',
    './index.html',
    './manifest.json',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/icon-192-maskable.png',
    './icons/icon-512-maskable.png'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch((err) => {
            console.error('Service worker install/cache error:', err);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((names) =>
            Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const req = event.request;

    // Only handle GET requests for our own origin's app shell files.
    // Everything else (jsPDF CDN, etc.) goes straight to the network.
    const url = new URL(req.url);
    const isSameOrigin = url.origin === self.location.origin;

    if (req.method !== 'GET') return;

    if (isSameOrigin) {
        // Cache-first for the app shell, so it opens instantly and
        // works offline; falls back to network if not cached yet.
        event.respondWith(
            caches.match(req).then((cached) => {
                if (cached) return cached;
                return fetch(req).then((response) => {
                    if (response && response.ok) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
                    }
                    return response;
                }).catch(() => cached);
            })
        );
    } else {
        // Network-first for external resources (e.g. jsPDF CDN), with
        // a cached fallback if one exists and the network is down.
        event.respondWith(
            fetch(req).then((response) => {
                if (response && response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
                }
                return response;
            }).catch(() => caches.match(req))
        );
    }
});
