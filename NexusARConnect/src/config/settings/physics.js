/**
 * Configuration des paramètres de physique
 */

export const PHYSICS_CONFIG = {
  // Moteur physique
  engine: 'ammo', // 'ammo', 'cannon', 'oimo', 'rapier', 'havok'
  
  // Gravité (m/s²)
  gravity: {
    x: 0,
    y: -9.81,
    z: 0
  },
  
  // Performances
  performance: {
    // Nombre d'itérations par pas de temps
    iterations: 10,
    
    // Pas de temps fixe (secondes)
    fixedTimeStep: 1 / 60,
    
    // Nombre maximum de sous-étapes
    maxSubSteps: 3,
    
    // Détection des collisions
    collisionDetection: {
      broadphase: 'sweep', // 'naive', 'sweep', 'grid'
      narrowphase: 'sap', // 'sap', 'gjk', 'sat'
      collisionMargin: 0.05,
      continuous: true
    },
    
    // Résolution des contraintes
    constraintResolution: {
      solver: 'split', // 'sequential', 'split', 'jacobi'
      iterations: 10,
      tolerance: 0.001
    }
  },
  
  // Matériaux
  materials: {
    default: {
      friction: 0.5,
      restitution: 0.3,
      mass: 0, // 0 = statique
      linearDamping: 0.01,
      angularDamping: 0.01
    },
    metal: { friction: 0.4, restitution: 0.1 },
    wood: { friction: 0.7, restitution: 0.2 },
    plastic: { friction: 0.3, restitution: 0.5 },
    rubber: { friction: 0.8, restitution: 0.7 },
    ice: { friction: 0.05, restitution: 0.1 },
    glass: { friction: 0.2, restitution: 0.8 }
  },
  
  // Débogage
  debug: {
    showBoundingBoxes: false,
    showAxes: false,
    showNormals: false,
    showContacts: false,
    showConstraints: false,
    showForces: false,
    showVelocities: false
  },
  
  // Couches de collision (bitmask)
  collisionLayers: {
    DEFAULT: 1,
    STATIC: 2,
    DYNAMIC: 4,
    KINEMATIC: 8,
    TRIGGER: 16,
    SENSOR: 32,
    CHARACTER: 64,
    ITEM: 128
  },
  
  // Personnage
  character: {
    height: 1.8,
    radius: 0.3,
    crouchHeight: 1.2,
    jumpHeight: 1.0,
    walkSpeed: 2.0,
    runSpeed: 5.0,
    crouchSpeed: 1.0,
    acceleration: 10.0,
    deceleration: 15.0,
    lookSensitivity: 1.0,
    invertY: false,
    invertX: false,
    verticalLookLimit: 90,
    maxSlope: 45,
    stepHeight: 0.3,
    updateDistance: 0.1,
    predictionDistance: 0.05
  },
  
  // Véhicule
  vehicle: {
    chassisMass: 1500,
    maxEngineForce: 2000,
    maxBrakingForce: 1000,
    maxSteering: 35,
    centerOfMass: { x: 0, y: 0.5, z: 0 },
    suspensionStiffness: 20.0,
    suspensionDamping: 2.3,
    suspensionCompression: 4.4,
    suspensionRestLength: 0.6,
    rollInfluence: 0.2,
    wheelRadius: 0.5,
    wheelWidth: 0.4,
    wheelFriction: 1000
  },
  
  // Fluides
  fluid: {
    density: 1000,
    viscosity: 0.01,
    vorticity: 0.5,
    surfaceTension: 0.01,
    simulationScale: 1.0,
    pressureIterations: 20,
    viscosityIterations: 10,
    surfaceTensionIterations: 5
  }
};

export default PHYSICS_CONFIG;
