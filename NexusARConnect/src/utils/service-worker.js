/**
 * Configuration et enregistrement du Service Worker
 */

// Nom du cache
const CACHE_NAME = 'nexus-ar-cache-v1';

// Fichiers à mettre en cache
const CACHE_FILES = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/js/sw-register.js',
  '/manifest.json',
  '/favicon.ico',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/sounds/click.mp3',
  '/sounds/error.mp3',
  '/sounds/success.mp3',
  '/models/marker.patt',
  '/models/hiro.patt',
  '/models/kanji.patt',
];

// Extensions de fichiers à mettre en cache
const CACHE_FILE_TYPES = [
  'html', 'css', 'js', 'json', 'png', 'jpg', 'jpeg', 'gif', 'svg',
  'woff', 'woff2', 'ttf', 'eot', 'mp3', 'wav', 'ogg', 'mp4', 'webm'
];

/**
 * Installation du Service Worker
 */
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installation en cours...');
  
  // Mettre en cache les fichiers essentiels
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Mise en cache des fichiers statiques');
        return cache.addAll(CACHE_FILES);
      })
      .then(() => {
        console.log('[Service Worker] Installation terminée');
        return self.skipWaiting();
      })
  );
});

/**
 * Activation du Service Worker
 */
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activation en cours...');
  
  // Supprimer les anciens caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
    .then(() => {
      console.log('[Service Worker] Activation terminée');
      return self.clients.claim();
    })
  );
});

/**
 * Interception des requêtes réseau
 */
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Ignorer les requêtes non-GET et les requêtes vers des domaines externes
  if (request.method !== 'GET' || !url.origin.startsWith(self.location.origin)) {
    return;
  }
  
  // Stratégie de mise en cache : Cache First, puis réseau
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Si la ressource est en cache, la retourner
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Sinon, la récupérer depuis le réseau
        return fetch(request)
          .then((response) => {
            // Vérifier que la réponse est valide
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Mettre en cache la réponse pour une utilisation ultérieure
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // En cas d'échec, retourner une page d'erreur personnalisée
            if (shouldCache(request)) {
              return caches.match('/offline.html');
            }
            return new Response('Hors ligne', { status: 503, statusText: 'Service Unavailable' });
          });
      })
  );
});

/**
 * Vérifie si une requête doit être mise en cache
 */
function shouldCache(request) {
  const url = new URL(request.url);
  const extension = url.pathname.split('.').pop().toLowerCase();
  
  return CACHE_FILE_TYPES.includes(extension) || 
         CACHE_FILES.includes(url.pathname) ||
         CACHE_FILES.some(file => url.pathname.endsWith(file));
}

/**
 * Gère les messages du client
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * Gère les notifications push
 */
self.addEventListener('push', (event) => {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return;
  }
  
  let notificationData = {};
  
  try {
    notificationData = event.data ? event.data.json() : {};
  } catch (e) {
    console.error('Erreur lors de l\'analyse des données de notification:', e);
    notificationData = { title: 'Nouvelle notification', body: 'Cliquez pour voir' };
  }
  
  const { title = 'Nexus AR Connect', body, icon = '/icons/icon-192x192.png', ...options } = notificationData;
  
  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon,
      badge: '/icons/badge.png',
      vibrate: [100, 50, 100],
      ...options
    })
  );
});

/**
 * Gère les clics sur les notifications
 */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then((clientList) => {
        const client = clientList.find(c => c.url === urlToOpen && 'focus' in c);
        
        if (client) {
          return client.focus();
        }
        
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
        
        return null;
      })
  );
});

/**
 * Enregistre le Service Worker
 */
export async function setupServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.warn('Les Service Workers ne sont pas supportés par ce navigateur');
    return false;
  }
  
  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    });
    
    console.log('[Service Worker] Enregistré avec succès:', registration);
    
    // Vérifier les mises à jour
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          console.log('[Service Worker] Nouvelle version disponible');
          
          // Afficher une notification à l'utilisateur
          self.registration.showNotification('Mise à jour disponible', {
            body: 'Une nouvelle version est disponible. Rechargez pour mettre à jour.',
            icon: '/icons/icon-192x192.png',
            tag: 'update-available',
            requireInteraction: true,
            actions: [
              { action: 'reload', title: 'Recharger' },
              { action: 'dismiss', title: 'Plus tard' },
            ],
          });
        }
      });
    });
    
    // Vérifier les mises à jour toutes les heures
    setInterval(() => {
      registration.update().catch(console.error);
    }, 60 * 60 * 1000);
    
    return true;
  } catch (error) {
    console.error('Échec de l\'enregistrement du Service Worker:', error);
    return false;
  }
}

/**
 * Vérifie si le service worker est enregistré et actif
 */
export async function checkServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return { supported: false };
  }
  
  try {
    const registration = await navigator.serviceWorker.ready;
    return {
      supported: true,
      registered: true,
      active: registration.active !== null,
      scope: registration.scope,
    };
  } catch (error) {
    return {
      supported: true,
      registered: false,
      error: error.message,
    };
  }
}

/**
 * Demande la permission pour les notifications
 */
export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    return { granted: false, error: 'Notifications non supportées' };
  }
  
  if (Notification.permission === 'granted') {
    return { granted: true };
  }
  
  if (Notification.permission === 'denied') {
    return { granted: false, error: 'Permission refusée' };
  }
  
  try {
    const permission = await Notification.requestPermission();
    return { granted: permission === 'granted' };
  } catch (error) {
    return { granted: false, error: error.message };
  }
}

// Gestion de l'installation sur l'écran d'accueil
self.addEventListener('beforeinstallprompt', (event) => {
  console.log('beforeinstallprompt event:', event);
  
  // Empêcher le navigateur d'afficher automatiquement l'invite d'installation
  event.preventDefault();
  
  // Stocker l'événement pour une utilisation ultérieure
  let deferredPrompt = event;
  
  // Émettre un événement personnalisé pour informer l'application
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'CAN_INSTALL',
        deferredPrompt: true
      });
    });
  });
  
  // Gérer l'installation ultérieure
  self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'INSTALL_APP' && deferredPrompt) {
      // Afficher l'invite d'installation
      deferredPrompt.prompt();
      
      // Attendre que l'utilisateur réponde à l'invite
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('L\'utilisateur a accepté l\'installation');
        } else {
          console.log('L\'utilisateur a refusé l\'installation');
        }
        
        // Réinitialiser la variable
        deferredPrompt = null;
      });
    }
  });
});

// Gestion de l'installation réussie
self.addEventListener('appinstalled', (event) => {
  console.log('Application installée avec succès', event);
  
  // Envoyer un événement à l'application
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'APP_INSTALLED',
        timestamp: new Date().toISOString()
      });
    });
  });
});
