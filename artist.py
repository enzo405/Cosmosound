import requests
import os
import random
import json
import mutagen
import mimetypes

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

# Load genres from the JSON file
try:
    with open(genres_file_path, "r") as f:
        all_genres = json.load(f)
except FileNotFoundError:
    print(f"Error: Genres file '{genres_file_path}' not found.")
    exit()

# Store created user IDs and names
user_data = {}


# Function to create a user
def create_user(artist):
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
    response = requests.post(create_user_url, json=data)
    if response.status_code == 201:
        user_id = response.json()
        user_data[artist.get("name")] = user_id
        print(f"User {artist.get("name")} created with ID {user_id}")
        return user_id
    else:
        print(
            f"Failed to create user {artist.get("name")}: {response.status_code} {response.text}"
        )
        return None


# Function to calculate the type of catalog
def get_catalog_type(number_of_tracks, total_duration_minutes):
    if number_of_tracks == 1 or total_duration_minutes <= 10:
        return "SINGLE"
    elif number_of_tracks <= 5 and total_duration_minutes <= 30:
        return "EP"
    else:
        return "ALBUM"


def is_valid_audio(file_path):
    mime_type, _ = mimetypes.guess_type(file_path)
    return mime_type and mime_type.startswith("audio/")


# Function to create a catalog
def create_catalog(user_id, title, thumbnail_path, music_files):
    form_data = {"title": title, "defaultThumbnail": thumbnail_path}
    files = []
    genres = []
    durations = []

    for music_file in music_files:
        audio = mutagen.File(music_file)
        duration = int(audio.info.length)
        random_genres = random.sample(all_genres, 2)
        genres.append(random_genres)
        durations.append(duration)

        mime_type, _ = mimetypes.guess_type(music_file)
        if not mime_type or not mime_type.startswith("audio/"):
            print(f"Skipping invalid file: {music_file}")
            continue

        files.append(
            (
                "musics",
                (os.path.basename(music_file), open(music_file, "rb"), mime_type),
            )
        )

    form_data["genres"] = json.dumps(genres)
    form_data["durations"] = json.dumps(durations)
    form_data["userId"] = user_id

    try:
        response = requests.post(create_catalog_url, data=form_data, files=files)
        print(response.json())
        if response.status_code != 201:
            print(
                f"Failed to create catalog '{title}' for user {user_id}: {response.status_code} {response.text}"
            )
    except Exception as e:
        print(
            f"An error occurred while creating the catalog '{title}' for user {user_id}: {e}"
        )


json_file_path = "./client/src/assets/json/artists.json"
with open(json_file_path, "r") as file:
    artists = json.load(file)


for artist in artists:
    user_id = create_user(artist)
    if user_id:
        selected_files = random.sample(
            music_files, min(len(music_files), random.randint(1, 5))
        )
        create_catalog(
            user_id, artist.get("name"), artist.get("pictureProfile"), selected_files
        )
