import { Genre, Music } from "models/Music";
import dataGenre from "assets/json/genres.json";
import dataMusic from "assets/json/musics.json";
import dataCatalog from "assets/json/catalogs.json";
import dataPlaylist from "assets/json/playlists.json";
import { Playlist } from "models/Playlist";
import { Catalog } from "models/Catalog";

function getAllGenres(): Genre[] {
  let genres: Genre[] = [];
  dataGenre.map((genreName) => genres.push({ name: genreName }));
  return genres;
}

function getMyFavouriteGenres(): Genre[] {
  return getAllGenres().slice(1, 20);
}

interface GenreContent {
  musics: Music[];
  catalogs: Catalog[];
  playlists: Playlist[];
}

function getGenreContent(genreName: string): GenreContent {
  const musics = (dataMusic as Music[]).filter((music) =>
    music.genres.includes({ name: genreName }),
  );
  const catalogs = dataCatalog.filter((catalog) =>
    catalog.musics.filter((music) => music.genres.includes(genreName)),
  );
  const playlists = (dataPlaylist as Playlist[]).filter((playlist) =>
    playlist.musics.filter((music) => music.genres.includes({ name: genreName })),
  );

  return {
    musics,
    catalogs,
    playlists,
  };
}

const GenresService = {
  getAllGenres,
  getMyFavouriteGenres,
  getGenreContent,
};

export default GenresService;
