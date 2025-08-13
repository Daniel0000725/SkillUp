// Enregistrement du Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker enregistré avec succès :', registration.scope);
        
        // Vérifier les mises à jour du Service Worker
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('Nouvelle version du Service Worker en cours d\'installation');
          
          newWorker.addEventListener('statechange', () => {
            switch (newWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  // Nouveau contenu disponible, afficher un bouton de rafraîchissement
                  showUpdateUI(registration);
                } else {
                  // Premier chargement, le contenu est mis en cache
                  console.log('Le contenu est mis en cache pour une utilisation hors ligne.');
                }
                break;
              case 'redundant':
                console.error('Le nouveau Service Worker est devenu redondant');
                break;
            }
          });
        });
      })
      .catch((error) => {
        console.error('Échec de l\'enregistrement du Service Worker :', error);
      });

    // Vérifier les mises à jour du Service Worker toutes les heures
    setInterval(() => {
      navigator.serviceWorker.getRegistration()
        .then((reg) => {
          if (reg) return reg.update();
          return null;
        })
        .catch((error) => {
          console.log('Erreur lors de la vérification des mises à jour :', error);
        });
    }, 60 * 60 * 1000);
  });

  // Gestion de la mise à jour de l'application
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });
}

// Afficher l'interface de mise à jour
function showUpdateUI(registration) {
  // Créer la bannière de mise à jour
  const updateBanner = document.createElement('div');
  updateBanner.id = 'update-banner';
  updateBanner.innerHTML = `
    <div class="update-content">
      <p>Une nouvelle version est disponible !</p>
      <div class="update-actions">
        <button id="update-now">Mettre à jour maintenant</button>
        <button id="update-later">Plus tard</button>
      </div>
    </div>
  `;
  
  // Styles pour la bannière
  const style = document.createElement('style');
  style.textContent = `
    #update-banner {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(10, 14, 35, 0.95);
      color: white;
      padding: 15px 25px;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(110, 68, 255, 0.3);
      max-width: 90%;
      width: 400px;
      animation: slideUp 0.5s ease-out;
    }
    
    .update-content {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .update-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
    
    #update-banner button {
      padding: 8px 16px;
      border: none;
      border-radius: 20px;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    #update-now {
      background: linear-gradient(45deg, #6e44ff, #00f7ff);
      color: #0a0e23;
    }
    
    #update-later {
      background: transparent;
      color: #ffffff;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    #update-now:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(110, 68, 255, 0.4);
    }
    
    @keyframes slideUp {
      from { transform: translate(-50%, 100px); opacity: 0; }
      to { transform: translate(-50%, 0); opacity: 1; }
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(updateBanner);
  
  // Gestion des clics sur les boutons
  document.getElementById('update-now').addEventListener('click', () => {
    if (registration.waiting) {
      // Envoyer un message au Service Worker pour déclencher l'activation
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    updateBanner.remove();
  });
  
  document.getElementById('update-later').addEventListener('click', () => {
    updateBanner.remove();
  });
  
  // Fermer la bannière après 30 secondes
  setTimeout(() => {
    if (document.body.contains(updateBanner)) {
      updateBanner.style.animation = 'fadeOut 0.5s forwards';
      setTimeout(() => updateBanner.remove(), 500);
    }
  }, 30000);
}

// Vérifier si une nouvelle version est disponible
function checkForUpdates() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration()
      .then(registration => {
        if (registration) {
          registration.update().catch(error => {
            console.log('Erreur lors de la vérification des mises à jour :', error);
          });
        }
      });
  }
}

// Exposer la fonction de vérification des mises à jour
window.checkForUpdates = checkForUpdates;

// Vérifier les mises à jour au chargement de la page
window.addEventListener('load', () => {
  // Vérifier les mises à jour toutes les heures
  setInterval(checkForUpdates, 60 * 60 * 1000);
});
