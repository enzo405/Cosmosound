import { MusicDetails } from "./../models/Music";
import dataGenre from "./../assets/json/genres.json";
import { Playlist } from "./../models/Playlist";
import { DetailedCatalog } from "./../models/Catalog";
import { Artist, UserDetails } from "./../models/User";
import { apiClient } from "./axiosService";

function getAllGenres(): string[] {
  return dataGenre;
}

function getMyFavouriteGenres(user: UserDetails): string[] {
  return dataGenre.filter((g) => user.likedGenres.find((name) => name === g));
}

export interface IGenreContent {
  musics: MusicDetails[];
  catalogs: DetailedCatalog[];
  playlists: Playlist[];
  artists: Artist[];
}

function getGenreByName(genreName: string): string[] {
  if (genreName == "") {
    return [];
  }
  return dataGenre.filter((genre) => genre.includes(genreName));
}

async function getGenreContent(
  genreName: string,
  skip: number = 0,
  take: number = 50,
): Promise<IGenreContent> {
  return await apiClient
    .get(`/genres?value=${genreName}&skip=${skip}&take=${take}`)
    .then((res) => res.data);
}

const GenresService = {
  getAllGenres,
  getMyFavouriteGenres,
  getGenreContent,
  getGenreByName,
};

export default GenresService;
