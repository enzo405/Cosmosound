import { Playlist } from "models/Playlist";
import data from "assets/json/playlists.json";
import { Music } from "models/Music";

const playlistsData = data as Playlist[];

function getMyPlaylist(): Playlist[] {
  return playlistsData.filter((playlist) =>
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(playlist.id)),
  );
}

function searchPlaylistByTitle(value: string): Playlist[] {
  if (value == "") {
    return [];
  }

  const searchTerm = value.toLowerCase().trim();

  const playlistsTitleMatch = playlistsData
    .filter((playlist) => playlist.title.toLowerCase().includes(searchTerm))
    .slice(0, 10);

  return [...new Set(playlistsTitleMatch)];
}

function getPlaylistById(id?: string): Playlist | undefined {
  if (id == undefined) return undefined;

  return playlistsData.find((playlist) => playlist.id == id);
}

function deletePlaylist(playlist: Playlist): void {
  console.log("playlist", playlist);
}

function deleteMusic(playlist: Playlist, music: Music) {
  console.log("playlist, music", playlist, music);
}

function addMusic(playlist: Playlist, music: Music) {
  console.log("playlist, music", playlist, music);
}

const PlaylistService = {
  getMyPlaylist,
  searchPlaylistByTitle,
  getPlaylistById,
  deletePlaylist,
  deleteMusic,
  addMusic,
};

export default PlaylistService;
