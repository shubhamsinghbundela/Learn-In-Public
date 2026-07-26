import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";
import * as controller from "./heatmap.controller";

const router = Router();

router.get("/getHeatmap", authMiddleware, controller.getHeatmap);

export default router;
