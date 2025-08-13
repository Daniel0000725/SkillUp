import { PORTAL_CONFIG } from '../config/portal';
import { playSound } from '../utils/audio';

/**
 * Crée un portail AR interactif
 * @param {string} markerId - ID du marqueur associé au portail
 * @returns {HTMLElement} L'entité du portail créée
 */
export function createPortal(markerId) {
  // Créer l'entité du portail
  const portal = document.createElement('a-entity');
  portal.setAttribute('id', `portal-${markerId}`);
  
  // Configuration du portail
  const { size, color, animation, particles } = PORTAL_CONFIG;
  
  // Ajouter le cercle du portail
  portal.innerHTML = `
    <a-circle
      class="portal-circle"
      position="0 0 0"
      radius="${size.radius}"
      segments="64"
      material="shader: flat; color: ${color.primary}; side: double; transparent: true; opacity: 0.9"
      rotation="-90 0 0">
    </a-circle>
    
    <a-entity
      class="portal-particles"
      particle-system="preset: ${particles.preset}; 
                     color: ${particles.color}; 
                     particleCount: ${particles.count};
                     size: ${particles.size};
                     velocitySpread: ${particles.velocitySpread};
                     acceleration: ${particles.acceleration};">
    </a-entity>
    
    <a-animation
      attribute="rotation"
      dur="${animation.duration}"
      to="-90 0 360"
      easing="linear"
      repeat="indefinite">
    </a-animation>
  `;
  
  // Ajouter des interactions
  portal.setAttribute('cursor-listener', '');
  portal.classList.add('interactive');
  
  // Gestion des événements
  portal.addEventListener('click', (e) => {
    onPortalClick(e, markerId);
  });
  
  portal.addEventListener('mouseenter', () => {
    portal.setAttribute('scale', '1.1 1.1 1.1');
    playSound('portalHover');
  });
  
  portal.addEventListener('mouseleave', () => {
    portal.setAttribute('scale', '1 1 1');
  });
  
  return portal;
}

/**
 * Gère le clic sur un portail
 */
function onPortalClick(event, markerId) {
  event.stopPropagation();
  console.log(`Portail cliqué: ${markerId}`);
  
  // Jouer un son
  playSound('portalClick');
  
  // Émettre un événement personnalisé
  const portalEvent = new CustomEvent('portal-activated', {
    detail: { 
      markerId,
      timestamp: Date.now()
    },
    bubbles: true
  });
  
  event.target.dispatchEvent(portalEvent);
  
  // Animation de l'effet de clic
  animatePortalClick(event.target);
}

/**
 * Anime le portail lors d'un clic
 */
function animatePortalClick(portalElement) {
  const animation = document.createElement('a-animation');
  animation.setAttribute('attribute', 'scale');
  animation.setAttribute('dur', 300);
  animation.setAttribute('from', '1 1 1');
  animation.setAttribute('to', '1.2 1.2 1.2');
  animation.setAttribute('direction', 'alternate');
  animation.setAttribute('repeat', '1');
  
  portalElement.appendChild(animation);
  
  // Supprimer l'animation après son exécution
  setTimeout(() => {
    if (portalElement.contains(animation)) {
      portalElement.removeChild(animation);
    }
  }, 600);
}

/**
 * Supprime un portail
 */
export function removePortal(portalId) {
  const portal = document.getElementById(`portal-${portalId}`);
  if (portal && portal.parentNode) {
    portal.parentNode.removeChild(portal);
    return true;
  }
  return false;
}
