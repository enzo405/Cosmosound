import express from "express";
import auth from "@/middlewares/auth.middleware";
import userTrigger from "@/triggers/user.trigger";

const router = express.Router();

router.put("/me", auth, userTrigger.updateUser);

export default router;
