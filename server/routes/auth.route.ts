import express from "express";
import authController from "@/triggers/auth.trigger";
import auth from "@/middlewares/auth.middleware";

const router = express.Router();

router.get("/me", auth, authController.getProfile);
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);

export default router;
