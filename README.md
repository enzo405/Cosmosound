# Projet **Cosmosound**

## 1. **Description du projet**

Le projet **Cosmosound** est une plateforme de streaming musical en ligne inspirée de services populaires tels que Spotify, Deezer ou YouTube Music. Cette application permet aux utilisateurs de découvrir de nouveaux artistes, d'écouter leurs morceaux préférés, de créer des playlists personnalisées et de gérer leur profil utilisateur. Le projet vise à offrir une expérience fluide et intuitive, tout en facilitant la découverte musicale.

Le projet wa été réalisé dans le cadre d'une formation en Licence CDA (Conception et Développement d'Applications).

## 2. **Fonctionnalités**

### Utilisateurs
- Inscription, connexion et déconnexion avec authentification sécurisée (JWT).
- Gestion de profils personnalisés (pseudo, avatar).

### Musiques
- Upload, modification et suppression des musiques (uniquement par leur créateur).
- Les musiques générées par IA sont marquées par un label "IA".
- Un utilisateur ayant uploadé au moins une musique devient *artiste*.

### Playlists
- Création, modification et suppression de playlists.
- Toutes les playlists sont publiques et peuvent être écoutées par tous les utilisateurs.
- Chaque playlist peut être associée à plusieurs genres musicaux.

### Abonnements
- Suivi des artistes pour obtenir des suggestions de titres personnalisées et un accès rapide à leurs contenus.

### Recherche
- Recherche multicritères par titre, artiste, playlist, genre et nombre d'abonnés.
- Filtres avancés pour découvrir de nouvelles musiques.

### Gestion des rôles et permissions
- **Auteur** : peut créer, modifier et supprimer ses propres musiques et playlists.
- **Utilisateur** : peut écouter des musiques et suivre des artistes.

### Stockage et Streaming
- Stockage des fichiers audio sur un serveur dédié.
- Diffusion des musiques via un lecteur audio HTML5 intégré pour une écoute fluide.

## 3. **Technologies utilisées**

### Frontend
- **React** : Bibliothèque JavaScript pour créer une interface utilisateur interactive et dynamique.

### Backend
- **Node.js** avec **Express** : Serveur backend pour gérer les requêtes API et la logique métier.

### Base de données
- **MongoDB** : Pour le stockage des données (utilisateurs, musiques, playlists, etc.).

### API REST
- Communication entre le frontend et le backend via une API RESTful.

### Stockage des fichiers audio
- Les fichiers audio sont stockés sur un serveur de fichiers dédié.

### Authentification et gestion des permissions
- **JWT** (JSON Web Token) : Pour une authentification sécurisée et la gestion des permissions d'accès.
