import authService from "@/services/auth.service";
import userService from "@/services/user.service";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request } from "express";
import { UserRequest } from "@/middlewares/auth.middleware";
require("dotenv").config();

const EXPIRED_TOKEN = "10m";
const EXPIRED_REFRESH_TOKEN = "7d";

const signUp = async (req: Request, res: Response) => {
  const { name, email, password, pictureProfile } = req.body;

  const hash = await bcrypt.hash(password, 10);

  try {
    await userService.createUser({ name, email, password: hash, pictureProfile });
    res.status(201).json({ message: "User created successfully" });
  } catch (e) {
    res.status(500).json({ message: "An error occurred while creating the user." });
  }
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const errorMessage = "Invalid credentials.";

  try {
    const userExist = await userService.getUserByEmail(email);

    if (!userExist) throw errorMessage;

    const userRole = userExist.role;
    const isVerif = await bcrypt.compare(password, userExist.password);

    if (!isVerif) throw errorMessage;

    const sub = userExist.id;
    const token = jwt.sign({ sub, userRole }, process.env.JWT_SECRET!, {
      expiresIn: EXPIRED_TOKEN,
    });
    const refreshToken = jwt.sign({ sub, userRole }, process.env.JWT_SECRET_REFRESH!, {
      expiresIn: EXPIRED_REFRESH_TOKEN,
    });

    const encryptedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await authService.saveRefreshToken(encryptedRefreshToken, sub);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 10 * 60 * 1000, // 10 minutes
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(401).json({ message: errorMessage });
  }
};

const getProfile = async (req: UserRequest, res: Response) => {
  const userId = (req.user as JwtPayload).sub;

  if (!userId) {
    return res
      .status(401)
      .json({ message: "An error occurred while trying to retrieve the current user." });
  }

  try {
    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while retrieving the user profile." });
  }
};

const getRefreshToken = async (req: UserRequest, res: Response) => {
  try {
    const id = (req.user as JwtPayload).sub;
    const userRole = (req.user as JwtPayload).userRole;
    if (!id) throw "Error parsing content from the payload";

    const token = jwt.sign({ sub: id, userRole }, process.env.JWT_SECRET!, {
      expiresIn: EXPIRED_TOKEN,
    });
    const refreshToken = jwt.sign({ sub: id, userRole }, process.env.JWT_SECRET_REFRESH!, {
      expiresIn: EXPIRED_REFRESH_TOKEN,
    });

    const encryptedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await authService.saveRefreshToken(encryptedRefreshToken, id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 10 * 60 * 1000, // 10 minutes
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ message: "Token refreshed successfully." });
  } catch (error) {
    res
      .status(401)
      .json({ message: "An error occurred while trying to refresh the access token." });
  }
};

export default { getProfile, signUp, signIn, getRefreshToken };
