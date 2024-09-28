# Page(s) Prévue(s):

- / => landing page avec une belle image et une description courte qui donne envie + un bouton qui mène sur la page des musiques.
- /account => page de compte (avec icon pour modifier nos infos).
- /login => connection
- /register => création de compte
- /feed => page avec toutes les playlist et artiste qu'on suit.
- /search => page utilisant le composant searchbar qui update la page en realtime (puis ensuite filtres sur la page avec "Titres", "Artistes", "Playlist", "Advanced").
- /artist/:id => sous page qui affiche toutes les musiques & playlist d'un artiste et ses informations (réseaux, infos sur le net).
- /playlist/:id => sous page qui affiche les musiques de la playlist.

TODO:
- page formulaire musique, playlist
- faire le MCD

*Commentaires*:
> Fortement copier la recherche de Spotify pour /search
> Fortement copier la page Accueil de Ytb Music pour /feed


# API Endpoints:
> Tout endpoint d'api sera préfixé de `/api`

## Musics

| Verbe      | Endpoint           | Description     | Complément                                     |
| ---------- | ------------------ | --------------- | ---------------------------------------------- |
| **GET**    | `/musics/:id`      | getMusicById    | Récupère la musique par son id                 |
| **GET**    | `/musics/:idGenre` | getMusicByGenre | Récupère les musiques par genre                |
| **POST**   | `/musics`          | createMusic     | Créer une musique avec le payload prédéfini    |
| **PUT**    | `/musics/:id`      | updateMusic     | Modifie une musique                            |
| **DELETE** | `/musics/:id`      | deleteMusic     | Supprime une musique (dans les playlist aussi) |

## Playlists

| Verbe      | Endpoint                        | Description         | Complément                                                           |
| ---------- | ------------------------------- | ------------------- | -------------------------------------------------------------------- |
| **GET**    | `/playlists/:userId`            | getPlaylistByUserId | Le param peut changer en fonction du retour du getUserById           |
| **GET**    | `/playlists/:id`                | getPlaylistById     | Récupère les informations d'une playlist (musiques, artistes etc...) |
| **POST**   | `/playlists`                    | createPlaylist      | Crée une playlist                                                    |
| **PUT**    | `/playlists/:id`                | updatePlaylist      | Mets à jours les infos/musiques d'une playlist                       |
| **PUT**    | `/playlists/:id/music/:idMusic` | updatePlaylistMusic | Ajoute ou supprime la musique de la playlist                         |
| **DELETE** | `/playlists/:id`                | deletePlaylist      | Supprime une playlist                                                |

## Users

| Verbe    | Endpoint            | Description      | Complément                                         |
| -------- | ------------------- | ---------------- | -------------------------------------------------- |
| **GET**  | `/users/:id`        | getUserById      | Récupère les infos de l'utilisateur                |
| **GET**  | `/users/:id/follow` | getUserFollowing | Récupère les artiste que l'utilisateur suit        |
| **POST** | `/user/:id/follow`  | followUser       | Permet de suivre le contenu d'un autre utilisateur |
| **PUT**  | `/users/:id`        | updateUser       | Modifie son profil et infos                        |

## Authentification

| Verbe    | Endpoint    | Description | Complément         |
| -------- | ----------- | ----------- | ------------------ |
| **GET**  | `/logout`   | logout      | Se déconnecter     |
| **POST** | `/register` | register    | Création du compte |
| **POST** | `/login`    | login       | Se connecter       |

## Recherche

| Verbe   | Endpoint | Description | Complément |
| ------- | -------- | ----------- | ---------- |
| **GET** | `/`      |             |            |


## Optionnel
- /explore => page qui permet de découvrir avec toutes les nouvelles sortie par genres