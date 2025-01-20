import { Music, MusicDetails } from "models/Music";
import data from "assets/json/musics.json";
import { apiClient } from "./axiosService";
import { DetailedCatalog } from "models/Catalog";

const musicData: MusicDetails[] = data as MusicDetails[];

function getMusicById(id: string): MusicDetails | undefined {
  return musicData.find((music) => music.id == id);
}

async function searchMusicByTitle(value: string): Promise<MusicDetails[]> {
  if (value == "") {
    return [];
  }

  return await apiClient
    .get(`/api/musics?search=${value.toLowerCase().trim()}`)
    .then((res) => res.data);
}

async function deleteMusic(idCatalog: string, music: Music): Promise<DetailedCatalog> {
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
  getMusicById,
  getMusicHistory,
  searchMusicByTitle,
  deleteMusic,
};

export default MusicService;
