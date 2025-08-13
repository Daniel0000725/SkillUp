/**
 * Configuration audio pour Nexus AR Connect
 * Gère les effets sonores et la musique de fond
 */

export const AUDIO_CONFIG = {
  // Paramètres généraux
  masterVolume: 0.7,  // Volume principal (0.0 à 1.0)
  enabled: true,      // Active/désactive tout l'audio
  debugEnabled: false,       // Mode débogage (booléen)
  
  // Sons d'interface utilisateur
  ui: {
    click: {
      src: '/assets/audio/ui/click.mp3',
      volume: 0.5,
      rate: 1.0,
      loop: false
    },
    hover: {
      src: '/assets/audio/ui/hover.mp3',
      volume: 0.3,
      rate: 1.0,
      loop: false
    },
    notification: {
      src: '/assets/audio/ui/notification.mp3',
      volume: 0.6,
      rate: 1.0,
      loop: false
    },
    success: {
      src: '/assets/audio/ui/success.mp3',
      volume: 0.7,
      rate: 1.0,
      loop: false
    },
    error: {
      src: '/assets/audio/ui/error.mp3',
      volume: 0.7,
      rate: 1.0,
      loop: false
    }
  },
  
  // Sons des portails
  portal: {
    open: {
      src: '/assets/audio/portal/open.mp3',
      volume: 0.8,
      rate: 1.0,
      loop: false
    },
    close: {
      src: '/assets/audio/portal/close.mp3',
      volume: 0.8,
      rate: 1.0,
      loop: false
    },
    hover: {
      src: '/assets/audio/portal/hover.mp3',
      volume: 0.6,
      rate: 1.0,
      loop: false
    },
    click: {
      src: '/assets/audio/portal/click.mp3',
      volume: 0.7,
      rate: 1.0,
      loop: false
    },
    ambient: {
      src: '/assets/audio/portal/ambient.mp3',
      volume: 0.4,
      rate: 1.0,
      loop: true
    },
    transition: {
      src: '/assets/audio/portal/transition.mp3',
      volume: 0.9,
      rate: 1.0,
      loop: false
    }
  },
  
  // Musique d'ambiance
  music: {
    mainTheme: {
      src: '/assets/audio/music/main-theme.mp3',
      volume: 0.5,
      rate: 1.0,
      loop: true
    },
    ambient: {
      src: '/assets/audio/music/ambient.mp3',
      volume: 0.3,
      rate: 1.0,
      loop: true
    },
    action: {
      src: '/assets/audio/music/action.mp3',
      volume: 0.6,
      rate: 1.0,
      loop: true
    }
  },
  
  // Effets sonores environnementaux
  environment: {
    wind: {
      src: '/assets/audio/environment/wind.mp3',
      volume: 0.4,
      rate: 1.0,
      loop: true
    },
    birds: {
      src: '/assets/audio/environment/birds.mp3',
      volume: 0.3,
      rate: 1.0,
      loop: true
    },
    city: {
      src: '/assets/audio/environment/city.mp3',
      volume: 0.5,
      rate: 1.0,
      loop: true
    }
  },
  
  // Paramètres de performance
  performance: {
    maxConcurrentSounds: 16,  // Nombre maximum de sons simultanés
    preload: true,           // Précharger les sons au démarrage
    audioContext: {
      latencyHint: 'interactive',  // 'balanced' ou 'playback'
      sampleRate: 44100,          // Fréquence d'échantillonnage
      channelCount: 2             // Stéréo
    },
    spatialAudio: {
      enabled: true,              // Audio spatial activé
      distanceModel: 'inverse',   // Modèle de distance
      maxDistance: 10000,         // Distance maximale d'audition
      refDistance: 1,             // Distance de référence
      rolloffFactor: 1,           // Facteur d'atténuation
      coneInnerAngle: 360,        // Angle intérieur du cône
      coneOuterAngle: 0,          // Angle extérieur du cône
      coneOuterGain: 0            // Gain à l'extérieur du cône
    }
  },
  
  // Paramètres de débogage
  debug: {
    logEvents: false,     // Journaliser les événements audio
    showAnalyzers: false, // Afficher les analyseurs de fréquence
    testMode: false       // Mode test (joue tous les sons au démarrage)
  },
  
  // Gestion du cache
  cache: {
    enabled: true,        // Activer le cache audio
    strategy: 'lazy',     // 'eager' (tout charger) ou 'lazy' (charger à la demande)
    maxSize: 50,          // Taille maximale du cache en MB
    ttl: 3600             // Durée de vie du cache en secondes
  },
  
  // Compatibilité navigateur
  compatibility: {
    webAudio: true,       // Utiliser l'API Web Audio
    html5Audio: true,     // Utiliser l'audio HTML5 comme fallback
    forceMono: false,     // Forcer le mode mono pour la compatibilité
    enableWebAudio: true, // Activer l'API Web Audio
    enableAudioContext: true, // Activer l'AudioContext
    autoUnlock: true      // Déverrouiller automatiquement l'audio sur mobile
  }
};

// Liste de tous les fichiers audio pour le préchargement
export const AUDIO_FILES = [
  // Sons UI
  ...Object.values(AUDIO_CONFIG.ui).map(sound => sound.src),
  // Sons des portails
  ...Object.values(AUDIO_CONFIG.portal).map(sound => sound.src),
  // Musiques
  ...Object.values(AUDIO_CONFIG.music).map(sound => sound.src),
  // Sons environnementaux
  ...Object.values(AUDIO_CONFIG.environment).map(sound => sound.src)
].filter(Boolean);

export default AUDIO_CONFIG;
