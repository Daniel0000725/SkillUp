/**
 * Configuration de la gestion des erreurs et des logs
 */

export const ERRORS_CONFIG = {
  // Paramètres de base
  base: {
    // Activer le suivi des erreurs
    enabled: true,
    
    // Niveau de journalisation
    logLevel: 'warn', // 'error', 'warn', 'info', 'debug', 'trace'
    
    // Afficher les traces de pile
    showStackTraces: true,
    
    // Afficher les erreurs dans la console
    logToConsole: true,
    
    // Envoyer les erreurs au serveur
    reportToServer: true,
    
    // URL du serveur de rapport d'erreurs
    reportUrl: '/api/error-report',
    
    // Délai d'envoi des rapports groupés (ms)
    reportBatchDelay: 1000,
    
    // Taille maximale du lot de rapports
    maxBatchSize: 10,
    
    // Activer le suivi des performances
    performanceTracking: true,
    
    // Seuil de performance (ms)
    performanceThreshold: 100,
    
    // Activer le suivi des ressources
    resourceTracking: true,
    
    // Activer le suivi des événements
    eventTracking: true,
    
    // Activer le suivi des exceptions non gérées
    unhandledRejection: true,
    
    // Activer le suivi des erreurs de réseau
    networkErrorTracking: true,
    
    // Activer le suivi des erreurs de rendu
    renderErrorTracking: true,
    
    // Activer le suivi des erreurs de script
    scriptErrorTracking: true
  },
  
  // Paramètres des types d'erreurs
  errorTypes: {
    // Erreurs de validation
    validation: {
      enabled: true,
      logLevel: 'warn',
      reportToServer: true
    },
    
    // Erreurs réseau
    network: {
      enabled: true,
      logLevel: 'error',
      reportToServer: true,
      
      // Codes d'erreur à ignorer
      ignoreStatusCodes: [0, 401, 403, 404, 500]
    },
    
    // Erreurs d'authentification
    auth: {
      enabled: true,
      logLevel: 'warn',
      reportToServer: true
    },
    
    // Erreurs d'autorisation
    permission: {
      enabled: true,
      logLevel: 'warn',
      reportToServer: true
    },
    
    // Erreurs de logique métier
    business: {
      enabled: true,
      logLevel: 'error',
      reportToServer: true
    },
    
    // Erreurs système
    system: {
      enabled: true,
      logLevel: 'error',
      reportToServer: true
    },
    
    // Erreurs inattendues
    unexpected: {
      enabled: true,
      logLevel: 'error',
      reportToServer: true
    },
    
    // Avertissements
    warning: {
      enabled: true,
      logLevel: 'warn',
      reportToServer: false
    },
    
    // Informations
    info: {
      enabled: true,
      logLevel: 'info',
      reportToServer: false
    },
    
    // Débogage
    debug: {
      enabled: process.env.NODE_ENV === 'development',
      logLevel: 'debug',
      reportToServer: false
    }
  },
  
  // Paramètres des notifications
  notifications: {
    // Activer les notifications utilisateur
    enabled: true,
    
    // Afficher les notifications pour les erreurs critiques
    showCriticalErrors: true,
    
    // Afficher les notifications pour les erreurs non critiques
    showNonCriticalErrors: false,
    
    // Afficher les notifications pour les avertissements
    showWarnings: false,
    
    // Afficher les notifications pour les informations
    showInfo: false,
    
    // Durée d'affichage des notifications (ms)
    displayDuration: 5000,
    
    // Position des notifications
    position: 'top-right' // 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'
  },
  
  // Paramètres de débogage
  debug: {
    // Activer le mode débogage
    enabled: process.env.NODE_ENV === 'development',
    
    // Afficher les logs de débogage
    showDebugLogs: true,
    
    // Afficher les traces de pile détaillées
    detailedStackTraces: true,
    
    // Afficher les informations de débogage dans l'interface
    showInUI: true,
    
    // Activer le débogage à distance
    remoteDebugging: false,
    
    // URL du débogueur distant
    remoteDebuggerUrl: 'ws://localhost:8097',
    
    // Activer le débogage des performances
    performanceDebugging: true,
    
    // Activer le débogage du rendu
    renderDebugging: true,
    
    // Activer le débogage des événements
    eventDebugging: true,
    
    // Activer le débogage d'état
    stateDebugging: true
  },
  
  // Paramètres de journalisation
  logging: {
    // Activer la journalisation
    enabled: true,
    
    // Niveau de journalisation
    level: 'info', // 'error', 'warn', 'info', 'debug', 'trace'
    
    // Format des logs
    format: 'json', // 'json', 'text', 'csv'
    
    // Destination des logs
    destination: 'console', // 'console', 'file', 'server', 'all'
    
    // Paramètres des fichiers de log
    file: {
      // Activer la rotation des fichiers de log
      rotation: true,
      
      // Nombre maximum de fichiers de log
      maxFiles: 10,
      
      // Taille maximale d'un fichier de log (Mo)
      maxFileSize: 10,
      
      // Répertoire de stockage des fichiers de log
      directory: '/logs',
      
      // Format du nom de fichier
      filename: 'nexus-ar-connect-%DATE%.log',
      
      // Format de date pour la rotation
      datePattern: 'YYYY-MM-DD',
      
      // Conserver les fichiers de log compressés
      zippedArchive: true
    },
    
    // Paramètres du serveur de logs
    server: {
      // URL du serveur de logs
      url: '/api/logs',
      
      // Intervalle d'envoi des logs (ms)
      batchInterval: 5000,
      
      // Taille maximale du lot de logs
      batchSize: 50,
      
      // Niveau de compression
      compressionLevel: 6, // 0-9
      
      // Activer le chiffrement
      encryption: true,
      
      // Clé de chiffrement
      encryptionKey: ''
    },
    
    // Filtres de logs
    filters: {
      // Exclure les logs contenant ces mots-clés
      exclude: ['sensitive', 'password', 'token', 'api_key'],
      
      // Inclure uniquement les logs contenant ces mots-clés
      include: [],
      
      // Niveaux de log à inclure
      levels: ['error', 'warn', 'info']
    },
    
    // Métadonnées à inclure dans chaque log
    metadata: {
      // Inclure l'horodatage
      timestamp: true,
      
      // Inclure l'ID de session
      sessionId: true,
      
      // Inclure l'ID utilisateur
      userId: true,
      
      // Inclure l'URL de la page
      url: true,
      
      // Inclure l'agent utilisateur
      userAgent: true,
      
      // Inclure les informations sur l'appareil
      deviceInfo: true,
      
      // Inclure les informations sur le navigateur
      browserInfo: true,
      
      // Inclure les informations sur le système d'exploitation
      osInfo: true,
      
      // Inclure les informations sur le réseau
      networkInfo: true
    }
  }
};

export default ERRORS_CONFIG;
