import { Response, Request, NextFunction } from "express";
import { UserRequest } from "./auth.middleware";
import { JwtPayload } from "jsonwebtoken";
import { UserRole } from "@prisma/client";
require("dotenv").config();

const artist = (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const userRole = (req.user as JwtPayload).userRole as UserRole;

    if (userRole != UserRole.ARTISTS) {
      throw "You are not allowed to access this resource";
    }

    next();
  } catch (error) {
    res.status(403).json("You are not allowed to access this resource.");
  }
};

export default artist;
