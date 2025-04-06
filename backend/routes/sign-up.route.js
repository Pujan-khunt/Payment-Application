import { Router } from "express";
import { signUpUser } from "../controllers/sign-up.controller.js";
const router = Router();

router.post("/sign-up", signUpUser);

export default router;
