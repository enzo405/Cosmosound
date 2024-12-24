import authService from "@/services/auth.service";
import userService from "@/services/user.service";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request } from "express";
import { UserRequest } from "@/middlewares/auth.middleware";
import { RefreshRequest } from "@/middlewares/refresh.middleware";
require("dotenv").config();

const signUp = async (req: Request, res: Response) => {
  const { name, email, password, pictureProfile } = req.body;

  const hash = await bcrypt.hash(password, 10);

  try {
    await userService.createUser({ name, email, password: hash, pictureProfile });
    res.status(201).json({ message: "User created succesfully" });
  } catch (e) {
    res.status(201).json({ message: "An error occured while creating the user." });
  }
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userExist = await userService.getUserByEmail(email);

    if (userExist == null) {
      throw "User doesn't exist.";
    }

    const isVerif = await bcrypt.compare(password, userExist.password);

    if (!isVerif) {
      throw "Connection refused.";
    }

    const sub = userExist.id;
    const token = jwt.sign({ sub }, process.env.JWT_SECRET!, { expiresIn: "10m" });
    const refreshToken = jwt.sign({ sub }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    await authService.saveRefreshToken(refreshToken, sub);

    res.status(200).json({ token, refreshToken });
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

const getProfile = async (req: UserRequest, res: Response) => {
  const userId = (req.user as JwtPayload).sub;

  if (!userId) {
    res.status(401).json("An error occured while tryign to retrieve the current user.");
  } else {
    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  }
};

const getRefreshToken = async (req: RefreshRequest, res: Response) => {
  try {
    const userId = (req.refreshPayload as JwtPayload).sub;

    const sub = userId;
    const token = jwt.sign({ sub }, process.env.JWT_SECRET!, { expiresIn: "10m" });
    const refreshToken = jwt.sign({ sub }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    await authService.saveRefreshToken(refreshToken, sub as string);
    res.status(200).json({ token, refreshToken });
  } catch (error) {
    res.status(401).json({ message: "An error occured while trying to refresh the access token." });
  }
};

export default { getProfile, signUp, signIn, getRefreshToken };
