import express from "express";
import auth from "../middlewares/auth.middleware";
import trigger from "../triggers/genre.trigger";
import { wrapRoute } from "../utils/wrapper";

const router = express.Router();

router.get("/genres", ...wrapRoute([auth, trigger.getGenreContent]));

export default router;
