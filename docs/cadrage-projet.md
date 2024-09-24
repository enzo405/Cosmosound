# Note de Cadrage - Projet **Métalify**

## 1. **Contexte du Projet**

Le projet **Métalify** est une plateforme de streaming musical web dédiée au genre **métal**. Inspirée par des services tels que Spotify, cette application se concentre exclusivement sur la musique métal pour offrir aux amateurs du genre un espace sur mesure. L'idée est de permettre aux utilisateurs de découvrir des artistes, écouter des morceaux, créer des playlists et gérer leurs profils au sein d'une communauté métal.

Ce projet est réalisé dans le cadre d'une formation en Licence CDA (Conception et Développement d'Applications).

## 2. **Objectifs du Projet**

### Objectif principal
Développer une application web qui permet aux utilisateurs d'écouter de la musique métal, de créer et de gérer des playlists, tout en favorisant la découverte d'artistes du genre à travers un système de recherche et de filtrage avancé.

### Objectifs spécifiques
- Créer une interface utilisateur intuitive permettant de naviguer entre les morceaux, artistes et playlists.
- Mettre en place un système de **gestion des utilisateurs** et de **profils**.
- Implémenter une **fonctionnalité de recherche multicritères** (par titre, artiste, album).
- Assurer une **gestion des rôles et permissions** afin de protéger les musiques uploadées par les artistes.
- Stocker et diffuser des fichiers audio de manière optimisée pour une écoute fluide.

## 3. **Périmètre du Projet**

Le projet s'articule autour des fonctionnalités suivantes :

### Fonctionnalités à développer
- **Système d'authentification et gestion des utilisateurs** :
  - Inscription, connexion, déconnexion.
  - Gestion de profils utilisateurs (pseudo, avatar, etc.).
  - Authentification sécurisée avec JWT.
  
- **Gestion des musiques** :
  - Ajout et modification des musiques par les utilisateurs (artistes).
  - Un lecteur audio intégré pour la diffusion des morceaux.
  - Chaque musique sera associée à son créateur et ne pourra être modifiée que par celui-ci.

- **Gestion des playlists** :
  - Création, modification et suppression de playlists.
  - Ajout et suppression de musiques dans les playlists.
  - Affichage d'une playlist avec tout les titres favoris de chaque utilisateur.

- **Système de recherche et filtres** :
  - Recherche par titre, artiste, album ou playlist.
  - Filtres avancés pour découvrir de nouveaux morceaux selon différents critères.

- **Rôles et permissions** :
  - Gestion des rôles avec les propriétaires de musique et de playlists.
  - Les propriétaires peuvent ajouter des collaborateurs sur leurs playlists.
  - Les actions critiques (modification/suppression de musiques) sont limitées aux propriétaires.

- **Stockage et streaming** :
  - Stockage des fichiers audio sur un serveur ou dans le cloud.
  - Diffusion des fichiers via un lecteur HTML5.

## 4. **Livrables**

### Principaux livrables
- **Application web fonctionnelle** accessible depuis un navigateur.
- **Base de données** contenant les utilisateurs, musiques, playlists et métadonnées.
- **API REST** pour la communication entre le front-end et le back-end.
- **Documentation technique** détaillant l'architecture, les technologies utilisées et le processus d'installation.
  
### Autres livrables
- **Charte graphique** : Maquette UI de l'application.
- **Tests utilisateurs** et validation des fonctionnalités principales (écoute de musique, gestion de playlist).

## 5. **Contraintes du Projet**

### Contraintes techniques
- Utilisation de **React** pour le frontend et **Node.js avec Express** pour le backend.
- La base de données doit être en **PostgreSQL** ou **MongoDB**.
- Gestion sécurisée de l'authentification avec **JWT**.
- Stockage optimisé des fichiers audio sur un serveur dédié ou via un service cloud.
  
### Contraintes de temps
Le projet doit être réalisé dans un délai de **3.5 mois**, à compter du début du développement.

### Contraintes légales
- Respect des **droits d'auteur** et des **licences** pour toute musique diffusée sur la plateforme.
- Mise en place d'un processus de **signalement** et de retrait pour les contenus ne respectant pas les droits d'auteur.
- Conformité avec la **DMCA** (Digital Millennium Copyright Act) pour toute réclamation liée à des violations de copyright.

### Contraintes budgétaires
Le projet est réalisé dans le cadre scolaire, avec des ressources limitées. Il n’y a pas de budget alloué à ce projet, mais des outils open-source ou gratuits doivent être privilégiés (hébergement, gestion des fichiers audio, etc.).

## 6. **Organisation du Travail**

### Répartition des tâches
- **Frontend** : Développement de l'interface utilisateur avec React.
- **Backend** : Développement de l’API, gestion des utilisateurs et stockage des musiques.
- **Base de données** : Mise en place du modèle de données pour les utilisateurs, musiques et playlists.
- **Tests** : Validation des fonctionnalités et tests de performance pour le streaming audio.

### Planification
- **Phase 1** (Semaines 1-3) : Analyse des besoins et création des maquettes (wireframes) UI.
- **Phase 2** (Semaines 4-6) : Développement du backend (API, gestion des utilisateurs, base de données).
- **Phase 3** (Semaines 7-9) : Intégration du frontend et développement de la partie visuelle (gestion des playlists, profil utilisateur).
- **Phase 4** (Semaines 10-12) : Implémentation du lecteur audio, stockage des musiques et streaming.
- **Phase 5** (Semaines 13-14) : Tests finaux, débogage et amélioration de l’expérience utilisateur.
- **Phase 6** (Semaine 15) : Documentation et présentation finale.

## 7. **Risques Identifiés**

- **Difficulté avec le stockage et le streaming des fichiers audio** : Solution possible en utilisant des services cloud comme AWS S3 pour le stockage et la diffusion.
- **Problèmes liés aux droits d'auteur** : Nécessité de bien définir les termes et conditions de la plateforme pour éviter les conflits juridiques.
- **Délai limité** : La complexité du projet peut entraîner un dépassement du planning si certaines tâches sont sous-estimées.
