import { AUDIO_CONFIG, AUDIO_FILES } from '../config/audio';

class AudioManager {
  constructor() {
    this.audioContext = null;
    this.sounds = new Map();
    this.muted = false;
    this.volume = AUDIO_CONFIG.masterVolume;
    this.initialized = false;
    this.audioEnabled = false;
  }

  /**
   * Initialise le gestionnaire audio
   */
  async init() {
    if (this.initialized) return;
    
    try {
      // Créer le contexte audio
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) {
        console.warn('Web Audio API non supportée');
        return false;
      }
      
      this.audioContext = new AudioContext(AUDIO_CONFIG.performance.audioContext);
      
      // Initialiser les sons
      await this._preloadSounds();
      
      // Gestion du déverrouillage audio sur mobile
      this._setupAudioUnlock();
      
      this.initialized = true;
      this.audioEnabled = true;
      
      if (AUDIO_CONFIG.debug.testMode) {
        this._testAllSounds();
      }
      
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'initialisation audio:', error);
      return false;
    }
  }
  
  /**
   * Précharge tous les sons configurés
   */
  async _preloadSounds() {
    const promises = AUDIO_FILES.map(src => this._loadSound(src));
    await Promise.all(promises);
    console.log('Tous les sons ont été chargés');
  }
  
  /**
   * Charge un son individuel
   */
  async _loadSound(src) {
    if (this.sounds.has(src)) return this.sounds.get(src);
    
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', src, true);
      request.responseType = 'arraybuffer';
      
      request.onload = () => {
        if (request.status === 200) {
          this.audioContext.decodeAudioData(request.response, (buffer) => {
            this.sounds.set(src, buffer);
            resolve(buffer);
          }, (error) => {
            console.error('Erreur de décodage audio:', error);
            reject(error);
          });
        } else {
          const error = new Error(`Erreur de chargement audio: ${request.statusText}`);
          console.error(error);
          reject(error);
        }
      };
      
      request.onerror = (error) => {
        console.error('Erreur réseau lors du chargement audio:', error);
        reject(error);
      };
      
      request.send();
    });
  }
  
  /**
   * Configure le déverrouillage audio sur mobile
   */
  _setupAudioUnlock() {
    if (!AUDIO_CONFIG.compatibility.autoUnlock) return;
    
    const unlock = () => {
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume().then(() => {
          console.log('AudioContext débloqué avec succès');
          document.removeEventListener('click', unlock);
          document.removeEventListener('touchstart', unlock);
          document.removeEventListener('keydown', unlock);
        });
      }
    };
    
    // Déverrouiller au premier clic/touche
    document.addEventListener('click', unlock, { once: true });
    document.addEventListener('touchstart', unlock, { once: true });
    document.addEventListener('keydown', unlock, { once: true });
  }
  
  /**
   * Joue un son
   */
  play(soundName, options = {}) {
    if (!this.audioEnabled || this.muted) return null;
    
    const soundConfig = this._getSoundConfig(soundName);
    if (!soundConfig) {
      console.warn(`Son non trouvé: ${soundName}`);
      return null;
    }
    
    const {
      volume = soundConfig.volume || 1.0,
      rate = soundConfig.rate || 1.0,
      loop = soundConfig.loop || false,
      onEnded = null,
      spatial = false,
      position = { x: 0, y: 0, z: 0 }
    } = options;
    
    // Vérifier si le son est chargé
    if (!this.sounds.has(soundConfig.src)) {
      console.warn(`Son non chargé: ${soundName}`);
      this._loadSound(soundConfig.src); // Charger en arrière-plan
      return null;
    }
    
    const buffer = this.sounds.get(soundConfig.src);
    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();
    
    // Configuration de la source
    source.buffer = buffer;
    source.loop = loop;
    source.playbackRate.value = rate;
    
    // Configuration du volume
    gainNode.gain.value = this.volume * volume;
    
    // Connexion des nœuds
    if (spatial && AUDIO_CONFIG.performance.spatialAudio.enabled) {
      const panner = this.audioContext.createPanner();
      panner.panningModel = 'HRTF';
      panner.distanceModel = AUDIO_CONFIG.performance.spatialAudio.distanceModel;
      panner.refDistance = AUDIO_CONFIG.performance.spatialAudio.refDistance;
      panner.maxDistance = AUDIO_CONFIG.performance.spatialAudio.maxDistance;
      panner.rolloffFactor = AUDIO_CONFIG.performance.spatialAudio.rolloffFactor;
      panner.coneInnerAngle = AUDIO_CONFIG.performance.spatialAudio.coneInnerAngle;
      panner.coneOuterAngle = AUDIO_CONFIG.performance.spatialAudio.coneOuterAngle;
      panner.coneOuterGain = AUDIO_CONFIG.performance.spatialAudio.coneOuterGain;
      
      panner.setPosition(position.x, position.y, position.z);
      
      source.connect(gainNode);
      gainNode.connect(panner);
      panner.connect(this.audioContext.destination);
    } else {
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
    }
    
    // Gestion de la fin de lecture
    source.onended = () => {
      if (onEnded && typeof onEnded === 'function') {
        onEnded();
      }
    };
    
    // Démarrer la lecture
    source.start(0);
    
    // Retourner un objet pour contrôler la lecture
    return {
      stop: (fadeOut = 0) => {
        if (fadeOut > 0) {
          gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + fadeOut);
          setTimeout(() => {
            source.stop();
          }, fadeOut * 1000);
        } else {
          source.stop();
        }
      },
      setVolume: (vol) => {
        gainNode.gain.value = this.volume * vol;
      },
      setRate: (r) => {
        source.playbackRate.value = r;
      },
      source: source
    };
  }
  
  /**
   * Obtient la configuration d'un son par son nom
   */
  _getSoundConfig(soundName) {
    // Parcourir toutes les catégories de sons
    for (const category of Object.values(AUDIO_CONFIG)) {
      if (typeof category === 'object' && soundName in category) {
        return category[soundName];
      }
    }
    return null;
  }
  
  /**
   * Active/désactive le son
   */
  toggleMute() {
    this.muted = !this.muted;
    return !this.muted;
  }
  
  /**
   * Définit le volume principal
   */
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    return this.volume;
  }
  
  /**
   * Active/désactive complètement l'audio
   */
  setEnabled(enabled) {
    this.audioEnabled = enabled;
    return this.audioEnabled;
  }
  
  /**
   * Teste tous les sons (mode débogage)
   */
  _testAllSounds() {
    console.log('Test de tous les sons...');
    
    let delay = 0;
    const playNextSound = (sounds, index) => {
      if (index >= sounds.length) return;
      
      const soundName = sounds[index];
      setTimeout(() => {
        console.log(`Joue: ${soundName}`);
        this.play(soundName, {
          onEnded: () => playNextSound(sounds, index + 1)
        });
      }, delay);
      
      delay += 1000; // 1 seconde entre chaque son
    };
    
    // Récupérer tous les noms de sons
    const allSounds = [];
    for (const [category, sounds] of Object.entries(AUDIO_CONFIG)) {
      if (typeof sounds === 'object' && !Array.isArray(sounds)) {
        for (const [name, config] of Object.entries(sounds)) {
          if (config && typeof config === 'object' && 'src' in config) {
            allSounds.push(`${category}.${name}`);
          }
        }
      }
    }
    
    playNextSound(allSounds, 0);
  }
}

// Exporte une instance unique du gestionnaire audio
const audioManager = new AudioManager();

export default audioManager;

// Fonctions d'aide pour les sons courants
export const playSound = (name, options) => audioManager.play(name, options);
export const toggleMute = () => audioManager.toggleMute();
export const setVolume = (volume) => audioManager.setVolume(volume);
export const setAudioEnabled = (enabled) => audioManager.setEnabled(enabled);

// Initialisation automatique au chargement du module
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    audioManager.init().then(() => {
      console.log('AudioManager initialisé avec succès');
    }).catch(error => {
      console.error('Erreur lors de l\'initialisation audio:', error);
    });
  });
}
