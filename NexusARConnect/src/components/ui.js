import { SCENE_CONFIG } from '../config/scene';
import { playSound } from '../utils/audio';

/**
 * Configure l'interface utilisateur principale
 */
export function setupUI() {
  // Créer le conteneur principal de l'UI
  const uiContainer = document.createElement('div');
  uiContainer.id = 'ui-container';
  
  // Ajouter les éléments d'interface
  uiContainer.innerHTML = `
    <div id="ar-ui">
      <div id="status-bar">
        <div id="connection-status" class="status-indicator">
          <span class="status-dot"></span>
          <span class="status-text">Prêt</span>
        </div>
        <div id="battery-status" class="status-indicator">
          <span class="battery-icon">🔋</span>
          <span class="battery-level">100%</span>
        </div>
      </div>
      
      <div id="scan-overlay">
        <div class="scan-frame">
          <div class="corner top-left"></div>
          <div class="corner top-right"></div>
          <div class="corner bottom-left"></div>
          <div class="corner bottom-right"></div>
          <div class="scan-line"></div>
        </div>
        <p id="scan-instruction">Pointez la caméra vers un marqueur QR</p>
      </div>
      
      <div id="marker-status" class="status-message">
        <span class="pulse-dot"></span>
        <span>Recherche de marqueur...</span>
      </div>
      
      <div id="controls">
        <button id="toggle-ar" class="control-button" aria-label="Basculer en mode AR">
          <span class="icon">🔄</span>
          <span class="label">AR</span>
        </button>
        
        <button id="toggle-audio" class="control-button" aria-label="Activer/désactiver le son">
          <span class="icon">🔊</span>
          <span class="label">Son</span>
        </button>
        
        <button id="toggle-flash" class="control-button" aria-label="Activer/désactiver le flash">
          <span class="icon">⚡</span>
          <span class="label">Flash</span>
        </button>
        
        <button id="help-button" class="control-button" aria-label="Aide">
          <span class="icon">❓</span>
          <span class="label">Aide</span>
        </button>
      </div>
      
      <div id="debug-panel" class="debug-panel">
        <div class="debug-header">
          <h4>Informations de débogage</h4>
          <button id="toggle-debug" class="debug-toggle">-</button>
        </div>
        <div class="debug-content">
          <div class="debug-row">
            <span class="debug-label">État AR:</span>
            <span id="debug-ar-state" class="debug-value">Inactif</span>
          </div>
          <div class="debug-row">
            <span class="debug-label">Marqueurs:</span>
            <span id="debug-markers" class="debug-value">0</span>
          </div>
          <div class="debug-row">
            <span class="debug-label">FPS:</span>
            <span id="debug-fps" class="debug-value">0</span>
          </div>
        </div>
      </div>
    </div>
    
    <div id="loading-screen" class="overlay">
      <div class="spinner"></div>
      <p>Chargement de l'expérience AR...</p>
      <div class="progress-bar">
        <div class="progress"></div>
      </div>
      <div class="loading-percentage">0%</div>
    </div>
    
    <div id="permission-overlay" class="overlay hidden">
      <div class="permission-content">
        <h2>Autorisation requise</h2>
        <p>Pour fonctionner correctement, cette application a besoin d'accéder à votre caméra.</p>
        <button id="allow-camera" class="primary-button">Autoriser la caméra</button>
        <button id="deny-camera" class="secondary-button">Refuser</button>
      </div>
    </div>
    
    <div id="help-overlay" class="overlay hidden">
      <div class="help-content">
        <button id="close-help" class="close-button">×</button>
        <h2>Aide</h2>
        <div class="help-section">
          <h3>Comment utiliser</h3>
          <ol>
            <li>Pointez votre appareil vers un marqueur QR compatible</li>
            <li>Attendez que le portail apparaisse</li>
            <li>Appuyez sur le portail pour interagir</li>
            <li>Déplacez-vous pour explorer l'environnement AR</li>
          </ol>
        </div>
        <div class="help-section">
          <h3>Commandes</h3>
          <ul>
            <li><strong>Appuyez sur l'écran</strong>: Sélectionner un élément</li>
            <li><strong>Pincez pour zoomer</strong>: Ajuster la vue</li>
            <li><strong>Faites glisser avec 1 doigt</strong>: Tourner la vue</li>
            <li><strong>Faites glisser avec 2 doigts</strong>: Déplacer la vue</li>
          </ul>
        </div>
      </div>
    </div>
  `;
  
  // Ajouter le conteneur UI au document
  document.body.appendChild(uiContainer);
  
  // Initialiser les écouteurs d'événements
  setupUIEventListeners();
  
  // Démarrer l'animation de scan
  startScanAnimation();
  
  // Mettre à jour les informations de débogage
  if (SCENE_CONFIG.debug.enabled) {
    setupDebugInfo();
  }
  
  return uiContainer;
}

/**
 * Configure les écouteurs d'événements pour l'interface utilisateur
 */
function setupUIEventListeners() {
  // Bouton de basculement AR
  const toggleARButton = document.getElementById('toggle-ar');
  if (toggleARButton) {
    toggleARButton.addEventListener('click', () => {
      playSound('click');
      document.dispatchEvent(new CustomEvent('toggle-ar'));
    });
  }
  
  // Bouton de basculement audio
  const toggleAudioButton = document.getElementById('toggle-audio');
  if (toggleAudioButton) {
    toggleAudioButton.addEventListener('click', () => {
      const isMuted = document.documentElement.classList.toggle('audio-muted');
      playSound(isMuted ? 'mute' : 'unmute');
      document.dispatchEvent(new CustomEvent('toggle-audio', { detail: { muted: isMuted } }));
    });
  }
  
  // Bouton de flash
  const toggleFlashButton = document.getElementById('toggle-flash');
  if (toggleFlashButton) {
    toggleFlashButton.addEventListener('click', () => {
      playSound('click');
      document.dispatchEvent(new CustomEvent('toggle-flash'));
    });
  }
  
  // Bouton d'aide
  const helpButton = document.getElementById('help-button');
  const helpOverlay = document.getElementById('help-overlay');
  if (helpButton && helpOverlay) {
    helpButton.addEventListener('click', () => {
      playSound('click');
      helpOverlay.classList.remove('hidden');
    });
    
    const closeHelpButton = document.getElementById('close-help');
    if (closeHelpButton) {
      closeHelpButton.addEventListener('click', () => {
        playSound('click');
        helpOverlay.classList.add('hidden');
      });
    }
  }
  
  // Gestion des autorisations de caméra
  const permissionOverlay = document.getElementById('permission-overlay');
  const allowCameraButton = document.getElementById('allow-camera');
  const denyCameraButton = document.getElementById('deny-camera');
  
  if (permissionOverlay && allowCameraButton && denyCameraButton) {
    allowCameraButton.addEventListener('click', () => {
      playSound('click');
      permissionOverlay.classList.add('hidden');
      document.dispatchEvent(new CustomEvent('camera-permission', { detail: { granted: true } }));
    });
    
    denyCameraButton.addEventListener('click', () => {
      playSound('click');
      permissionOverlay.classList.add('hidden');
      document.dispatchEvent(new CustomEvent('camera-permission', { detail: { granted: false } }));
    });
  }
  
  // Panneau de débogage
  const debugPanel = document.getElementById('debug-panel');
  const toggleDebugButton = document.getElementById('toggle-debug');
  
  if (debugPanel && toggleDebugButton) {
    toggleDebugButton.addEventListener('click', () => {
      const isOpen = debugPanel.classList.toggle('collapsed');
      toggleDebugButton.textContent = isOpen ? '+' : '-';
    });
  }
}

/**
 * Démarre l'animation de scan
 */
function startScanAnimation() {
  const scanLine = document.querySelector('.scan-line');
  if (!scanLine) return;
  
  let position = 0;
  let direction = 1;
  const speed = 1.5; // secondes pour un aller-retour
  
  const animate = () => {
    position += (1 / 60) * (1 / speed) * direction * 100;
    
    if (position >= 100) {
      position = 100;
      direction = -1;
    } else if (position <= 0) {
      position = 0;
      direction = 1;
    }
    
    scanLine.style.top = `${position}%`;
    requestAnimationFrame(animate);
  };
  
  animate();
}

/**
 * Configure les informations de débogage
 */
function setupDebugInfo() {
  let frameCount = 0;
  let lastFpsUpdate = performance.now();
  let fps = 0;
  
  const updateFps = () => {
    frameCount++;
    const now = performance.now();
    const delta = now - lastFpsUpdate;
    
    if (delta >= 1000) {
      fps = Math.round((frameCount * 1000) / delta);
      frameCount = 0;
      lastFpsUpdate = now;
      
      const fpsElement = document.getElementById('debug-fps');
      if (fpsElement) {
        fpsElement.textContent = `${fps} FPS`;
        fpsElement.className = `debug-value ${fps < 30 ? 'warning' : ''} ${fps < 15 ? 'error' : ''}`;
      }
    }
    
    requestAnimationFrame(updateFps);
  };
  
  updateFps();
  
  // Mettre à jour l'état AR
  document.addEventListener('arjs-status', (e) => {
    const stateElement = document.getElementById('debug-ar-state');
    if (stateElement) {
      stateElement.textContent = e.detail.status;
      stateElement.className = `debug-value ${e.detail.status === 'running' ? 'success' : 'warning'}`;
    }
  });
  
  // Mettre à jour le nombre de marqueurs détectés
  document.addEventListener('markerFound', () => {
    const markersElement = document.getElementById('debug-markers');
    if (markersElement) {
      const count = parseInt(markersElement.textContent || '0') + 1;
      markersElement.textContent = count;
    }
  });
  
  document.addEventListener('markerLost', () => {
    const markersElement = document.getElementById('debug-markers');
    if (markersElement) {
      const count = Math.max(0, parseInt(markersElement.textContent || '0') - 1);
      markersElement.textContent = count;
    }
  });
}

/**
 * Affiche l'écran de chargement
 */
export function showLoadingScreen(progress = 0) {
  const loadingScreen = document.getElementById('loading-screen');
  const progressBar = document.querySelector('.progress');
  const percentage = document.querySelector('.loading-percentage');
  
  if (loadingScreen) loadingScreen.classList.remove('hidden');
  if (progressBar) progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  if (percentage) percentage.textContent = `${Math.round(progress)}%`;
  
  if (progress >= 100) {
    setTimeout(() => {
      if (loadingScreen) loadingScreen.classList.add('hidden');
    }, 500);
  }
}

/**
 * Affiche la demande d'autorisation de la caméra
 */
export function showCameraPermissionRequest() {
  const permissionOverlay = document.getElementById('permission-overlay');
  if (permissionOverlay) {
    permissionOverlay.classList.remove('hidden');
  }
}

/**
 * Met à jour la barre d'état de connexion
 */
export function updateConnectionStatus(connected, message = '') {
  const statusElement = document.getElementById('connection-status');
  if (!statusElement) return;
  
  const dot = statusElement.querySelector('.status-dot');
  const text = statusElement.querySelector('.status-text');
  
  if (dot) {
    dot.className = `status-dot ${connected ? 'connected' : 'disconnected'}`;
  }
  
  if (text) {
    text.textContent = message || (connected ? 'Connecté' : 'Déconnecté');
  }
}

/**
 * Met à jour le niveau de batterie
 */
export function updateBatteryLevel(level) {
  const batteryLevel = document.querySelector('.battery-level');
  const batteryIcon = document.querySelector('.battery-icon');
  
  if (batteryLevel) {
    batteryLevel.textContent = `${Math.round(level * 100)}%`;
  }
  
  if (batteryIcon) {
    let icon = '🔋'; // Par défaut
    
    if (level > 0.75) icon = '🔋';
    else if (level > 0.5) icon = '🔋';
    else if (level > 0.25) icon = '🔋';
    else if (level > 0.1) icon = '🪫';
    else icon = '⚠️';
    
    batteryIcon.textContent = icon;
  }
}

// Surveiller le niveau de batterie si l'API est disponible
if ('getBattery' in navigator) {
  navigator.getBattery().then(battery => {
    // Mettre à jour l'état initial
    updateBatteryLevel(battery.level);
    
    // Mettre à jour lors des changements
    battery.addEventListener('levelchange', () => {
      updateBatteryLevel(battery.level);
    });
    
    battery.addEventListener('chargingchange', () => {
      // Mettre à jour l'icône de charge
      const batteryIcon = document.querySelector('.battery-icon');
      if (batteryIcon) {
        batteryIcon.textContent = battery.charging ? '🔌' : '🔋';
      }
    });
  });
}
