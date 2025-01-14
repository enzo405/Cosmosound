import userService from "@/services/user.service";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserRequest } from "./auth.middleware";
import UnauthorizedException from "@/errors/UnauthorizedException";
require("dotenv").config();

const refreshToken = async (req: UserRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    throw new UnauthorizedException("Unauthorized access.");
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET_REFRESH!);
  const user = await userService.getUserById(payload.sub as string);

  if (!user || !user.refreshToken || !(await bcrypt.compare(token, user.refreshToken))) {
    throw new UnauthorizedException("Unauthorized access.");
  }

  req.user = payload;

  next();
};

export default refreshToken;
