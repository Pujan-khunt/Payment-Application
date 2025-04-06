import { Router } from "express";
import { getProfilesByFilter } from "../controllers/bulk.controller.js";
const router = Router();

router.get("/bulk", getProfilesByFilter);

export default router;
