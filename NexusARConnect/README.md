# Nexus AR Connect

Nexus AR Connect est une application innovante qui transforme les codes QR en portails interactifs en réalité augmentée. Chaque code QR scanné ouvre un portail 3D flottant avec des animations fluides et des interactions immersives.

## Fonctionnalités

- 🔍 **Scan de QR codes** avec retour visuel en temps réel
- 🌀 **Portails 3D interactifs** qui s'animent lors de la détection
- 🎨 **Design moderne** avec des animations fluides et des effets visuels impressionnants
- 📱 **Interface intuitive** optimisée pour mobile et desktop
- 🎮 **Interactions tactiles** pour une expérience utilisateur naturelle

## Technologies utilisées

- **Frontend** : HTML5, CSS3, JavaScript (ES6+)
- **Réalité Augmentée** : AR.js, A-Frame
- **Animations** : CSS Animations, Web Animations API
- **Design** : Flexbox, CSS Grid, Variables CSS
- **Outils** : Vite (pour le développement local)

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/nexus-ar-connect.git
   cd nexus-ar-connect
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

4. Ouvrez votre navigateur à l'adresse indiquée (généralement http://localhost:3000)

## Utilisation

1. **Mode Scanner** :
   - Pointez votre appareil photo vers un code QR
   - L'application détectera automatiquement le code
   - Un portail 3D s'ouvrira à l'emplacement du code

2. **Interaction avec les portails** :
   - Touchez ou cliquez sur les éléments interactifs
   - Faites glisser pour faire pivoter la vue
   - Pincez pour zoomer/dézoomer

3. **Fermeture d'un portail** :
   - Appuyez sur le bouton "Fermer" en bas de l'écran
   - Ou éloignez-vous du code QR

## Création de vos propres portails

Vous pouvez créer des portails personnalisés en générant des codes QR avec des données structurées :

```
nexus://portal/type?title=Votre%20Titre&content=Contenu%20personnalisé&animation=float
```

Paramètres disponibles :
- `type` : Type de portail (default, info, media)
- `title` : Titre du portail
- `content` : Contenu à afficher
- `animation` : Type d'animation (float, pulse, spin)

## Personnalisation

### Thèmes

Modifiez les variables CSS dans `css/style.css` pour personnaliser les couleurs :

```css
:root {
    --primary: #6e44ff;
    --secondary: #00f7ff;
    --dark: #0a0e23;
    --light: #ffffff;
}
```

### Animations

Ajoutez vos propres animations dans le fichier CSS :

```css
@keyframes myAnimation {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}
```

## Compatibilité

- **Navigateurs supportés** : Chrome, Firefox, Safari, Edge (dernières versions)
- **Mobile** : Compatible avec les appareils iOS et Android
- **Recommandé** : Utilisez un appareil avec accéléromètre pour une meilleure expérience AR

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Auteur

- **Votre Nom** - [@votre-username](https://github.com/votre-utilisateur)

## Remerciements

- L'équipe AR.js pour la bibliothèque de réalité augmentée
- La communauté A-Frame pour les composants 3D
- Tous les contributeurs qui ont rendu ce projet possible
