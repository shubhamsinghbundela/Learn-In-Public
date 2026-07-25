import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";
import * as controller from "./goal.controller";
import { validateData } from "../../common/middleware/validation-middleware";
import { goalSchema } from "./goal.schema";

const router = Router();

router.post(
  "/createGoal",
  validateData(goalSchema),
  authMiddleware,
  controller.createGoal,
);

export default router;
