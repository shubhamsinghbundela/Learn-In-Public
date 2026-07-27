import { type Request, type Response, type NextFunction } from "express";
import ApiResponse from "../../common/utils/api-response.ts";
import * as userService from "./auth.service.ts";
import ApiError from "../../common/utils/api-error.ts";

interface AuthRequest extends Request {
  userId?: string;
}

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.signup(req.body);
    ApiResponse.created(res, "User successfully Created", user);
  } catch (error) {
    next(error);
  }
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken, refreshToken, user } = await userService.signin(
      req.body,
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    ApiResponse.ok(res, "Signin Successful", { accessToken, user });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken } = await userService.refresh(req.cookies.refreshToken);
    ApiResponse.created(res, "Token refreshed successfully", { accessToken });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;
    if (!userId) {
      throw ApiError.unauthorized("Unauthorized User");
    }
    const { user } = await userService.getMe(userId);

    ApiResponse.ok(res, "User get successfully", { user });
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("refreshToken");

    ApiResponse.ok(res, "Logout Success");
  } catch (error) {
    next(error);
  }
};

export { signup, signin, refresh, getMe, logout };
