import BadRequestException from "@/errors/BadRequestException";
import { WebError } from "@/errors/Error";
import { UserRequest } from "@/middlewares/auth.middleware";
import nextcloudService from "@/services/nextcloud.service";
import userService from "@/services/user.service";
import { Prisma, UserRole } from "@prisma/client";
import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";

const updateUser = async (req: UserRequest, res: Response) => {
  const { username, password, confirmPassword, email } = req.body;
  const profilePicture = req.file;

  const data: Prisma.UsersUpdateInput = {};

  if (profilePicture) {
    const fileUrl = await nextcloudService.uploadPicture(profilePicture, "PFP", req.userId!);
    data.pictureProfile = fileUrl;
  }
  if (password) {
    if (!confirmPassword) {
      throw new BadRequestException("Confirm password is required");
    }
    if (password !== confirmPassword) {
      throw new BadRequestException("Confirm password and password aren't similar");
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
    throw new BadRequestException("Nothing to update");
  }

  const user = await userService.updateUser(data, req.userId!);

  res.status(200).json(user);
};

const updateArtist = async (req: UserRequest, res: Response) => {
  const { artistName, genre, spotifyLink, youtubeLink, appleMusicLink, xLink, instagramLink } =
    req.body;

  const data: Prisma.UsersUpdateInput = {};

  if (artistName !== undefined) data.artistName = artistName;
  if (genre !== undefined && typeof genre === "string") {
    data.genre = genre;
  }

  const socialMediaLinks: Prisma.SocialMediaCreateInput[] = [];
  if (spotifyLink) socialMediaLinks.push({ media: "SPOTIFY", link: spotifyLink });
  if (youtubeLink) socialMediaLinks.push({ media: "YTB_MUSIC", link: youtubeLink });
  if (appleMusicLink) socialMediaLinks.push({ media: "APPLE_MUSIC", link: appleMusicLink });
  if (xLink) socialMediaLinks.push({ media: "X", link: xLink });
  if (instagramLink) socialMediaLinks.push({ media: "INSTAGRAM", link: instagramLink });

  if (socialMediaLinks.length > 0) data.socialMedia = socialMediaLinks;

  if (Object.entries(data).length === 0) {
    throw new BadRequestException("Nothing to update");
  }

  const userRole = (req.user as JwtPayload).userRole as UserRole;
  if (userRole === "USER") {
    data.role = "ARTISTS";
  }

  const user = await userService.updateUser(data, req.userId!);

  res.status(200).json(user);
};

const getFavourites = async (req: UserRequest, res: Response) => {
  const artists = await userService.getFavourites(req?.userId!);
  res.status(200).json(artists);
};

const searchArtist = async (req: UserRequest, res: Response) => {
  const { search } = req.query;
  if (!search) {
    throw new BadRequestException("A query must be provided");
  }

  if (typeof search != "string") {
    throw new BadRequestException("Search value must be a string");
  }

  const artists = await userService.searchArtist(search);

  res.status(200).json(artists);
};

const getArtistById = async (req: UserRequest, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestException("An id must be provided");
  }

  const artist = await userService.getUserById(id);

  res.status(200).json(artist);
};

const like = async (req: UserRequest, res: Response) => {
  const { id, type } = req.body;
  if (!id) {
    throw new BadRequestException("An id must be provided");
  }

  switch (type) {
    case "artist":
      await userService.likeArtist(id, req.userId!);
      break;
    case "song":
      await userService.likeSong(id, req.userId!);
      break;
    case "album":
      await userService.likeCatalog(id, req.userId!);
      break;
    case "playlist":
      await userService.likePlaylist(id, req.userId!);
      break;
    case "genre":
      await userService.likeGenre(id, req.userId!);
      break;
    default:
      throw new BadRequestException("Invalid type");
  }

  res.status(200).json({ message: "You liked this" });
};

export default {
  updateUser,
  updateArtist,
  getArtistById,
  getFavourites,
  searchArtist,
  like,
};
