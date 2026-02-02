# Note de Cadrage - Projet **Cosmosound**

## 1. **Contexte du Projet**

Le projet **Cosmosound** est une plateforme de streaming musical en ligne, inspirée par des services tels que Spotify, Deezer, ou YouTube Music. Cette application permet aux utilisateurs de découvrir de nouveaux artistes, d'écouter leurs morceaux préférés, de créer des catalogues/playlists et de gérer leurs profils, le tout dans une interface ergonomique et facile à utiliser.

Ce projet s'inscrit dans le cadre d'une formation en Licence CDA (Conception et Développement d'Applications).

## 2. **Objectifs du Projet**

### Objectif principal
Développer une application web permettant aux utilisateurs d'écouter de la musique et de créer et gérer des catalogues. L'objectif principal est de faciliter la découverte d'artistes et de musiques dans le genre souhaité.

### Objectifs spécifiques
- Concevoir une interface utilisateur intuitive, permettant une navigation fluide entre les musiques, artistes et catalogues.
- Mettre en place un système de **gestion des utilisateurs** et de **profils personnalisés**.
- Implémenter une **fonctionnalité de recherche multicritères** (par titre, artiste, catalogues, genre, nombre d'abonnés).
- Assurer une **gestion des rôles et permissions** pour protéger les musiques uploadées par les artistes.
- Optimiser le stockage et la diffusion des fichiers audio afin de garantir une écoute fluide.
- Permettre aux utilisateurs de suivre leurs artistes préférés.

## 3. **Périmètre du Projet**

Le projet couvrira les fonctionnalités suivantes :

### Fonctionnalités à développer

- **Système d'authentification et gestion des utilisateurs** :
  - Inscription, connexion et déconnexion.
  - L'accès à l'application sera conditionné par l'inscription et la connexion.
  - Authentification sécurisée via JWT.
  - Gestion de profils utilisateurs (pseudo, avatar, etc.).

- **Gestion des musiques** :
  - Création, modification et suppression de musiques.
  - Chaque musique sera associée à son créateur et ne pourra être modifiée que par celui-ci.
  - Un utilisateur ayant uploadé au moins une musique sera reconnu comme *artiste*.
  - Les musiques générées par l'IA seront étiquetées avec un label "IA".

- **Gestion des Catalogues et Playlists** :
  - Création, modification et suppression.
  - Seront publiques (accessibles à tous pour écoute).
  - Associée à son créateur et ne pourra être modifiée ou supprimée que par celui-ci.

- **Gestion des abonnements** :
  - Chaque utilisateur pourra suivre les artistes de son choix.
  - Les abonnements permettront d'affiner les suggestions de titres et d'accéder plus rapidement aux contenus des artistes suivis.

- **Système de recherche et filtres** :
  - Recherche par titre, artiste, catalogue, playlist, genre et/ou nombre d'abonnés d'un artiste.
  - Filtres avancés pour faciliter la découverte de nouvelles musiques selon plusieurs critères.

- **Rôles et permissions** :
  - **Auteur** : autorisé à effectuer des actions CRUD sur ses contenus (musiques et catalogues).
  - **Utilisateur connecté** : autorisé à effectuer des actions CRUD sur ses contenus (playlists).

- **Stockage et streaming** :
  - Stockage des fichiers audio sur un serveur dédié.
  - Diffusion des fichiers via un lecteur HTML5 intégré.
  - Un lecteur audio intégré pour l'écoute de musiques.
