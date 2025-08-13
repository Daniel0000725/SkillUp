// Service Worker pour Nexus AR Connect - Version 1.0

const CACHE_NAME = 'nexus-ar-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/manifest.json',
  'https://aframe.io/releases/1.2.0/aframe.min.js',
  'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto:wght@300;400;700&display=swap',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installation en cours...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Mise en cache des ressources statiques');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activation...');
  
  // Suppression des anciens caches
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
  // Ignorer les requêtes qui ne sont pas en GET ou qui sont des requêtes de streaming
  if (event.request.method !== 'GET' || 
      event.request.url.includes('chrome-extension') || 
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
            // En cas d'erreur réseau, on pourrait retourner une page de secours
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/offline.html');
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

// Gestion des notifications push
self.addEventListener('push', (event) => {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return;
  }

  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Nexus AR Connect';
  const options = {
    body: data.body || 'Nouvelle notification',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-96x96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 'nexus-notification'
    },
    actions: [
      { action: 'explore', title: 'Explorer' },
      { action: 'close', title: 'Fermer' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Gestion des actions de notification
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    clients.openWindow('/explore');
  } else if (event.action === 'close') {
    // Ne rien faire
  } else {
    // Action par défaut
    clients.openWindow('/');
  }
}, false);

// Gestion de l'installation de l'application
self.addEventListener('appinstalled', (event) => {
  console.log('Application installée avec succès');
  
  // Envoyer un événement au client pour afficher un message de bienvenue
  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then((clientList) => {
        for (const client of clientList) {
          client.postMessage({ type: 'APP_INSTALLED' });
        }
      })
  );
});

// Gestion de la synchronisation en arrière-plan
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    console.log('Synchronisation des données en arrière-plan');
    // Implémenter la logique de synchronisation ici
  }
});

// Gestion des mises à jour en arrière-plan
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-content') {
    console.log('Mise à jour périodique du contenu');
    // Implémenter la logique de mise à jour ici
  }
});
