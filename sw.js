// ════════════════════════════════════════════════════════
//  Service Worker — Medalles del Pla
//  Gestiona cache offline i instal·lació PWA
// ════════════════════════════════════════════════════════

const CACHE_NOM = 'medalles-v2';
const CACHE_FITXERS = [
  '/',
  '/index.html',
  '/balisa.html',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Fraunces:ital,wght@0,300;0,700;1,300&display=swap'
];

// Instal·lació — pre-cache dels fitxers principals
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NOM).then(cache => {
      // Cache els fitxers locals; ignora errors de recursos externs
      return Promise.allSettled(
        CACHE_FITXERS.map(url => cache.add(url).catch(() => {}))
      );
    })
  );
  self.skipWaiting();
});

// Activació — esborra caches antics
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NOM).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — estratègia: network first, fallback a cache
self.addEventListener('fetch', (e) => {
  // No interceptis Firebase ni APIs externes
  if (e.request.url.includes('firebaseapp') ||
      e.request.url.includes('googleapis.com/identitytoolkit') ||
      e.request.url.includes('securetoken') ||
      e.request.url.includes('firestore')) {
    return;
  }

  e.respondWith(
    fetch(e.request, { cache: 'no-store' })
      .then(res => {
        // Desa una còpia al cache si és una resposta vàlida
        if (res && res.status === 200 && e.request.method === 'GET') {
          const clone = res.clone();
          caches.open(CACHE_NOM).then(cache => cache.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
