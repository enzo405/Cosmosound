# Documentation Technique - Projet **<insérer nom du projet>**

## 1. **Pages prévues :**

- **/ :** Landing page avec une belle image et une description courte qui donne envie d'utiliser le service, ainsi qu'un bouton menant à la page des musiques.
- **/account :** Page de gestion du compte utilisateur (modification des informations, avatar). Possibilité d’accéder à la gestion des abonnements (artistes suivis).
- **/login :** Page de connexion à l'application.
- **/register :** Page de création de compte.
- **/feed :** Page d'accueil avec des suggestions de playlists et d'artistes basées sur les abonnements et les genres préférés de l'utilisateur (inspiration : page d'accueil de YouTube Music).
- **/search :** Page de recherche avec un composant de barre de recherche qui met à jour la page en temps réel. Filtres par "Titres", "Artistes", "Playlists", et "*Avancé*".
- **/create :** Page permettant à un utilisateur d'uploader une musique ou de créer une playlist (accessible uniquement aux artistes).
- **/artist/:id :** Page d'un artiste, affichant toutes ses musiques et playlists, ainsi que ses informations personnelles (réseaux sociaux, biographie). Option de suivre l'artiste.
- **/artist/:id/music/:id :** Page affichant les informations d'une musique spécifique (description, date d'upload, etc.). Si l'utilisateur est le propriétaire, il peut modifier les informations de la musique.
- **/artist/:id/playlist/:id :** Page affichant les musiques d'une playlist. Si l'utilisateur est le créateur, il peut modifier la playlist (ajouter ou supprimer des musiques).

*Commentaires* :
- S'inspirer de la recherche de Spotify pour la page `/search`.
- S'inspirer de la page d'accueil de YouTube Music pour la page `/feed`.
- La recherche avancée comporte: "Nombre d'abonnés", "Genre de musique" 

---

## 2. **API Endpoints :**
Tous les endpoints de l'API seront préfixés par `/api`.

### **Musics**

| Verbe      | Endpoint                 | Description     | Détails                                                                          |
| ---------- | ------------------------ | --------------- | -------------------------------------------------------------------------------- |
| **GET**    | `/musics/:id`            | getMusicById    | Récupère les informations d'une musique par son ID.                              |
| **GET**    | `/musics/genre/:idGenre` | getMusicByGenre | Récupère les musiques selon leur genre.                                          |
| **POST**   | `/musics`                | createMusic     | Crée une nouvelle musique. Le payload doit inclure les informations nécessaires. |
| **PUT**    | `/musics/:id`            | updateMusic     | Modifie une musique existante.                                                   |
| **DELETE** | `/musics/:id`            | deleteMusic     | Supprime une musique (ainsi que dans les playlists associées).                   |

### **Playlists**

| Verbe      | Endpoint                        | Description          | Détails                                                                           |
| ---------- | ------------------------------- | -------------------- | --------------------------------------------------------------------------------- |
| **GET**    | `/playlists/user/:userId`       | getPlaylistsByUserId | Récupère les playlists créées par un utilisateur.                                 |
| **GET**    | `/playlists/:id`                | getPlaylistById      | Récupère les informations d'une playlist par son ID.                              |
| **POST**   | `/playlists`                    | createPlaylist       | Crée une nouvelle playlist. Le payload doit inclure les informations nécessaires. |
| **PUT**    | `/playlists/:id`                | updatePlaylist       | Met à jour les informations ou les musiques d'une playlist.                       |
| **PUT**    | `/playlists/:id/music/:idMusic` | updatePlaylistMusic  | Ajoute ou supprime une musique dans la playlist.                                  |
| **DELETE** | `/playlists/:id`                | deletePlaylist       | Supprime une playlist.                                                            |

### **Users**

| Verbe    | Endpoint               | Description      | Détails                                              |
| -------- | ---------------------- | ---------------- | ---------------------------------------------------- |
| **GET**  | `/users/:id`           | getUserById      | Récupère les informations d'un utilisateur.          |
| **GET**  | `/users/:id/following` | getUserFollowing | Récupère les artistes que l'utilisateur suit.        |
| **POST** | `/users/:id/follow`    | followUser       | Permet de suivre un artiste ou un autre utilisateur. |
| **PUT**  | `/users/:id`           | updateUser       | Modifie les informations de profil de l'utilisateur. |

### **Authentification**

| Verbe    | Endpoint    | Description | Détails                                        |
| -------- | ----------- | ----------- | ---------------------------------------------- |
| **GET**  | `/logout`   | logout      | Déconnecte l'utilisateur en invalidant le JWT. |
| **POST** | `/register` | register    | Crée un compte utilisateur.                    |
| **POST** | `/login`    | login       | Connecte un utilisateur et renvoie un JWT.     |

### **Recherche**

| Verbe   | Endpoint  | Description | Détails                                                            |
| ------- | --------- | ----------- | ------------------------------------------------------------------ |
| **GET** | `/search` | search      | Effectue une recherche par titres, artistes, playlists, ou genres. |

---

## 3. **Gestion des erreurs :**

Les erreurs API suivent une structure standardisée :

- **400 - Bad Request :** Requête invalide ou mal formée (ex : données manquantes ou incorrectes).
- **401 - Unauthorized :** Utilisateur non authentifié (JWT manquant ou invalide).
- **403 - Forbidden :** Accès refusé (l'utilisateur n'a pas les permissions nécessaires).
- **404 - Not Found :** Ressource non trouvée (par ex., ID inexistant).
- **500 - Internal Server Error :** Erreur serveur.

---

## 4. **Sécurité :**

Tous les endpoints nécessitent une authentification via JWT, à l'exception des pages publiques telles que la landing page, la recherche, et l'inscription. Les tokens JWT sont stockés côté client et envoyés dans le header `Authorization` avec le préfixe `Bearer`.

---

## 5. **Exemples de payloads :**


---

## 6. **Pagination et limites :**

Les résultats des recherches, ainsi que les listes de musiques et playlists, sont paginés. Par défaut, chaque requête renvoie un maximum de 20 éléments. Les paramètres `page` et `limit` peuvent être utilisés pour ajuster la pagination.
