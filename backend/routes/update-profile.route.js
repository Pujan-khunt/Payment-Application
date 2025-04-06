import { Router } from "express";
import { updateProfile } from "../controllers/update-profile.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();

router.put("/update-profile", authMiddleware, updateProfile);

export default router;

