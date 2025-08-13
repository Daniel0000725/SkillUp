/**
 * Configuration des paramètres audio
 */

export const AUDIO_CONFIG = {
  // Paramètres de base
  base: {
    enabled: true,
    masterVolume: 1.0,
    muted: false,
    loop: false,
    autoplay: false,
    preload: 'auto',
    playbackRate: 1.0,
    detectSilence: true,
    silenceThreshold: -50,
    silenceDuration: 0.5,
    batterySaver: false,
    disableBackgroundAudio: false,
    respectSilentMode: true,
  },
  
  // Catégories audio
  categories: {
    music: { volume: 0.8, loop: true },
    sfx: { volume: 1.0, loop: false },
    voice: { volume: 1.0, loop: false },
    ui: { volume: 0.8, loop: false },
    ambient: { volume: 0.6, loop: true }
  },
  
  // Audio spatial
  spatial: {
    enabled: true,
    distanceModel: 'inverse',
    speedOfSound: 343.3,
    dopplerFactor: 1.0,
    refDistance: 1.0,
    maxDistance: 10000,
    rolloffFactor: 1.0
  }
};

export default AUDIO_CONFIG;
