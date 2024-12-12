import { Playlist } from "models/Playlist";
import data from "assets/json/playlists.json";
import { Music } from "models/Music";
import { UserDetails } from "models/User";

const playlistsData = data as Playlist[];

function getMyPlaylist(user: UserDetails): Playlist[] {
  return playlistsData.filter((playlist) => user.likedPlaylists.find((id) => id == playlist.id));
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

function createPlaylist(title: string): void {
  console.log("playlist create ", title);
}

const PlaylistService = {
  getMyPlaylist,
  searchPlaylistByTitle,
  getPlaylistById,
  deletePlaylist,
  deleteMusic,
  addMusic,
  createPlaylist,
};

export default PlaylistService;
