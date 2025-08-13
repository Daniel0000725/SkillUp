/**
 * Configuration des paramètres de rendu
 */

export const RENDER_CONFIG = {
  // Paramètres de base du rendu
  base: {
    // Activer/désactiver l'antialiasing
    antialias: true,
    
    // Activer/désactiver le lissage des textures
    anisotropy: true,
    
    // Niveau d'anisotropie
    anisotropyLevel: 8,
    
    // Activer/désactiver la correction gamma
    gammaOutput: true,
    
    // Facteur gamma
    gammaFactor: 2.2,
    
    // Méthode de mappage de tons
    toneMapping: 'ACESFilmic', // NoToneMapping, LinearToneMapping, ReinhardToneMapping, CineonToneMapping, ACESFilmicToneMapping
    
    // Exposition
    toneMappingExposure: 1.0,
  },
  
  // Paramètres des ombres
  shadows: {
    // Activer/désactiver les ombres
    enabled: true,
    
    // Type de shadow map
    type: 'PCFSoft', // BasicShadowMap, PCFShadowMap, PCFSoftShadowMap, VSMShadowMap
    
    // Résolution de la shadow map
    mapSize: 2048,
    
    // Biais de la shadow map
    bias: 0.0001,
    
    // Biais normal de la shadow map
    normalBias: 0.05,
    
    // Qualité des ombres
    quality: 'high', // low, medium, high, ultra
    
    // Distance maximale des ombres
    distance: 50,
    
    // Opacité des ombres
    opacity: 0.5,
    
    // Couleur des ombres
    color: 0x000000,
    
    // Flou des ombres
    blur: 1,
    
    // Itérations du flou
    blurIterations: 1,
    
    // Rayon du flou
    blurRadius: 1,
  },
  
  // Paramètres des reflets
  reflections: {
    // Activer/désactiver les reflets
    enabled: true,
    
    // Qualité des reflets
    quality: 'high', // low, medium, high, ultra
    
    // Résolution des reflets
    resolution: 1024,
    
    // Distance de rendu des reflets
    distance: 100,
    
    // Biais des reflets
    bias: 0.1,
    
    // Flou des reflets
    blur: 1,
    
    // Itérations du flou
    blurIterations: 1,
    
    // Rayon du flou
    blurRadius: 1,
  },
  
  // Paramètres des réfractions
  refractions: {
    // Activer/désactiver les réfractions
    enabled: true,
    
    // Qualité des réfractions
    quality: 'high', // low, medium, high, ultra
    
    // Résolution des réfractions
    resolution: 1024,
    
    // Distance de rendu des réfractions
    distance: 100,
    
    // Biais des réfractions
    bias: 0.1,
    
    // Indice de réfraction
    ior: 1.5,
  },
  
  // Paramètres SSAO (Ambient Occlusion)
  ssao: {
    // Activer/désactiver SSAO
    enabled: true,
    
    // Qualité SSAO
    quality: 'high', // off, low, medium, high, ultra
    
    // Rayon SSAO
    radius: 0.5,
    
    // Intensité SSAO
    intensity: 1.0,
    
    // Distance SSAO
    distance: 0.1,
    
    // Biais SSAO
    bias: 0.01,
    
    // Résolution SSAO
    resolution: 1024,
  },
  
  // Paramètres SSR (Screen Space Reflections)
  ssr: {
    // Activer/désactiver SSR
    enabled: true,
    
    // Qualité SSR
    quality: 'high', // off, low, medium, high, ultra
    
    // Intensité SSR
    intensity: 1.0,
    
    // Distance SSR
    distance: 10,
    
    // Biais SSR
    bias: 0.01,
    
    // Résolution SSR
    resolution: 1024,
    
    // Itérations SSR
    iterations: 10,
    
    // Seuil de profondeur SSR
    depthThreshold: 0.1,
    
    // Seuil de normale SSR
    normalThreshold: 0.1,
  },
  
  // Paramètres DOF (Depth of Field)
  dof: {
    // Activer/désactiver DOF
    enabled: true,
    
    // Qualité DOF
    quality: 'high', // off, low, medium, high, ultra
    
    // Distance focale
    focus: 10,
    
    // Ouverture
    aperture: 0.1,
    
    // Distance maximale de flou
    maxBlur: 1.0,
    
    // Résolution DOF
    resolution: 1024,
  },
  
  // Paramètres Bloom
  bloom: {
    // Activer/désactiver Bloom
    enabled: true,
    
    // Qualité Bloom
    quality: 'high', // off, low, medium, high, ultra
    
    // Intensité Bloom
    intensity: 0.5,
    
    // Seuil Bloom
    threshold: 0.8,
    
    // Rayon Bloom
    radius: 0.5,
    
    // Itérations Bloom
    iterations: 3,
    
    // Résolution Bloom
    resolution: 1024,
  },
  
  // Paramètres Motion Blur
  motionBlur: {
    // Activer/désactiver Motion Blur
    enabled: true,
    
    // Qualité Motion Blur
    quality: 'high', // off, low, medium, high, ultra
    
    // Intensité Motion Blur
    intensity: 0.5,
    
    // Résolution Motion Blur
    resolution: 1024,
  },
  
  // Paramètres de distorsion
  distortion: {
    // Activer/désactiver la distorsion
    enabled: true,
    
    // Qualité de la distorsion
    quality: 'high', // off, low, medium, high, ultra
    
    // Intensité de la distorsion
    intensity: 1.0,
    
    // Vitesse de la distorsion
    speed: 1.0,
    
    // Résolution de la distorsion
    resolution: 1024,
  },
  
  // Paramètres des particules
  particles: {
    // Activer/désactiver les particules
    enabled: true,
    
    // Qualité des particules
    quality: 'high', // off, low, medium, high, ultra
    
    // Nombre maximum de particules
    maxParticles: 10000,
    
    // Taille des particules
    size: 1.0,
    
    // Taille minimale des particules
    minSize: 0.1,
    
    // Taille maximale des particules
    maxSize: 10.0,
    
    // Durée de vie des particules
    lifetime: 5.0,
    
    // Durée de vie minimale des particules
    minLifetime: 0.1,
    
    // Durée de vie maximale des particules
    maxLifetime: 10.0,
    
    // Vitesse des particules
    speed: 1.0,
    
    // Vitesse minimale des particules
    minSpeed: 0.1,
    
    // Vitesse maximale des particules
    maxSpeed: 10.0,
    
    // Taille de l'émetteur
    emitterSize: 1.0,
    
    // Taille minimale de l'émetteur
    minEmitterSize: 0.1,
    
    // Taille maximale de l'émetteur
    maxEmitterSize: 10.0,
    
    // Taux d'émission
    emissionRate: 100,
    
    // Taux d'émission minimum
    minEmissionRate: 1,
    
    // Taux d'émission maximum
    maxEmissionRate: 1000,
  },
  
  // Paramètres de l'environnement
  environment: {
    // Activer/désactiver l'environnement
    enabled: true,
    
    // Qualité de l'environnement
    quality: 'high', // off, low, medium, high, ultra
    
    // Intensité de l'environnement
    intensity: 1.0,
    
    // Couleur de l'environnement
    color: 0xffffff,
    
    // Couleur ambiante
    ambientColor: 0x404040,
    
    // Intensité ambiante
    ambientIntensity: 0.5,
    
    // Couleur du ciel
    skyColor: 0x87ceeb,
    
    // Couleur du sol
    groundColor: 0x8b4513,
    
    // Couleur de l'horizon
    horizonColor: 0x87ceeb,
    
    // Couleur du zénith
    zenithColor: 0x1e90ff,
    
    // Couleur du soleil
    sunColor: 0xffffcc,
    
    // Position du soleil
    sunPosition: {
      x: 1,
      y: 1,
      z: 1,
    },
    
    // Intensité du soleil
    sunIntensity: 1.0,
    
    // Couleur de la lune
    moonColor: 0xffffff,
    
    // Position de la lune
    moonPosition: {
      x: -1,
      y: 1,
      z: -1,
    },
    
    // Intensité de la lune
    moonIntensity: 0.5,
    
    // Couleur des étoiles
    starColor: 0xffffff,
    
    // Intensité des étoiles
    starIntensity: 1.0,
    
    // Nombre d'étoiles
    starCount: 1000,
    
    // Taille des étoiles
    starSize: 1.0,
    
    // Distance des étoiles
    starDistance: 1000,
    
    // Rotation des étoiles
    starRotation: 0.0,
    
    // Vitesse de rotation des étoiles
    starRotationSpeed: 0.0001,
    
    // Couleur des nuages
    cloudColor: 0xffffff,
    
    // Intensité des nuages
    cloudIntensity: 0.5,
    
    // Opacité des nuages
    cloudOpacity: 0.5,
    
    // Vitesse des nuages
    cloudSpeed: 0.0001,
    
    // Direction des nuages
    cloudDirection: 1.0,
    
    // Échelle des nuages
    cloudScale: 1.0,
    
    // Densité des nuages
    cloudDensity: 0.5,
    
    // Couleur du brouillard
    fogColor: 0xffffff,
    
    // Densité du brouillard
    fogDensity: 0.0001,
    
    // Distance de début du brouillard
    fogNear: 1,
    
    // Distance de fin du brouillard
    fogFar: 1000,
    
    // Couleur du brouillard d'altitude
    heightFogColor: 0x87ceeb,
    
    // Densité du brouillard d'altitude
    heightFogDensity: 0.0001,
    
    // Hauteur de début du brouillard d'altitude
    heightFogStart: 0,
    
    // Hauteur de fin du brouillard d'altitude
    heightFogEnd: 1000,
    
    // Couleur de la brume
    hazeColor: 0x87ceeb,
    
    // Densité de la brume
    hazeDensity: 0.0001,
    
    // Distance de début de la brume
    hazeNear: 1,
    
    // Distance de fin de la brume
    hazeFar: 1000,
    
    // Couleur du brouillard de distance
    distanceFogColor: 0x87ceeb,
    
    // Densité du brouillard de distance
    distanceFogDensity: 0.0001,
    
    // Distance de début du brouillard de distance
    distanceFogStart: 1,
    
    // Distance de fin du brouillard de distance
    distanceFogEnd: 1000,
    
    // Couleur du brouillard de volume
    volumetricFogColor: 0x87ceeb,
    
    // Densité du brouillard de volume
    volumetricFogDensity: 0.0001,
    
    // Distance de début du brouillard de volume
    volumetricFogStart: 1,
    
    // Distance de fin du brouillard de volume
    volumetricFogEnd: 1000,
    
    // Couleur de la lumière ambiante
    ambientLightColor: 0x404040,
    
    // Intensité de la lumière ambiante
    ambientLightIntensity: 0.5,
    
    // Couleur de la lumière directionnelle
    directionalLightColor: 0xffffff,
    
    // Intensité de la lumière directionnelle
    directionalLightIntensity: 1.0,
    
    // Position de la lumière directionnelle
    directionalLightPosition: {
      x: 1,
      y: 1,
      z: 1,
    },
    
    // Couleur de la lumière hémisphérique
    hemisphereLightSkyColor: 0x87ceeb,
    
    // Couleur du sol de la lumière hémisphérique
    hemisphereLightGroundColor: 0x8b4513,
    
    // Intensité de la lumière hémisphérique
    hemisphereLightIntensity: 0.5,
    
    // Couleur de la lumière ponctuelle
    pointLightColor: 0xffffff,
    
    // Intensité de la lumière ponctuelle
    pointLightIntensity: 1.0,
    
    // Distance de la lumière ponctuelle
    pointLightDistance: 100,
    
    // Atténuation de la lumière ponctuelle
    pointLightDecay: 1.0,
    
    // Position de la lumière ponctuelle
    pointLightPosition: {
      x: 0,
      y: 10,
      z: 0,
    },
    
    // Couleur de la lumière de projecteur
    spotLightColor: 0xffffff,
    
    // Intensité de la lumière de projecteur
    spotLightIntensity: 1.0,
    
    // Distance de la lumière de projecteur
    spotLightDistance: 100,
    
    // Angle de la lumière de projecteur
    spotLightAngle: Math.PI / 4,
    
    // Pénombra de la lumière de projecteur
    spotLightPenumbra: 0.1,
    
    // Atténuation de la lumière de projecteur
    spotLightDecay: 1.0,
    
    // Position de la lumière de projecteur
    spotLightPosition: {
      x: 0,
      y: 10,
      z: 0,
    },
    
    // Cible de la lumière de projecteur
    spotLightTarget: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
  
  // Paramètres de la caméra
  camera: {
    // Type de caméra
    type: 'perspective', // perspective, orthographic, cube, spherical, cylindrical, stereo
    
    // Champ de vision
    fov: 75,
    
    // Rapport d'aspect
    aspect: window.innerWidth / window.innerHeight,
    
    // Plan proche
    near: 0.1,
    
    // Plan éloigné
    far: 1000,
    
    // Position de la caméra
    position: {
      x: 0,
      y: 1.6,
      z: 5,
    },
    
    // Cible de la caméra
    target: {
      x: 0,
      y: 1.6,
      z: 0,
    },
    
    // Vitesse de la caméra
    speed: 1.0,
    
    // Sensibilité de la caméra
    sensitivity: 1.0,
    
    // Inverser l'axe Y de la caméra
    invertY: false,
    
    // Inverser l'axe X de la caméra
    invertX: false,
    
    // Limites de rotation de la caméra
    rotationLimits: {
      minPolarAngle: 0,
      maxPolarAngle: Math.PI,
      minAzimuthAngle: -Infinity,
      maxAzimuthAngle: Infinity,
    },
    
    // Limites de translation de la caméra
    positionLimits: {
      minX: -Infinity,
      maxX: Infinity,
      minY: -Infinity,
      maxY: Infinity,
      minZ: -Infinity,
      maxZ: Infinity,
    },
    
    // Effets de la caméra
    effects: {
      // Activer/désactiver le flou de mouvement
      motionBlur: true,
      
      // Activer/désactiver le flou de profondeur de champ
      depthOfField: true,
      
      // Activer/désactiver l'aberration chromatique
      chromaticAberration: true,
      
      // Activer/désactiver le vignettage
      vignette: true,
      
      // Activer/désactiver le grain
      filmGrain: true,
      
      // Activer/désactiver le bruit
      noise: true,
      
      // Activer/désactiver le scan
      scanlines: true,
      
      // Activer/désactiver la distorsion
      distortion: true,
      
      // Activer/désactiver le flou de bougé
      cameraShake: true,
      
      // Activer/désactiver les reflets
      reflections: true,
      
      // Activer/désactiver les réfractions
      refractions: true,
      
      // Activer/désactiver l'occlusion ambiante
      ambientOcclusion: true,
      
      // Activer/désactiver les reflets d'écran
      screenSpaceReflections: true,
      
      // Activer/désactiver la correction gamma
      gammaCorrection: true,
      
      // Activer/désactiver le mappage de tons
      toneMapping: true,
      
      // Activer/désactiver le bloom
      bloom: true,
      
      // Activer/désactiver le brouillard
      fog: true,
      
      // Activer/désactiver la brume
      haze: true,
      
      // Activer/désactiver le brouillard de volume
      volumetricFog: true,
      
      // Activer/désactiver le brouillard de distance
      distanceFog: true,
      
      // Activer/désactiver le brouillard d'altitude
      heightFog: true,
      
      // Activer/désactiver les éclats de lumière
      lensFlares: true,
      
      // Activer/désactiver les étoiles
      stars: true,
      
      // Activer/désactiver les nuages
      clouds: true,
      
      // Activer/désactiver le soleil
      sun: true,
      
      // Activer/désactiver la lune
      moon: true,
      
      // Activer/désactiver le ciel
      sky: true,
      
      // Activer/désactiver le sol
      ground: true,
      
      // Activer/désactiver l'eau
      water: true,
      
      // Activer/désactiver les particules
      particles: true,
      
      // Activer/désactiver les effets de post-traitement
      postProcessing: true,
    },
  },
  
  // Paramètres de performance
  performance: {
    // Limiter le taux de rafraîchissement
    limitFPS: true,
    
    // Nombre maximum d'images par seconde
    maxFPS: 60,
    
    // Délai minimum entre les images (en ms)
    minFrameTime: 16, // ~60 FPS
    
    // Utiliser requestAnimationFrame
    useRequestAnimationFrame: true,
    
    // Utiliser setInterval pour le rendu
    useSetInterval: false,
    
    // Délai pour setInterval (en ms)
    renderInterval: 16, // ~60 FPS
    
    // Utiliser Web Workers pour le traitement
    useWorkers: true,
    
    // Nombre de Web Workers à utiliser
    workerCount: navigator.hardwareConcurrency || 4,
    
    // Activer le chargement paresseux
    lazyLoad: true,
    
    // Seuil de chargement paresseux (en pixels)
    lazyLoadThreshold: 100,
    
    // Activer le déchargement des ressources inutilisées
    unloadUnused: true,
    
    // Délai avant déchargement (en secondes)
    unloadDelay: 60,
    
    // Activer la compression des textures
    compressTextures: true,
    
    // Qualité de compression des textures (0-1)
    textureCompressionQuality: 0.8,
    
    // Utiliser des textures de résolution réduite
    useLowResTextures: false,
    
    // Facteur d'échelle des textures
    textureScale: 1.0,
    
    // Activer le mipmapping
    mipmapping: true,
    
    // Activer l'anisotropie
    anisotropy: true,
    
    // Niveau d'anisotropie
    anisotropyLevel: 8,
    
    // Activer la compression des géométries
    compressGeometry: true,
    
    // Niveau de compression des géométries (0-1)
    geometryCompressionLevel: 0.8,
    
    // Simplifier les géométries
    simplifyGeometry: true,
    
    // Niveau de simplification (0-1)
    simplificationRatio: 0.5,
    
    // Activer l'instanciation
    useInstancing: true,
    
    // Activer le frustum culling
    useFrustumCulling: true,
    
    // Activer l'occlusion culling
    useOcclusionCulling: true,
    
    // Activer le niveau de détail (LOD)
    useLOD: true,
    
    // Niveaux de détail
    lodLevels: [
      { distance: 0, quality: 'ultra' },
      { distance: 10, quality: 'high' },
      { distance: 25, quality: 'medium' },
      { distance: 50, quality: 'low' },
    ],
    
    // Activer la mise en cache
    useCache: true,
    
    // Taille maximale du cache (en Mo)
    maxCacheSize: 100,
    
    // Durée de vie du cache (en secondes)
    cacheLifetime: 3600,
    
    // Activer la mise en cache des ressources
    cacheAssets: true,
    
    // Activer la mise en cache des modèles 3D
    cacheModels: true,
    
    // Activer la mise en cache des textures
    cacheTextures: true,
    
    // Activer la mise en cache des sons
    cacheSounds: true,
    
    // Activer la mise en cache des shaders
    cacheShaders: true,
    
    // Activer la mise en cache des données
    cacheData: true,
  },
};

export default RENDER_CONFIG;
