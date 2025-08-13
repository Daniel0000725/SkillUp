import { APP_CONFIG, SCENE_CONFIG, AUDIO_CONFIG } from './config';
import { initARScene, getARScene } from './scenes/arScene';
import { setupUI, showLoadingScreen, updateConnectionStatus } from './components/ui';
import audioManager, { playSound } from './utils/audio';

// Classe principale de l'application
class NexusARApp {
  constructor() {
    this.isInitialized = false;
    this.isARActive = false;
    this.assetsLoaded = false;
    this.loadedAssets = 0;
    this.totalAssets = 0;
    
    // Références aux éléments du DOM
    this.elements = {
      appContainer: null,
      loadingScreen: null,
      arContainer: null,
      uiContainer: null,
    };
    
    // Configuration
    this.config = {
      ...APP_CONFIG,
      debug: SCENE_CONFIG.debug.enabled,
    };
    
    // État de l'application
    this.state = {
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      isOnline: navigator.onLine,
      hasWebGL: this._checkWebGL(),
      hasARSupport: this._checkARSupport(),
      permissions: {
        camera: false,
        notifications: false,
        geolocation: false,
      },
      settings: {
        audioEnabled: true,
        hapticFeedback: true,
        debugMode: this.config.debug,
      },
      markers: [],
      activeMarker: null,
    };
    
    // Lier les méthodes
    this.init = this.init.bind(this);
    this._setupEventListeners = this._setupEventListeners.bind(this);
    this._onResize = this._onResize.bind(this);
    this._onOnlineStatusChange = this._onOnlineStatusChange.bind(this);
    this._onDeviceOrientation = this._onDeviceOrientation.bind(this);
    this._onDeviceMotion = this._onDeviceMotion.bind(this);
    this._checkRequirements = this._checkRequirements.bind(this);
    this._loadAssets = this._loadAssets.bind(this);
    this._onAssetLoaded = this._onAssetLoaded.bind(this);
    this._onAllAssetsLoaded = this._onAllAssetsLoaded.bind(this);
    this.start = this.start.bind(this);
    this.cleanup = this.cleanup.bind(this);
    this.toggleAR = this.toggleAR.bind(this);
    this.toggleAudio = this.toggleAudio.bind(this);
    this.toggleDebug = this.toggleDebug.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.vibrate = this.vibrate.bind(this);
    this.checkCameraPermission = this.checkCameraPermission.bind(this);
    this.requestNotificationPermission = this.requestNotificationPermission.bind(this);
    this._handleError = this._handleError.bind(this);
  }
  
  /**
   * Initialise l'application
   */
  async init() {
    try {
      // Afficher l'écran de chargement
      showLoadingScreen(0);
      
      // Vérifier les prérequis
      const requirementsMet = await this._checkRequirements();
      if (!requirementsMet) {
        throw new Error('Les exigences minimales ne sont pas remplies');
      }
      
      // Initialiser le gestionnaire audio
      await audioManager.init();
      
      // Charger les ressources
      await this._loadAssets();
      
      // Configurer l'interface utilisateur
      this._setupUI();
      
      // Configurer les écouteurs d'événements
      this._setupEventListeners();
      
      // Initialiser la scène AR
      await this._initAR();
      
      // Mettre à jour l'état
      this.isInitialized = true;
      this.assetsLoaded = true;
      
      // Cacher l'écran de chargement
      showLoadingScreen(100);
      
      // Démarrer l'application
      this.start();
      
      console.log('Nexus AR Connect initialisé avec succès');
      
      // Jouer le son de démarrage
      playSound('startup');
      
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de l\'application:', error);
      this._handleError(error);
      return false;
    }
  }
  
  /**
   * Configure l'interface utilisateur
   */
  _setupUI() {
    // Créer le conteneur principal
    this.elements.appContainer = document.createElement('div');
    this.elements.appContainer.id = 'app';
    document.body.appendChild(this.elements.appContainer);
    
    // Initialiser l'interface utilisateur
    this.elements.uiContainer = setupUI();
    
    // Mettre à jour l'état de connexion
    updateConnectionStatus(true, 'Prêt');
    
    // Vérifier les autorisations
    this.checkCameraPermission();
    this.requestNotificationPermission();
  }
  
  /**
   * Configure les écouteurs d'événements
   */
  _setupEventListeners() {
    // Événements de la fenêtre
    window.addEventListener('resize', this._onResize);
    window.addEventListener('online', this._onOnlineStatusChange);
    window.addEventListener('offline', this._onOnlineStatusChange);
    
    // Événements de l'appareil
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', this._onDeviceOrientation, false);
    }
    
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', this._onDeviceMotion, false);
    }
    
    // Événements personnalisés
    document.addEventListener('toggle-ar', this.toggleAR);
    document.addEventListener('toggle-audio', (e) => this.toggleAudio(e.detail.muted));
    document.addEventListener('toggle-debug', this.toggleDebug);
    
    // Gestion des erreurs
    window.addEventListener('error', this._handleError);
    window.addEventListener('unhandledrejection', this._handleError);
  }
  
  /**
   * Vérifie les prérequis de l'application
   */
  async _checkRequirements() {
    // Vérifier la compatibilité WebGL
    if (!this.state.hasWebGL) {
      this._showError('Votre navigateur ne supporte pas WebGL. Veuillez mettre à jour votre navigateur.');
      return false;
    }
    
    // Vérifier la connexion Internet (seulement pour le chargement initial)
    if (!this.state.isOnline) {
      console.warn('Aucune connexion Internet détectée. Certaines fonctionnalités peuvent être limitées.');
    }
    
    // Vérifier les API nécessaires
    const requiredAPIs = [
      'Promise', 'fetch', 'serviceWorker', 'indexedDB',
      'IntersectionObserver', 'requestAnimationFrame'
    ];
    
    const missingAPIs = requiredAPIs.filter(api => !(api in window));
    if (missingAPIs.length > 0) {
      this._showError(`Les API suivantes sont requises mais ne sont pas disponibles: ${missingAPIs.join(', ')}`);
      return false;
    }
    
    return true;
  }
  
  /**
   * Charge les ressources de l'application
   */
  async _loadAssets() {
    try {
      // Compter le nombre total d'assets à charger
      this.totalAssets = Object.values(AUDIO_CONFIG)
        .filter(category => typeof category === 'object')
        .reduce((count, category) => {
          return count + Object.values(category)
            .filter(sound => sound && typeof sound === 'object' && 'src' in sound)
            .length;
        }, 0);
      
      if (this.totalAssets === 0) {
        this._onAllAssetsLoaded();
        return;
      }
      
      // Charger les ressources audio
      const audioPromises = [];
      
      // Parcourir toutes les catégories de sons
      for (const [category, sounds] of Object.entries(AUDIO_CONFIG)) {
        if (typeof sounds !== 'object') continue;
        
        for (const [name, config] of Object.entries(sounds)) {
          if (!config || typeof config !== 'object' || !config.src) continue;
          
          const promise = new Promise((resolve) => {
            const audio = new Audio();
            audio.preload = 'auto';
            audio.oncanplaythrough = () => {
              this._onAssetLoaded();
              resolve();
            };
            audio.onerror = (error) => {
              console.warn(`Erreur lors du chargement de ${config.src}:`, error);
              this._onAssetLoaded();
              resolve();
            };
            audio.src = config.src;
          });
          
          audioPromises.push(promise);
        }
      }
      
      // Attendre que tous les sons soient chargés
      await Promise.all(audioPromises);
      
    } catch (error) {
      console.error('Erreur lors du chargement des ressources:', error);
      // Continuer même en cas d'erreur
    }
  }
  
  /**
   * Appelé lorsqu'une ressource est chargée
   */
  _onAssetLoaded() {
    this.loadedAssets++;
    const progress = Math.min(100, Math.round((this.loadedAssets / this.totalAssets) * 100));
    showLoadingScreen(progress);
    
    if (this.loadedAssets >= this.totalAssets) {
      this._onAllAssetsLoaded();
    }
  }
  
  /**
   * Appelé lorsque toutes les ressources sont chargées
   */
  _onAllAssetsLoaded() {
    this.assetsLoaded = true;
    console.log('Toutes les ressources ont été chargées');
    
    // Mettre à jour l'interface utilisateur
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
    }
    
    // Émettre un événement personnalisé
    document.dispatchEvent(new CustomEvent('assets-loaded'));
  }
  
  /**
   * Initialise la réalité augmentée
   */
  async _initAR() {
    try {
      // Vérifier si AR est supporté
      if (!this.state.hasARSupport) {
        console.warn('La réalité augmentée n\'est pas supportée sur cet appareil');
        return false;
      }
      
      // Initialiser la scène AR
      this.arScene = initARScene();
      
      // Cacher la scène AR par défaut
      if (this.arScene) {
        this.arScene.style.display = 'none';
      }
      
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de la réalité augmentée:', error);
      return false;
    }
  }
  
  /**
   * Démarre l'application
   */
  start() {
    if (!this.isInitialized) {
      console.warn('L\'application n\'est pas encore initialisée');
      return;
    }
    
    console.log('Démarrage de l\'application...');
    
    // Mettre à jour l'état de l'application
    this.isRunning = true;
    
    // Lancer la boucle de rendu
    this._animationFrameId = requestAnimationFrame(this._update.bind(this));
    
    // Afficher une notification
    this.showNotification('Bienvenue sur Nexus AR Connect!', {
      body: 'Commencez à scanner des marqueurs pour découvrir des portails AR.',
      icon: '/icons/icon-192x192.png',
      vibrate: [100, 50, 100],
    });
    
    // Démarrer la musique d'ambiance
    playSound('ambient', { loop: true, volume: 0.3 });
  }
  
  /**
   * Boucle de rendu principale
   */
  _update(timestamp) {
    if (!this.isRunning) return;
    
    // Mettre à jour la logique du jeu
    this._updateLogic(timestamp);
    
    // Rendu
    this._render(timestamp);
    
    // Demander la prochaine frame
    this._animationFrameId = requestAnimationFrame(this._update.bind(this));
  }
  
  /**
   * Met à jour la logique du jeu
   */
  _updateLogic(timestamp) {
    // Mettre à jour la logique du jeu ici
    // Par exemple : animations, détections de collisions, etc.
  }
  
  /**
   * Effectue le rendu de la scène
   */
  _render(timestamp) {
    // Effectuer le rendu de la scène ici
    // Cette méthode est appelée à chaque frame
  }
  
  /**
   * Active/désactive le mode AR
   */
  toggleAR() {
    if (!this.arScene) {
      console.warn('La scène AR n\'est pas initialisée');
      return;
    }
    
    this.isARActive = !this.isARActive;
    
    if (this.isARActive) {
      // Activer le mode AR
      this.arScene.style.display = 'block';
      document.body.classList.add('ar-active');
      playSound('ar-start');
      
      // Mettre à jour l'interface utilisateur
      const toggleButton = document.getElementById('toggle-ar');
      if (toggleButton) {
        toggleButton.classList.add('active');
      }
      
      // Émettre un événement personnalisé
      document.dispatchEvent(new CustomEvent('ar-started'));
      
      console.log('Mode AR activé');
    } else {
      // Désactiver le mode AR
      this.arScene.style.display = 'none';
      document.body.classList.remove('ar-active');
      playSound('ar-stop');
      
      // Mettre à jour l'interface utilisateur
      const toggleButton = document.getElementById('toggle-ar');
      if (toggleButton) {
        toggleButton.classList.remove('active');
      }
      
      // Émettre un événement personnalisé
      document.dispatchEvent(new CustomEvent('ar-stopped'));
      
      console.log('Mode AR désactivé');
    }
  }
  
  /**
   * Active/désactive l'audio
   */
  toggleAudio(muted) {
    this.state.settings.audioEnabled = muted === undefined ? !this.state.settings.audioEnabled : !muted;
    
    // Mettre à jour le gestionnaire audio
    audioManager.setEnabled(this.state.settings.audioEnabled);
    
    // Mettre à jour l'interface utilisateur
    const toggleButton = document.getElementById('toggle-audio');
    if (toggleButton) {
      toggleButton.classList.toggle('muted', !this.state.settings.audioEnabled);
    }
    
    // Jouer un son de retour
    if (this.state.settings.audioEnabled) {
      playSound('unmute');
    }
    
    console.log(`Audio ${this.state.settings.audioEnabled ? 'activé' : 'désactivé'}`);
  }
  
  /**
   * Active/désactive le mode débogage
   */
  toggleDebug() {
    this.state.settings.debugMode = !this.state.settings.debugMode;
    
    // Mettre à jour l'interface utilisateur
    document.body.classList.toggle('debug-mode', this.state.settings.debugMode);
    
    // Mettre à jour la configuration de la scène
    if (this.arScene) {
      const debugUI = this.arScene.querySelector('[debugui]');
      if (debugUI) {
        debugUI.setAttribute('enabled', this.state.settings.debugMode);
      }
    }
    
    console.log(`Mode débogage ${this.state.settings.debugMode ? 'activé' : 'désactivé'}`);
  }
  
  /**
   * Affiche une notification
   */
  async showNotification(title, options = {}) {
    if (!('Notification' in window)) {
      console.warn('Les notifications ne sont pas supportées sur ce navigateur');
      return false;
    }
    
    if (Notification.permission === 'granted') {
      try {
        const notification = new Notification(title, {
          icon: options.icon || '/icons/icon-192x192.png',
          body: options.body || '',
          vibrate: options.vibrate,
          tag: options.tag || 'nexus-ar-notification',
          renotify: options.renotify || false,
          requireInteraction: options.requireInteraction || false,
        });
        
        notification.onclick = (event) => {
          event.preventDefault();
          window.focus();
          notification.close();
          
          if (options.onClick && typeof options.onClick === 'function') {
            options.onClick();
          }
        };
        
        return true;
      } catch (error) {
        console.error('Erreur lors de l\'affichage de la notification:', error);
        return false;
      }
    } else if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        return this.showNotification(title, options);
      }
    }
    
    return false;
  }
  
  /**
   * Fait vibrer l'appareil si disponible
   */
  vibrate(pattern = [100, 50, 100]) {
    if (!this.state.settings.hapticFeedback) return;
    
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
        return true;
      } catch (error) {
        console.warn('Erreur lors de la tentative de vibration:', error);
        return false;
      }
    }
    
    return false;
  }
  
  /**
   * Vérifie l'autorisation de la caméra
   */
  async checkCameraPermission() {
    if (!('mediaDevices' in navigator) || !navigator.mediaDevices.enumerateDevices) {
      console.warn('L\'API MediaDevices n\'est pas disponible');
      return false;
    }
    
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasCamera = devices.some(device => device.kind === 'videoinput');
      
      if (!hasCamera) {
        console.warn('Aucune caméra détectée');
        return false;
      }
      
      // Demander l'autorisation d'accéder à la caméra
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      // Arrêter tous les flux vidéo
      stream.getTracks().forEach(track => track.stop());
      
      this.state.permissions.camera = true;
      return true;
    } catch (error) {
      console.warn('Accès à la caméra refusé:', error);
      this.state.permissions.camera = false;
      
      // Afficher une interface pour demander à nouveau l'autorisation
      const permissionOverlay = document.getElementById('permission-overlay');
      if (permissionOverlay) {
        permissionOverlay.classList.remove('hidden');
      }
      
      return false;
    }
  }
  
  /**
   * Demande l'autorisation d'afficher des notifications
   */
  async requestNotificationPermission() {
    if (!('Notification' in window)) {
      console.warn('Les notifications ne sont pas supportées sur ce navigateur');
      return false;
    }
    
    if (Notification.permission === 'granted') {
      this.state.permissions.notifications = true;
      return true;
    }
    
    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      this.state.permissions.notifications = permission === 'granted';
      return this.state.permissions.notifications;
    }
    
    return false;
  }
  
  /**
   * Nettoie les ressources de l'application
   */
  cleanup() {
    console.log('Nettoyage des ressources...');
    
    // Arrêter la boucle de rendu
    this.isRunning = false;
    if (this._animationFrameId) {
      cancelAnimationFrame(this._animationFrameId);
      this._animationFrameId = null;
    }
    
    // Nettoyer la scène AR
    if (this.arScene) {
      const arSceneElement = getARScene();
      if (arSceneElement && arSceneElement.parentNode) {
        arSceneElement.parentNode.removeChild(arSceneElement);
      }
      this.arScene = null;
    }
    
    // Supprimer les écouteurs d'événements
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('online', this._onOnlineStatusChange);
    window.removeEventListener('offline', this._onOnlineStatusChange);
    
    if (window.DeviceOrientationEvent) {
      window.removeEventListener('deviceorientation', this._onDeviceOrientation, false);
    }
    
    if (window.DeviceMotionEvent) {
      window.removeEventListener('devicemotion', this._onDeviceMotion, false);
    }
    
    // Nettoyer l'interface utilisateur
    if (this.elements.appContainer && this.elements.appContainer.parentNode) {
      this.elements.appContainer.parentNode.removeChild(this.elements.appContainer);
    }
    
    // Réinitialiser l'état
    this.isInitialized = false;
    this.assetsLoaded = false;
    this.loadedAssets = 0;
    this.totalAssets = 0;
    
    console.log('Nettoyage terminé');
  }
  
  /**
   * Gère les erreurs de l'application
   */
  _handleError(error) {
    console.error('Erreur de l\'application:', error);
    
    // Afficher un message d'erreur à l'utilisateur
    this._showError('Une erreur est survenue. Veuillez recharger la page.');
    
    // Envoyer le rapport d'erreur (si un service de suivi est configuré)
    if (this.config.services.sentry.enabled) {
      // Intégration avec Sentry ou un autre service de suivi des erreurs
      console.log('Envoi du rapport d\'erreur...');
    }
    
    // Émettre un événement personnalisé
    document.dispatchEvent(new CustomEvent('app-error', { 
      detail: { 
        error: error.message || 'Erreur inconnue',
        stack: error.stack,
        timestamp: new Date().toISOString(),
      } 
    }));
  }
  
  /**
   * Affiche un message d'erreur à l'utilisateur
   */
  _showError(message) {
    const errorOverlay = document.createElement('div');
    errorOverlay.className = 'error-overlay';
    errorOverlay.innerHTML = `
      <div class="error-content">
        <h2>Erreur</h2>
        <p>${message}</p>
        <button id="reload-button" class="primary-button">Recharger</button>
      </div>
    `;
    
    document.body.appendChild(errorOverlay);
    
    const reloadButton = document.getElementById('reload-button');
    if (reloadButton) {
      reloadButton.addEventListener('click', () => {
        window.location.reload();
      });
    }
  }
  
  /**
   * Vérifie si WebGL est supporté
   */
  _checkWebGL() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && 
               (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }
  
  /**
   * Vérifie si la réalité augmentée est supportée
   */
  _checkARSupport() {
    // Vérifier la compatibilité WebXR
    if ('xr' in navigator) {
      return navigator.xr.isSessionSupported('immersive-ar');
    }
    
    // Vérifier la compatibilité WebAR (AR.js)
    if (window.ARController && window.ARController.getUserMediaAR) {
      return true;
    }
    
    return false;
  }
  
  /**
   * Gère le redimensionnement de la fenêtre
   */
  _onResize() {
    // Mettre à jour la taille de la caméra et du rendu
    if (this.arScene) {
      // Mettre à jour la taille du rendu AR
      const arRenderer = this.arScene.renderer;
      if (arRenderer) {
        arRenderer.setSize(window.innerWidth, window.innerHeight);
      }
    }
    
    // Mettre à jour les styles CSS si nécessaire
    document.documentElement.style.setProperty('--viewport-width', `${window.innerWidth}px`);
    document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
  }
  
  /**
   * Gère les changements de connexion
   */
  _onOnlineStatusChange(event) {
    this.state.isOnline = navigator.onLine;
    
    if (this.state.isOnline) {
      console.log('Connexion Internet rétablie');
      updateConnectionStatus(true, 'En ligne');
      
      // Synchroniser les données si nécessaire
      if (this._syncManager) {
        this._syncManager.sync();
      }
    } else {
      console.warn('Connexion Internet perdue');
      updateConnectionStatus(false, 'Hors ligne');
    }
  }
  
  /**
   * Gère l'orientation de l'appareil
   */
  _onDeviceOrientation(event) {
    // Mettre à jour l'orientation de l'appareil pour les contrôles
    if (this.arScene && this.arScene.camera) {
      // Implémentation de base - à adapter selon les besoins
      const { alpha, beta, gamma } = event;
      
      // Mettre à jour la rotation de la caméra
      if (alpha !== null && beta !== null && gamma !== null) {
        this.arScene.camera.rotation.set(
          THREE.MathUtils.degToRad(beta - 90),
          THREE.MathUtils.degToRad(alpha),
          THREE.MathUtils.degToRad(-gamma),
          'YXZ'
        );
      }
    }
  }
  
  /**
   * Gère le mouvement de l'appareil
   */
  _onDeviceMotion(event) {
    // Implémenter la détection de mouvement si nécessaire
    // Par exemple, pour les contrôles de déplacement ou les interactions
  }
}

// Créer et exporter une instance unique de l'application
const app = new NexusARApp();

export default app;
