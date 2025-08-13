import { SCENE_CONFIG } from '../config/scene';
import { createPortal } from '../components/portal';
import { playSound } from '../utils/audio';

let arScene = null;
let portalEntity = null;

/**
 * Initialise la scène AR
 */
export function initARScene() {
  // Création de la scène AR
  arScene = document.createElement('a-scene');
  arScene.setAttribute('embedded', '');
  arScene.setAttribute('renderer', 'antialias: true; alpha: true');
  arScene.setAttribute('vr-mode-ui', 'enabled: false');
  arScene.setAttribute('device-orientation-permission-ui', 'enabled: false');
  
  // Configuration AR.js
  arScene.innerHTML = `
    <a-entity id="rig" position="0 0 0">
      <a-camera gps-camera="simulateLatitude: 0; simulateLongitude: 0"
                look-controls="enabled: true"
                wasd-controls="enabled: false"
                rotation-reader>
      </a-camera>
    </a-entity>
    <a-entity id="arjs"
              arjs="sourceType: webcam; 
                    debugUIEnabled: false; 
                    detectionMode: mono_and_matrix; 
                    matrixCodeType: 3x3; 
                    cameraParametersUrl: '/data/camera_para.dat'"
              gesture-handler="enabled: true">
    </a-entity>
  `;
  
  document.body.appendChild(arScene);
  
  // Écouteur pour la détection de marqueur
  arScene.addEventListener('markerFound', (e) => {
    console.log('Marqueur détecté:', e.target.id);
    onMarkerFound(e);
  });
  
  arScene.addEventListener('markerLost', (e) => {
    console.log('Marqueur perdu:', e.target.id);
    onMarkerLost(e);
  });
  
  return arScene;
}

/**
 * Appelé lorsqu'un marqueur est détecté
 */
function onMarkerFound(event) {
  const markerId = event.target.id;
  
  // Créer un portail si ce n'est pas déjà fait
  if (!portalEntity) {
    portalEntity = createPortal(markerId);
    event.target.appendChild(portalEntity);
    playSound('portalOpen');
  }
  
  // Mise à jour de l'UI
  const uiElement = document.getElementById('marker-status');
  if (uiElement) {
    uiElement.textContent = `Marqueur détecté: ${markerId}`;
    uiElement.className = 'status-active';
  }
}

/**
 * Appelé lorsqu'un marqueur est perdu
 */
function onMarkerLost(event) {
  const uiElement = document.getElementById('marker-status');
  if (uiElement) {
    uiElement.textContent = 'Recherche de marqueur...';
    uiElement.className = 'status-scanning';
  }
  
  // Jouer un son de fermeture de portail
  playSound('portalClose');
}

/**
 * Nettoie la scène AR
 */
export function cleanupARScene() {
  if (arScene && arScene.parentNode) {
    arScene.parentNode.removeChild(arScene);
    arScene = null;
    portalEntity = null;
  }
}

// Exporter la référence à la scène
export function getARScene() {
  return arScene;
}
