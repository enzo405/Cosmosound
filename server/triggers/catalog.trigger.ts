import BadRequestException from "@/errors/BadRequestException";
import NotFoundException from "@/errors/NotFoundException";
import { UserRequest } from "@/middlewares/auth.middleware";
import catalogService from "@/services/catalog.service";
import nextcloudService from "@/services/nextcloud.service";
import { guessCatalogType } from "@/utils/catalog";
import { Catalogs, Prisma } from "@prisma/client";
import { Response } from "express";
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

export default { createCatalog, getCatalogById, deleteCatalog, deleteMusic, searchCatalog };
