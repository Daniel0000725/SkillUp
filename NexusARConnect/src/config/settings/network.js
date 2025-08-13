/**
 * Configuration des paramètres réseau
 */

export const NETWORK_CONFIG = {
  // Paramètres de base
  base: {
    // Mode hors ligne
    offlineMode: false,
    
    // Simulation de latence (ms)
    simulatedLatency: 0,
    
    // Taux de perte de paquets simulé (0-1)
    simulatedPacketLoss: 0,
    
    // Activer la compression
    compression: true,
    
    // Activer le chiffrement
    encryption: true,
    
    // Activer la mise en cache
    caching: true,
    
    // Taille maximale du cache (Mo)
    maxCacheSize: 100,
    
    // Durée de vie du cache (secondes)
    cacheLifetime: 3600
  },
  
  // Paramètres du serveur
  server: {
    // URL du serveur
    url: 'https://api.nexus-ar-connect.com',
    
    // Port du serveur
    port: 443,
    
    // Protocole
    protocol: 'wss', // 'ws', 'wss', 'http', 'https'
    
    // Version de l'API
    apiVersion: 'v1',
    
    // Clé API
    apiKey: '',
    
    // Timeout des requêtes (ms)
    timeout: 10000,
    
    // Nombre maximum de tentatives
    maxRetries: 3,
    
    // Délai entre les tentatives (ms)
    retryDelay: 1000
  },
  
  // Paramètres WebSocket
  websocket: {
    // Activer la reconnexion automatique
    autoReconnect: true,
    
    // Délai de reconnexion (ms)
    reconnectInterval: 5000,
    
    // Nombre maximum de tentatives de reconnexion
    maxReconnectAttempts: 10,
    
    // Taux d'envoi des mises à jour (ms)
    updateRate: 50,
    
    // Taille maximale des messages (octets)
    maxMessageSize: 65536,
    
    // Activer la compression des messages
    compress: true,
    
    // Activer la vérification de l'intégrité
    verifyIntegrity: true
  },
  
  // Paramètres des requêtes HTTP
  http: {
    // En-têtes par défaut
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    
    // Timeout des requêtes (ms)
    timeout: 10000,
    
    // Activer les cookies
    withCredentials: true,
    
    // Activer la mise en cache
    cache: true,
    
    // Durée de vie du cache (secondes)
    cacheLifetime: 300
  },
  
  // Paramètres du cache
  cache: {
    // Activer le cache
    enabled: true,
    
    // Stratégie de cache
    strategy: 'network-first', // 'cache-first', 'network-first', 'cache-only', 'network-only'
    
    // Durée de vie par défaut (secondes)
    defaultLifetime: 3600,
    
    // Taille maximale (Mo)
    maxSize: 100,
    
    // Activer la persistance
    persistent: true
  },
  
  // Paramètres de synchronisation
  sync: {
    // Activer la synchronisation automatique
    autoSync: true,
    
    // Intervalle de synchronisation (ms)
    syncInterval: 30000,
    
    // Activer la synchronisation en arrière-plan
    backgroundSync: true,
    
    // Stratégie de résolution des conflits
    conflictResolution: 'server-wins', // 'server-wins', 'client-wins', 'merge'
    
    // Activer la détection des modifications hors ligne
    offlineChanges: true,
    
    // Activer la file d'attente des modifications
    queueChanges: true,
    
    // Taille maximale de la file d'attente
    maxQueueSize: 1000
  },
  
  // Paramètres de débogage
  debug: {
    // Activer les logs réseau
    logging: true,
    
    // Niveau de détail des logs
    logLevel: 'warn', // 'error', 'warn', 'info', 'debug'
    
    // Afficher les requêtes
    logRequests: true,
    
    // Afficher les réponses
    logResponses: false,
    
    // Afficher les erreurs
    logErrors: true,
    
    // Afficher les avertissements
    logWarnings: true
  }
};

export default NETWORK_CONFIG;
