/**
 * Configuration du Service Worker pour Nexus AR Connect
 * Gère la mise en cache, le mode hors ligne et les stratégies de mise à jour
 */

// Version du cache - incrémenter pour forcer une mise à jour
const CACHE_VERSION = 'v1.0.0';

// Nom du cache avec version
const CACHE_NAME = `nexus-ar-cache-${CACHE_VERSION}`;

// Fichiers à mettre en cache immédiatement lors de l'installation
const PRECACHE_ASSETS = [
  // Pages
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/favicon.ico',
  
  // CSS
  '/css/style.css',
  
  // JavaScript
  '/js/app.js',
  '/js/sw-register.js',
  
  // Polices
  '/fonts/nexus-sans.woff2',
  
  // Images
  '/images/logo-192x192.png',
  '/images/logo-512x512.png',
  
  // Bibliothèques tierces
  'https://aframe.io/releases/1.2.0/aframe.min.js',
  'https://cdn.jsdelivr.net/npm/aframe-extras@6.1.1/dist/aframe-extras.loaders.min.js',
  'https://unpkg.com/aframe-environment-component@1.3.2/dist/aframe-environment-component.min.js',
  'https://unpkg.com/aframe-particle-system-component@1.1.3/dist/aframe-particle-system-component.min.js'
];

// Stratégie de cache (cache-first, network-first, etc.)
const CACHE_STRATEGY = {
  ASSETS: 'cache-first',
  API: 'network-first',
  IMAGES: 'cache-first',
  FONTS: 'cache-first',
  EXTERNAL: 'stale-while-revalidate'
};

// Durées de cache (en secondes)
const CACHE_TTL = {
  ASSETS: 60 * 60 * 24 * 7, // 1 semaine
  IMAGES: 60 * 60 * 24 * 30, // 1 mois
  API: 60 * 5, // 5 minutes
  FONTS: 60 * 60 * 24 * 30, // 1 mois
  EXTERNAL: 60 * 60 * 24 // 1 jour
};

// Chemins à ignorer pour le cache
const IGNORE_CACHE = [
  '/service-worker.js',
  '/sw-config.js',
  '/.env',
  '/.git',
  '/node_modules'
];

// Configuration des notifications push
const PUSH_CONFIG = {
  TITLE: 'Nexus AR Connect',
  ICON: '/images/logo-192x192.png',
  BADGE: '/images/badge-72x72.png',
  VIBRATE: [200, 100, 200],
  ACTIONS: [
    { action: 'explore', title: 'Explorer' },
    { action: 'close', title: 'Fermer' }
  ]
};

// Configuration du mode hors ligne
const OFFLINE_CONFIG = {
  ENABLED: true,
  PAGE: '/offline.html',
  MESSAGE: 'Vous êtes actuellement hors ligne. Certaines fonctionnalités peuvent être limitées.'
};

// Configuration du rafraîchissement en arrière-plan
const BACKGROUND_SYNC = {
  ENABLED: true,
  NAME: 'nexus-ar-sync',
  MAX_RETENTION_TIME: 60 * 24 // 24 heures en minutes
};

// Configuration du préchargement
const PREFETCH_CONFIG = {
  ENABLED: true,
  STRATEGY: 'visible', // 'visible', 'hover', 'viewport', 'all'
  MAX_CONCURRENT: 3,
  TIMEOUT: 5000 // 5 secondes
};

// Configuration des mises à jour
const UPDATE_STRATEGY = {
  CHECK_INTERVAL: 60 * 60 * 1000, // 1 heure
  PROMPT_USER: true,
  RELOAD_ON_UPDATE: true
};

// Configuration des performances
const PERFORMANCE_CONFIG = {
  ENABLE_NAVIGATION_PRELOAD: true,
  ENABLE_QUOTA_MANAGEMENT: true,
  MAX_ENTRIES: 100,
  MAX_AGE_SECONDS: 60 * 60 * 24 * 30 // 30 jours
};

// Configuration du débogage
const DEBUG = {
  ENABLED: process.env.NODE_ENV === 'development',
  LOG_CACHE: true,
  LOG_FETCH: true,
  LOG_SYNC: true
};

// Configuration des événements personnalisés
const EVENTS = {
  UPDATE_AVAILABLE: 'sw-update-available',
  CONTROLLER_CHANGE: 'controllerchange',
  MESSAGE: 'message',
  INSTALL: 'install',
  ACTIVATE: 'activate',
  FETCH: 'fetch',
  SYNC: 'sync',
  PUSH: 'push',
  NOTIFICATION_CLICK: 'notificationclick',
  NOTIFICATION_CLOSE: 'notificationclose'
};

// Export de la configuration
module.exports = {
  CACHE_NAME,
  CACHE_VERSION,
  PRECACHE_ASSETS,
  CACHE_STRATEGY,
  CACHE_TTL,
  IGNORE_CACHE,
  PUSH_CONFIG,
  OFFLINE_CONFIG,
  BACKGROUND_SYNC,
  PREFETCH_CONFIG,
  UPDATE_STRATEGY,
  PERFORMANCE_CONFIG,
  DEBUG,
  EVENTS
};
