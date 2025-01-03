import express from "express";
import auth from "@/middlewares/auth.middleware";
import userTrigger from "@/triggers/user.trigger";
import { multerMiddleware } from "@/middlewares/multer.middlware";

const router = express.Router();

router.patch("/me", auth, multerMiddleware, userTrigger.updateUser);
router.patch("/me/artist", auth, userTrigger.updateArtist);

export default router;
