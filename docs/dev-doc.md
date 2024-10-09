# Documentation Technique - Projet **Cosmosound**

## 1. **Pages prévues :**

- **/ :** __Quand on est pas login__: Landing page avec une belle image et une description courte qui donne envie d'utiliser le service, ainsi qu'un bouton menant à la page des musiques. Plus bas dans la page, y mettre des informations plus détaillé sur le site (détail du nom, date création, but de l'app, qui suis-je). __Quand on est est loggé__: on affiche une page avec des suggestions de playlists et d'artistes basées sur les abonnements et les genres préférés de l'utilisateur (inspiration : page d'accueil de YouTube Music). Si pas d'abonnement alors on affiche des artistes random.
- **/account :** Page de gestion du compte utilisateur (modification des informations, avatar). Possibilité d’accéder à la gestion de nos musiques et au formulaire pour la création de notre compte d'artiste (photo de profil, réseaux sociaux, genre(s)).
- **/login :** Page de connexion à l'application.
- **/register :** Page de création de compte utilisateurs. L'utilisateur doit ensuite choisir au moins un artiste à suivre.
- **/library :** Page qui sera consulté le plus souvent, on y voit les artiste que l'on suit, on y voit les genre que l'on aime, on y voit les musiques que l'on aime. Possibilité de modifier aussi (désabonnement d'un artiste, supression de musique de notre "Liked Musics" et changement de genre que l'on aime). 
- **/explore :** Page de recherche avec un composant de barre de recherche qui met à jour la page en temps réel. Filtres par "Titres", "Artistes", "Playlists", et "*Avancé*".
- **/about-us :** Copie de la landing page quand on est pas login (sans le bouton qui mene à la page des musiques).
- **/create :** Page permettant à un utilisateur d'uploader une musique ou de créer une playlist (accessible uniquement aux artistes).
- **/artist/:id :** Page d'un artiste, affichant toutes ses musiques et playlists, ainsi que ses informations personnelles (réseaux sociaux, biographie). Option de suivre l'artiste.
- **/artist/:id/music/:id :** Page affichant les informations d'une musique spécifique (description, date d'upload, etc.). Si l'utilisateur est le propriétaire, il peut modifier les informations de la musique.
- **/artist/:id/playlist/:id :** Page affichant les musiques d'une playlist. Si l'utilisateur est le créateur, il peut modifier la playlist (ajouter ou supprimer des musiques).

*Commentaires* :
- S'inspirer de la recherche de Spotify pour la page `/search`.
- S'inspirer de la page d'accueil de YouTube Music pour la page `/feed`.
- La recherche avancée comporte: "Nombre d'abonnés", "Genre de musique" 
- Pour la liste de genres: https://www.musicgenreslist.com/

---

## 2. **API Endpoints :**
Tous les endpoints de l'API seront préfixés par `/api`.

### **Musics**

| Verbe      | Endpoint                 | Description     | Détails                                                        | Response     |
| ---------- | ------------------------ | --------------- | -------------------------------------------------------------- | ------------ |
| **GET**    | `/musics/:id`            | getMusicById    | Récupère les informations d'une musique par son ID.            | Music        |
| **GET**    | `/musics/:userId`        | getMusicByUser  | Récupère toutes les musiques d'un artiste.                     | Array<Music> |
| **GET**    | `/musics/genre/:idGenre` | getMusicByGenre | Récupère les musiques selon leur genre.                        | Array<Music> |
| **POST**   | `/musics`                | createMusic     | Crée une nouvelle musique.                                     | Music.Id     |
| **PUT**    | `/musics/:id`            | updateMusic     | Modifie une musique existante.                                 | Music        |
| **DELETE** | `/musics/:id`            | deleteMusic     | Supprime une musique (ainsi que dans les playlists associées). | *empty*      |

### **Playlists**

| Verbe      | Endpoint                        | Description          | Détails                                                     | Response        |
| ---------- | ------------------------------- | -------------------- | ----------------------------------------------------------- | --------------- |
| **GET**    | `/playlists/user/:userId`       | getPlaylistsByUserId | Récupère les playlists d'un utilisateur.                    | Array<Playlist> |
| **GET**    | `/playlists/:id`                | getPlaylistById      | Récupère les informations d'une playlist par son ID.        | Playlist        |
| **POST**   | `/playlists`                    | createPlaylist       | Crée une nouvelle playlist.                                 | Playlist.Id     |
| **PUT**    | `/playlists/:id`                | updatePlaylist       | Met à jour les informations ou les musiques d'une playlist. | Playlist        |
| **PUT**    | `/playlists/:id/music/:idMusic` | updatePlaylistMusic  | Ajoute ou supprime une musique dans la playlist.            | Playlist        |
| **DELETE** | `/playlists/:id`                | deletePlaylist       | Supprime une playlist.                                      | *empty*         |

### **Users**

| Verbe    | Endpoint               | Description            | Détails                                              | Response      |
| -------- | ---------------------- | ---------------------- | ---------------------------------------------------- | ------------- |
| **GET**  | `/users/:id`           | getUserById            | Récupère les informations d'un utilisateur.          | User          |
| **GET**  | `/users/:id/following` | getUserFollowingArtist | Récupère les artistes que l'utilisateur suit.        | Array<Artist> |
| **GET**  | `/users/:id/followers` | getUserFollowers       | Récupère le nombre d'abonnés que l'utilisateur a.    | number        |
| **POST** | `/users/:id/follow`    | followUser             | Permet de suivre un artiste ou un autre utilisateur. | *empty*       |
| **PUT**  | `/users/:id`           | updateUser             | Modifie les informations de profil de l'utilisateur. | User          |

### **Authentification**

| Verbe    | Endpoint    | Description | Détails                                        | Response |
| -------- | ----------- | ----------- | ---------------------------------------------- | -------- |
| **GET**  | `/logout`   | logout      | Déconnecte l'utilisateur en invalidant le JWT. | *empty*  |
| **POST** | `/register` | register    | Crée un compte utilisateur.                    | User.Id  |
| **POST** | `/login`    | login       | Connecte un utilisateur et renvoie un JWT.     | *empty*  |

### **Recherche**

| Verbe   | Endpoint  | Description | Détails                                                            | Response                                   |
| ------- | --------- | ----------- | ------------------------------------------------------------------ | ------------------------------------------ |
| **GET** | `/search` | search      | Effectue une recherche par titres, artistes, playlists, ou genres. | Array<T> when T is Music, Playlist, Artist |

---


## 3. API Models

### Music
```json
{
    id,
    title, // title of the music
    date_creation, // Date in UTC of the creation of the music
    duration, // duration time of the music
    description, // description of the music
    thumbnail, // url of the image
    artist, // User that uploaded the Music
    genres // list of musical genre of the music
}
```

### Playlist
```json
{
    id,
    title, // title of the playlist
    description, // description of the playtlist 
    owner // User that created the playlist
}
```

### User
```json
{
    id,
    name, // name of the user
    email, // email of the user
    date_creation, // Date in UTC of the creation of the account
}
```

### Artist extends User
```json
{
    social_media, // list of strings containing the socials's link
    avatar, // contains the url of the avatar
    genres // contains a list of genre that the Artist consider itself
}
```

### Genre
```json
{
    name // unique name of the genre/subgenre
}
```