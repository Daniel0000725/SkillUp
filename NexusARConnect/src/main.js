/**
 * Point d'entrée principal de l'application Nexus AR Connect
 */

// Styles chargés via index.html (css/style.css)

// Polices chargées via Google Fonts dans index.html

// Importation des composants principaux
import app from './app';
import { playSound } from './utils/audio';
import { setupServiceWorker } from './utils/service-worker';

// Configuration du mode développement
const isDevelopment = import.meta.env.DEV;
const appVersion = import.meta.env.VITE_APP_VERSION || '1.0.0';

if (isDevelopment) {
  console.log('Mode développement activé');
  
  // Activer les outils de développement A-Frame
  if (window.AFRAME) {
    window.AFRAME.log.enableError = true;
    window.AFRAME.log.enableWarning = true;
  }
  
  // Afficher les informations de version
  console.log(`Version ${appVersion}`);
}

// Fonction d'initialisation asynchrone
async function init() {
  try {
    // Afficher le message de démarrage
    console.log('%cNexus AR Connect', 'color: #6e44ff; font-size: 24px; font-weight: bold;');
    console.log('Initialisation en cours...');
    
    // Initialiser le service worker
    if ('serviceWorker' in navigator) {
      await setupServiceWorker();
    }
    
    // Initialiser l'application
    const initialized = await app.init();
    
    if (initialized) {
      // L'application est prête
      console.log('Application prête!');
      
      // Jouer le son de démarrage
      playSound('startup');
      
      // Cacher le curseur de chargement du navigateur
      document.documentElement.classList.add('loaded');
      
      // Émettre un événement personnalisé
      const event = new CustomEvent('app-ready', { 
        detail: { 
          timestamp: new Date().toISOString(),
          version: process.env.npm_package_version || '1.0.0'
        } 
      });
      document.dispatchEvent(event);
    } else {
      throw new Error('Échec de l\'initialisation de l\'application');
    }
  } catch (error) {
    console.error('Erreur critique lors du démarrage:', error);
    
    // Afficher un message d'erreur à l'utilisateur
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerHTML = `
      <h2>Erreur de démarrage</h2>
      <p>Impossible de démarrer l'application. Veuillez recharger la page ou réessayer plus tard.</p>
      <p><small>${error.message}</small></p>
      <button onclick="window.location.reload()">Recharger</button>
    `;
    
    document.body.innerHTML = '';
    document.body.appendChild(errorMessage);
    document.body.className = 'error';
  }
}

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
  // Démarrer l'initialisation
  init().catch(error => {
    console.error('Erreur non gérée lors de l\'initialisation:', error);
  });
});

// Gestion des erreurs non capturées
window.addEventListener('error', (event) => {
  console.error('Erreur non capturée:', event.error || event.message);
  
  // Afficher un message d'erreur à l'utilisateur
  const errorDiv = document.createElement('div');
  errorDiv.className = 'global-error';
  errorDiv.textContent = 'Une erreur est survenue. Veuillez recharger la page.';
  document.body.appendChild(errorDiv);
  
  // Envoyer le rapport d'erreur
  if (window.Sentry) {
    window.Sentry.captureException(event.error || new Error(event.message));
  }
});

// Gestion des promesses non gérées
window.addEventListener('unhandledrejection', (event) => {
  console.error('Promesse non gérée:', event.reason);
  
  // Envoyer le rapport d'erreur
  if (window.Sentry) {
    window.Sentry.captureException(event.reason);
  }
});

// Exposer l'application globale pour le débogage
if (process.env.NODE_ENV === 'development') {
  window.NexusAR = {
    app,
    version: process.env.npm_package_version || '1.0.0',
    debug: {
      showStats: () => {
        if (window.AFRAME && window.AFRAME.scenes[0]) {
          window.AFRAME.scenes[0].setAttribute('stats', '');
        }
      },
      hideStats: () => {
        if (window.AFRAME && window.AFRAME.scenes[0]) {
          window.AFRAME.scenes[0].removeAttribute('stats');
        }
      },
      toggleStats: () => {
        if (window.AFRAME && window.AFRAME.scenes[0]) {
          const scene = window.AFRAME.scenes[0];
          if (scene.hasAttribute('stats')) {
            scene.removeAttribute('stats');
          } else {
            scene.setAttribute('stats', '');
          }
        }
      }
    }
  };
  
  console.log('NexusAR est disponible dans la console (window.NexusAR)');
}
