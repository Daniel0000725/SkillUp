/**
 * Configuration SEO et métadonnées pour Nexus AR Connect
 */

export const SEO_CONFIG = {
  // Métadonnées générales
  siteName: 'Nexus AR Connect',
  title: 'Nexus AR Connect - Transformez vos QR codes en portails AR',
  description: 'Une application innovante qui transforme les codes QR en expériences de réalité augmentée interactives.',
  keywords: 'réalité augmentée, QR code, AR, portail, webxr, aframe, expérience immersive',
  author: 'Votre Nom',
  
  // URL du site (à mettre à jour en production)
  siteUrl: 'https://votredomaine.com',
  
  // Réseaux sociaux
  social: {
    twitter: '@votresite',
    facebook: 'votrepagesite',
    instagram: 'votrecompte',
    linkedin: 'votreprofil'
  },
  
  // Images pour les partages sociaux
  images: {
    logo: '/images/logo-512x512.png',
    banner: '/images/og-banner.jpg',
    icon: '/images/favicon.ico',
    appleIcon: '/images/apple-touch-icon.png',
    twitterCard: '/images/twitter-card.jpg'
  },
  
  // Configuration Open Graph
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    site_name: 'Nexus AR Connect',
    title: 'Nexus AR Connect - Transformez vos QR codes en portails AR',
    description: 'Une application innovante qui transforme les codes QR en expériences de réalité augmentée interactives.',
    defaultImageWidth: 1200,
    defaultImageHeight: 630
  },
  
  // Configuration Twitter Card
  twitter: {
    handle: '@votresite',
    site: '@votresite',
    cardType: 'summary_large_image'
  },
  
  // Configuration des balises meta supplémentaires
  additionalMetaTags: [
    { name: 'application-name', content: 'Nexus AR Connect' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'theme-color', content: '#0a0e23' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  
  // Configuration des icônes
  icons: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/images/apple-touch-icon.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png'
    }
  ],
  
  // Configuration des balises de suivi
  tracking: {
    googleAnalytics: {
      trackingId: 'UA-XXXXX-Y',
      anonymize: true
    }
  },
  
  // Configuration du référencement
  robots: 'index, follow',
  canonical: 'https://votredomaine.com'
};

export default SEO_CONFIG;
