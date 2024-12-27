import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
require("dotenv").config();

const unauthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) return next();

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (!payload) {
      next();
    }
    res.status(400).json({ message: "You are already logged in." });
  } catch (error) {
    next();
  }
};

export default unauthenticated;
