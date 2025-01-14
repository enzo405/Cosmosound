import express from "express";
import trigger from "@/triggers/catalog.trigger";
import auth from "@/middlewares/auth.middleware";
import { multerCatalogMiddleware } from "@/middlewares/catalogMulter.middleware";
import { wrapRoute } from "@/utils/wrapper";

const router = express.Router();

router.get("/catalogs/:id", ...wrapRoute([auth, trigger.getCatalogById]));
router.get("/catalogs", ...wrapRoute([auth, trigger.searchCatalog]));
router.post("/catalogs", ...wrapRoute([auth, multerCatalogMiddleware, trigger.createCatalog]));
router.delete("/catalogs/:id", ...wrapRoute([auth, trigger.deleteCatalog]));
router.delete("/catalogs/:id/music/:idMusic", ...wrapRoute([auth, trigger.deleteMusic]));

export default router;
