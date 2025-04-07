import BadRequestException from "../errors/BadRequestException";
import { UserRequest } from "../middlewares/auth.middleware";
import genreService from "../services/genre.service";
import { Response } from "express";

const getGenreContent = async (req: UserRequest, res: Response) => {
  const { value, skip, take } = req.query;
  if (!value || !skip || !take) {
    throw new BadRequestException("A query must be provided");
  }

  if (typeof value != "string" || typeof skip != "string" || typeof take != "string") {
    throw new BadRequestException("Query must be a string");
  }

  const genreContent = await genreService.getGenreContent(value, skip, take);

  res.status(200).json(genreContent);
};

export default {
  getGenreContent,
};
