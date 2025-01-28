import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import ForbiddenException from "../errors/ForbiddenException";
require("dotenv").config();

const unauthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) return next();

  const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

  if (!payload) {
    next();
  }
  throw new ForbiddenException("You are already logged in.");
};

export default unauthenticated;
