// Importation des configurations
import SCENE_CONFIG from './scene';
import PORTAL_CONFIG from './portal';
import AUDIO_CONFIG, { AUDIO_FILES } from './audio';
import SEO_CONFIG from './seo';

// Configuration de l'application
export const APP_CONFIG = {
  // Informations sur l'application
  app: {
    name: 'Nexus AR Connect',
    version: '1.0.0',
    description: 'Une application de réalité augmentée qui transforme les QR codes en portails 3D interactifs',
    author: 'Votre Nom',
    repository: 'https://github.com/votre-utilisateur/nexus-ar-connect',
    license: 'MIT',
    
    // Paramètres de l'application
    settings: {
      debug: process.env.NODE_ENV !== 'production',
      production: process.env.NODE_ENV === 'production',
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
      isAndroid: /Android/i.test(navigator.userAgent),
      isStandalone: window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true,
      isOnline: navigator.onLine,
      isSecure: window.location.protocol === 'https:',
    },
    
    // Fonctions utiles
    utils: {
      // Vérifie si WebGL est supporté
      isWebGLAvailable: (() => {
        try {
          const canvas = document.createElement('canvas');
          return !!(window.WebGLRenderingContext && 
                   (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
          return false;
        }
      })(),
      
      // Vérifie si l'API de capteurs est disponible
      isSensorAvailable: 'DeviceOrientationEvent' in window && 
                        'AbsoluteOrientationSensor' in window &&
                        'LinearAccelerationSensor' in window,
      
      // Vérifie si l'API de vibration est disponible
      isVibrationAvailable: 'vibrate' in navigator,
      
      // Vérifie si l'API de batterie est disponible
      isBatteryAPIavailable: 'getBattery' in navigator || 'battery' in navigator,
      
      // Vérifie si l'API de géolocalisation est disponible
      isGeolocationAvailable: 'geolocation' in navigator,
      
      // Vérifie si l'API de stockage est disponible
      isStorageAvailable: {
        localStorage: (() => {
          try {
            const test = '__test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
          } catch (e) {
            return false;
          }
        })(),
        sessionStorage: (() => {
          try {
            const test = '__test__';
            sessionStorage.setItem(test, test);
            sessionStorage.removeItem(test);
            return true;
          } catch (e) {
            return false;
          }
        })(),
        indexedDB: 'indexedDB' in window,
      },
      
      // Vérifie si l'API de partage est disponible
      isWebShareAPIAvailable: 'share' in navigator,
      
      // Vérifie si l'API de gestion des fichiers est disponible
      isFileSystemAccessAPIAvailable: 'showOpenFilePicker' in window,
      
      // Vérifie si l'API de périphériques est disponible
      isDeviceAPIAvailable: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
      
      // Vérifie si l'API de détection de mouvement est disponible
      isDeviceMotionAvailable: 'DeviceMotionEvent' in window,
      
      // Vérifie si l'API de détection d'orientation est disponible
      isDeviceOrientationAvailable: 'DeviceOrientationEvent' in window,
      
      // Vérifie si l'API de détection de lumière ambiante est disponible
      isAmbientLightSensorAvailable: 'AmbientLightSensor' in window,
      
      // Vérifie si l'API de détection de proximité est disponible
      isProximitySensorAvailable: 'ProximitySensor' in window,
    },
    
    // Fonction pour détecter les fonctionnalités manquantes
    getMissingFeatures: () => {
      const missing = [];
      const { utils } = APP_CONFIG.app;
      
      if (!utils.isWebGLAvailable) missing.push('WebGL');
      if (!utils.isSensorAvailable) missing.push('Capteurs de mouvement');
      if (!utils.isVibrationAvailable) missing.push('Vibration');
      if (!utils.isGeolocationAvailable) missing.push('Géolocalisation');
      if (!utils.isWebShareAPIAvailable) missing.push('Partage natif');
      if (!('serviceWorker' in navigator)) missing.push('Service Worker');
      if (!('Notification' in window)) missing.push('Notifications');
      
      return missing;
    },
  },
  
  // Configuration des services externes
  services: {
    analytics: {
      enabled: true,
      trackingId: process.env.GA_TRACKING_ID || 'UA-XXXXX-Y',
      anonymizeIp: true,
      trackPageViews: true,
      trackEvents: true,
      debug: process.env.NODE_ENV !== 'production',
    },
    
    sentry: {
      enabled: process.env.NODE_ENV === 'production',
      dsn: process.env.SENTRY_DSN || '',
      environment: process.env.NODE_ENV || 'development',
      tracesSampleRate: 1.0,
      release: `nexus-ar-connect@${process.env.npm_package_version || '1.0.0'}`,
    },
    
    firebase: {
      apiKey: process.env.FIREBASE_API_KEY || '',
      authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
      projectId: process.env.FIREBASE_PROJECT_ID || '',
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
      appId: process.env.FIREBASE_APP_ID || '',
      measurementId: process.env.FIREBASE_MEASUREMENT_ID || '',
    },
  },
  
  // Configuration du stockage
  storage: {
    prefix: 'nexus_ar_',
    version: '1.0',
    ttl: 30 * 24 * 60 * 60 * 1000, // 30 jours en millisecondes
    
    // Clés de stockage
    keys: {
      settings: 'settings',
      markers: 'markers',
      history: 'history',
      favorites: 'favorites',
      cache: 'app_cache',
      session: 'session',
    },
    
    // Configuration d'IndexedDB
    indexedDB: {
      name: 'NexusARConnectDB',
      version: 1,
      stores: [
        {
          name: 'markers',
          keyPath: 'id',
          indexes: [
            { name: 'createdAt', keyPath: 'createdAt', unique: false },
            { name: 'type', keyPath: 'type', unique: false },
          ],
        },
        {
          name: 'history',
          keyPath: 'id',
          indexes: [
            { name: 'timestamp', keyPath: 'timestamp', unique: false },
          ],
        },
        {
          name: 'cache',
          keyPath: 'url',
          indexes: [
            { name: 'expires', keyPath: 'expires', unique: false },
          ],
        },
      ],
    },
  },
  
  // Configuration du cache
  cache: {
    // Configuration du cache des ressources statiques
    static: {
      name: 'static-cache-v1',
      urls: [
        '/',
        '/index.html',
        '/css/style.css',
        '/js/app.js',
        '/js/sw-register.js',
        '/manifest.json',
        '/favicon.ico',
        // Ajoutez ici d'autres ressources statiques
      ],
    },
    
    // Configuration du cache des données
    data: {
      name: 'data-cache-v1',
      patterns: [
        /^https?:\/\/api\.example\.com\/.*/,
        /^https?:\/\/fonts\.googleapis\.com\/.*/,
        /^https?:\/\/fonts\.gstatic\.com\/.*/,
      ],
    },
    
    // Configuration du cache des images
    images: {
      name: 'images-cache-v1',
      maxEntries: 100,
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 jours
    },
  },
  
  // Configuration des notifications
  notifications: {
    enabled: 'Notification' in window,
    permission: Notification.permission || 'default',
    defaultIcon: '/icons/icon-192x192.png',
    defaultBadge: '/icons/badge.png',
    defaultTimeout: 5000,
    
    // Types de notifications
    types: {
      newMarker: {
        title: 'Nouveau marqueur détecté',
        body: 'Un nouveau portail a été découvert!',
        icon: '/icons/marker.png',
        vibrate: [200, 100, 200],
      },
      updateAvailable: {
        title: 'Mise à jour disponible',
        body: 'Une nouvelle version de l\'application est disponible.',
        icon: '/icons/update.png',
        requireInteraction: true,
      },
      offlineReady: {
        title: 'Prêt pour le mode hors ligne',
        body: 'L\'application peut maintenant fonctionner hors ligne.',
        icon: '/icons/offline.png',
      },
    },
  },
  
  // Configuration des performances
  performance: {
    // Configuration du rafraîchissement
    updateInterval: 1000 / 60, // 60 FPS
    
    // Configuration du mode économie d'énergie
    powerSave: {
      enabled: true,
      targetFPS: 30, // Réduire à 30 FPS en mode économie d'énergie
      disableEffects: true, // Désactiver les effets visuels
      reduceQuality: true, // Réduire la qualité des graphismes
    },
    
    // Configuration du mode haute performance
    highPerformance: {
      enabled: false,
      targetFPS: 120, // Augmenter à 120 FPS
      enableEffects: true, // Activer les effets visuels
      increaseQuality: true, // Augmenter la qualité des graphismes
    },
    
    // Configuration du mode débogage
    debug: {
      showStats: false, // Afficher les statistiques de performance
      logFPS: false, // Enregistrer le FPS dans la console
      logMemory: false, // Enregistrer l'utilisation de la mémoire
      logRender: false, // Enregistrer les informations de rendu
    },
  },
  
  // Configuration des fonctionnalités expérimentales
  experimental: {
    webXR: true, // Activer le support WebXR
    webGPU: false, // Activer le support WebGPU (expérimental)
    webNN: false, // Activer le support Web Neural Network API (expérimental)
    webHID: false, // Activer le support WebHID (Human Interface Device)
    webUSB: false, // Activer le support WebUSB
    webNFC: false, // Activer le support WebNFC
    webBluetooth: false, // Activer le support Web Bluetooth
    webSerial: false, // Activer le support Web Serial API
  },
  
  // Configuration des tests
  testing: {
    enabled: process.env.NODE_ENV === 'test',
    mock: {
      camera: true,
      geolocation: true,
      sensors: true,
      network: true,
    },
  },
};

// Exporter toutes les configurations
export {
  SCENE_CONFIG,
  PORTAL_CONFIG,
  AUDIO_CONFIG,
  AUDIO_FILES,
  SEO_CONFIG,
};

export default APP_CONFIG;
