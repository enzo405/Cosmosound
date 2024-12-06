import dataArtist from "assets/json/artists.json";
import dataMusic from "assets/json/musics.json";
import dataCatalog from "assets/json/catalogs.json";
import { Artist } from "models/User";
import { MusicDetails } from "models/Music";

function getMyFavouriteArtist(): Artist[] {
  return dataArtist.filter((artist) =>
    [1, 2, 3, 14, 30, 34, 38, 51, 52, 59, 60, 66, 68, 71, 72, 73, 30, 29, 25, 24, 19, 16].includes(
      artist.id,
    ),
  );
}

function searchArtistByName(value: string): Artist[] {
  const searchTerm = value.toLowerCase().trim();
  const MAX_RESULTS = 10;

  const artistNameMatch = dataArtist
    .filter((artist) => (artist.artist_name || artist.name).toLowerCase().includes(searchTerm))
    .slice(0, MAX_RESULTS);

  if (artistNameMatch.length >= MAX_RESULTS) return artistNameMatch;

  const catalogMatch = dataCatalog
    .filter((catalog) => catalog.title.toLowerCase().includes(searchTerm))
    .slice(0, MAX_RESULTS)
    .map((catalog) => catalog.owner);

  const combinedMatches = [...artistNameMatch, ...catalogMatch];
  if (combinedMatches.length >= MAX_RESULTS) return combinedMatches;

  const musicMatch = (dataMusic as MusicDetails[])
    .filter((music) => music.title.toLowerCase().includes(searchTerm))
    .slice(0, MAX_RESULTS)
    .map((music) => music.artist);

  return [...combinedMatches, ...musicMatch].slice(0, MAX_RESULTS);
}

const ArtistService = {
  getMyFavouriteArtist,
  searchArtistByName,
};

export default ArtistService;
