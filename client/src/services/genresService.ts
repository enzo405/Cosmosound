import { Genre, MusicDetails } from "models/Music";
import dataGenre from "assets/json/genres.json";
import dataMusic from "assets/json/musics.json";
import dataCatalog from "assets/json/catalogs.json";
import dataPlaylist from "assets/json/playlists.json";
import dataArtist from "assets/json/artists.json";
import { Playlist } from "models/Playlist";
import { Catalog, DetailedCatalog } from "models/Catalog";
import { Artist, UserDetails } from "models/User";

function getAllGenres(): Genre[] {
  return dataGenre;
}

function getMyFavouriteGenres(user: UserDetails): Genre[] {
  return dataGenre.filter((g) => user.likedGenres.find((name) => name === g.name));
}

interface GenreContent {
  musics: MusicDetails[];
  catalogs: DetailedCatalog[];
  playlists: Playlist[];
  artists: Artist[];
}

function getGenreByName(genreName: string): Genre[] {
  if (genreName == "") {
    return [];
  }
  return dataGenre.filter((genre) => genre.name.includes(genreName));
}

function getGenreContent(genreName: string): GenreContent {
  const musics = (dataMusic as MusicDetails[])
    .filter((music) => {
      return music.genres.some((genre) => genre.name == genreName);
    })
    .slice(0, 50);

  const catalogs = dataCatalog
    .filter((catalog) =>
      catalog.musics.some((music) => music.genres.some((genre) => genre.name == genreName)),
    )
    .slice(0, 50);
  const playlists = (dataPlaylist as Playlist[])
    .filter((playlist) =>
      playlist.musics.some((music) => music.genres.some((genre) => genre.name == genreName)),
    )
    .slice(0, 50);

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
