// Configuration de l'application
const CONFIG = {
    // Types de portails avec leurs propriétés
    portalTypes: {
        default: {
            title: 'Portail Nexus',
            color: '#6e44ff',
            secondaryColor: '#00f7ff',
            model: 'default',
            animation: 'float',
            sound: 'portal_open.mp3'
        },
        info: {
            title: 'Information',
            color: '#00f7ff',
            secondaryColor: '#00ff88',
            model: 'info',
            animation: 'pulse',
            sound: 'info_open.mp3'
        },
        media: {
            title: 'Média',
            color: '#ff2d75',
            secondaryColor: '#ff9a5a',
            model: 'media',
            animation: 'spin',
            sound: 'media_open.mp3'
        }
    },
    // Effets sonores
    sounds: {
        scan: 'sounds/scan.mp3',
        portalOpen: 'sounds/portal_open.mp3',
        portalClose: 'sounds/portal_close.mp3',
        success: 'sounds/success.mp3',
        error: 'sounds/error.mp3'
    },
    // Messages
    messages: {
        ready: 'Prêt à scanner',
        scanning: 'Analyse en cours...',
        portalDetected: 'Portail détecté',
        noCamera: 'Accès à la caméra refusé',
        cameraError: 'Erreur de la caméra',
        qrError: 'QR code non reconnu'
    }
};

// État de l'application
let appState = {
    isScanning: false,
    currentPortal: null,
    activeMarkers: new Map(),
    audioContext: null,
    audioBuffers: {}
};

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    setupEventListeners();
    checkCameraAccess();
    initAR();
});

// Initialisation des composants
function initApp() {
    // Initialisation du contexte audio
    try {
        appState.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.warn('Web Audio API non supportée');
    }

    // Préchargement des sons
    preloadSounds();
}

// Configuration des écouteurs d'événements
function setupEventListeners() {
    // Bouton de fermeture du portail
    const closeButton = document.getElementById('close-portal');
    if (closeButton) {
        closeButton.addEventListener('click', closePortal);
    }

    // Détection des changements de visibilité de la page
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Gestion du mode plein écran
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
}

// Vérification de l'accès à la caméra
async function checkCameraAccess() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        // Libérer le flux immédiatement après la vérification
        stream.getTracks().forEach(track => track.stop());
        updateStatus('ready');
    } catch (error) {
        console.error('Erreur d\'accès à la caméra:', error);
        updateStatus('error', CONFIG.messages.noCamera);
    }
}

// Initialisation de la réalité augmentée
function initAR() {
    // Vérifier la compatibilité AR
    if (!navigator.xr) {
        console.warn('WebXR non supporté');
        // Mode simulation pour le développement
        simulateQRDetection();
        return;
    }

    // Configuration d'AR.js
    const arScene = document.querySelector('a-scene');
    
    if (arScene) {
        arScene.addEventListener('markerFound', (event) => {
            const markerId = event.target.id;
            if (!appState.activeMarkers.has(markerId)) {
                onMarkerFound(markerId);
                appState.activeMarkers.set(markerId, true);
            }
        });

        arScene.addEventListener('markerLost', (event) => {
            const markerId = event.target.id;
            appState.activeMarkers.delete(markerId);
        });
    }
}

// Simulation de détection de QR code pour le développement
function simulateQRDetection() {
    console.log('Mode simulation activé (WebXR non supporté)');
    
    // Simuler la détection d'un QR code après 3 secondes
    setTimeout(() => {
        onQRCodeDetected({
            data: 'nexus://portal/default?title=Portail%20de%20démonstration&content=Bienvenue%20dans%20Nexus%20AR%20Connect!',
            type: 'qrcode'
        });
    }, 3000);
}

// Gestion de la détection d'un QR code
function onQRCodeDetected(qrCode) {
    if (!qrCode || !qrCode.data) {
        console.error('Données QR code invalides');
        return;
    }

    updateStatus('scanning');
    playSound('scan');

    try {
        // Traitement des données du QR code
        const portalData = parseQRCodeData(qrCode.data);
        
        if (portalData) {
            openPortal(portalData);
        } else {
            console.warn('Format de données non reconnu');
            updateStatus('error', CONFIG.messages.qrError);
        }
    } catch (error) {
        console.error('Erreur lors du traitement du QR code:', error);
        updateStatus('error', 'Erreur de traitement');
    }
}

// Analyse des données du QR code
function parseQRCodeData(data) {
    // Vérifier si c'est une URL Nexus
    if (data.startsWith('nexus://')) {
        const url = new URL(data);
        const params = new URLSearchParams(url.search);
        
        return {
            type: url.pathname.replace('/', '') || 'default',
            title: params.get('title') || 'Portail Nexus',
            content: params.get('content') || 'Contenu du portail',
            model: params.get('model') || 'default',
            animation: params.get('animation') || 'float'
        };
    }
    
    // Autres formats de QR code peuvent être ajoutés ici
    
    return null;
}

// Ouverture d'un portail
function openPortal(portalData) {
    if (appState.currentPortal) {
        closePortal();
    }

    // Mettre à jour l'interface utilisateur
    document.getElementById('scanner-view').style.display = 'none';
    const arView = document.getElementById('ar-view');
    arView.style.display = 'block';

    // Créer le portail
    const portalContainer = document.getElementById('portal-container');
    const portalTemplate = document.getElementById('portal-template');
    const portalClone = document.importNode(portalTemplate.content, true);
    
    // Configurer le portail
    const portal = portalClone.querySelector('.portal');
    const portalTitle = portal.querySelector('.portal-title');
    
    // Appliquer les données du portail
    const portalType = CONFIG.portalTypes[portalData.type] || CONFIG.portalTypes.default;
    
    portalTitle.textContent = portalData.title;
    portal.style.setProperty('--primary-color', portalType.color);
    portal.style.setProperty('--secondary-color', portalType.secondaryColor);
    
    // Ajouter des classes d'animation
    portal.classList.add(`animation-${portalData.animation || portalType.animation}`);
    
    // Ajouter le portail au DOM
    portalContainer.innerHTML = '';
    portalContainer.appendChild(portal);
    
    // Mettre à jour l'état
    appState.currentPortal = {
        id: `portal-${Date.now()}`,
        type: portalData.type,
        element: portal
    };
    
    // Jouer le son d'ouverture
    playSound('portalOpen');
    
    // Mettre à jour le statut
    updateStatus('active', `Portail ${portalData.type} actif`);
    
    // Démarrer l'animation
    startPortalAnimation(portal);
}

// Fermeture du portail actif
function closePortal() {
    if (!appState.currentPortal) return;
    
    const portal = appState.currentPortal.element;
    
    // Animation de fermeture
    portal.style.animation = 'fadeOut 0.5s forwards';
    
    // Jouer le son de fermeture
    playSound('portalClose');
    
    // Nettoyer après l'animation
    setTimeout(() => {
        const arView = document.getElementById('ar-view');
        if (arView) {
            arView.style.display = 'none';
        }
        
        const scannerView = document.getElementById('scanner-view');
        if (scannerView) {
            scannerView.style.display = 'block';
        }
        
        // Réinitialiser l'état
        appState.currentPortal = null;
        updateStatus('ready');
    }, 500);
}

// Gestion des changements de visibilité de la page
function handleVisibilityChange() {
    if (document.visibilityState === 'visible') {
        // Reprendre les animations et les sons
        if (appState.audioContext && appState.audioContext.state === 'suspended') {
            appState.audioContext.resume();
        }
    } else {
        // Mettre en pause les sons
        if (appState.audioContext && appState.audioContext.state === 'running') {
            appState.audioContext.suspend();
        }
    }
}

// Gestion des changements de mode plein écran
function handleFullscreenChange() {
    const isFullscreen = document.fullscreenElement || 
                        document.webkitFullscreenElement || 
                        document.mozFullScreenElement || 
                        document.msFullscreenElement;
    
    // Ajouter/supprimer une classe au body
    document.body.classList.toggle('fullscreen', !!isFullscreen);
}

// Mise à jour de la barre d'état
function updateStatus(status, message) {
    const statusElement = document.querySelector('#connection-status');
    const statusDot = statusElement?.querySelector('.status-dot');
    const statusText = statusElement?.querySelector('span:not(.status-dot)');
    
    if (!statusElement || !statusDot || !statusText) return;
    
    switch (status) {
        case 'ready':
            statusDot.style.backgroundColor = 'var(--success)';
            statusDot.style.boxShadow = '0 0 10px var(--success)';
            statusText.textContent = message || CONFIG.messages.ready;
            break;
            
        case 'scanning':
            statusDot.style.backgroundColor = 'var(--secondary)';
            statusDot.style.boxShadow = '0 0 10px var(--secondary)';
            statusText.textContent = message || CONFIG.messages.scanning;
            break;
            
        case 'active':
            statusDot.style.backgroundColor = 'var(--primary)';
            statusDot.style.boxShadow = '0 0 10px var(--primary)';
            statusText.textContent = message || CONFIG.messages.portalDetected;
            break;
            
        case 'error':
            statusDot.style.backgroundColor = 'var(--error)';
            statusDot.style.boxShadow = '0 0 10px var(--error)';
            statusText.textContent = message || 'Erreur';
            break;
    }
}

// Préchargement des sons
async function preloadSounds() {
    if (!appState.audioContext) return;
    
    const soundPromises = Object.entries(CONFIG.sounds).map(async ([key, path]) => {
        try {
            const response = await fetch(path);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await appState.audioContext.decodeAudioData(arrayBuffer);
            appState.audioBuffers[key] = audioBuffer;
        } catch (error) {
            console.warn(`Impossible de charger le son ${key}:`, error);
        }
    });
    
    await Promise.all(soundPromises);
}

// Lecture d'un son
function playSound(soundName) {
    if (!appState.audioContext || !appState.audioBuffers[soundName]) return;
    
    const source = appState.audioContext.createBufferSource();
    source.buffer = appState.audioBuffers[soundName];
    source.connect(appState.audioContext.destination);
    source.start(0);
    
    return source;
}

// Démarrage de l'animation du portail
function startPortalAnimation(portalElement) {
    if (!portalElement) return;
    
    // Ajouter une classe d'animation
    portalElement.classList.add('animate');
    
    // Configurer les écouteurs d'interaction
    const actionButton = portalElement.querySelector('.action-btn');
    if (actionButton) {
        actionButton.addEventListener('click', () => {
            // Action lors du clic sur le bouton du portail
            console.log('Bouton du portail cliqué');
            playSound('success');
        });
    }
}

// Détection de marqueur AR
function onMarkerFound(markerId) {
    console.log(`Marqueur détecté: ${markerId}`);
    
    // Simuler la détection d'un QR code basé sur l'ID du marqueur
    const markerData = {
        'marker-0': 'nexus://portal/default?title=Portail%20Marqueur&content=Contenu%20du%20marqueur%20détecté',
        'marker-1': 'nexus://portal/info?title=Information&content=Ceci%20est%20une%20information%20importante',
        'marker-2': 'nexus://portal/media?title=Média&content=Contenu%20média%20intéractif'
    };
    
    const qrData = markerData[markerId] || markerData['marker-0'];
    
    onQRCodeDetected({
        data: qrData,
        type: 'qrcode'
    });
}

// Fonction utilitaire pour basculer en plein écran
function toggleFullscreen() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement && 
        !document.mozFullScreenElement && !document.msFullscreenElement) {
        // Entrer en plein écran
        const element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    } else {
        // Sortir du plein écran
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// Exposer les fonctions globales
window.NexusAR = {
    openPortal,
    closePortal,
    toggleFullscreen,
    playSound
};
