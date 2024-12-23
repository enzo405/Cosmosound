import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
require("dotenv").config();

export interface UserRequest extends Request {
  user?: JwtPayload | string;
}

const auth = (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw "Authorization token is missing. Please provide a valid token in the 'Authorization' header.";

    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    if (!payload) {
      throw "You do not have access to this route";
    }

    req.user = payload;

    next();
  } catch (error) {
    res.status(401).json(error);
  }
};

export default auth;
