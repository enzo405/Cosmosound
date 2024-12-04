import { Genre } from "models/Music";
import data from "assets/json/genres.json";

function getAllGenres(): Genre[] {
  let genres: Genre[] = [];
  data.map((genreName) => genres.push({ name: genreName }));
  return genres;
}

function getMyFavouriteGenres(): Genre[] {
  return getAllGenres().slice(1, 20);
}

const GenresService = {
  getAllGenres,
  getMyFavouriteGenres,
};

export default GenresService;
