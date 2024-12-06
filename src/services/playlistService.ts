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
  const MAX_RESULTS = 10;

  const playlistsTitleMatch = playlistsData
    .filter((playlist) => {
      return playlist.title.toLowerCase().includes(searchTerm);
    })
    .slice(0, MAX_RESULTS);

  if (playlistsTitleMatch.length > MAX_RESULTS) return playlistsTitleMatch;

  const playlistsMusicNameMatch = playlistsData.filter((playlist) => {
    return playlist.musics.some((music) => music.title.toLowerCase().includes(searchTerm));
  });

  return [...playlistsTitleMatch, ...playlistsMusicNameMatch].slice(0, MAX_RESULTS);
}

const PlaylistService = {
  getMyPlaylist,
  searchPlaylistByTitle,
};

export default PlaylistService;
