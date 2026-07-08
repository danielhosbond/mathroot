// MathRoot service worker — offline support via stale-while-revalidate.
//
// Every cached asset is served from cache immediately and refreshed from the
// network in the background, so a deploy is picked up on the *next* load
// without any cache-version bump. Bump CACHE only if the cache format itself
// needs a hard reset (it drops everything users have cached).
const CACHE = 'mathroot-v1';

const SHELL = [
  './',
  './index.html',
  './app.js',
  './style.css',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  // Cache our own assets plus the Google Fonts CSS + font files (needed offline)
  const cacheable = url.origin === location.origin
    || url.hostname === 'fonts.googleapis.com'
    || url.hostname === 'fonts.gstatic.com';
  if (!cacheable) return;

  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(request);
      const fresh = fetch(request)
        .then((resp) => {
          // Opaque responses (no-cors font/CSS fetches) are cacheable too
          if (resp && (resp.ok || resp.type === 'opaque')) cache.put(request, resp.clone());
          return resp;
        })
        .catch(() => cached); // offline: fall back to whatever we have
      return cached || fresh;
    })
  );
});
