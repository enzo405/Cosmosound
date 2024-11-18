# This file is meant for generating fake data

import json
import random
from datetime import datetime
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

# Spotify API credentials
CLIENT_ID = "***********************"  # Replace with your Spotify Client ID
CLIENT_SECRET = "*************************"  # Replace with your Spotify Client Secret

# File paths
artist_names_path = "src/assets/json/artist_name.json"
genres_path = "src/assets/json/genres.json"
artist_output_path = "src/assets/json/artist.json"

# Mock data for social media links
SOCIAL_MEDIA = [
    {"media": "X", "link": "https://x.com/artist"},
    {"media": "APPLE_MUSIC", "link": "https://music.apple.com/artist"},
    {"media": "YTB_MUSIC", "link": "https://music.youtube.com/artist"},
    {"media": "INSTAGRAM", "link": "https://instagram.com/artist"},
]


# Helper function to generate mock social media links
def generate_social_media_links(spotify_link):
    # Always include Spotify link and add additional mock links
    links = [{"media": "SPOTIFY", "link": spotify_link}]
    count = random.randint(0, 2)
    links.extend(random.sample(SOCIAL_MEDIA, count))
    return links


# Fetch artist picture and Spotify link from Spotify
def fetch_artist_data(artist_name):
    credentials = SpotifyClientCredentials(
        client_id=CLIENT_ID, client_secret=CLIENT_SECRET
    )
    spotify = spotipy.Spotify(client_credentials_manager=credentials)

    results = spotify.search(q=f"artist:{artist_name}", type="artist", limit=1)
    if results["artists"]["items"]:
        artist = results["artists"]["items"][0]
        images = artist.get("images", [])
        picture_profile = images[0]["url"] if images else None
        spotify_link = artist.get("external_urls", {}).get("spotify", None)
        return picture_profile, spotify_link
    return None, None


# Load data from JSON files
with open(artist_names_path, "r") as artist_file:
    artist_names = json.load(artist_file)

with open(genres_path, "r") as genres_file:
    genres = json.load(genres_file)

# Generate artist data
artists = []
for i, name in enumerate(artist_names, start=1):
    genre = random.choice(genres)  # Randomly assign a genre
    picture_profile, spotify_link = fetch_artist_data(name)

    if not spotify_link:
        print(f"Spotify link not found for artist: {name}. Skipping...")
        continue  # Skip artists without a Spotify link

    artist_data = {
        "id": i,
        "name": name,
        "email": f"{name.lower().replace(' ', '_')}@example.com",
        "date_creation": datetime.utcnow().isoformat() + "Z",
        "picture_profile": picture_profile or f"https://picsum.photos/seed/{i}/200",
        "followers": random.randint(1000, 100000),
        "followings": [],  # Empty for now or can include mock data
        "social_media": generate_social_media_links(spotify_link),
        "genre": {"name": genre},
        "artist_name": name,
    }
    artists.append(artist_data)

# Write to artist.json
with open(artist_output_path, "w") as output_file:
    json.dump(artists, output_file, indent=4)

print(f"Generated {artist_output_path} successfully.")
