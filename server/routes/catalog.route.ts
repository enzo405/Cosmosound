import express from "express";
import catalogTrigger from "@/triggers/catalog.trigger";
import auth from "@/middlewares/auth.middleware";
import { multerCatalogMiddleware } from "@/middlewares/catalogMulter.middleware";

const router = express.Router();

router.post("/catalog", auth, multerCatalogMiddleware, catalogTrigger.createCatalog);

export default router;
