import { Response, Request, NextFunction } from "express";
import { UserRequest } from "./auth.middleware";
import userService from "@/services/user.service";
require("dotenv").config();

const artist = (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;

    console.log("user", user);

    // const artist = userService.getUserById(user)
    // if (req.user["s"] != null)

    next();
  } catch (error) {
    res.status(403).json("You are not allowed to access this resource.");
  }
};

export default artist;
