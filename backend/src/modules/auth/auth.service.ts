import ApiError from "../../common/utils/api-error";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../common/utils/jwt.ts";
import userModel from "./auth.model.ts";
import type { SigninInput, SignupInput } from "./auth.types.ts";
import bcrypt from "bcrypt";

const signup = async ({
  username,
  password,
  firstName,
  lastName,
}: SignupInput) => {
  const userExist = await userModel.findOne({
    username,
  });

  if (userExist) {
    throw ApiError.forbidden("User Already Exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    firstName,
    lastName,
    username,
    password: hashedPassword,
  });

  return {
    userId: newUser._id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.username,
  };
};

const signin = async ({ username, password }: SigninInput) => {
  const userExist = await userModel.findOne({
    username: username,
  });

  if (!userExist) {
    throw ApiError.forbidden("User Not Found");
  }

  const correctPassword = await bcrypt.compare(password, userExist.password);

  if (correctPassword) {
    const accessToken = generateAccessToken({ userId: userExist._id });
    const refreshToken = generateRefreshToken({ userId: userExist._id });
    return {
      accessToken,
      refreshToken,
      user: {
        userId: userExist._id,
        firstName: userExist.firstName,
        lastName: userExist.lastName,
        username: userExist.username,
      },
    };
  } else {
    throw ApiError.forbidden("Password is invalid");
  }
};

const refresh = async (token: string) => {
  if (!token) {
    throw ApiError.unauthorized("Refresh token missing");
  }

  const decoded = verifyRefreshToken(token);

  const userExists = await userModel.findOne({
    _id: decoded.userId,
  });

  if (!userExists) {
    throw ApiError.notFound("User Not found");
  }

  const accessToken = generateAccessToken({
    userId: userExists._id,
  });

  return { accessToken };
};

const getMe = async (userId: string) => {
  if (!userId) {
    throw ApiError.notFound("user not found");
  }

  const userExist = await userModel.findOne({
    _id: userId,
  });

  if (!userExist) {
    throw ApiError.notFound("User Not found");
  }

  return {
    user: {
      userId: userExist._id,
      firstName: userExist.firstName,
      lastName: userExist.lastName,
      username: userExist.username,
    },
  };
};

export { signup, signin, refresh, getMe };
