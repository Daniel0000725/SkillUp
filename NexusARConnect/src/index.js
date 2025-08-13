import './styles/global.css';
import { initARScene } from './scenes/arScene';
import { setupUI } from './components/ui';
import { setupEventListeners } from './utils/eventListeners';

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
  console.log('Nexus AR Connect - Initialisation');
  
  // Vérification de la compatibilité AR
  if (!AFRAME.utils.device.checkHeadsetConnected() && 
      !AFRAME.utils.device.isMobile()) {
    alert('Pour une meilleure expérience, utilisez un appareil mobile avec support AR');
  }

  // Initialisation de la scène AR
  initARScene();
  
  // Configuration de l'interface utilisateur
  setupUI();
  
  // Configuration des écouteurs d'événements
  setupEventListeners();
});

// Gestion des mises à jour PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker enregistré avec succès');
      })
      .catch(error => {
        console.error('Échec de l\'enregistrement du Service Worker:', error);
      });
  });
}
