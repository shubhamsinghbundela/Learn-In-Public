import { type Request, type Response, type NextFunction } from "express";
import ApiResponse from "../../common/utils/api-response.ts";
import * as userService from "./auth.service.ts";

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
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    ApiResponse.ok(res, "Signin Successful", { accessToken, user });
  } catch (error) {
    next(error);
  }
};

export { signup, signin };
