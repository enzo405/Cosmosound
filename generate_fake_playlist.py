import json
import random
from datetime import datetime
import asyncio
import aiohttp

musics_data_path = "src/assets/json/musics.json"
artists_data_path = "src/assets/json/artists.json"
genres_data_path = "src/assets/json/genres.json"
catalog_data_path = "src/assets/json/catalogs.json"
playlist_output_path = "src/assets/json/playlists.json"
genres_output_path = "src/assets/json/genres.json"


async def main():
    async with aiohttp.ClientSession() as session:
        playlist_data = []

        with open(musics_data_path, "r") as musics_file:
            musics = json.load(musics_file)

        for i in range(0, 100):
            playlist = {
                "id": i,
                "title": f"Playlist {random.randint(1, 1000)}",
                "dateCreation": datetime.now().isoformat(),
                "owner": {
                    "id": 1,
                    "name": "Me",
                    "email": "bleo.smile@gmail.com",
                    "dateCreation": datetime.now().isoformat(),
                    "pictureProfile": f"https://picsum.photos/seed/{random.randint(1, 1000)}/200",
                    "followers": random.randint(0, 500),
                },
                "musics": random.sample(musics, k=random.randint(1, 20)),
            }

            playlist_data.append(playlist)

        with open(playlist_output_path, "w") as playlist_file:
            json.dump(playlist_data, playlist_file, indent=4)

        print(f"Generated {playlist_output_path} successfully.")


async def main_fix_genre():
    async with aiohttp.ClientSession() as session:
        genres_data = []

        with open(musics_data_path, "r") as musics_file:
            musics = json.load(musics_file)

        all_genre_name = [
            "acoustic",
            "afrobeat",
            "alt-rock",
            "alternative",
            "ambient",
            "anime",
            "black-metal",
            "bluegrass",
            "blues",
            "bossanova",
            "brazil",
            "breakbeat",
            "british",
            "cantopop",
            "chicago-house",
            "children",
            "chill",
            "classical",
            "club",
            "comedy",
            "country",
            "dance",
            "dancehall",
            "death-metal",
            "deep-house",
            "detroit-techno",
            "disco",
            "disney",
            "drum-and-bass",
            "dub",
            "dubstep",
            "edm",
            "electro",
            "electronic",
            "emo",
            "folk",
            "forro",
            "french",
            "funk",
            "garage",
            "german",
            "gospel",
            "goth",
            "grindcore",
            "groove",
            "grunge",
            "guitar",
            "happy",
            "hard-rock",
            "hardcore",
            "hardstyle",
            "heavy-metal",
            "hip-hop",
            "holidays",
            "honky-tonk",
            "house",
            "idm",
            "indian",
            "indie",
            "indie-pop",
            "industrial",
            "iranian",
            "j-dance",
            "j-idol",
            "j-pop",
            "j-rock",
            "jazz",
            "k-pop",
            "kids",
            "latin",
            "latino",
            "malay",
            "mandopop",
            "metal",
            "metal-misc",
            "metalcore",
            "minimal-techno",
            "movies",
            "mpb",
            "new-age",
            "new-release",
            "opera",
            "pagode",
            "party",
            "philippines-opm",
            "piano",
            "pop",
            "pop-film",
            "post-dubstep",
            "power-pop",
            "progressive-house",
            "psych-rock",
            "punk",
            "punk-rock",
            "r-n-b",
            "rainy-day",
            "reggae",
            "reggaeton",
            "road-trip",
            "rock",
            "rock-n-roll",
            "rockabilly",
            "romance",
            "sad",
            "salsa",
            "samba",
            "sertanejo",
            "show-tunes",
            "singer-songwriter",
            "ska",
            "sleep",
            "songwriter",
            "soul",
            "soundtracks",
            "spanish",
            "study",
            "summer",
            "swedish",
            "synth-pop",
            "tango",
            "techno",
            "trance",
            "trip-hop",
            "turkish",
            "work-out",
            "world-music",
        ]

        for genre in all_genre_name:
            genres_data.append({"name": genre})

        for music in musics:
            for genre in music["genres"]:
                if genre["name"] not in [
                    genreName["name"] for genreName in genres_data
                ]:
                    genres_data.append({"name": genre["name"]})

        with open(genres_output_path, "w") as genres_file:
            json.dump(genres_data, genres_file, indent=4)

        print(f"Generated {genres_output_path} successfully.")


asyncio.run(main_fix_genre())
