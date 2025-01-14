import { Music, MusicDetails } from "models/Music";
import data from "assets/json/musics.json";
import { apiClient } from "./axiosService";
import { Catalog, CatalogWithMusic } from "models/Catalog";

const musicData: MusicDetails[] = data as MusicDetails[];

function getAllMusic(): MusicDetails[] {
  return musicData;
}

function getMusicById(id: string): MusicDetails | undefined {
  return musicData.find((music) => music.id == id);
}

function searchMusicByTitle(value: string): MusicDetails[] {
  if (value == "") {
    return [];
  }

  const searchTerm = value.toLowerCase().trim();

  const musicNameMatch = musicData
    .filter((music) => music.title.toLowerCase().includes(searchTerm))
    .slice(0, 7);

  const musicArtistMatch = musicData
    .filter((music) => music.artist.artistName.toLowerCase().includes(searchTerm))
    .slice(0, 3);

  const result = [...musicNameMatch, ...musicArtistMatch];
  return [...new Set(result)];
}

async function deleteMusic(idCatalog: string, music: Music): Promise<CatalogWithMusic> {
  return await apiClient
    .delete(`/api/catalogs/${idCatalog}/music/${music.id}`)
    .then((res) => res.data);
}

function getMusicHistory(): MusicDetails[] {
  return musicData.filter((music) =>
    [
      "6SShrkXpvyKEMslHdCbqJI",
      "1EDPVGbyPKJPeGqATwXZvN",
      "2eKoPnGnuHqIpfph45z44W",
      "6TlZSSNZd397eYRzbu5SaT",
      "4ffORoAHM64qesY9g2Pihk",
      "7efju7ceWRoeHSQytZf4e4",
      "47enw9R1hdkfuxeSjoDQ0N",
      "65VHUZPZKgaG4SJVRkBPzn",
      "7stpbtJzoBx1D38egFeT29",
      "3LpHzQU2CZzZJGdUWV79SI",
      "2ktANg8ehDgdR1EG1ANsIX",
    ].includes(music.id),
  );
}

const MusicService = {
  getAllMusic,
  getMusicById,
  getMusicHistory,
  searchMusicByTitle,
  deleteMusic,
};

export default MusicService;
