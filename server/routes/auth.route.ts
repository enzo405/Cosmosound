import express from "express";
import trigger from "@/triggers/auth.trigger";
import auth from "@/middlewares/auth.middleware";
import refreshToken from "@/middlewares/refresh.middleware";
import unauthenticated from "@/middlewares/unauthenticated.middleware";
import { multerMiddleware } from "@/middlewares/multer.middlware";
import { wrapRoute } from "@/utils/wrapper";

const router = express.Router();

router.get("/me", ...wrapRoute([auth, trigger.getProfile]));
router.post("/register", ...wrapRoute([multerMiddleware, trigger.signUp]));
router.post("/login", ...wrapRoute([unauthenticated, trigger.signIn]));
router.post("/refresh", ...wrapRoute([refreshToken, trigger.getRefreshToken]));
router.post("/logout", ...wrapRoute([trigger.logout]));

export default router;
