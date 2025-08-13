/**
 * Configuration des marqueurs AR pour Nexus AR Connect
 * Définit les modèles de marqueurs, leurs propriétés et leurs comportements
 */

// Types de marqueurs supportés
export const MARKER_TYPES = {
  PATTERN: 'pattern',  // Marqueur basé sur un motif (image)
  BARCODE: 'barcode',  // Marqueur basé sur un code-barres
  QRCODE: 'qrcode',    // Marqueur QR Code
  NFT: 'nft'           // Marqueur NFT (Natural Feature Tracking)
};

// Configuration des marqueurs par défaut
export const DEFAULT_MARKER_CONFIG = {
  type: MARKER_TYPES.PATTERN,
  size: 0.1,                  // Taille en mètres
  smooth: true,               // Lissage des mouvements
  smoothCount: 10,            // Nombre d'échantillons pour le lissage
  smoothTolerance: 0.01,      // Tolérance pour le lissage
  smoothThreshold: 1,         // Seuil pour le lissage
  emiteEvents: true,          // Émettre des événements
  debug: false,               // Mode débogage
  patternUrl: '',             // URL du modèle de marqueur
  descriptorsUrl: '',         // URL des descripteurs (optionnel)
  barcodeValue: null,         // Valeur du code-barres (si type BARCODE)
  qrCodeValue: null,          // Valeur du QR Code (si type QRCODE)
  nftMarkerUrl: '',           // URL du marqueur NFT (si type NFT)
  minConfidence: 0.5,         // Confiance minimale pour la détection
  preset: 'hiro',             // Préréglage de marqueur (hiro, kanji, etc.)
};

// Marqueurs prédéfinis
export const PRESET_MARKERS = {
  // Marqueur HIRO (par défaut)
  HIRO: {
    id: 'hiro',
    name: 'Hiro',
    description: 'Marqueur HIRO standard',
    type: MARKER_TYPES.PATTERN,
    patternUrl: '/markers/hiro.patt',
    size: 0.16,  // 16cm
    color: '#00ff00',
    preset: 'hiro',
  },
  
  // Marqueur Kanji
  KANJI: {
    id: 'kanji',
    name: 'Kanji',
    description: 'Marqueur Kanji',
    type: MARKER_TYPES.PATTERN,
    patternUrl: '/markers/kanji.patt',
    size: 0.16,  // 16cm
    color: '#ff0000',
    preset: 'kanji',
  },
  
  // Marqueur personnalisé 1
  CUSTOM_1: {
    id: 'custom1',
    name: 'Personnalisé 1',
    description: 'Premier marqueur personnalisé',
    type: MARKER_TYPES.PATTERN,
    patternUrl: '/markers/custom1.patt',
    size: 0.15,  // 15cm
    color: '#0000ff',
  },
  
  // Marqueur QR Code
  QR_CODE: {
    id: 'qrcode',
    name: 'QR Code',
    description: 'Détection de QR Code',
    type: MARKER_TYPES.QRCODE,
    size: 0.15,  // 15cm
    color: '#ffff00',
  },
  
  // Marqueur code-barres
  BAR_CODE: {
    id: 'barcode',
    name: 'Code-barres',
    description: 'Détection de code-barres',
    type: MARKER_TYPES.BARCODE,
    size: 0.15,  // 15cm
    color: '#00ffff',
  },
};

// Configuration des marqueurs pour les portails
export const PORTAL_MARKERS = {
  // Portail standard
  STANDARD: {
    ...PRESET_MARKERS.HIRO,
    portalType: 'standard',
    portalConfig: {
      innerRadius: 0.8,
      outerRadius: 1.0,
      segments: 32,
      color: '#6e44ff',
      opacity: 0.9,
      animation: {
        speed: 0.5,
        intensity: 0.1,
        distortion: 0.05,
      },
      particles: {
        count: 100,
        size: 0.02,
        color: '#a78bfa',
        speed: 0.1,
      },
    },
  },
  
  // Portail secret
  SECRET: {
    ...PRESET_MARKERS.KANJI,
    portalType: 'secret',
    portalConfig: {
      innerRadius: 0.7,
      outerRadius: 0.9,
      segments: 64,
      color: '#ff44aa',
      opacity: 0.8,
      animation: {
        speed: 1.0,
        intensity: 0.2,
        distortion: 0.1,
      },
      particles: {
        count: 200,
        size: 0.015,
        color: '#ff88cc',
        speed: 0.2,
      },
    },
  },
  
  // Portail de téléportation
  TELEPORT: {
    ...PRESET_MARKERS.CUSTOM_1,
    portalType: 'teleport',
    portalConfig: {
      innerRadius: 0.6,
      outerRadius: 0.8,
      segments: 24,
      color: '#44aaff',
      opacity: 0.85,
      animation: {
        speed: 1.5,
        intensity: 0.15,
        distortion: 0.08,
      },
      particles: {
        count: 150,
        size: 0.025,
        color: '#88ccff',
        speed: 0.15,
      },
    },
  },
};

// Configuration des marqueurs pour les objets 3D
export const OBJECT_MARKERS = {
  // Objet 3D simple
  SIMPLE_OBJECT: {
    ...PRESET_MARKERS.HIRO,
    objectType: 'gltf',
    objectUrl: '/models/object.glb',
    scale: { x: 0.1, y: 0.1, z: 0.1 },
    rotation: { x: 0, y: 0, z: 0 },
    position: { x: 0, y: 0, z: 0 },
    animation: {
      enabled: true,
      type: 'rotation',
      axis: 'y',
      speed: 1.0,
    },
  },
  
  // Objet animé
  ANIMATED_OBJECT: {
    ...PRESET_MARKERS.KANJI,
    objectType: 'gltf',
    objectUrl: '/models/animated.glb',
    scale: { x: 0.05, y: 0.05, z: 0.05 },
    rotation: { x: 0, y: 0, z: 0 },
    position: { x: 0, y: 0.1, z: 0 },
    animation: {
      enabled: true,
      clip: 'Animation',
      loop: true,
      crossFade: 0.5,
    },
  },
};

// Configuration des marqueurs pour les vidéos
export const VIDEO_MARKERS = {
  // Vidéo 360
  VIDEO_360: {
    ...PRESET_MARKERS.HIRO,
    videoType: '360',
    videoUrl: '/videos/360-video.mp4',
    radius: 2.0,
    autoplay: true,
    loop: true,
    controls: true,
  },
  
  // Vidéo standard
  STANDARD_VIDEO: {
    ...PRESET_MARKERS.KANJI,
    videoType: 'standard',
    videoUrl: '/videos/demo.mp4',
    width: 1.0,
    height: 0.5625, // 16:9
    autoplay: false,
    loop: true,
    controls: true,
  },
};

// Configuration des marqueurs pour les images
export const IMAGE_MARKERS = {
  // Image simple
  SIMPLE_IMAGE: {
    ...PRESET_MARKERS.HIRO,
    imageType: 'standard',
    imageUrl: '/images/placeholder.jpg',
    width: 1.0,
    height: 0.75, // 4:3
    transparent: false,
    opacity: 1.0,
  },
  
  // Image transparente
  TRANSPARENT_IMAGE: {
    ...PRESET_MARKERS.KANJI,
    imageType: 'transparent',
    imageUrl: '/images/transparent.png',
    width: 1.0,
    height: 1.0,
    transparent: true,
    opacity: 0.8,
  },
};

// Configuration des marqueurs pour le texte
export const TEXT_MARKERS = {
  // Texte simple
  SIMPLE_TEXT: {
    ...PRESET_MARKERS.HIRO,
    text: 'Hello AR!',
    font: 'Arial',
    size: 0.2,
    height: 0.05,
    color: '#ffffff',
    align: 'center',
    baseline: 'center',
    anchor: 'center',
    wrapCount: 20,
    wrapPixels: 1024,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelOffset: 0,
    bevelSegments: 3,
  },
  
  // Texte 3D
  TEXT_3D: {
    ...PRESET_MARKERS.KANJI,
    text: '3D Text',
    font: 'Arial Bold',
    size: 0.15,
    height: 0.05,
    color: '#ff9900',
    align: 'center',
    baseline: 'center',
    anchor: 'center',
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.01,
    bevelOffset: 0,
    bevelSegments: 5,
    curveSegments: 12,
    metalness: 0.8,
    roughness: 0.2,
  },
};

// Configuration des marqueurs pour les boutons
export const BUTTON_MARKERS = {
  // Bouton simple
  SIMPLE_BUTTON: {
    ...PRESET_MARKERS.HIRO,
    buttonType: 'simple',
    label: 'Cliquez-moi',
    width: 0.8,
    height: 0.4,
    radius: 0.1,
    color: '#6e44ff',
    textColor: '#ffffff',
    fontSize: 0.15,
    onClick: () => {
      console.log('Bouton cliqué!');
      // Action à effectuer lors du clic
    },
  },
  
  // Bouton avec icône
  ICON_BUTTON: {
    ...PRESET_MARKERS.KANJI,
    buttonType: 'icon',
    icon: '⭐',
    size: 0.3,
    color: '#ffcc00',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    onClick: () => {
      console.log('Bouton icône cliqué!');
      // Action à effectuer lors du clic
    },
  },
};

// Configuration des marqueurs pour les formulaires
export const FORM_MARKERS = {
  // Champ de texte
  TEXT_INPUT: {
    ...PRESET_MARKERS.HIRO,
    formType: 'text',
    label: 'Nom',
    placeholder: 'Entrez votre nom',
    width: 1.0,
    height: 0.2,
    fontSize: 0.1,
    color: '#000000',
    backgroundColor: '#ffffff',
    borderColor: '#6e44ff',
    borderWidth: 0.01,
    borderRadius: 0.05,
    padding: 0.05,
    onInput: (value) => {
      console.log('Texte saisi:', value);
      // Traitement de la saisie
    },
  },
  
  // Bouton de validation
  SUBMIT_BUTTON: {
    ...PRESET_MARKERS.KANJI,
    formType: 'submit',
    label: 'Valider',
    width: 0.6,
    height: 0.3,
    color: '#6e44ff',
    textColor: '#ffffff',
    fontSize: 0.12,
    borderRadius: 0.1,
    onClick: (formData) => {
      console.log('Formulaire soumis:', formData);
      // Traitement du formulaire
    },
  },
};

// Configuration des marqueurs pour les jeux
export const GAME_MARKERS = {
  // Cible
  TARGET: {
    ...PRESET_MARKERS.HIRO,
    gameType: 'target',
    radius: 0.5,
    segments: 5,
    colors: ['#ff0000', '#ffffff', '#0000ff', '#ffff00', '#00ff00'],
    points: [10, 20, 30, 40, 50],
    onHit: (points) => {
      console.log(`Touché! ${points} points`);
      // Gestion des points
    },
  },
  
  // Pièce de monnaie
  COIN: {
    ...PRESET_MARKERS.KANJI,
    gameType: 'coin',
    value: 10,
    radius: 0.2,
    thickness: 0.05,
    color: '#ffcc00',
    rotationSpeed: 2.0,
    onCollect: (value) => {
      console.log(`Pièce collectée: ${value} points`);
      // Ajout des points
    },
  },
};

// Configuration des marqueurs pour la réalité augmentée géolocalisée
export const GEOLOCATION_MARKERS = {
  // Point d'intérêt
  POI: {
    ...PRESET_MARKERS.HIRO,
    geolocationType: 'poi',
    title: 'Point d\'intérêt',
    description: 'Description du point d\'intérêt',
    latitude: 0,
    longitude: 0,
    altitude: 0,
    altitudeMode: 'relative',
    maxDistance: 1000, // en mètres
    icon: '/icons/poi.png',
    onReached: () => {
      console.log('Point d\'intérêt atteint!');
      // Action à effectuer lorsque l'utilisateur atteint le point
    },
  },
  
  // Zone d'intérêt
  ZONE: {
    ...PRESET_MARKERS.KANJI,
    geolocationType: 'zone',
    title: 'Zone d\'intérêt',
    description: 'Description de la zone d\'intérêt',
    latitude: 0,
    longitude: 0,
    radius: 50, // en mètres
    height: 10, // en mètres
    color: '#ff0000',
    opacity: 0.3,
    onEnter: () => {
      console.log('Zone d\'intérêt atteinte!');
      // Action à effectuer lorsque l'utilisateur entre dans la zone
    },
    onExit: () => {
      console.log('Zone d\'intérêt quittée!');
      // Action à effectuer lorsque l'utilisateur quitte la zone
    },
  },
};

// Configuration des marqueurs pour la réalité augmentée d'intérieur
export const INDOOR_MARKERS = {
  // Point de repère intérieur
  LANDMARK: {
    ...PRESET_MARKERS.HIRO,
    indoorType: 'landmark',
    title: 'Point de repère',
    description: 'Description du point de repère',
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    icon: '/icons/landmark.png',
    onDetected: () => {
      console.log('Point de repère détecté!');
      // Action à effectuer lorsque le point de repère est détecté
    },
  },
  
  // Zone interactive
  INTERACTIVE_ZONE: {
    ...PRESET_MARKERS.KANJI,
    indoorType: 'interactive',
    title: 'Zone interactive',
    description: 'Description de la zone interactive',
    position: { x: 0, y: 0, z: 0 },
    size: { width: 1, height: 1, depth: 1 },
    color: '#00ff00',
    opacity: 0.3,
    onInteract: () => {
      console.log('Interaction avec la zone!');
      // Action à effectuer lors de l'interaction avec la zone
    },
  },
};

// Configuration des marqueurs pour la réalité augmentée collaborative
export const COLLABORATIVE_MARKERS = {
  // Utilisateur
  USER: {
    ...PRESET_MARKERS.HIRO,
    collaborativeType: 'user',
    userId: '',
    username: 'Utilisateur',
    avatar: '/avatars/default.png',
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    onJoin: (user) => {
      console.log(`Utilisateur connecté: ${user.username}`);
      // Action à effectuer lorsqu'un utilisateur rejoint la session
    },
    onLeave: (user) => {
      console.log(`Utilisateur déconnecté: ${user.username}`);
      // Action à effectuer lorsqu'un utilisateur quitte la session
    },
  },
  
  // Objet partagé
  SHARED_OBJECT: {
    ...PRESET_MARKERS.KANJI,
    collaborativeType: 'object',
    objectId: '',
    objectType: 'gltf',
    objectUrl: '/models/shared-object.glb',
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    locked: false,
    onGrab: (user) => {
      console.log(`Objet pris par: ${user.username}`);
      // Action à effectuer lorsqu'un utilisateur prend l'objet
    },
    onRelease: (user) => {
      console.log(`Objet relâché par: ${user.username}`);
      // Action à effectuer lorsqu'un utilisateur relâche l'objet
    },
  },
};

// Configuration des marqueurs pour la réalité augmentée éducative
export const EDUCATIONAL_MARKERS = {
  // Point d'information
  INFO_POINT: {
    ...PRESET_MARKERS.HIRO,
    educationalType: 'info',
    title: 'Point d\'information',
    content: 'Contenu informatif à afficher',
    position: { x: 0, y: 0.2, z: 0 },
    icon: '/icons/info.png',
    onTap: () => {
      console.log('Point d\'information sélectionné');
      // Action à effectuer lors de la sélection du point
    },
  },
  
  // Quiz
  QUIZ: {
    ...PRESET_MARKERS.KANJI,
    educationalType: 'quiz',
    question: 'Question du quiz',
    answers: [
      { text: 'Réponse 1', correct: true },
      { text: 'Réponse 2', correct: false },
      { text: 'Réponse 3', correct: false },
    ],
    position: { x: 0, y: 0.3, z: 0 },
    onAnswer: (answer, isCorrect) => {
      console.log(`Réponse sélectionnée: ${answer} (${isCorrect ? 'correcte' : 'incorrecte'})`);
      // Action à effectuer en fonction de la réponse
    },
  },
};

// Configuration des marqueurs pour la réalité augmentée commerciale
export const COMMERCIAL_MARKERS = {
  // Produit
  PRODUCT: {
    ...PRESET_MARKERS.HIRO,
    commercialType: 'product',
    productId: '',
    name: 'Nom du produit',
    description: 'Description du produit',
    price: 0,
    currency: 'EUR',
    image: '/products/placeholder.jpg',
    model3d: '/models/product.glb',
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    onView: () => {
      console.log('Visualisation du produit');
      // Action à effectuer lors de la visualisation du produit
    },
    onBuy: () => {
      console.log('Achat du produit');
      // Action à effectuer lors de l'achat du produit
    },
  },
  
  // Promotion
  PROMOTION: {
    ...PRESET_MARKERS.KANJI,
    commercialType: 'promotion',
    title: 'Promotion',
    description: 'Description de la promotion',
    discount: 10, // pourcentage
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    position: { x: 0, y: 0.2, z: 0 },
    onRedeem: () => {
      console.log('Code promotionnel utilisé');
      // Action à effectuer lors de l'utilisation du code promotionnel
    },
  },
};

// Exportation des configurations
export default {
  MARKER_TYPES,
  DEFAULT_MARKER_CONFIG,
  PRESET_MARKERS,
  PORTAL_MARKERS,
  OBJECT_MARKERS,
  VIDEO_MARKERS,
  IMAGE_MARKERS,
  TEXT_MARKERS,
  BUTTON_MARKERS,
  FORM_MARKERS,
  GAME_MARKERS,
  GEOLOCATION_MARKERS,
  INDOOR_MARKERS,
  COLLABORATIVE_MARKERS,
  EDUCATIONAL_MARKERS,
  COMMERCIAL_MARKERS,
};
