import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.fieldname === "thumbnail") {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed for 'thumbnail' field"));
    }
  } else if (file.fieldname === "musics") {
    if (file.mimetype.startsWith("audio/")) {
      cb(null, true);
    } else {
      cb(new Error("Only audio files are allowed for 'musics' field"));
    }
  } else {
    cb(new Error("Unexpected field"));
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
});

export const multerCatalogMiddleware = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "musics", maxCount: 20 },
]);
