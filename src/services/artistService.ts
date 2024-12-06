import dataArtist from "assets/json/artists.json";
import { Artist } from "models/User";

function getMyFavouriteArtist(): Artist[] {
  return dataArtist.filter((artist) =>
    [1, 2, 3, 14, 30, 34, 38, 51, 52, 59, 60, 66, 68, 71, 72, 73, 30, 29, 25, 24, 19, 16].includes(
      artist.id,
    ),
  );
}

function searchArtistByName(value: string): Artist[] {
  const searchTerm = value.toLowerCase().trim();

  const artistNameMatch = dataArtist
    .filter((artist) => (artist.artist_name || artist.name).toLowerCase().includes(searchTerm))
    .slice(0, 10);

  return [...new Set(artistNameMatch)];
}

const ArtistService = {
  getMyFavouriteArtist,
  searchArtistByName,
};

export default ArtistService;
