import express from "express";
import authController from "@/triggers/auth.trigger";
import auth from "@/middlewares/auth.middleware";
import refreshToken from "@/middlewares/refresh.middleware";
import unauthenticated from "@/middlewares/unauthenticated.middleware";

const router = express.Router();

router.get("/me", auth, authController.getProfile);
router.post("/register", authController.signUp);
router.post("/login", unauthenticated, authController.signIn);
router.post("/refresh", refreshToken, authController.getRefreshToken);
router.post("/logout", auth, authController.logout);

export default router;
