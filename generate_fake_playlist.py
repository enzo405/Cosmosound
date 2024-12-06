import json
import random
from datetime import datetime
import asyncio
import aiohttp

musics_data_path = "src/assets/json/musics.json"
artists_data_path = "src/assets/json/artists.json"
playlist_output_path = "src/assets/json/playlists.json"


async def main():
    async with aiohttp.ClientSession() as session:
        playlist_data = []

        with open(musics_data_path, "r") as musics_file:
            musics = json.load(musics_file)

        with open(artists_data_path, "r") as artist_file:
            artists = json.load(artist_file)

        for i in range(0, 100):
            playlist = {
                "id": i,
                "title": f"Playlist {random.randint(1, 1000)}",
                "owner": {
                    "id": 1,
                    "name": "Me",
                    "email": "bleo.smile@gmail.com",
                    "date_creation": datetime.now().isoformat(),
                    "picture_profile": f"https://picsum.photos/seed/{random.randint(1, 1000)}/200",
                    "followers": random.randint(0, 500),
                    "followings": random.sample(
                        [artist["id"] for artist in artists],
                        k=min(len(artists), random.randint(1, 10)),
                    ),
                },
                "musics": random.sample(musics, k=random.randint(1, 20)),
            }

            playlist_data.append(playlist)

        with open(playlist_output_path, "w") as playlist_file:
            json.dump(playlist_data, playlist_file, indent=4)

        print(f"Generated {playlist_output_path} successfully.")


asyncio.run(main())
