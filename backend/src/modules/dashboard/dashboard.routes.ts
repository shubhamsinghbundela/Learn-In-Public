import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";
import * as controller from "./dashboard.controller";

const router = Router();

router.get("/", authMiddleware, controller.getDashboard);
router.get("/public/:username", controller.getPublicDashboard);

export default router;
