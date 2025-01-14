import { Response, Request, NextFunction } from "express";
import { UserRequest } from "./auth.middleware";
import { JwtPayload } from "jsonwebtoken";
import { UserRole } from "@prisma/client";
import ForbiddenException from "@/errors/ForbiddenException";
require("dotenv").config();

const artist = async (req: UserRequest, res: Response, next: NextFunction) => {
  const userRole = (req.user as JwtPayload).userRole as UserRole;

  if (userRole != UserRole.ARTISTS) {
    throw new ForbiddenException("You are not allowed to access this resource");
  }

  next();
};

export default artist;
