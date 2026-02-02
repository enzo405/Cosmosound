import { GenreContent } from "../models/GenreContent";
import genreRepository from "../repository/genre.repository";

const getGenreContent = async (
  genreName: string,
  skip: string,
  take: string
): Promise<GenreContent> => {
  return await genreRepository.getGenreContent(genreName, skip, take);
};

export default {
  getGenreContent,
};
