import express from "express";
import trigger from "../triggers/file.trigger";
import auth from "../middlewares/auth.middleware";
import { multerMiddleware } from "../middlewares/multer.middlware";
import { wrapRoute } from "../utils/wrapper";

const router = express.Router();

router.post("/upload/image", ...wrapRoute([auth, multerMiddleware, trigger.uploadPicture]));

export default router;
