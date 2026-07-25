import { Router } from "express";
import authMiddleware from "../auth/auth.middleware";
import * as controller from "./learning.controller.ts";
import { validateData } from "../../common/middleware/validation-middleware.ts";
import { learningSchema } from "./learning.schema.ts";

const router = Router();

router.post(
  "/addLearning",
  validateData(learningSchema),
  authMiddleware,
  controller.addLearning,
);

export default router;
