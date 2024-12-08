import { Genre, MusicDetails } from "models/Music";
import dataGenre from "assets/json/genres.json";
import dataMusic from "assets/json/musics.json";
import dataCatalog from "assets/json/catalogs.json";
import dataPlaylist from "assets/json/playlists.json";
import dataArtist from "assets/json/artists.json";
import { Playlist } from "models/Playlist";
import { Catalog } from "models/Catalog";
import { Artist } from "models/User";

function getAllGenres(): Genre[] {
  return dataGenre;
}

function getMyFavouriteGenres(): Genre[] {
  return getAllGenres().slice(1, 20);
}

interface GenreContent {
  musics: MusicDetails[];
  catalogs: Catalog[];
  playlists: Playlist[];
  artists: Artist[];
}

function getGenreByName(genreName: string): Genre[] {
  return dataGenre.filter((genre) => genre.name.includes(genreName));
}

function getGenreContent(genreName: string): GenreContent {
  const musics = (dataMusic as MusicDetails[])
    .filter((music) => {
      return music.genres.filter((genre) => genre.name.includes(genreName));
    })
    .slice(0, 50);

  const catalogs = dataCatalog.filter((catalog) =>
    catalog.musics.filter((music) => music.genres.includes(genreName)),
  );
  const playlists = (dataPlaylist as Playlist[]).filter((playlist) =>
    playlist.musics.filter((music) => music.genres.includes({ name: genreName })),
  );
  const artists = (dataArtist as Artist[]).filter((artist) => artist.genre.name == genreName);

  return {
    musics,
    catalogs,
    playlists,
    artists,
  };
}

const GenresService = {
  getAllGenres,
  getMyFavouriteGenres,
  getGenreContent,
  getGenreByName,
};

export default GenresService;
