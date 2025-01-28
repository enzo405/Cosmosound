import BadRequestException from "./errors/BadRequestException";
import NotFoundException from "./errors/NotFoundException";
import { UserRequest } from "./middlewares/auth.middleware";
import userRepository from "./repository/user.repository";
import catalogService from "./services/catalog.service";
import nextcloudService from "./services/nextcloud.service";
import userService from "./services/user.service";
import { guessCatalogType } from "./utils/catalog";
import { Catalogs, Prisma } from ".prisma/client";
import axios from "axios";
import { Response } from "express";
import fs from "fs";
import { ObjectId } from "mongodb";
import path from "path";

interface MulterRequest extends UserRequest {
  files?:
    | {
        thumbnailFile?: Express.Multer.File[];
        musics?: Express.Multer.File[];
      }
    | Express.Multer.File[];
}

const createCatalog = async (req: MulterRequest, res: Response) => {
  const { title, defaultThumbnail } = req.body;
  const files = req.files as {
    thumbnailFile?: Express.Multer.File[];
    musics?: Express.Multer.File[];
  };

  let thumbnail: string | Express.Multer.File;
  if (files.thumbnailFile && files.thumbnailFile[0]) {
    thumbnail = files.thumbnailFile[0];
  } else if (defaultThumbnail) {
    thumbnail = defaultThumbnail;
  } else {
    throw new BadRequestException("A thumbnail is required.");
  }

  const genres: string[][] = JSON.parse(req.body.genres);
  const durations: number[] = JSON.parse(req.body.durations);
  if (files.musics?.length !== genres.length) {
    throw new BadRequestException("Each songs should have at least one genres.");
  }
  if (genres.length !== durations.length) {
    throw new BadRequestException(
      "An error occured while trying to retrieve the duration in the request."
    );
  }

  if (!files.musics) {
    throw new BadRequestException("You need to upload at least one music to an album.");
  }

  const musics: { genres: string[]; duration: number; file: Express.Multer.File; id: string }[] =
    [];

  for (let i = 0; i < files.musics.length; i++) {
    const musicGenres: string[] = genres[i];
    const musicDuration: number = durations[i];
    const music: Express.Multer.File = files.musics[i];
    const musicId: string = new ObjectId().toString();

    musics.push({
      genres: musicGenres,
      id: musicId,
      file: music,
      duration: musicDuration,
    });
  }

  const idCatalog = new ObjectId().toString();
  const thumnbailUrl =
    typeof thumbnail === "string"
      ? thumbnail
      : await nextcloudService.uploadPicture(thumbnail, "CT", idCatalog);
  const musicsUrl = await nextcloudService.uploadMusics({
    idCatalog,
    files: musics.map((element) => ({
      music: element.file,
      idMusic: element.id,
    })),
  });

  const musicsEntities: Prisma.MusicCreateInput[] = [];
  let totalDuration: number = 0;

  for (const music of musics) {
    const musicUrl = musicsUrl[music.id];

    if (musicUrl) {
      totalDuration += music.duration;
      const originalName = music.file.originalname;
      const title = path.basename(originalName, path.extname(originalName));

      musicsEntities.push({
        id: music.id,
        title: title,
        duration: music.duration,
        genres: music.genres,
        url: musicUrl,
      });
    }
  }

  const catalog = await catalogService.createCatalog({
    id: idCatalog,
    title,
    musics: musicsEntities,
    thumbnail: thumnbailUrl,
    owner: {
      connect: { id: req.userId! },
    },
    type: guessCatalogType({
      numberOfTracks: musicsEntities.length,
      totalDurationInMinutes: totalDuration,
    }),
  });
  res.status(201).json(catalog);
};

const getCatalogById = async (req: UserRequest, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new BadRequestException("Missing id in the params");
  }

  const catalog: Catalogs | null = await catalogService.getCatalogById(id);

  if (catalog === null) {
    throw new NotFoundException(`Catalog with id ${id} not found.`);
  }

  res.status(200).json(catalog);
};

const searchCatalog = async (req: UserRequest, res: Response) => {
  const { search } = req.query;
  if (!search) {
    throw new BadRequestException("A query must be provided");
  }

  if (typeof search != "string") {
    throw new BadRequestException("Search value must be a string");
  }

  const catalogs = await catalogService.searchCatalog(search);

  res.status(200).json(catalogs);
};

const deleteCatalog = async (req: UserRequest, res: Response) => {
  const { id } = req.params;

  const catalog = await catalogService.getCatalogById(id);

  if (!catalog) {
    throw new NotFoundException(`Catalog with id ${id} not found.`);
  }

  await catalogService.deleteCatalog(id, req.userId!);
  res.status(200).json({ message: `Catalog ${catalog.title} successfully deleted.` });
};

const deleteMusic = async (req: UserRequest, res: Response) => {
  const { id, idMusic } = req.params;

  const music = await catalogService.getMusicById(id, idMusic);

  if (!music) {
    throw new NotFoundException(`The music with id ${idMusic} not found.`);
  }

  const catalog = await catalogService.deleteMusic(req.userId, id, music?.id);
  res.status(200).json(catalog);
};

const searchMusic = async (req: UserRequest, res: Response) => {
  const { search } = req.query;
  if (!search) {
    throw new BadRequestException("A query must be provided");
  }

  if (typeof search != "string") {
    throw new BadRequestException("Search value must be a string");
  }

  const musics = await catalogService.searchMusic(search);

  res.status(200).json(musics);
};

const listenMusic = async (req: UserRequest, res: Response) => {
  const { musicUrl } = req.query;
  const range = req.headers.range;

  if (!range) {
    return res.status(416).send("Requires Range header");
  }

  if (!musicUrl || typeof musicUrl !== "string") {
    throw new BadRequestException("A music URL must be provided.");
  }

  try {
    const decodedUrl = decodeURIComponent(musicUrl);
    const fullUrl = process.env.NEXTCLOUD_BASE_URL + decodedUrl;

    const [unit, rangeValue] = range.split("=");
    const [startStr, endStr] = rangeValue.split("-");
    const start = parseInt(startStr, 10);
    const end = endStr ? parseInt(endStr, 10) : start + 1024 * 1024; // Default chunk size is 1MB
    const chunkSize = end - start + 1;

    const response = await axios.get(fullUrl, {
      responseType: "stream",
      headers: {
        Range: `${unit}=${start}-${end}`,
      },
      auth: {
        username: process.env.NEXTCLOUD_USERNAME!,
        password: process.env.NEXTCLOUD_PASSWORD!,
      },
    });

    const filename = decodedUrl.split("/").pop();
    const folderName = decodedUrl.split("/")[decodedUrl.split("/").length - 2];
    const idCatalog = folderName.split("-")[1];
    const idMusic = filename?.split(".")[0];

    if (!idMusic || !idCatalog) {
      throw new BadRequestException("An error occurred while trying to read the file.");
    }

    res.status(206);
    res.setHeader("Content-Range", response.headers["content-range"] ?? `bytes ${start}-${end}`);
    res.setHeader("Content-Length", chunkSize.toString());
    res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader("Content-Type", "audio/mpeg");

    if (start === 0) {
      userService.addMusicToHistory(req.userId!, idCatalog, idMusic);
    }

    response.data.pipe(res);
  } catch (err) {
    console.error("Error streaming audio:", err);
    throw new BadRequestException("An error occurred while trying to read the file.");
  }
};

export default {
  createCatalog,
  getCatalogById,
  deleteCatalog,
  deleteMusic,
  searchCatalog,
  searchMusic,
  listenMusic,
};
