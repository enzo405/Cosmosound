import express from "express";
import auth from "./middlewares/auth.middleware";
import trigger from "./triggers/playlist.trigger";
import { wrapRoute } from "./utils/wrapper";

const router = express.Router();

router.get("/playlists/:id", ...wrapRoute([auth, trigger.getPlaylistById]));
router.get("/playlists", ...wrapRoute([auth, trigger.searchPlaylist]));
router.post("/playlists", ...wrapRoute([auth, trigger.createPlaylist]));
router.post("/playlists/:id/musics", ...wrapRoute([auth, trigger.AddMusic]));
router.delete("/playlists/:id", ...wrapRoute([auth, trigger.deletePlaylist]));
router.delete("/playlists/:id/musics/:idMusic", ...wrapRoute([auth, trigger.deleteMusic]));

export default router;
