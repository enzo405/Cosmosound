import { Playlist } from "models/Playlist";
import data from "assets/json/playlists.json";

const playlistsData = data as Playlist[];

function getMyPlaylist(): Playlist[] {
  return playlistsData.filter((playlist) =>
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(playlist.id)),
  );
}

function searchPlaylistByTitle(value: string): Playlist[] {
  const searchTerm = value.toLowerCase().trim();

  const playlistsTitleMatch = playlistsData
    .filter((playlist) => playlist.title.toLowerCase().includes(searchTerm))
    .slice(0, 10);

  return [...new Set(playlistsTitleMatch)];
}

const PlaylistService = {
  getMyPlaylist,
  searchPlaylistByTitle,
};

export default PlaylistService;
