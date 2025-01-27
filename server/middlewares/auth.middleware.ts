import UnauthorizedException from "@/errors/UnauthorizedException";
import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
require("dotenv").config();

export interface UserRequest extends Request {
  user?: JwtPayload | string;
  userId?: string;
}

const auth = async (req: UserRequest, res: Response, next: NextFunction) => {
  // const token = req.cookies.token;
  // if (!token) throw new UnauthorizedException("Unauthorized access.");

  // const payload = jwt.verify(token, process.env.JWT_SECRET!);

  // if (!payload) throw new UnauthorizedException("Unauthorized access.");

  // req.user = payload;
  // req.userId = payload.sub as string;

  next();
};

export default auth;
