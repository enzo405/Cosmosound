import authService from "@/services/auth.service";
import userService from "@/services/user.service";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request } from "express";
import { UserRequest } from "@/middlewares/auth.middleware";
import nextcloudService from "@/services/nextcloud.service";
require("dotenv").config();

const EXPIRED_TOKEN = "10m";
const EXPIRED_REFRESH_TOKEN = "7d";

const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  try {
    let fileUrl;
    if (req.file) {
      if (await userService.getUserByEmail(email)) {
        throw new Error("Email already exists");
      } else {
        fileUrl = await nextcloudService.uploadPicture(req.file, "PFP");
      }
    } else {
      // User is using the default picture profile
      fileUrl = req.body.pictureProfile;
    }

    await userService.createUser({ name, email, password: hash, pictureProfile: fileUrl });
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
    res
      .status(401)
      .json({ message: "An error occurred while trying to retrieve the current user." });
  } else {
    try {
      const user = await userService.getUserById(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "An error occurred while retrieving the user profile." });
    }
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

const logout = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: "An error occurred during logout." });
  }
};

export default { getProfile, signUp, signIn, getRefreshToken, logout };
