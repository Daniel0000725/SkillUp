/**
 * Configuration des effets visuels pour Nexus AR Connect
 * Définit les effets post-traitement, les shaders et les paramètres visuels
 */

// Types d'effets supportés
export const EFFECT_TYPES = {
  BLOOM: 'bloom',
  GLOW: 'glow',
  DEPTH_OF_FIELD: 'dof',
  MOTION_BLUR: 'motionBlur',
  COLOR_GRADING: 'colorGrading',
  VIGNETTE: 'vignette',
  FILM_GRAIN: 'filmGrain',
  SCANLINES: 'scanlines',
  PIXELATE: 'pixelate',
  CHROMATIC_ABERRATION: 'chromaticAberration',
  LENS_FLARE: 'lensFlare',
  GOD_RAYS: 'godRays',
  SSAO: 'ssao',
  SSR: 'ssr',
  TONE_MAPPING: 'toneMapping',
  OUTLINE: 'outline',
  DISTORTION: 'distortion',
  GLITCH: 'glitch',
  NOISE: 'noise',
  RAIN: 'rain',
  SNOW: 'snow',
  FOG: 'fog',
  LIGHT_RAYS: 'lightRays',
  REFLECTION: 'reflection',
  REFRACTION: 'refraction',
  WATER: 'water',
  FIRE: 'fire',
  SMOKE: 'smoke',
  PARTICLE: 'particle',
  TRAIL: 'trail',
  HIGHLIGHT: 'highlight',
  SHADOW: 'shadow',
  AMBIENT_OCCLUSION: 'ambientOcclusion',
  BLOOD: 'blood',
  DAMAGE: 'damage',
  HEAT_HAZE: 'heatHaze',
  NIGHT_VISION: 'nightVision',
  THERMAL: 'thermal',
  INFRARED: 'infrared',
  XRAY: 'xray',
  CARTOON: 'cartoon',
  SKETCH: 'sketch',
  OIL_PAINTING: 'oilPainting',
  PENCIL: 'pencil',
  DOT_SCREEN: 'dotScreen',
  RGB_SHIFT: 'rgbShift',
  HALFTONE: 'halftone',
  TILT_SHIFT: 'tiltShift',
  UNREAL_BLOOM: 'unrealBloom',
  VOLUMETRIC_LIGHT: 'volumetricLight',
  LUT: 'lut',
  CUSTOM: 'custom',
};

// Configuration des effets de base
export const BASE_EFFECTS = {
  // Effet de bloom (lueur)
  BLOOM: {
    type: EFFECT_TYPES.BLOOM,
    enabled: true,
    intensity: 0.5,
    threshold: 0.85,
    radius: 0.4,
    smoothWidth: 0.1,
  },
  
  // Profondeur de champ
  DEPTH_OF_FIELD: {
    type: EFFECT_TYPES.DEPTH_OF_FIELD,
    enabled: false,
    focus: 10.0,
    aperture: 0.1,
    maxBlur: 0.01,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  
  // Flou de mouvement
  MOTION_BLUR: {
    type: EFFECT_TYPES.MOTION_BLUR,
    enabled: false,
    intensity: 0.5,
  },
  
  // Correction des couleurs
  COLOR_GRADING: {
    type: EFFECT_TYPES.COLOR_GRADING,
    enabled: true,
    brightness: 0.05,
    contrast: 0.1,
    saturation: 0.2,
  },
  
  // Vignettage
  VIGNETTE: {
    type: EFFECT_TYPES.VIGNETTE,
    enabled: true,
    offset: 0.5,
    darkness: 0.5,
  },
  
  // Bruit de pellicule
  FILM_GRAIN: {
    type: EFFECT_TYPES.FILM_GRAIN,
    enabled: false,
    intensity: 0.1,
  },
};

// Configuration des effets spéciaux pour les portails
export const PORTAL_EFFECTS = {
  // Portail standard
  STANDARD: {
    ...BASE_EFFECTS.BLOOM,
    intensity: 0.8,
    threshold: 0.7,
    radius: 0.6,
    
    // Effet de distorsion
    distortion: {
      enabled: true,
      intensity: 0.1,
      speed: 1.0,
      scale: 1.0,
    },
    
    // Effet de particules
    particles: {
      enabled: true,
      count: 200,
      size: 0.02,
      color: '#a78bfa',
      speed: 0.1,
      spread: 1.0,
      lifetime: 5.0,
    },
  },
  
  // Portail de téléportation
  TELEPORT: {
    ...BASE_EFFECTS.BLOOM,
    intensity: 1.0,
    threshold: 0.6,
    radius: 0.8,
    
    // Effet de vortex
    vortex: {
      enabled: true,
      intensity: 0.2,
      speed: 1.5,
      scale: 1.2,
    },
    
    // Effet de particules
    particles: {
      enabled: true,
      count: 300,
      size: 0.015,
      color: '#60a5fa',
      speed: 0.2,
      spread: 1.2,
      lifetime: 4.0,
    },
  },
  
  // Portail secret
  SECRET: {
    ...BASE_EFFECTS.BLOOM,
    intensity: 1.2,
    threshold: 0.5,
    radius: 0.7,
    
    // Effet de distorsion
    distortion: {
      enabled: true,
      intensity: 0.15,
      speed: 1.2,
      scale: 0.8,
    },
    
    // Effet de particules
    particles: {
      enabled: true,
      count: 250,
      size: 0.01,
      color: '#f472b6',
      speed: 0.15,
      spread: 0.8,
      lifetime: 3.0,
    },
  },
};

// Configuration des effets pour l'interface utilisateur
export const UI_EFFECTS = {
  // Bouton survolé
  BUTTON_HOVER: {
    type: EFFECT_TYPES.GLOW,
    enabled: true,
    color: '#ffffff',
    intensity: 0.5,
    radius: 0.5,
  },
  
  // Bouton actif
  BUTTON_ACTIVE: {
    type: EFFECT_TYPES.GLOW,
    enabled: true,
    color: '#60a5fa',
    intensity: 0.8,
    radius: 0.8,
  },
  
  // Notification
  NOTIFICATION: {
    type: EFFECT_TYPES.GLOW,
    enabled: true,
    color: '#60a5fa',
    intensity: 0.7,
    radius: 0.7,
  },
  
  // Chargement
  LOADING: {
    type: EFFECT_TYPES.GLOW,
    enabled: true,
    color: '#6ee7b7',
    intensity: 0.6,
    radius: 0.6,
  },
};

// Configuration des effets pour l'environnement
export const ENVIRONMENT_EFFECTS = {
  // Brouillard
  FOG: {
    type: EFFECT_TYPES.FOG,
    enabled: true,
    color: '#000000',
    near: 1,
    far: 100,
    density: 0.01,
  },
  
  // Lumières volumentriques
  VOLUMETRIC_LIGHT: {
    type: EFFECT_TYPES.VOLUMETRIC_LIGHT,
    enabled: true,
    intensity: 1.0,
    samples: 100,
    steps: 10,
  },
  
  // Ombres
  SHADOWS: {
    enabled: true,
    type: 'PCFSoft', // PCF, PCFSoft, VSM
    bias: 0.0001,
    normalBias: 0.05,
    radius: 4,
    mapSize: 2048,
  },
  
  // Réflexions d'environnement
  ENV_MAP: {
    enabled: true,
    path: '/envmaps/',
    files: [
      'px.jpg', 'nx.jpg',
      'py.jpg', 'ny.jpg',
      'pz.jpg', 'nz.jpg'
    ],
    intensity: 1.0,
  },
};

// Configuration des effets pour les particules
export const PARTICLE_EFFECTS = {
  // Étincelles
  SPARKS: {
    type: EFFECT_TYPES.PARTICLE,
    enabled: true,
    count: 100,
    size: 0.05,
    color: '#ffcc00',
    speed: 1.0,
    spread: Math.PI / 4,
    lifetime: 2.0,
    gravity: -0.5,
  },
  
  // Fumée
  SMOKE: {
    type: EFFECT_TYPES.PARTICLE,
    enabled: true,
    count: 50,
    size: 0.1,
    color: '#666666',
    speed: 0.2,
    spread: 0.2,
    lifetime: 5.0,
    gravity: 0.1,
  },
  
  // Feu
  FIRE: {
    type: EFFECT_TYPES.FIRE,
    enabled: true,
    count: 200,
    size: 0.1,
    color: ['#ff6b00', '#ff9a00', '#ffcc00'],
    speed: 0.5,
    spread: 0.2,
    lifetime: 2.0,
    gravity: 0.1,
  },
  
  // Pluie
  RAIN: {
    type: EFFECT_TYPES.RAIN,
    enabled: false,
    count: 1000,
    size: 0.01,
    color: '#88c0d0',
    speed: 2.0,
    spread: 10.0,
    lifetime: 5.0,
    gravity: -0.5,
  },
  
  // Neige
  SNOW: {
    type: EFFECT_TYPES.SNOW,
    enabled: false,
    count: 500,
    size: 0.02,
    color: '#ffffff',
    speed: 0.5,
    spread: 20.0,
    lifetime: 10.0,
    gravity: -0.1,
  },
};

// Configuration des effets pour les transitions
export const TRANSITION_EFFECTS = {
  // Fondu
  FADE: {
    type: EFFECT_TYPES.FADE,
    duration: 500,
    color: '#000000',
    easing: 'easeInOutQuad',
  },
  
  // Balayage
  WIPE: {
    type: EFFECT_TYPES.WIPE,
    duration: 1000,
    direction: 'right',
    easing: 'easeInOutQuad',
  },
  
  // Zoom
  ZOOM: {
    type: EFFECT_TYPES.ZOOM,
    duration: 800,
    scale: 2.0,
    easing: 'easeInOutQuad',
  },
  
  // Tourbillon
  VORTEX: {
    type: EFFECT_TYPES.VORTEX,
    duration: 1200,
    angle: 2 * Math.PI,
    easing: 'easeInOutQuad',
  },
};

// Configuration des effets pour les personnages
export const CHARACTER_EFFECTS = {
  // Contour de sélection
  OUTLINE: {
    type: EFFECT_TYPES.OUTLINE,
    enabled: true,
    color: '#60a5fa',
    thickness: 0.01,
    alpha: 0.8,
  },
  
  // Effet de dégâts
  DAMAGE: {
    type: EFFECT_TYPES.DAMAGE,
    enabled: true,
    color: '#ff0000',
    intensity: 0.5,
    duration: 500,
  },
  
  // Effet de soin
  HEAL: {
    type: EFFECT_TYPES.GLOW,
    enabled: true,
    color: '#4ade80',
    intensity: 0.8,
    duration: 800,
  },
  
  // Effet d'invincibilité
  INVINCIBILITY: {
    type: EFFECT_TYPES.GLOW,
    enabled: true,
    color: '#ffffff',
    intensity: 0.6,
    duration: 2000,
    pulse: true,
  },
};

// Configuration des effets pour les armes et les projectiles
export const WEAPON_EFFECTS = {
  // Traînée de projectile
  PROJECTILE_TRAIL: {
    type: EFFECT_TYPES.TRAIL,
    enabled: true,
    color: '#ff6b00',
    length: 10,
    width: 0.1,
    opacity: 0.8,
  },
  
  // Impact de projectile
  PROJECTILE_IMPACT: {
    type: EFFECT_TYPES.PARTICLE,
    enabled: true,
    count: 50,
    size: 0.05,
    color: '#ff6b00',
    speed: 1.0,
    spread: Math.PI,
    lifetime: 1.0,
    gravity: 0.5,
  },
  
  // Explosion
  EXPLOSION: {
    type: EFFECT_TYPES.PARTICLE,
    enabled: true,
    count: 100,
    size: 0.1,
    color: ['#ff6b00', '#ffcc00', '#ff0000'],
    speed: 2.0,
    spread: 2 * Math.PI,
    lifetime: 2.0,
    gravity: 0.2,
  },
};

// Configuration des effets pour l'environnement de jeu
export const GAME_EFFECTS = {
  // Zone de dégâts
  DAMAGE_ZONE: {
    type: EFFECT_TYPES.GLOW,
    enabled: true,
    color: '#ff0000',
    intensity: 0.3,
    radius: 1.0,
    pulse: true,
  },
  
  // Zone de soin
  HEAL_ZONE: {
    type: EFFECT_TYPES.GLOW,
    enabled: true,
    color: '#4ade80',
    intensity: 0.3,
    radius: 1.0,
    pulse: true,
  },
  
  // Point de sauvegarde
  CHECKPOINT: {
    type: EFFECT_TYPES.GLOW,
    enabled: true,
    color: '#60a5fa',
    intensity: 0.5,
    radius: 0.8,
    pulse: true,
  },
  
  // Téléporteur
  TELEPORTER: {
    type: EFFECT_TYPES.GLOW,
    enabled: true,
    color: '#a78bfa',
    intensity: 0.7,
    radius: 1.0,
    pulse: true,
  },
};

// Configuration des effets pour la réalité augmentée
export const AR_EFFECTS = {
  // Marqueur détecté
  MARKER_DETECTED: {
    type: EFFECT_TYPES.GLOW,
    enabled: true,
    color: '#4ade80',
    intensity: 0.8,
    radius: 0.5,
    duration: 500,
  },
  
  // Marqueur perdu
  MARKER_LOST: {
    type: EFFECT_TYPES.GLOW,
    enabled: true,
    color: '#ef4444',
    intensity: 0.8,
    radius: 0.5,
    duration: 500,
  },
  
  // Suivi de surface
  SURFACE_TRACKING: {
    type: EFFECT_TYPES.GRID,
    enabled: true,
    color: '#60a5fa',
    size: 1.0,
    divisions: 10,
    fade: 0.5,
  },
  
  // Mesures
  MEASUREMENT: {
    type: EFFECT_TYPES.LINE,
    enabled: true,
    color: '#ffffff',
    width: 0.01,
    dashed: true,
    dashSize: 0.1,
    gapSize: 0.05,
  },
};

// Configuration des effets pour l'accessibilité
export const ACCESSIBILITY_EFFECTS = {
  // Mode daltonien
  COLORBLIND: {
    type: 'protanopia', // protanopia, deuteranopia, tritanopia
    enabled: false,
    severity: 1.0,
  },
  
  // Contraste élevé
  HIGH_CONTRAST: {
    enabled: false,
    foreground: '#ffffff',
    background: '#000000',
  },
  
  // Taille du texte
  TEXT_SIZE: {
    enabled: false,
    scale: 1.0,
  },
  
  // Sous-titres
  SUBTITLES: {
    enabled: true,
    background: 'rgba(0, 0, 0, 0.7)',
    color: '#ffffff',
    size: 16,
    font: 'Arial',
  },
};

// Configuration des effets pour le débogage
export const DEBUG_EFFECTS = {
  // Afficher les limites
  BOUNDING_BOX: {
    enabled: false,
    color: '#00ff00',
    opacity: 0.5,
  },
  
  // Afficher les normales
  NORMALS: {
    enabled: false,
    size: 0.1,
    color: '#0000ff',
  },
  
  // Afficher les axes
  AXES: {
    enabled: false,
    size: 1.0,
  },
  
  // Afficher la grille
  GRID: {
    enabled: false,
    size: 10,
    divisions: 10,
    color: '#888888',
  },
};

// Configuration des paramètres de rendu
export const RENDER_SETTINGS = {
  // Qualité
  QUALITY: {
    preset: 'high', // low, medium, high, ultra
    resolution: 1.0,
    antialias: true,
    anisotropy: 8,
    shadowMap: true,
    shadowMapType: 'PCFSoft', // BasicShadowMap, PCFShadowMap, PCFSoftShadowMap, VSMShadowMap
    shadowMapResolution: 2048,
    shadowMapBias: 0.0001,
    shadowMapNormalBias: 0.05,
  },
  
  // Performances
  PERFORMANCE: {
    maxFPS: 60,
    powerPreference: 'high-performance', // default, high-performance, low-power
    precision: 'highp', // highp, mediump, lowp
    sortObjects: true,
    logFPS: false,
  },
  
  // Post-traitement
  POST_PROCESSING: {
    enabled: true,
    antialias: true,
    gammaCorrection: true,
    gammaFactor: 2.2,
    physicallyCorrectLights: true,
    toneMapping: 'ACESFilmic', // NoToneMapping, LinearToneMapping, ReinhardToneMapping, CineonToneMapping, ACESFilmicToneMapping
    toneMappingExposure: 1.0,
  },
  
  // Optimisations
  OPTIMIZATIONS: {
    frustumCulling: true,
    morphTargets: false,
    skinning: true,
    instancing: true,
    vertexColors: true,
    vertexTangents: false,
    vertexUvs: true,
    wireframe: false,
  },
};

// Configuration des paramètres audio
export const AUDIO_SETTINGS = {
  // Volume
  VOLUME: {
    master: 1.0,
    music: 0.8,
    effects: 1.0,
    voice: 1.0,
    ui: 1.0,
    ambient: 0.6,
  },
  
  // Qualité
  QUALITY: {
    sampleRate: 44100,
    channels: 2,
    bitDepth: 16,
    codec: 'mp3', // mp3, ogg, aac, wav
    streaming: true,
    preload: true,
    spatial: true,
    distanceModel: 'inverse', // linear, inverse, exponential
    rolloffFactor: 1.0,
    refDistance: 1.0,
    maxDistance: 10000,
  },
  
  // Effets
  EFFECTS: {
    reverb: {
      enabled: true,
      impulse: '/audio/impulses/room.wav',
      wet: 0.2,
      dry: 0.8,
      decay: 2.0,
      preDelay: 0.01,
    },
    
    equalizer: {
      enabled: true,
      bands: [
        { frequency: 60, gain: 0 },    // Basse
        { frequency: 170, gain: 0 },   // Basse-médium
        { frequency: 350, gain: 0 },   // Basse-médium
        { frequency: 1000, gain: 0 },  // Moyen
        { frequency: 3500, gain: 0 },  // Haut-médium
        { frequency: 10000, gain: 0 }, // Aigu
      ],
    },
    
    compressor: {
      enabled: true,
      threshold: -24,
      knee: 30,
      ratio: 12,
      attack: 0.003,
      release: 0.25,
    },
  },
};

// Configuration des paramètres de physique
export const PHYSICS_SETTINGS = {
  // Moteur physique
  ENGINE: 'ammo', // ammo, cannon, oimo, rapier, havok
  
  // Gravité
  GRAVITY: {
    x: 0,
    y: -9.8,
    z: 0,
  },
  
  // Paramètres du monde
  WORLD: {
    broadphase: 'sweep', // naive, sweep, grid
    solver: 'split', // sequential, split
    iterations: 10,
    tolerance: 0.001,
    friction: 0.1,
    restitution: 0.3,
    contactEquationStiffness: 1e7,
    contactEquationRelaxation: 3,
    frictionEquationStiffness: 1e7,
    frictionEquationRelaxation: 3,
  },
  
  // Performances
  PERFORMANCE: {
    fixedTimeStep: 1 / 60,
    maxSubSteps: 3,
    maxSimulationTime: 0.5,
    sleepMode: true,
    sleepTimeThreshold: 1.0,
    sleepVelocityThreshold: 0.1,
    sleepAngularVelocityThreshold: 0.1,
  },
  
  // Débogage
  DEBUG: {
    enabled: false,
    wireframe: true,
    aabb: false,
    contactPoints: false,
    constraints: false,
    normals: false,
  },
};

export default {
  EFFECT_TYPES,
  BASE_EFFECTS,
  PORTAL_EFFECTS,
  UI_EFFECTS,
  ENVIRONMENT_EFFECTS,
  PARTICLE_EFFECTS,
  TRANSITION_EFFECTS,
  CHARACTER_EFFECTS,
  WEAPON_EFFECTS,
  GAME_EFFECTS,
  AR_EFFECTS,
  ACCESSIBILITY_EFFECTS,
  DEBUG_EFFECTS,
  RENDER_SETTINGS,
  AUDIO_SETTINGS,
  PHYSICS_SETTINGS,
};
