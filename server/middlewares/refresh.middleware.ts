import userService from "@/services/user.service";
import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
require("dotenv").config();

export interface RefreshRequest extends Request {
  refreshPayload?: JwtPayload | string;
}

const refreshToken = async (req: RefreshRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw "Authorization token is missing. Please provide a valid token in the 'Authorization' header.";
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await userService.getUserById(payload.sub as string);

    if (token != user?.refreshToken) {
      throw "Invalid Token";
    }

    req.refreshPayload = payload;

    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};

export default refreshToken;
