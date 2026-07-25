import type { Request, Response, NextFunction } from "express";
import ApiError from "../../common/utils/api-error";
import * as dashboardService from "./dashboard.service";
import ApiResponse from "../../common/utils/api-response";

interface AuthRequest extends Request {
  userId?: string;
}

interface PublicDashboardParams {
  username: string;
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

const getPublicDashboard = async (
  req: Request<PublicDashboardParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username } = req.params;
    const { date } = req.query;
    if (typeof date !== "string") {
      throw ApiError.badRequest("Date is required");
    }
    const dashboard = await dashboardService.getPublicDashboard({
      username,
      date: date as string,
    });

    ApiResponse.ok(res, "Public dashboard fetched successfully", dashboard);
  } catch (error) {
    next(error);
  }
};

export { getDashboard, getPublicDashboard };
