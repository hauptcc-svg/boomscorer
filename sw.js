// Boom Scorer Service Worker
// Caches core assets for offline play

const CACHE_NAME = 'boom-scorer-v3';
const ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/favicon.svg',
    '/icon-192.png',
    '/icon-512.png',
    '/pewnaosoba7-pig-125132.mp3',
    'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap',
    'https://html2canvas.hertzen.com/dist/html2canvas.min.js'
];

// Install — cache everything
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[SW] Caching app shell');
            // Cache local assets reliably; external ones best-effort
            return cache.addAll(ASSETS.filter(url => url.startsWith('/')))
                .then(() => cache.addAll(ASSETS.filter(url => !url.startsWith('/')))
                    .catch(err => console.log('[SW] External asset cache failed (ok):', err))
                );
        })
    );
    self.skipWaiting();
});

// Activate — delete old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => {
                        console.log('[SW] Deleting old cache:', key);
                        return caches.delete(key);
                    })
            )
        )
    );
    self.clients.claim();
});

// Fetch — network first, fall back to cache
self.addEventListener('fetch', event => {
    // Skip non-GET and cross-origin ad requests
    if (event.request.method !== 'GET') return;
    if (event.request.url.includes('tradiquote.co.za')) return;

    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Cache a copy of successful responses
                if (response && response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                // Network failed — serve from cache
                return caches.match(event.request).then(cached => {
                    if (cached) return cached;
                    // Fallback for navigation requests
                    if (event.request.mode === 'navigate') {
                        return caches.match('/index.html');
                    }
                });
            })
    );
});
