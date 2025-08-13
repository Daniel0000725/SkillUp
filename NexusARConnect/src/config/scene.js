/**
 * Configuration de la scène AR
 */

export const SCENE_CONFIG = {
  // Configuration de la caméra
  camera: {
    fov: 60,
    near: 0.1,
    far: 10000,
    position: { x: 0, y: 1.6, z: 0 },
    rotation: { x: 0, y: 0, z: 0 }
  },
  
  // Configuration de l'éclairage
  lighting: {
    ambient: {
      color: '#FFFFFF',
      intensity: 0.5
    },
    directional: {
      color: '#FFFFFF',
      intensity: 0.8,
      position: { x: -0.5, y: 1, z: -0.3 }
    },
    hemisphere: {
      skyColor: '#4488FF',
      groundColor: '#CCCCCC',
      intensity: 0.5
    }
  },
  
  // Configuration des contrôles
  controls: {
    enableGyro: true,
    enableVR: true,
    enableAR: true,
    enableTouch: true,
    enableKeyboard: false
  },
  
  // Configuration des performances
  performance: {
    maxFPS: 60,
    antialias: true,
    powerPreference: 'high-performance',
    sortObjects: true
  },
  
  // Configuration du rendu
  renderer: {
    alpha: true,
    antialias: true,
    shadowMap: {
      enabled: true,
      type: 'PCFSoft'
    },
    pixelRatio: window.devicePixelRatio || 1
  },
  
  // Configuration AR
  ar: {
    sourceType: 'webcam',
    detectionMode: 'mono_and_matrix',
    matrixCodeType: '3x3',
    debugUI: false,
    maxDetectionRate: 60,
    cameraParametersUrl: '/assets/data/camera_para.dat',
    patternRatio: 0.5,
    trackingMethod: 'best',
    levelTuning: 0.5,
    patternWidth: 0.05
  },
  
  // Configuration des marqueurs
  markers: {
    defaultSize: 0.05, // en mètres
    defaultType: 'pattern',
    patternUrl: '/assets/patterns/pattern-marker.patt',
    barcodeUrl: '/assets/patterns/barcode-marker.patt',
    preset: 'hiro',
    size: 0.1,
    type: 'pattern',
    url: '/assets/patterns/pattern-marker.patt',
    descriptorsUrl: '/assets/patterns/pattern-marker.fset',
    descriptorsUrlBack: '/assets/patterns/pattern-marker.fset3',
    debug: false
  },
  
  // Configuration des événements
  events: {
    doubleClickThreshold: 300,
    longPressThreshold: 500,
    tapThreshold: 5,
    swipeThreshold: 30
  },
  
  // Configuration du débogage
  debug: {
    enabled: false,
    showStats: false,
    showAxes: false,
    showGrid: false,
    showMarkerHelper: false,
    showMarkerWarnings: true
  }
};

export default SCENE_CONFIG;
