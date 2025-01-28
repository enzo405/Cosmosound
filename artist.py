import os
import random
import json
import mimetypes
import asyncio
import aiohttp
from mutagen import File as MutagenFile

create_user_url = "http://localhost:4000/auth/register"
create_catalog_url = "http://localhost:4000/api/catalogs"

music_dir = "./musics"
genres_file_path = "./client/src/assets/json/genres.json"

if not os.path.exists(music_dir) or not os.path.isdir(music_dir):
    print(f"Error: Music directory '{music_dir}' does not exist.")
    exit()

music_files = [
    os.path.join(music_dir, f)
    for f in os.listdir(music_dir)
    if os.path.isfile(os.path.join(music_dir, f))
]

if not music_files:
    print("Error: No music files found in the directory.")
    exit()

try:
    with open(genres_file_path, "r") as f:
        all_genres = json.load(f)
except FileNotFoundError:
    print(f"Error: Genres file '{genres_file_path}' not found.")
    exit()


async def create_user(session, artist):
    data = {
        "name": artist.get("name"),
        "email": artist.get("email"),
        "password": "securepassword123",
        "likedGenres": [artist.get("genre")["name"]],
        "pictureProfile": artist.get("pictureProfile"),
        "artistName": artist.get("name"),
        "genre": artist.get("genre")["name"],
        "spotifyLink": artist.get("socialMedia")[0]["link"],
    }

    async with session.post(create_user_url, json=data) as response:
        if response.status == 201:
            user_id = await response.json()
            print(f"User {artist.get('name')} created with ID {user_id}")
            return user_id
        else:
            print(
                f"Failed to create user {artist.get('name')}: {response.status} {await response.text()}"
            )
            return None


async def create_catalog(session, user_id, title, thumbnail_path, music_files):
    form_data = aiohttp.FormData()
    form_data.add_field("title", title)
    form_data.add_field("defaultThumbnail", thumbnail_path)

    genres = []
    durations = []

    for music_file in music_files:
        audio = MutagenFile(music_file)
        duration = int(audio.info.length)
        random_genres = random.sample(all_genres, 2)
        genres.append(random_genres)
        durations.append(duration)

        mime_type, _ = mimetypes.guess_type(music_file)
        if not mime_type or not mime_type.startswith("audio/"):
            print(f"Skipping invalid file: {music_file}")
            continue

        form_data.add_field(
            "musics",
            open(music_file, "rb"),
            filename=os.path.basename(music_file),
            content_type=mime_type,
        )

    form_data.add_field("genres", json.dumps(genres))
    form_data.add_field("durations", json.dumps(durations))
    form_data.add_field("userId", user_id)

    async with session.post(create_catalog_url, data=form_data) as response:
        if response.status == 201:
            catalog = await response.json()
            print(f"Catalog '{title}' created for user {user_id}")
            return catalog
        else:
            print(
                f"Failed to create catalog '{title}': {response.status} {await response.text()}"
            )
            return None


async def add_music_playlist(session, playlist_id, music_id, catalog_id, user_id):
    form_data = {
        "idMusic": music_id,
        "idCatalog": catalog_id,
        "idUser": user_id,
    }
    async with session.post(
        f"http://localhost:4000/api/playlists/{playlist_id}/musics", json=form_data
    ) as response:
        if response.status != 201:
            print(
                f"Failed to add music {music_id} to playlist {playlist_id}: {response.status} {await response.text()}"
            )


async def create_playlist(session, user_id, title, musics):
    form_data = {"title": title, "userId": user_id}
    async with session.post(
        "http://localhost:4000/api/playlists", json=form_data
    ) as response:
        if response.status == 201:
            playlist_id = await response.json()
            tasks = [
                add_music_playlist(
                    session, playlist_id, music["id"], music["catalog_id"], user_id
                )
                for music in musics
            ]
            await asyncio.gather(*tasks)
        else:
            print(
                f"Failed to create playlist '{title}': {response.status} {await response.text()}"
            )


async def main():
    json_file_path = "./client/src/assets/json/artists.json"
    with open(json_file_path, "r") as file:
        artists = json.load(file)

    timeout = aiohttp.ClientTimeout(total=60)  # 60 seconds total timeout
    async with aiohttp.ClientSession(timeout=timeout) as session:
        user_tasks = [create_user(session, artist) for artist in artists]
        userids = await asyncio.gather(*user_tasks, return_exceptions=True)

        catalogs = []
        catalog_tasks = []
        for user_id, artist in zip(userids, artists):
            if isinstance(user_id, Exception):
                print(
                    f"Skipping catalogs for artist {artist['name']} due to user creation error."
                )
                continue

            if user_id:
                for i in range(1, 4):  # Create up to 5 catalogs per user
                    selected_files = random.sample(
                        music_files, min(len(music_files), random.randint(1, 3))
                    )
                    catalog_title = artist.get("name") + " - " + str(i)
                    catalog_tasks.append(
                        create_catalog(
                            session,
                            user_id,
                            catalog_title,
                            artist.get("pictureProfile"),
                            selected_files,
                        )
                    )

                    # Wait for catalogs to complete one by one (instead of sending all together)
                    catalog = await asyncio.gather(
                        catalog_tasks[-1], return_exceptions=True
                    )
                    if isinstance(catalog[0], Exception):
                        print(
                            f"Failed to create catalog for user {user_id}: {catalog[0]}"
                        )
                    else:
                        catalogs.append(catalog[0])

        playlist_tasks = []
        for user_id in userids:
            if isinstance(user_id, Exception):
                print(f"Skipping playlists for user due to user creation error.")
                continue

            if user_id:
                for i in range(1, 4):  # Create up to 5 playlists per user
                    selected_catalogs = random.sample(
                        catalogs, min(len(catalogs), random.randint(1, 5))
                    )
                    musics = []
                    for catalog in selected_catalogs:
                        if catalog:
                            chosenMusics = random.sample(
                                catalog["musics"],
                                min(len(catalog["musics"]), random.randint(1, 4)),
                            )
                            for music in chosenMusics:
                                musics.append(
                                    {"id": music["id"], "catalog_id": catalog["id"]}
                                )

                    playlist_title = "Playlist - " + str(i)
                    playlist_tasks.append(
                        create_playlist(session, user_id, playlist_title, musics)
                    )

                    # Wait for playlists to complete one by one
                    await asyncio.gather(playlist_tasks[-1], return_exceptions=True)


if __name__ == "__main__":
    asyncio.run(main())
