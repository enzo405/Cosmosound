import BadRequestException from "@/errors/BadRequestException";
import UnsupportedMediaTypeException from "@/errors/UnsupportedMediaTypeException";
import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

const fileFilter = async (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.fieldname === "thumbnailFile") {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new UnsupportedMediaTypeException("Only image files are allowed for 'thumbnail' field"));
    }
  } else if (file.fieldname === "musics") {
    if (file.mimetype.startsWith("audio/")) {
      cb(null, true);
    } else {
      cb(new UnsupportedMediaTypeException("Only audio files are allowed for 'musics' field"));
    }
  } else {
    cb(new BadRequestException("Invalid fieldname"));
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
});

export const multerCatalogMiddleware = upload.fields([
  { name: "thumbnailFile", maxCount: 1 },
  { name: "musics", maxCount: 20 },
]);
