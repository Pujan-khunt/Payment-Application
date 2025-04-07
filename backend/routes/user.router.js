import { Router } from "express";
import { signUpUser, updateProfile, getProfilesByFilter } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/sign-up", signUpUser);
router.get("/get-profiles", authMiddleware, getProfilesByFilter);
router.put("/update-profile", authMiddleware, updateProfile);

export default router;
