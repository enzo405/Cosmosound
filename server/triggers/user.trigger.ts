import { UserRequest } from "@/middlewares/auth.middleware";
import nextcloudService from "@/services/nextcloud.service";
import userService from "@/services/user.service";
import { Prisma, UserRole } from "@prisma/client";
import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";

const updateUser = async (req: UserRequest, res: Response) => {
  try {
    const { username, password, confirmPassword, email } = req.body;

    const profilePicture = req.file;

    const data: Prisma.UsersUpdateInput = {};

    if (profilePicture) {
      const fileUrl = await nextcloudService.uploadPicture(profilePicture, "PFP", req.userId!);
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

    const user = await userService.updateUser(data, req.userId!);

    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json("An error occured while trying to update the user.");
  }
};

const updateArtist = async (req: UserRequest, res: Response) => {
  try {
    const { artistName, genre, spotifyLink, youtubeLink, appleMusicLink, xLink, instagramLink } =
      req.body;

    const data: Prisma.UsersUpdateInput = {};

    if (artistName !== undefined) data.artistName = artistName;
    if (genre !== undefined) data.genre = genre;

    const socialMediaLinks: Prisma.SocialMediaCreateInput[] = [];
    if (spotifyLink) socialMediaLinks.push({ media: "SPOTIFY", link: spotifyLink });
    if (youtubeLink) socialMediaLinks.push({ media: "YTB_MUSIC", link: youtubeLink });
    if (appleMusicLink) socialMediaLinks.push({ media: "APPLE_MUSIC", link: appleMusicLink });
    if (xLink) socialMediaLinks.push({ media: "X", link: xLink });
    if (instagramLink) socialMediaLinks.push({ media: "INSTAGRAM", link: instagramLink });

    if (socialMediaLinks.length > 0) data.socialMedia = socialMediaLinks;

    if (Object.entries(data).length === 0) {
      res.status(400).json({ message: "Nothing to update" });
      return;
    }

    const userRole = (req.user as JwtPayload).userRole as UserRole;
    if (userRole === "USER") {
      data.role = "ARTISTS";
    }

    const user = await userService.updateUser(data, req.userId!);

    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json("An error occured while trying to update the user.");
  }
};

export default {
  updateUser,
  updateArtist,
};
