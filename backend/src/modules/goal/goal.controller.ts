import type { Request, Response, NextFunction } from "express";
import ApiResponse from "../../common/utils/api-response";
import * as goalService from "./goal.service";
import ApiError from "../../common/utils/api-error";

interface AuthRequest extends Request {
  userId?: string;
}

const createGoal = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;
    if (!userId) {
      throw ApiError.unauthorized("Unauthorized User");
    }
    const timezone = req.header("x-timezone") || "UTC";
    const goal = await goalService.createGoal({
      userId,
      title: req.body.title,
      description: req.body.description,
      timezone,
    });

    ApiResponse.created(res, "Goal created successfully", goal);
  } catch (error) {
    next(error);
  }
};

export { createGoal };
