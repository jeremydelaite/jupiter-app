/* Jupiter — service worker (app installable + hors-ligne) */
const CACHE = 'jupiter-v2';
const ASSETS = [
  './', 'index.html', 'manifest.json',
  'jupiter-icon.png', 'icon-192.png', 'icon-512.png',
  'favicon-16.png', 'favicon-32.png', 'apple-touch-icon.png', 'favicon.ico'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {}));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // On ne gère que le même domaine ; Supabase, Cloudflare, Google Fonts passent au réseau.
  if (url.origin !== location.origin) return;

  // Navigation (HTML) : réseau d'abord (pour avoir les mises à jour), cache en secours.
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        const r = await fetch(req);
        const c = await caches.open(CACHE); c.put(req, r.clone());
        return r;
      } catch (_) {
        return (await caches.match(req)) || (await caches.match('index.html')) || (await caches.match('./'));
      }
    })());
    return;
  }

  // Autres ressources : cache d'abord, mise à jour en arrière-plan.
  e.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) {
      fetch(req).then(r => caches.open(CACHE).then(c => c.put(req, r.clone()))).catch(() => {});
      return cached;
    }
    try {
      const r = await fetch(req);
      const c = await caches.open(CACHE); c.put(req, r.clone());
      return r;
    } catch (_) {
      return cached;
    }
  })());
});
