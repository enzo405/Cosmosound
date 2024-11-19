import json
import random
from datetime import datetime
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from conf import CLIENT_SECRET, CLIENT_ID

# File paths
artist_names_path = "src/assets/json/artist_name.json"
artists_output_path = "src/assets/json/artists.json"
catalogs_output_path = "src/assets/json/catalogs.json"
musics_output_path = "src/assets/json/musics.json"
genres_output_path = "src/assets/json/genres.json"

# Initialize Spotify API client
credentials = SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
spotify = spotipy.Spotify(client_credentials_manager=credentials)


# Fetch genres from Spotify
def fetch_genres():
    try:
        response = spotify.recommendation_genre_seeds()
        return response.get("genres", [])
    except Exception as e:
        print(f"Error fetching genres: {e}")
        return []


def album_type_to_enum(album_type):
    if album_type.upper() == "ALBUM":
        return 1
    elif album_type.upper() == "SINGLE":
        return 2
    elif album_type.upper() == "ALBUM":
        return 0


# Fetch artist data, including picture, Spotify link, and genres
def fetch_artist_data(artist_name):
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


# Fetch artist's catalogs (albums, singles, EPs)
def fetch_artist_catalogs(artist_id):
    try:
        albums = spotify.artist_albums(artist_id, limit=5)["items"]
        catalogs = []
        for album in albums:
            catalogs.append(
                {
                    "id": album["id"],
                    "title": album["name"],
                    "thumbnail": album["images"][0]["url"] if album["images"] else None,
                    "type": album_type_to_enum(album["album_type"]),
                }
            )
        return catalogs
    except Exception as e:
        print(f"Error fetching catalogs for artist ID {artist_id}: {e}")
        return []


# Fetch top tracks for an artist
def fetch_artist_tracks(artist_id):
    try:
        tracks = spotify.artist_top_tracks(artist_id)["tracks"][:5]
        musics = []
        for track in tracks:
            musics.append(
                {
                    "id": track["id"],
                    "title": track["name"],
                    "date_creation": track["album"]["release_date"],
                    "duration": track["duration_ms"] // 1000,  # Convert ms to seconds
                    "catalog_id": track["album"]["id"],
                }
            )
        return musics
    except Exception as e:
        print(f"Error fetching tracks for artist ID {artist_id}: {e}")
        return []


# Ensure all catalogs referenced by tracks are fetched
def fetch_catalog_if_missing(catalog_id):
    try:
        # Check if the catalog is already in the list
        existing_catalog = next((c for c in catalogs if c["id"] == catalog_id), None)
        if existing_catalog:
            return existing_catalog

        # Fetch the catalog directly from Spotify
        album = spotify.album(catalog_id)
        if album:
            catalog = {
                "id": album["id"],
                "title": album["name"],
                "thumbnail": album["images"][0]["url"] if album["images"] else None,
                "type": album_type_to_enum(album["album_type"]),
                "owner": None,
                "musics": [],
            }
            catalogs.append(catalog)
            return catalog
    except Exception as e:
        print(f"Error fetching catalog with ID {catalog_id}: {e}")
    return None


# Fetch genres
all_genres = fetch_genres()

# Load artist names
with open(artist_names_path, "r") as artist_file:
    artist_names = json.load(artist_file)

# Generate artists, catalogs, and musics
artists = []
catalogs = []
musics = []

for i, name in enumerate(artist_names, start=1):
    artist_id, picture_profile, spotify_link, genres = fetch_artist_data(name)
    if not artist_id:
        print(f"Artist not found for name: {name}. Skipping...")
        continue

    # Use Spotify's genres if available, else fallback to random genres
    artist_genres = (
        genres if genres else random.sample(all_genres, random.randint(1, 3))
    )

    artist_data = {
        "id": int(i),
        "name": name,
        "email": f"{name.lower().replace(' ', '_')}@example.com",
        "date_creation": datetime.now().isoformat() + "Z",
        "picture_profile": picture_profile or f"https://picsum.photos/seed/{i}/200",
        "followers": random.randint(10, 100000),
        "followings": [],
        "social_media": [{"media": 1, "link": spotify_link}],
        "genre": {"name": random.choice(artist_genres)},
        "artist_name": name,
    }
    artists.append(artist_data)

    # Fetch artist's catalogs
    artist_catalogs = fetch_artist_catalogs(artist_id)
    for catalog in artist_catalogs:
        catalog["owner"] = artist_data
        catalog["musics"] = []
        catalogs.append(catalog)

    # Fetch artist's top tracks
    artist_tracks = fetch_artist_tracks(artist_id)
    for track in artist_tracks:
        catalog = fetch_catalog_if_missing(track["catalog_id"])
        if catalog and not catalog.get("owner"):
            catalog["owner"] = artist_data

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

        # Link the track to the catalog
        if catalog:
            catalog["musics"].append(track)

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
