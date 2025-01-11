import express from "express";
import auth from "@/middlewares/auth.middleware";
import trigger from "@/triggers/user.trigger";
import { multerMiddleware } from "@/middlewares/multer.middlware";
import { wrapRoute } from "@/utils/wrapper";

const router = express.Router();

router.patch("/me", ...wrapRoute([auth, multerMiddleware, trigger.updateUser]));
router.patch("/me/artist", ...wrapRoute([auth, trigger.updateArtist]));

export default router;
