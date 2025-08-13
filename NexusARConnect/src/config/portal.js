/**
 * Configuration des portails AR
 */

export const PORTAL_CONFIG = {
  // Taille du portail
  size: {
    radius: 0.5,        // Rayon du portail en mètres
    segments: 64,       // Nombre de segments pour le cercle
    depth: 0.05,        // Épaisseur du portail
    innerRadius: 0.4,   // Rayon intérieur pour l'effet de bordure
  },
  
  // Couleurs
  color: {
    primary: '#6e44ff',     // Couleur principale du portail
    secondary: '#00e5ff',   // Couleur secondaire pour les effets
    highlight: '#ffffff',   // Couleur de surbrillance
    particle: '#a78bfa'     // Couleur des particules
  },
  
  // Animation
  animation: {
    duration: 10000,        // Durée d'une rotation complète en ms
    direction: 'normal',    // Sens de rotation
    easing: 'linear',       // Type d'interpolation
    loop: true,             // Boucle l'animation
    enabled: true           // Active/désactive les animations
  },
  
  // Effets de particules
  particles: {
    enabled: true,          // Active les particules
    count: 100,             // Nombre de particules
    size: 0.02,             // Taille des particules
    speed: 0.1,             // Vitesse des particules
    spread: 0.5,            // Dispersion des particules
    color: '#a78bfa',       // Couleur des particules
    opacity: 0.8,           // Opacité des particules
    sizeRandomness: 0.5,    // Variation aléatoire de la taille
    speedRandomness: 0.5,   // Variation aléatoire de la vitesse
    lifetime: 5,            // Durée de vie en secondes
    preset: 'default'       // Préréglage des particules
  },
  
  // Interaction
  interaction: {
    hoverScale: 1.1,        // Échelle au survol
    clickScale: 0.95,       // Échelle au clic
    animationDuration: 300, // Durée de l'animation en ms
    soundEnabled: true,     // Active les sons d'interaction
    hapticFeedback: true    // Active le retour haptique
  },
  
  // Effets visuels
  effects: {
    glow: {
      enabled: true,        // Active l'effet de lueur
      intensity: 0.5,       // Intensité de la lueur
      radius: 0.3,          // Rayon de la lueur
      color: '#6e44ff'      // Couleur de la lueur
    },
    ripple: {
      enabled: true,        // Active l'effet de vague
      speed: 1.5,           // Vitesse de l'effet
      amplitude: 0.1,       // Amplitude de la vague
      wavelength: 0.5       // Longueur d'onde
    },
    distortion: {
      enabled: true,        // Active la distorsion
      speed: 0.5,           // Vitesse de la distorsion
      intensity: 0.1        // Intensité de la distorsion
    }
  },
  
  // Configuration du contenu
  content: {
    type: 'iframe',         // Type de contenu (iframe, model3d, image, video)
    url: '',                // URL du contenu
    width: 1,               // Largeur du contenu
    height: 1,              // Hauteur du contenu
    depth: 0.1,             // Profondeur du contenu
    offset: { x: 0, y: 1.5, z: -1 },  // Décalage par rapport au portail
    scale: 1,               // Échelle du contenu
    visible: true,          // Visibilité du contenu
    interaction: true       // Interaction avec le contenu
  },
  
  // Paramètres de performance
  performance: {
    maxPortals: 5,          // Nombre maximum de portails actifs
    culling: true,          // Activer le culling
    lod: {
      enabled: true,        // Niveaux de détail
      distances: [5, 10, 20], // Distances pour chaque niveau
      updateRate: 1         // Fréquence de mise à jour en secondes
    },
    updateRate: 60          // Taux de rafraîchissement cible
  },
  
  // Paramètres de débogage
  debug: {
    enabled: false,         // Mode débogage
    showAxes: false,        // Afficher les axes
    showBoundingBox: false, // Afficher les boîtes englobantes
    showWireframe: false,   // Afficher en fil de fer
    logEvents: false        // Journaliser les événements
  }
};

export default PORTAL_CONFIG;
