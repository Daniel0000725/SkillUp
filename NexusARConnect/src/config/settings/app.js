/**
 * Configuration des paramètres de base de l'application
 */

// Mode de l'application
export const APP_MODE = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
};

// Environnement actuel (à remplacer par process.env.NODE_ENV en production)
const ENV = process.env.NODE_ENV || APP_MODE.DEVELOPMENT;

// Configuration de base de l'application
export const APP_CONFIG = {
  // Informations sur l'application
  appInfo: {
    name: 'Nexus AR Connect',
    version: '1.0.0',
    description: 'Expérience de réalité augmentée interactive',
    author: 'Votre Nom',
    repository: 'https://github.com/votre-utilisateur/nexus-ar-connect',
    license: 'MIT',
  },
  
  // Paramètres de l'application
  settings: {
    // Mode de débogage
    debug: ENV === APP_MODE.DEVELOPMENT,
    
    // Afficher les FPS
    showFPS: ENV === APP_MODE.DEVELOPMENT,
    
    // Afficher les statistiques de rendu
    showStats: ENV === APP_MODE.DEVELOPMENT,
    
    // Langue par défaut
    language: 'fr', // fr, en, es, de, it, etc.
    
    // Unité de mesure
    unitSystem: 'metric', // metric, imperial
    
    // Format de date
    dateFormat: 'DD/MM/YYYY', // DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD
    
    // Format d'heure
    timeFormat: '24', // 12, 24
    
    // Thème
    theme: 'dark', // light, dark, system
    
    // Réduire les animations
    reduceMotion: false,
    
    // Mode contraste élevé
    highContrast: false,
    
    // Taille de la police
    fontSize: 'medium', // small, medium, large, xlarge
    
    // Espacement des éléments d'interface
    uiScale: 1.0, // 0.75, 1.0, 1.25, 1.5, 2.0
    
    // Activer/désactiver les notifications
    notifications: true,
    
    // Activer/désactiver les vibrations
    hapticFeedback: true,
    
    // Activer/désactiver la géolocalisation
    geolocation: true,
    
    // Activer/désactiver l'accès à la caméra
    cameraAccess: true,
    
    // Activer/désactiver l'accès au microphone
    microphoneAccess: false,
    
    // Activer/désactiver le stockage local
    localStorage: true,
    
    // Activer/désactiver les cookies
    cookies: true,
    
    // Activer/désactiver le suivi analytique
    analytics: true,
    
    // Activer/désactiver les rapports d'erreurs
    errorReporting: true,
    
    // Activer/désactiver le mode hors ligne
    offlineMode: true,
    
    // Activer/désactiver le mode économiseur de batterie
    batterySaver: false,
    
    // Activer/désactiver le mode données mobiles
    dataSaver: false,
    
    // Qualité des textures
    textureQuality: 'high', // low, medium, high, ultra
    
    // Qualité des modèles 3D
    modelQuality: 'high', // low, medium, high, ultra
    
    // Qualité des effets visuels
    effectsQuality: 'high', // low, medium, high, ultra
    
    // Qualité des particules
    particlesQuality: 'high', // low, medium, high, ultra
    
    // Qualité des animations
    animationQuality: 'high', // low, medium, high, ultra
    
    // Qualité du son
    audioQuality: 'high', // low, medium, high, ultra
  },
  
  // Paramètres de débogage
  debug: {
    // Afficher les boîtes englobantes
    showBoundingBoxes: ENV === APP_MODE.DEVELOPMENT,
    
    // Afficher les points de collision
    showCollisionPoints: ENV === APP_MODE.DEVELOPMENT,
    
    // Afficher les normales
    showNormals: false,
    
    // Afficher les axes
    showAxes: ENV === APP_MODE.DEVELOPMENT,
    
    // Afficher la grille
    showGrid: ENV === APP_MODE.DEVELOPMENT,
    
    // Afficher les informations de performance
    showPerformance: ENV === APP_MODE.DEVELOPMENT,
    
    // Afficher les informations de débogage
    showDebugInfo: ENV === APP_MODE.DEVELOPMENT,
    
    // Activer le mode wireframe
    wireframe: false,
    
    // Désactiver les textures
    disableTextures: false,
    
    // Désactiver les lumières
    disableLights: false,
    
    // Désactiver les ombres
    disableShadows: false,
    
    // Désactiver les effets post-traitement
    disablePostProcessing: false,
    
    // Désactiver les particules
    disableParticles: false,
    
    // Désactiver les animations
    disableAnimations: false,
    
    // Désactiver la physique
    disablePhysics: false,
    
    // Désactiver les sons
    disableSounds: false,
    
    // Désactiver la musique
    disableMusic: false,
    
    // Désactiver les voix
    disableVoices: false,
    
    // Activer le mode test
    testMode: false,
    
    // Activer le mode développement
    devMode: ENV === APP_MODE.DEVELOPMENT,
  },
  
  // Paramètres de performance
  performance: {
    // Limiter le taux de rafraîchissement
    limitFPS: true,
    
    // Nombre maximum d'images par seconde
    maxFPS: 60,
    
    // Délai minimum entre les images (en ms)
    minFrameTime: 16, // ~60 FPS
    
    // Utiliser requestAnimationFrame
    useRequestAnimationFrame: true,
    
    // Utiliser setInterval pour le rendu
    useSetInterval: false,
    
    // Délai pour setInterval (en ms)
    renderInterval: 16, // ~60 FPS
    
    // Utiliser Web Workers pour le traitement
    useWorkers: true,
    
    // Nombre de Web Workers à utiliser
    workerCount: navigator.hardwareConcurrency || 4,
    
    // Activer le chargement paresseux
    lazyLoad: true,
    
    // Seuil de chargement paresseux (en pixels)
    lazyLoadThreshold: 100,
    
    // Activer le déchargement des ressources inutilisées
    unloadUnused: true,
    
    // Délai avant déchargement (en secondes)
    unloadDelay: 60,
    
    // Activer la compression des textures
    compressTextures: true,
    
    // Qualité de compression des textures (0-1)
    textureCompressionQuality: 0.8,
    
    // Utiliser des textures de résolution réduite
    useLowResTextures: false,
    
    // Facteur d'échelle des textures
    textureScale: 1.0,
    
    // Activer le mipmapping
    mipmapping: true,
    
    // Activer l'anisotropie
    anisotropy: true,
    
    // Niveau d'anisotropie
    anisotropyLevel: 8,
    
    // Activer la compression des géométries
    compressGeometry: true,
    
    // Niveau de compression des géométries (0-1)
    geometryCompressionLevel: 0.8,
    
    // Simplifier les géométries
    simplifyGeometry: true,
    
    // Niveau de simplification (0-1)
    simplificationRatio: 0.5,
    
    // Activer l'instanciation
    useInstancing: true,
    
    // Activer le frustum culling
    useFrustumCulling: true,
    
    // Activer l'occlusion culling
    useOcclusionCulling: true,
    
    // Activer le niveau de détail (LOD)
    useLOD: true,
    
    // Niveaux de détail
    lodLevels: [
      { distance: 0, quality: 'ultra' },
      { distance: 10, quality: 'high' },
      { distance: 25, quality: 'medium' },
      { distance: 50, quality: 'low' },
    ],
    
    // Activer la mise en cache
    useCache: true,
    
    // Taille maximale du cache (en Mo)
    maxCacheSize: 100,
    
    // Durée de vie du cache (en secondes)
    cacheLifetime: 3600,
    
    // Activer la mise en cache des ressources
    cacheAssets: true,
    
    // Activer la mise en cache des modèles 3D
    cacheModels: true,
    
    // Activer la mise en cache des textures
    cacheTextures: true,
    
    // Activer la mise en cache des sons
    cacheSounds: true,
    
    // Activer la mise en cache des shaders
    cacheShaders: true,
    
    // Activer la mise en cache des données
    cacheData: true,
  },
  
  // Paramètres de l'interface utilisateur
  ui: {
    // Thème par défaut
    theme: {
      primaryColor: '#6e44ff',
      secondaryColor: '#a78bfa',
      backgroundColor: '#1a1a2e',
      surfaceColor: '#16213e',
      errorColor: '#ff6b6b',
      warningColor: '#ffd166',
      successColor: '#06d6a0',
      infoColor: '#4cc9f0',
      textPrimary: '#ffffff',
      textSecondary: '#b3b3b3',
      textDisabled: '#666666',
      textHint: '#999999',
      divider: 'rgba(255, 255, 255, 0.12)',
      background: '#121212',
      surface: '#1e1e1e',
      error: '#cf6679',
      onPrimary: '#000000',
      onSecondary: '#000000',
      onBackground: '#ffffff',
      onSurface: '#ffffff',
      onError: '#000000',
    },
    
    // Taille de la police de base (en px)
    baseFontSize: 16,
    
    // Famille de polices
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    
    // Facteur de mise à l'échelle de l'interface
    scaleFactor: 1.0,
    
    // Espacement de base (en rem)
    baseSpacing: 1,
    
    // Rayon des coins (en rem)
    borderRadius: 0.5,
    
    // Durée des transitions (en ms)
    transitionDuration: 300,
    
    // Fonction de transition
    transitionTiming: 'cubic-bezier(0.4, 0, 0.2, 1)',
    
    // Ombre des éléments d'interface
    shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    
    // Ombre au survol
    hoverShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    
    // Ombre active
    activeShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
    
    // Z-index des éléments d'interface
    zIndex: {
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500,
    },
    
    // Points de rupture pour le responsive design
    breakpoints: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
    
    // Espacement personnalisé
    spacing: (factor) => `${0.25 * factor}rem`,
  },
  
  // Paramètres de l'application
  app: {
    // Mode de l'application
    mode: ENV,
    
    // Version de l'application
    version: '1.0.0',
    
    // Nom de l'application
    name: 'Nexus AR Connect',
    
    // Description de l'application
    description: 'Expérience de réalité augmentée interactive',
    
    // Auteur de l'application
    author: 'Votre Nom',
    
    // URL du dépôt
    repository: 'https://github.com/votre-utilisateur/nexus-ar-connect',
    
    // Licence
    license: 'MIT',
    
    // Année de création
    year: new Date().getFullYear(),
    
    // URL de l'API
    apiUrl: ENV === APP_MODE.PRODUCTION
      ? 'https://api.nexus-ar-connect.com'
      : ENV === APP_MODE.STAGING
        ? 'https://staging.api.nexus-ar-connect.com'
        : 'http://localhost:3000',
    
    // URL du site web
    websiteUrl: ENV === APP_MODE.PRODUCTION
      ? 'https://nexus-ar-connect.com'
      : ENV === APP_MODE.STAGING
        ? 'https://staging.nexus-ar-connect.com'
        : 'http://localhost:3001',
    
    // URL des médias
    mediaUrl: ENV === APP_MODE.PRODUCTION
      ? 'https://media.nexus-ar-connect.com'
      : ENV === APP_MODE.STAGING
        ? 'https://staging.media.nexus-ar-connect.com'
        : 'http://localhost:3002',
    
    // URL des CDN
    cdnUrl: 'https://cdn.nexus-ar-connect.com',
    
    // Clé API Google Maps
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
    
    // Clé API Mapbox
    mapboxApiKey: 'YOUR_MAPBOX_API_KEY',
    
    // Clé API Firebase
    firebase: {
      apiKey: 'YOUR_FIREBASE_API_KEY',
      authDomain: 'nexus-ar-connect.firebaseapp.com',
      projectId: 'nexus-ar-connect',
      storageBucket: 'nexus-ar-connect.appspot.com',
      messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
      appId: 'YOUR_APP_ID',
      measurementId: 'YOUR_MEASUREMENT_ID',
    },
    
    // Configuration Sentry pour le suivi des erreurs
    sentry: {
      dsn: 'YOUR_SENTRY_DSN',
      environment: ENV,
      release: `nexus-ar-connect@${process.env.npm_package_version || '1.0.0'}`,
      tracesSampleRate: 1.0,
    },
    
    // Configuration Google Analytics
    googleAnalytics: {
      trackingId: 'YOUR_GA_TRACKING_ID',
    },
    
    // Configuration des fonctionnalités
    features: {
      // Activer/désactiver l'authentification
      auth: true,
      
      // Activer/désactiver les notifications push
      pushNotifications: true,
      
      // Activer/désactiver les notifications dans l'application
      inAppNotifications: true,
      
      // Activer/désactiver le mode hors ligne
      offlineMode: true,
      
      // Activer/désactiver la synchronisation en arrière-plan
      backgroundSync: true,
      
      // Activer/désactiver l'installation progressive
      pwaInstall: true,
      
      // Activer/désactiver le partage
      sharing: true,
      
      // Activer/désactiver les achats intégrés
      inAppPurchases: false,
      
      // Activer/désactiver les publicités
      ads: false,
      
      // Activer/désactiver les analyses d'utilisation
      analytics: true,
      
      // Activer/désactiver le suivi des performances
      performanceTracking: true,
      
      // Activer/désactiver le suivi des erreurs
      errorTracking: true,
      
      // Activer/désactiver le suivi des événements
      eventTracking: true,
      
      // Activer/désactiver le suivi des vues de page
      pageViewTracking: true,
      
      // Activer/désactiver le suivi des sessions
      sessionTracking: true,
      
      // Activer/désactiver le suivi des utilisateurs
      userTracking: true,
      
      // Activer/désactiver le suivi des clics
      clickTracking: true,
      
      // Activer/désactiver le suivi des défilements
      scrollTracking: true,
      
      // Activer/désactiver le suivi des formulaires
      formTracking: true,
      
      // Activer/désactiver le suivi des liens sortants
      outboundLinkTracking: true,
      
      // Activer/désactiver le suivi des téléchargements
      downloadTracking: true,
      
      // Activer/désactiver le suivi des impressions
      impressionTracking: true,
      
      // Activer/désactiver le suivi des temps de chargement
      timingTracking: true,
      
      // Activer/désactiver le suivi des exceptions
      exceptionTracking: true,
    },
  },
};

export default APP_CONFIG;
