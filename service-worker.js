// FitOut Quotation System - service worker
// IMPORTANT: change CACHE_NAME every time index.html changes (v1 -> v2 ...),
// otherwise phones that already installed the app may keep the old version.
const CACHE_NAME = 'fitout-quote-app-v2.9-1';
const APP_SHELL = [
    './',
    './index.html',
    './manifest.json',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/icon-192-maskable.png',
    './icons/icon-512-maskable.png',
    './icons/apple-touch-icon.png'
];

const JSPDF_URL = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>
            // App files must all cache, or the browser retries the install later
            cache.addAll(APP_SHELL).then(() =>
                // PDF library: cached too so PDFs work offline; a failure here is not fatal
                cache.add(new Request(JSPDF_URL, { mode: 'cors' })).catch((err) => console.warn('jsPDF not pre-cached:', err))
            )
        )
    );
});

// Network with a time limit: on a weak signal, fall back to the saved copy after 4 seconds
function fetchWithTimeout(url, opts, ms) {
    return new Promise((resolve, reject) => {
        const t = setTimeout(() => reject(new Error('timeout')), ms);
        fetch(url, opts).then((r) => { clearTimeout(t); resolve(r); }, (e) => { clearTimeout(t); reject(e); });
    });
}

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((names) =>
            Promise.all(names.filter((n) => n.startsWith('fitout-quote-app-') && n !== CACHE_NAME).map((n) => caches.delete(n)))  // only our own old caches
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);
    const isSameOrigin = url.origin === self.location.origin;
    const isPage = req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('/index.html');

    if (isSameOrigin && isPage) {
        // The app page itself: NETWORK FIRST, so a new version on GitHub
        // shows up as soon as the phone is online; cached copy if offline.
        event.respondWith(
            // always ask GitHub for the newest page
            fetchWithTimeout(req.url, { cache: 'no-cache' }, 4000).then((response) => {
                if (response && response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
                }
                return response;
            }).catch(() => caches.match(req).then((c) => c || caches.match('./index.html')))
        );
    } else if (isSameOrigin) {
        // Icons / manifest: cache first.
        event.respondWith(
            caches.match(req).then((cached) => cached || fetch(req).then((response) => {
                if (response && response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
                }
                return response;
            }))
        );
    } else {
        // jsPDF from its CDN etc.: network first, cached copy if offline.
        event.respondWith(
            fetch(req).then((response) => {
                if (response && (response.ok || response.type === 'opaque')) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
                }
                return response;
            }).catch(() => caches.match(req))
        );
    }
});
