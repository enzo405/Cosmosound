import express from "express";
import authTrigger from "@/triggers/auth.trigger";
import auth from "@/middlewares/auth.middleware";
import refreshToken from "@/middlewares/refresh.middleware";
import unauthenticated from "@/middlewares/unauthenticated.middleware";
import { multerMiddleware } from "@/middlewares/multer.middlware";

const router = express.Router();

router.get("/me", auth, authTrigger.getProfile);
router.post("/register", multerMiddleware, authTrigger.signUp);
router.post("/login", unauthenticated, authTrigger.signIn);
router.post("/refresh", refreshToken, authTrigger.getRefreshToken);
router.post("/logout", authTrigger.logout);

export default router;
