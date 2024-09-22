# Métalify

## Description du projet

**Métalify** est une application web de streaming musical dédiée au genre **métal**. Inspirée par des plateformes comme Spotify, cette application permet aux utilisateurs d'écouter des morceaux de métal, de créer et gérer leurs propres playlists, et de découvrir de nouveaux artistes à travers une recherche avancée et des filtres multicritères. Le projet est conçu pour offrir aux amateurs de métal une expérience unique, centrée sur leur genre musical favori.

## Fonctionnalités principales

### 1. **Playlists et Musiques**
   - **Musiques** :
     - Les musiques seront associées aux profils des propriétaires une fois créées.
     - Un utilisateur ayant uploadé au moins une musique sera reconnu comme artiste.
     - Le propriétaire de la musique peut modifier ses caractéristiques (photo, nom, collaborateur(s), et date de sortie).
     - Un **lecteur audio intégré** permettra de lire les musiques directement dans l’application.
   - **Playlists** :
     - Les utilisateurs peuvent **créer**, **modifier**, **supprimer** et **voir** leurs playlists.
     - Les musiques peuvent être ajoutées ou retirées des playlists.
     - Chaque utilisateur aura une playlist qui contiendra ses titres préférés.

### 2. **Gestion du profil utilisateur**
   - Les utilisateurs peuvent **s’inscrire** et **se connecter**.
   - Chaque utilisateur dispose d’un **profil** personnalisable (pseudo, avatar, etc.).
   - Gestion sécurisée de **l’authentification** avec des **JWT** (JSON Web Tokens).

### 3. **Recherche multicritères et filtres**
   - L’application offre une **recherche avancée** pour trouver des musiques et playlists par **titre**, **artiste**, ou **nom**.
   - Des filtres permettent de découvrir des morceaux facilement.

### 4. **Système de rôles et permissions**
   - Un système de **rôles** gère les permissions :
     - Les **utilisateurs** peuvent écouter et ajouter des musiques à leurs playlists.
     - Les **propriétaires** peuvent modifier ou supprimer leurs propres musiques.
     - Les **propriétaires de playlists** peuvent ajouter des collaborateurs pour les aider à gérer la playlist.
     - L'application est **accessible uniquement aux utilisateurs inscrits**.

### 5. **Stockage et diffusion des fichiers audio**
   - Les fichiers audio seront stockés sur un serveur de fichiers.
   - La lecture audio sera assurée par un lecteur HTML5.

## Technologies utilisées
- **Frontend** : React
- **Backend** : Node.js avec Express
- **Base de données** : PostgreSQL ou MongoDB
- **API REST** : Pour la communication entre le frontend et le backend
- **Stockage des fichiers audio** : Serveur de fichiers
- **Authentification et gestion des permissions** : JWT

## Gestion légale et protection des droits d'auteur

**Métalify** respecte les droits d'auteur et s'assure que toutes les musiques présentes sur la plateforme sont diffusées légalement. Nous travaillons avec les artistes et labels pour garantir que le contenu est correctement licencié. Voici les principales mesures mises en place :

- **Licences et droits d'auteur** : Les musiques disponibles sur la plateforme sont sous licence appropriée (licences de diffusion, mécanique, etc.).
- **Gestion du contenu utilisateur** : Les utilisateurs sont responsables des musiques qu'ils uploadent et doivent s'assurer de détenir les droits sur ces morceaux. Un système de signalement et de retrait est en place pour traiter les violations des droits d'auteur.
- **Attribution et métadonnées** : Chaque morceau est correctement attribué à son artiste avec des métadonnées complètes (titre, artiste, album, etc.).
- **Conformité avec la DMCA** : Métalify respecte la législation sur le droit d'auteur, y compris la Digital Millennium Copyright Act (DMCA), et dispose d'un processus de retrait de contenu en cas de réclamation.

Ces mesures assurent que les droits des artistes et des utilisateurs sont protégés tout en offrant une expérience musicale légale et sécurisée.
