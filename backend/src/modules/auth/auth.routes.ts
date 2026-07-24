import { Router } from "express";
import { validateData } from "../../common/middleware/validation-middleware.ts";
import { authSigninSchema, authSignupSchema } from "./auth.schema.ts";
import * as controller from "./auth.controller.ts";
import authMiddleware from "./auth.middleware.ts";

const router = Router();

router.post("/signup", validateData(authSignupSchema), controller.signup);
router.post("/signin", validateData(authSigninSchema), controller.signin);
router.post("/refresh", controller.refresh);
router.get("/getme", authMiddleware, controller.getMe);
router.get("/logout", authMiddleware, controller.logout);

export default router;
