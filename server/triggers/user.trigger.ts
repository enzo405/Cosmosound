import { UserRequest } from "@/middlewares/auth.middleware";
import nextcloudService from "@/services/nextcloud.service";
import userService from "@/services/user.service";
import { Prisma } from "@prisma/client";
import { Response } from "express";

const updateUser = async (req: UserRequest, res: Response) => {
  const { username, password, confirmPassword, email } = req.body;
  const profilePicture = req.file;

  const data: Prisma.UsersUpdateInput = {};

  if (profilePicture) {
    const fileUrl = await nextcloudService.uploadPicture(profilePicture, "PFP");
    data.pictureProfile = fileUrl;
  }
  if (password) {
    if (!confirmPassword) {
      res.status(400).json({ message: "Confirm password is required" });
      return;
    }
    if (password !== confirmPassword) {
      res.status(400).json({ message: "Confirm password and password aren't similar" });
      return;
    }
    const hash = await userService.encryptPassword(password);
    data.password = hash;
  }

  if (username) {
    data.name = username;
  }

  if (email) {
    data.email = email;
  }

  if (Object.entries(data).length === 0) {
    res.status(400).json({ message: "Nothing to update" });
    return;
  }

  const user = await userService.updateUser(data, req.userId);

  res.status(200).json(user);
};

export default {
  updateUser,
};
