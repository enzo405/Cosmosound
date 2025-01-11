import authService from "@/services/auth.service";
import userService from "@/services/user.service";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request } from "express";
import { UserRequest } from "@/middlewares/auth.middleware";
import nextcloudService from "@/services/nextcloud.service";
import { ObjectId } from "mongodb";
import BadRequestException from "@/errors/BadRequestException";
import UnauthorizedException from "@/errors/UnauthorizedException";
import ServerException from "@/errors/ServerException";
require("dotenv").config();

const EXPIRED_TOKEN = "10m";
const EXPIRED_REFRESH_TOKEN = "7d";

const signUp = async (req: Request, res: Response) => {
  const { name, email, password, likedGenres } = req.body;

  let parsedLikedGenres;
  const hash = await userService.encryptPassword(password);

  let fileUrl;
  const userId = new ObjectId().toString();

  if (req.file) {
    parsedLikedGenres = JSON.parse(likedGenres); // if the req.file is present, the frontend sent likedGenre using JSON.stringify
    if (await userService.getUserByEmail(email)) {
      throw new BadRequestException("Email already exists");
    } else {
      fileUrl = await nextcloudService.uploadPicture(req.file, "PFP", userId);
    }
  } else {
    // User is using the default picture profile
    parsedLikedGenres = likedGenres;
    fileUrl = req.body.pictureProfile;
  }

  await userService.createUser({
    id: userId,
    name,
    email,
    password: hash,
    pictureProfile: fileUrl,
    likedGenres: parsedLikedGenres,
  });
  res.status(201).json({ message: "User created successfully" });
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const errorMessage = "Invalid credentials.";

  const userExist = await userService.getUserByEmail(email);

  if (!userExist) throw new BadRequestException(errorMessage);

  const userRole = userExist.role;
  let isVerif = false;
  try {
    isVerif = await bcrypt.compare(password, userExist.password);
  } catch (error) {
    throw new ServerException("An error occurred while trying to verify the password.", error);
  }

  if (!isVerif) throw new BadRequestException(errorMessage);

  const sub = userExist.id;
  const token = jwt.sign({ sub, userRole }, process.env.JWT_SECRET!, {
    expiresIn: EXPIRED_TOKEN,
  });
  const refreshToken = jwt.sign({ sub, userRole }, process.env.JWT_SECRET_REFRESH!, {
    expiresIn: EXPIRED_REFRESH_TOKEN,
  });
  const encryptedRefreshToken = await userService.encryptPassword(refreshToken);
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
};

const getProfile = async (req: UserRequest, res: Response) => {
  const userId = (req.user as JwtPayload).sub;

  if (!userId) {
    throw new UnauthorizedException("An error occurred while trying to retrieve the current user.");
  } else {
    const user = await userService.getUserById(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      throw new ServerException("An error occurred while trying to retrieve the current user.");
    }
  }
};

const getRefreshToken = async (req: UserRequest, res: Response) => {
  const id = (req.user as JwtPayload).sub;
  const userRole = (req.user as JwtPayload).userRole;
  if (!id) throw new BadRequestException("Error parsing content from the payload");

  const token = jwt.sign({ sub: id, userRole }, process.env.JWT_SECRET!, {
    expiresIn: EXPIRED_TOKEN,
  });
  const refreshToken = jwt.sign({ sub: id, userRole }, process.env.JWT_SECRET_REFRESH!, {
    expiresIn: EXPIRED_REFRESH_TOKEN,
  });

  const encryptedRefreshToken = await userService.encryptPassword(refreshToken);
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
};

const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH!);
    const userId = (decoded as jwt.JwtPayload).sub;

    if (userId) {
      await authService.deleteRefreshToken(userId);
    }
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out successfully." });
};

export default { getProfile, signUp, signIn, getRefreshToken, logout };
