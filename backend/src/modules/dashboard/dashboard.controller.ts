import type { Request, Response, NextFunction } from "express";
import ApiError from "../../common/utils/api-error";
import * as dashboardService from "./dashboard.service";
import ApiResponse from "../../common/utils/api-response";

interface AuthRequest extends Request {
  userId?: string;
}

const getDashboard = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;

    if (!userId) {
      throw ApiError.unauthorized("Unauthorized User");
    }

    const { date } = req.query;

    const dashboard = await dashboardService.getDashboard({
      userId,
      date: date as string,
    });

    ApiResponse.ok(res, "Dashboard fetched successfully", dashboard);
  } catch (error) {
    next(error);
  }
};

export { getDashboard };
