import express from "express";
import fileTrigger from "@/triggers/file.trigger";
import auth from "@/middlewares/auth.middleware";
import { multerMiddleware } from "@/middlewares/multer.middlware";

const router = express.Router();

router.post("/upload/image", auth, multerMiddleware, fileTrigger.uploadPicture);

export default router;
