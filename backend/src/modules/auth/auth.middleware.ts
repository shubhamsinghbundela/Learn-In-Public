import { type Request, type Response, type NextFunction } from "express";
import userModel from "./auth.model";
import ApiError from "../../common/utils/api-error";
import { verifyAccessToken } from "../../common/utils/jwt";

interface AuthRequest extends Request {
  userId?: string;
}

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw ApiError.unauthorized("Access token missing");
    }

    const decode = verifyAccessToken(token);

    const userExists = await userModel.findOne({
      _id: decode.userId,
    });

    if (!userExists) {
      throw ApiError.notFound("User Not found");
    }

    req.userId = decode.userId;

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
