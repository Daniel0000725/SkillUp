# Nexus AR Connect - Guide d'installation et d'utilisation

## Description
Nexus AR Connect est une application innovante qui transforme les codes QR en portails interactifs de réalité augmentée. Chaque code QR scanné ouvre un portail 3D flottant avec des animations fluides et des interactions tactiles.

## Fonctionnalités principales
- Scan de QR codes avec retour visuel en temps réel
- Portails 3D interactifs qui s'animent à la détection
- Design moderne avec des animations fluides
- Fonctionne hors ligne après la première installation
- Interface utilisateur intuitive et réactive

## Installation

### Prérequis
- Un navigateur web moderne (Chrome, Firefox, Edge, Safari)
- Une connexion Internet pour la première installation
- Une caméra pour le scan des QR codes

### Étapes d'installation
1. Téléchargez tous les fichiers du projet dans un dossier
2. Ouvrez le fichier `index.html` dans votre navigateur
3. Acceptez les permissions d'accès à la camêtre quand demandé

### Installation en tant qu'application (PWA)
1. Ouvrez l'application dans Chrome ou Edge
2. Cliquez sur l'icône d'installation dans la barre d'adresse
3. Suivez les instructions pour installer l'application

## Utilisation

### Scanner un QR code
1. Lancez l'application
2. Pointez votre caméra vers un code QR Nexus AR
3. Le portail correspondant s'ouvrira automatiquement

### Interagir avec un portail
- Touchez ou cliquez sur les éléments interactifs
- Faites glisser pour faire pivoter la vue
- Utilisez les boutons à l'écran pour les actions

### Créer vos propres portails
1. Générez un QR code avec le format suivant :
   ```
   nexus://portal/type?title=Titre&content=Contenu&animation=type
   ```
2. Remplacez les paramètres selon vos besoins

## Dépannage

### La caméra ne se lance pas
- Vérifiez les permissions du navigateur
- Assurez-vous qu'aucune autre application n'utilise la caméra
- Rafraîchissez la page

### L'application ne se charge pas
- Vérifiez votre connexion Internet
- Essayez de vider le cache du navigateur
- Assurez-vous que JavaScript est activé

## Personnalisation
Vous pouvez personnaliser l'application en modifiant :
- `css/style.css` pour les styles
- `js/app.js` pour le comportement
- `manifest.json` pour les métadonnées PWA

## Support
Pour toute question ou problème, veuillez contacter le support technique.

---
© 2025 Nexus AR Connect - Tous droits réservés
