import userService from "@/services/user.service";
import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserRequest } from "./auth.middleware";
require("dotenv").config();

const refreshToken = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      throw "Unauthorized access.";
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET_REFRESH!);
    const user = await userService.getUserById(payload.sub as string);

    if (!user || !user.refreshToken || !(await bcrypt.compare(token, user.refreshToken))) {
      throw "Unauthorized access.";
    }

    req.user = payload;

    next();
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

export default refreshToken;
