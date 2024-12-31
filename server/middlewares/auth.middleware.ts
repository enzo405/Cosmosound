import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
require("dotenv").config();

export interface UserRequest extends Request {
  user?: JwtPayload | string;
}

const auth = (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) throw "Unauthorized access.";

    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    if (!payload) throw "Unauthorized access.";

    req.user = payload;

    next();
  } catch (error) {
    res.status(401).json("Unauthorized access.");
  }
};

export default auth;
