/**
 * Configuration des paramètres de l'application Nexus AR Connect
 * Fichier principal - Importe et exporte toutes les configurations
 */

// Paramètres de base
import { APP_CONFIG } from './settings/app';

// Paramètres de rendu
import { RENDER_CONFIG } from './settings/render';

// Paramètres audio
import { AUDIO_CONFIG } from './settings/audio';

// Paramètres de physique
import { PHYSICS_CONFIG } from './settings/physics';

// Paramètres réseau
import { NETWORK_CONFIG } from './settings/network';

// Configuration complète
export const CONFIG = {
  ...APP_CONFIG,
  render: RENDER_CONFIG,
  audio: AUDIO_CONFIG,
  physics: PHYSICS_CONFIG,
  network: NETWORK_CONFIG,
};

// Fonction utilitaire pour obtenir une valeur de configuration
// Exemple: getConfig('render.quality')
export function getConfig(path, defaultValue = null) {
  const parts = path.split('.');
  let current = CONFIG;
  
  for (const part of parts) {
    if (current[part] === undefined) {
      return defaultValue;
    }
    current = current[part];
  }
  
  return current !== undefined ? current : defaultValue;
}

// Fonction utilitaire pour définir une valeur de configuration
// Exemple: setConfig('render.quality', 'high')
export function setConfig(path, value) {
  const parts = path.split('.');
  let current = CONFIG;
  
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (current[part] === undefined) {
      current[part] = {};
    }
    current = current[part];
  }
  
  current[parts[parts.length - 1]] = value;
  return true;
}

// Fonction utilitaire pour réinitialiser la configuration
export function resetConfig() {
  // Réinitialiser la configuration aux valeurs par défaut
  Object.assign(CONFIG, {
    ...APP_CONFIG,
    render: { ...RENDER_CONFIG },
    audio: { ...AUDIO_CONFIG },
    physics: { ...PHYSICS_CONFIG },
    network: { ...NETWORK_CONFIG },
  });
  
  return CONFIG;
}

// Exporter la configuration par défaut
export default CONFIG;
