import { type Request, type Response, type NextFunction } from "express";
import ApiResponse from "../../common/utils/api-response";
import * as learningService from "./learning.service.ts";
import ApiError from "../../common/utils/api-error.ts";

interface AuthRequest extends Request {
  userId?: string;
}

const addLearning = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;
    if (!userId) {
      throw ApiError.unauthorized("Unauthorized User");
    }
    const learningData = await learningService.addLearning({
      userId,
      title: req.body.title,
      description: req.body.description,
    });

    ApiResponse.created(res, "Added learning", learningData);
  } catch (error) {
    next(error);
  }
};

export { addLearning };
