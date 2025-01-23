import { Music, MusicDetails } from "models/Music";
import { apiClient } from "./axiosService";
import { DetailedCatalog } from "models/Catalog";

async function audioStream(idCatalog: string, idMusic: string): Promise<Blob> {
  return await apiClient
    .get(`/api/audio-stream/${idCatalog}/${idMusic}`, {
      responseType: "blob",
    })
    .then((res) => res.data);
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
    .delete(`/api/catalogs/${idCatalog}/musics/${music.id}`)
    .then((res) => res.data);
}

async function getMusicHistory(): Promise<MusicDetails[]> {
  return await apiClient.get("/api/me/music-history").then((res) => res.data);
}

const MusicService = {
  getMusicHistory,
  searchMusicByTitle,
  deleteMusic,
  audioStream,
};

export default MusicService;
