# API Endpoints:
> Tout endpoint d'api sera préfixé de `/api`

## Music 
|Verbe|Endpoint|Description|Complément|
|-|-|-|-|
|**GET**|`/musics/:id`|getMusicById||
|**GET**|`/musics/:userId`|getAllMusicByUser|Récupérer toutes les musiques d'un artiste|
|**GET**|`/musics`|getAllMusic||
|**POST**|`/musics`|createMusic||
|**PUT**|`/musics/:id`|updateMusic||
|**DELETE**|`/musics/:id`|deleteMusic||

## Playlist

|Verbe|Endpoint|Description|Complément|
|-|-|-|-|
|**GET**|`/playlists/:userId`|getPlaylistByUserId|A vérifier dans le cas où on aurai juste besoin de rechercher sur l'id de la playlist, par exemple si on stocke les id de playlist dans le retour getUser ou alors si on récupère les playlist à partir de l'user id|
|**GET**|`/playlists`|getAllPlaylist|Récupère toutes les playlists|
|**POST**|`/playlists`|createPlaylist||
|**PUT**|`/playlists/:id`|updatePlaylist||
|**DELETE**|`playlists/:id`|deletePlaylist||

## User

|Verbe|Endpoint|Description|Complément|
|-|-|-|-|
|**GET**|`/users/:id`|getUserById||
|**GET**|`/users`|getAllUser||
|**GET**|`/logout`|logout||
|**POST**|`/register`|register||
|**POST**|`/login`|login||
|**PUT**|`/users/:id`|updateUser||
|**DELETE**|`/users/:id`|deleteUser||


# Pages Prévues:

- /me => page de compte (avec icon pour modifier nos infos)
- / => landing page avec une belle image et une description courte qui donne envie + un bouton qui mène sur la page des musiques
- /