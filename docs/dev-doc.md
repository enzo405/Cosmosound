# Documentation Technique - Projet **Cosmosound**

## 1. **Pages prévues :**

- **/ :** __Quand on est pas login__: Landing page avec une belle image et une description courte qui donne envie d'utiliser le service, ainsi qu'un bouton menant à la page des musiques. Plus bas dans la page, y mettre des informations plus détaillé sur le site (détail du nom, date création, but de l'app, qui suis-je). __Quand on est est loggé__: on affiche une page avec des suggestions de playlists et d'artistes basées sur les abonnements et les genres préférés de l'utilisateur (inspiration : page d'accueil de YouTube Music). Si pas d'abonnement alors on affiche des artistes random.
- **/account :** Page de gestion du compte utilisateur (modification des informations, avatar). Possibilité d’accéder à la gestion de nos musiques et au formulaire pour la création de notre compte d'artiste (photo de profil, réseaux sociaux, genre(s)).
- **/login :** Page de connexion à l'application.
- **/register :** Page de création de compte utilisateurs. L'utilisateur doit ensuite choisir au moins un artiste à suivre.
- **/library :** Page qui sera consulté le plus souvent, on y voit les artiste que l'on suit, on y voit les genre que l'on aime, on y voit les musiques que l'on aime. Possibilité de modifier aussi (désabonnement d'un artiste, supression de musique de notre "Liked Musics" et changement de genre que l'on aime). 
- **/explore :** Page de recherche. Filtres par "Titres", "Artistes", "Playlists", "Album" et "Ep/Single".
- **/about-us :** Copie de la landing page quand on est pas login (sans le bouton qui mene à la page des musiques).
- **/create :** Page permettant à un utilisateur d'uploader une musique ou de créer un catalogue (accessible uniquement aux artistes).
- **/artist/:id :** Page d'un artiste, affichant toutes ses musiques et album, ep et single, ainsi que ses informations personnelles (réseaux sociaux). Option de suivre l'artiste.
- **/artist/:id/catalog/:id :** Page affichant les musiques d'un catalogue. Si l'utilisateur est le créateur, il peut modifier le catalogue (ajouter ou supprimer des musiques).

*Commentaires* :
- S'inspirer de la recherche de Spotify pour la page `/search`.
- S'inspirer de la page d'accueil de YouTube Music pour la page `/feed`.
- La recherche avancée comporte: "Artiste", "Genre de musique"
- Pour la liste de genres: https://www.musicgenreslist.com/


## 2. **API Endpoints :**

Tous les endpoints de l'API seront préfixés par `/api`.

### **Playlist**
| Verbe  | Endpoint                        | Request                 | Response                                                          | Response Code |
| ------ | ------------------------------- | ----------------------- | ----------------------------------------------------------------- | ------------- |
| GET    | `/playlists/:id`                | -                       | `{ "id": "string", "title": "string", "musics": [MusicDetails] }` | 200           |
| GET    | `/playlists/search`             | `?name=playlistName`    | `[ { "id": "string", "title": "string" } ]`                       | 200           |
| POST   | `/playlists`                    | `{ "title": "string" }` | `{ "message": "Created", "id": "string" }`                        | 201           |
| POST   | `/playlists/:id/music`          | `{ MusicDetails }`      | `{ "message": "Created", "id": "string" }`                        | 201           |
| DELETE | `/playlists/:id`                | -                       | `{ "message": "Deleted" }`                                        | 200           |
| DELETE | `/playlists/:id/music/:musicId` | -                       | `{ "message": "Music removed" }`                                  | 200           |

---

### **Catalogs**
| Verbe  | Endpoint                       | Request                                                       | Response                                                                          | Response Code |
| ------ | ------------------------------ | ------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------- |
| POST   | `/catalogs`                    | `{ title, thumbnail, musics: [{ title, duration, genres }] }` | `{ "message": "Created", "id": "string" }`                                        | 201           |
| GET    | `/catalogs/:id`                | -                                                             | `{ "id": "string", "title": "string", "type": "enum", "musics": [MusicDetails] }` | 200           |
| DELETE | `/catalogs/:id`                | -                                                             | `{ "message": "Deleted" }`                                                        | 200           |
| DELETE | `/catalogs/:id/music/:musicId` | -                                                             | `{ "message": "Music removed" }`                                                  | 200           |
| GET    | `/catalogs/search`             | `?name=catalogName`                                           | `[ { "id": "string", "title": "string" } ]`                                       | 200           |
| GET    | `/catalogs/musics/search`      | `?name=musicName`                                             | `[ { "id": "string", "title": "string" } ]`                                       | 200           |

---

### **Users**
| Verbe | Endpoint          | Request                          | Response                                          | Response Code |
| ----- | ----------------- | -------------------------------- | ------------------------------------------------- | ------------- |
| PATCH | `/users/:id`      | `name, email, pictureProfile`    | `{ "message": "Updated" }`                        | 200           |
| PATCH | `/artists/:id`    | `socialMedia, genre, artistName` | `{ "message": "Updated" }`                        | 200           |
| GET   | `/artists/:id`    | -                                | `{ "id": "string", "artistName": "string", ... }` | 200           |
| GET   | `/artists/search` | `?name=artistName`               | `[ { "id": "string", "artistName": "string" } ]`  | 200           |

---

### **Authentification**
| Verbe | Endpoint         | Request                                                         | Response                        | Response Code |
| ----- | ---------------- | --------------------------------------------------------------- | ------------------------------- | ------------- |
| POST  | `/auth/login`    | `{ "email": "string", "password": "string" }`                   | `{ "token": "jwtToken" }`       | 200           |
| POST  | `/auth/register` | `{ "name": "string", "email": "string", "password": "string" }` | `{ "message": "User created" }` | 201           |

---

### **Genre**
| Verbe | Endpoint         | Request           | Response  | Response Code |
| ----- | ---------------- | ----------------- | --------- | ------------- |
| GET   | `/genres`        | -                 | `Genre[]` | 200           |
| GET   | `/genres/search` | `?name=genreName` | `Genre[]` | 200           |
