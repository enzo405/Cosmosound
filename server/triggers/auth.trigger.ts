import userService from "@/services/auth.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Response, Request } from "express";
import { UserRequest } from "@/middlewares/auth.middleware";
require("dotenv").config();

const signUp = async (req: Request, res: Response) => {
  const { name, email, password, pictureProfile } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await userService.createUser({ name, email, password: hash, pictureProfile });

  res.status(201).json({ message: "User created succesfully" });
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userExist = await userService.findUserByEmail(email);

    if (userExist == null) {
      throw "User doesn't exist";
    }

    const isVerif = await bcrypt.compare(password, userExist.password);

    if (!isVerif) {
      throw "Connection refused";
    }

    const token = jwt.sign(
      {
        sub: userExist.id,
        email: userExist.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

const getProfile = (req: UserRequest, res: Response) => {
  res.status(200).json(req.user);
};

export default { getProfile, signUp, signIn };
