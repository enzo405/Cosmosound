import express from "express";
import trigger from "@/triggers/catalog.trigger";
import auth from "@/middlewares/auth.middleware";
import { multerCatalogMiddleware } from "@/middlewares/catalogMulter.middleware";
import { wrapRoute } from "@/utils/wrapper";

const router = express.Router();

router.get("/audio-stream/:idCatalog/:idMusic", ...wrapRoute([trigger.listenMusic]));
router.get("/catalogs/:id", ...wrapRoute([auth, trigger.getCatalogById]));
router.get("/catalogs", ...wrapRoute([auth, trigger.searchCatalog]));
router.get("/musics", ...wrapRoute([auth, trigger.searchMusic]));
router.post("/catalogs", ...wrapRoute([auth, multerCatalogMiddleware, trigger.createCatalog]));
router.delete("/catalogs/:id", ...wrapRoute([auth, trigger.deleteCatalog]));
router.delete("/catalogs/:id/musics/:idMusic", ...wrapRoute([auth, trigger.deleteMusic]));

export default router;
