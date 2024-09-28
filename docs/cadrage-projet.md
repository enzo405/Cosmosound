# Note de Cadrage - Projet **<insérer nom>**

## 1. **Contexte du Projet**

Le projet **<insérer nom>** est une plateforme de streaming musical web. Inspirée par des services tels que Spotify, Deezer ou Youtube Music, cette application permet aux utilisateurs de découvrir des artistes, écouter leurs musiques préférés, créer des playlists et gérer leurs profils tout en ayant une ergonomie pratique d'utilisation.

Ce projet est réalisé dans le cadre d'une formation en Licence CDA (Conception et Développement d'Applications).

## 2. **Objectifs du Projet**

### Objectif principal
Développer une application web qui permet aux utilisateurs d'écouter de la musique, de créer et de gérer des playlists.
Le but étant de favoriser la découverte d'artistes et de musiques du genre que vous voulez.

### Objectifs spécifiques
- Créer une interface utilisateur intuitive permettant de naviguer entre les musiques, artistes et playlists.
- Mettre en place un système de **gestion des utilisateurs** et de **profils**.
- Implémenter une **fonctionnalité de recherche multicritères** (par titre, artiste, album, genre, nombre d'abonnés).
- Assurer une **gestion des rôles et permissions** afin de protéger les musiques uploadées par les artistes.
- Stocker et diffuser des fichiers audio de manière optimisée pour une écoute fluide.
- <gestion des abonnées>

## 3. **Périmètre du Projet**

Le projet s'articule autour des fonctionnalités suivantes :

### Fonctionnalités à développer
- **Système d'authentification et gestion des utilisateurs** :
  - Inscription, connexion, déconnexion.
  - L'inscription et la connection donneront accès à l'application.
  - Authentification sécurisée avec JWT.
  - Gestion de profils utilisateurs (pseudo, avatar, etc.).

- **Gestion des musiques** :
  - Création, modification et suppression de musiques.
  - Chaque musique sera associée à son créateur et ne pourra être modifiée que par celui-ci.
  - Un lecteur audio intégré pour l'écoute des musiques.
  - Un utilisateur ayant uploadé au moins une musique sera reconnu comme *artiste*.
  - Une musique faites avec l'IA sera annoté avec une note "IA".

- **Gestion des playlists** :
  - Création, modification et suppression de playlists.
  - Toutes les playlists seront publiques.
  - Chaque playlist sera associée à son créateur et ne pourra être modifiée/supprimée que par celui-ci.
  - Chaque playlist aura une liste de genre de musique associé.

- **Gestion des abonnements** :
  - Chaque utilisateur peut suivre l'artiste qu'il souhaite.
  - L'abonnement permettra d'avoir une suggestions de titre plus précise, d'avoir un accès plus rapide aux contenus de l'artiste.

- **Système de recherche et filtres** :
  - Recherche par titre, artiste, playlist, genre ou nombre d'abonnés d'un artiste.
  - Filtres avancés pour découvrir de nouveaux musiques selon différents critères.

- **Rôles et permissions** :
  - Auteur: action CRUD sur son contenu (musiques, playlist)
  - Utilisateur lambda: écoute du titre et abonnement à un artiste

- **Stockage et streaming** :
  - Stockage des fichiers audio sur un serveur.
  - Diffusion des fichiers via un lecteur HTML5.
