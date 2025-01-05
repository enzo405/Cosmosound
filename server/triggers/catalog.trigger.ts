import { UserRequest } from "@/middlewares/auth.middleware";
import catalogService from "@/services/catalog.service";
import nextcloudService from "@/services/nextcloud.service";
import { guessCatalogType } from "@/utils/catalog";
import { Prisma } from "@prisma/client";
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
  try {
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
      res.status(400).json({ message: "A thumbnail is required." });
      return;
    }

    const genres: string[][] = JSON.parse(req.body.genres);
    const durations: number[] = JSON.parse(req.body.durations);
    if (files.musics?.length !== genres.length) {
      res.status(400).json({ message: "Each songs should have at least one genres." });
      return;
    }
    if (genres.length !== durations.length) {
      res
        .status(400)
        .json({
          message: "An error occured while trying to retrieve the duration in the request.",
        });
      return;
    }

    if (!files.musics) {
      res.status(400).json({ message: "You need to upload at least one music to an album." });
      return;
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
      owner: req.userId!,
      type: guessCatalogType({
        numberOfTracks: musicsEntities.length,
        totalDurationInMinutes: totalDuration,
      }),
    });

    res.status(200).json(catalog);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "An error occurred while creating a catalog." });
  }
};

export default { createCatalog };
