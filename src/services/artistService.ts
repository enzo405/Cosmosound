import dataArtist from "assets/json/artists.json";
import data from "assets/json/musics.json";
import dataCatalogs from "assets/json/catalogs.json";
import { Artist, DetailedArtistInfo } from "models/User";
import { MusicDetails } from "models/Music";
import { ArtistPanelFormData } from "pages/ArtistPanel/ArtistPanelPage";

const musicData: MusicDetails[] = data as MusicDetails[];

function getMyFavouriteArtist(): Artist[] {
  return dataArtist.filter((artist) =>
    [1, 2, 3, 14, 30, 34, 38, 51, 52, 59, 60, 66, 68, 71, 72, 73, 30, 29, 25, 24, 19, 16].includes(
      artist.id,
    ),
  );
}

function getArtistById(id: number | undefined): DetailedArtistInfo | undefined {
  if (id == undefined || isNaN(id)) return undefined;

  const artist = dataArtist.find((artist) => artist.id == id);
  if (!artist) return undefined;

  const musics = musicData.filter((music) => music.artist.id == id);
  const catalogs = dataCatalogs.filter((catalog) => catalog.owner.id == id);

  return {
    ...artist,
    musics,
    catalogs,
  };
}

function searchArtistByName(value: string): Artist[] {
  if (value == "") {
    return [];
  }

  const searchTerm = value.toLowerCase().trim();

  const artistNameMatch = dataArtist
    .filter((artist) => (artist.artistName || artist.name).toLowerCase().includes(searchTerm))
    .slice(0, 10);

  return [...new Set(artistNameMatch)];
}

function saveArtistData(data: ArtistPanelFormData): void {
  console.log("submit form data", data);
}

const ArtistService = {
  getMyFavouriteArtist,
  searchArtistByName,
  getArtistById,
  saveArtistData,
};

export default ArtistService;
