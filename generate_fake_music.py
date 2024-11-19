import json
import random
from datetime import datetime
import asyncio
import aiohttp
from spotipy.oauth2 import SpotifyClientCredentials
from conf import CLIENT_SECRET, CLIENT_ID
from spotipy import Spotify

# File paths
artist_names_path = "src/assets/json/artist_name.json"
artists_output_path = "src/assets/json/artists.json"
catalogs_output_path = "src/assets/json/catalogs.json"
musics_output_path = "src/assets/json/musics.json"
genres_output_path = "src/assets/json/genres.json"

# Initialize Spotify API client
credentials = SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
spotify = Spotify(client_credentials_manager=credentials)


async def fetch_genres():
    try:
        return spotify.recommendation_genre_seeds().get("genres", [])
    except Exception as e:
        print(f"Error fetching genres: {e}")
        return []


def album_type_to_enum(album_type):
    print("album type to enum")
    if album_type.upper() == "ALBUM":
        return 1
    elif album_type.upper() == "SINGLE":
        return 2
    elif album_type.upper() == "COMPILATION":
        return 0


async def fetch_artist_data(session, artist_name):
    print(f"fetching artist {artist_name}")
    try:
        results = spotify.search(q=f"artist:{artist_name}", type="artist", limit=1)
        if results["artists"]["items"]:
            artist = results["artists"]["items"][0]
            images = artist.get("images", [])
            picture_profile = images[0]["url"] if images else None
            spotify_link = artist.get("external_urls", {}).get("spotify", None)
            genres = artist.get("genres", [])
            return artist["id"], picture_profile, spotify_link, genres
    except Exception as e:
        print(f"Error fetching data for {artist_name}: {e}")
    return None, None, None, []


async def fetch_artist_catalogs(session, artist_id):
    print(f"fetching artist catalog {artist_id}")
    try:
        albums = spotify.artist_albums(artist_id, limit=5)["items"]
        return [
            {
                "id": album["id"],
                "title": album["name"],
                "thumbnail": album["images"][0]["url"] if album["images"] else None,
                "type": album_type_to_enum(album["album_type"]),
            }
            for album in albums
        ]
    except Exception as e:
        print(f"Error fetching catalogs for artist ID {artist_id}: {e}")
        return []


async def fetch_album_tracks(session, album):
    print(f"fetching album tracks {album['title']}")
    try:
        tracks = spotify.album_tracks(album["id"])
        date_creation = spotify.album(album["id"])["release_date"]
        return [
            {
                "id": track["id"],
                "title": track["name"],
                "date_creation": date_creation,
                "duration": track["duration_ms"] // 1000,  # Convert ms to seconds
                "catalog_id": album["id"],
            }
            for track in tracks["items"]
        ]
    except Exception as e:
        print(f"Error fetching tracks of the album {album['id']}: {e}")
        return []


async def process_artist(session, artist_name, all_genres, artist_index):
    artist_id, picture_profile, spotify_link, genres = await fetch_artist_data(
        session, artist_name
    )
    if not artist_id:
        print(f"Artist not found for name: {artist_name}. Skipping...")
        return None, [], []

    # Use Spotify's genres if available, else fallback to random genres
    artist_genres = (
        genres if genres else random.sample(all_genres, random.randint(1, 3))
    )

    artist_data = {
        "id": int(artist_index),
        "name": artist_name,
        "email": f"{artist_name.lower().replace(' ', '_')}@example.com",
        "date_creation": datetime.now().isoformat() + "Z",
        "picture_profile": picture_profile
        or f"https://picsum.photos/seed/{artist_index}/200",
        "followers": random.randint(10, 100000),
        "followings": [],
        "social_media": [{"media": 1, "link": spotify_link}],
        "genre": {"name": random.choice(artist_genres)},
        "artist_name": artist_name,
    }

    artist_catalogs = await fetch_artist_catalogs(session, artist_id)
    catalogs = []
    musics = []

    for catalog in artist_catalogs:
        catalog["owner"] = artist_data
        catalog["musics"] = []
        catalogs.append(catalog)

        album_tracks = await fetch_album_tracks(session, catalog)
        for track in album_tracks:
            musics.append(
                {
                    "id": track["id"],
                    "title": track["title"],
                    "date_creation": track["date_creation"],
                    "duration": track["duration"],
                    "artist": artist_data,
                    "genres": [{"name": g} for g in artist_genres],
                    "catalog": catalog,
                }
            )
            catalog["musics"].append(track)

    return artist_data, catalogs, musics


async def main():
    async with aiohttp.ClientSession() as session:
        # Fetch genres
        all_genres = await fetch_genres()

        # Load artist names
        with open(artist_names_path, "r") as artist_file:
            artist_names = json.load(artist_file)

        tasks = [
            process_artist(session, name, all_genres, i)
            for i, name in enumerate(artist_names, start=1)
        ]

        results = await asyncio.gather(*tasks)

        artists, catalogs, musics = [], [], []
        for artist, artist_catalogs, artist_musics in results:
            if artist:
                artists.append(artist)
                catalogs.extend(artist_catalogs)
                musics.extend(artist_musics)

        # Write data to JSON files
        with open(artists_output_path, "w") as artist_file:
            json.dump(artists, artist_file, indent=4)

        with open(catalogs_output_path, "w") as catalogs_file:
            json.dump(catalogs, catalogs_file, indent=4)

        with open(musics_output_path, "w") as musics_file:
            json.dump(musics, musics_file, indent=4)

        with open(genres_output_path, "w") as genres_file:
            json.dump(all_genres, genres_file, indent=4)

        print(
            f"Generated {artists_output_path}, {catalogs_output_path}, {musics_output_path}, and {genres_output_path} successfully."
        )


if __name__ == "__main__":
    asyncio.run(main())
