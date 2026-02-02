import { Music, MusicWithCatalog } from "./../models/Music";
import { apiClient } from "./axiosService";
import { Playlist, PlaylistWithMusic } from "./../models/Playlist";

async function searchPlaylistByTitle(value: string): Promise<Playlist[]> {
  if (value == "") {
    return [];
  }

  return await apiClient
    .get(`/playlists?search=${value.toLowerCase().trim()}`)
    .then((res) => res.data);
}

async function getPlaylistById(id?: string): Promise<PlaylistWithMusic | undefined> {
  if (id == undefined) return undefined;

  return await apiClient.get(`/playlists/${id}`).then((res) => res.data);
}

async function deletePlaylist(playlist: Playlist): Promise<void> {
  return await apiClient.delete(`/playlists/${playlist.id}`);
}

async function deleteMusic(playlist: Playlist, music: Music): Promise<Playlist> {
  return await apiClient
    .delete(`/playlists/${playlist.id}/musics/${music.id}`)
    .then((res) => res.data);
}

async function addMusic(playlist: Playlist, music: MusicWithCatalog): Promise<Playlist> {
  return await apiClient
    .post(`/playlists/${playlist.id}/musics`, {
      idMusic: music.id,
      idCatalog: music.catalog.id,
    })
    .then((res) => res.data);
}

async function createPlaylist(title: string): Promise<Playlist> {
  return await apiClient.post(`/playlists`, { title }).then((res) => res.data);
}

const PlaylistService = {
  searchPlaylistByTitle,
  getPlaylistById,
  deletePlaylist,
  deleteMusic,
  addMusic,
  createPlaylist,
};

export default PlaylistService;
