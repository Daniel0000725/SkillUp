// Configuration du Service Worker
const CACHE_NAME = 'nexus-ar-cache-v1';
const OFFLINE_URL = 'offline.html';

// Fichiers à mettre en cache lors de l'installation
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/js/sw-register.js',
  '/manifest.json',
  '/offline.html',
  'https://aframe.io/releases/1.2.0/aframe.min.js',
  'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto:wght@300;400;700&display=swap'
];

// Événement d'installation
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installation en cours...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Mise en cache des ressources statiques');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Événement d'activation
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activation...');
  
  // Supprimer les anciens caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Suppression de l\'ancien cache :', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => self.clients.claim())
  );
});

// Stratégie de mise en cache : Cache First, puis réseau
self.addEventListener('fetch', (event) => {
  // Ignorer les requêtes qui ne sont pas en GET
  if (event.request.method !== 'GET') return;
  
  // Ignorer les requêtes de streaming et autres requêtes spéciales
  if (event.request.url.includes('chrome-extension') || 
      event.request.url.includes('sockjs') ||
      event.request.url.includes('hot-update.json')) {
    return;
  }

  // Gestion des requêtes de l'application
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retourner la réponse en cache si elle existe
        if (response) {
          return response;
        }

        // Sinon, récupérer depuis le réseau
        return fetch(event.request)
          .then((networkResponse) => {
            // Si la réponse est valide, la mettre en cache
            if (!networkResponse || 
                networkResponse.status !== 200 || 
                networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Ne mettre en cache que les ressources de notre origine
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          })
          .catch(() => {
            // En cas d'erreur réseau, retourner la page hors ligne
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match(OFFLINE_URL);
            }
          });
      })
  );
});

// Gestion des messages du client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
