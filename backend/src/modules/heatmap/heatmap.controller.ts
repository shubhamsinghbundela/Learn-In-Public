import type { Request, Response, NextFunction } from "express";
import ApiError from "../../common/utils/api-error";
import ApiResponse from "../../common/utils/api-response";
import * as heatmapService from "./heatmap.service";

interface AuthRequest extends Request {
  userId?: string;
}

const getHeatmap = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      throw ApiError.unauthorized("Unauthorized User");
    }

    const heatmap = await heatmapService.getHeatmap(userId);

    ApiResponse.ok(res, "Heatmap fetched successfully", heatmap);
  } catch (error) {
    next(error);
  }
};

export { getHeatmap };
