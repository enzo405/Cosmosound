import BadRequestException from "@/errors/BadRequestException";
import NotFoundException from "@/errors/NotFoundException";
import { UserRequest } from "@/middlewares/auth.middleware";
import playlistService from "@/services/playlist.service";
import { Prisma } from "@prisma/client";
import { Response } from "express";

const getPlaylistById = async (req: UserRequest, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestException("Missing id in the params");
  }

  const playlist = await playlistService.getPlaylistById(id);

  if (playlist === null) {
    throw new NotFoundException(`Playlist with id ${id} not found.`);
  }

  res.status(200).json(playlist);
};

const searchPlaylist = async (req: UserRequest, res: Response) => {
  const { search } = req.query;
  if (!search) {
    throw new BadRequestException("A query must be provided");
  }

  if (typeof search != "string") {
    throw new BadRequestException("Search value must be a string");
  }

  const playlists = await playlistService.searchPlaylist(search);

  res.status(200).json(playlists);
};

const createPlaylist = async (req: UserRequest, res: Response) => {
  const { title } = req.body;
  if (!title) {
    throw new BadRequestException("Missing title in the body");
  }

  const defaultThumbnail = [
    "/img/thumbnails/1.webp",
    "/img/thumbnails/2.webp",
    "/img/thumbnails/3.webp",
    "/img/thumbnails/4.webp",
    "/img/thumbnails/5.webp",
    "/img/thumbnails/6.webp",
  ];
  const randomIndex = Math.floor(Math.random() * defaultThumbnail.length);

  const playlistToCreate: Prisma.PlaylistsCreateInput = {
    owner: {
      connect: { id: req.userId! },
    },
    title: title,
    playlistThumbnail: defaultThumbnail[randomIndex],
  };

  const playlist = await playlistService.createPlaylist(playlistToCreate);

  res.status(201).json(playlist);
};

const AddMusic = async (req: UserRequest, res: Response) => {
  const { id } = req.params;
  const { idMusic, idCatalog } = req.body;
  if (!id || !idMusic) {
    throw new BadRequestException("Missing ids in the params");
  }

  const musicToAdd: Prisma.MusicInPlaylistCreateInput = {
    catalogId: idCatalog,
    musicId: idMusic,
  };
  const playlist = await playlistService.AddMusic(req.userId!, id, musicToAdd);

  res.status(200).json(playlist);
};

const deletePlaylist = async (req: UserRequest, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestException("Missing id in the params");
  }

  await playlistService.deletePlaylist(req.userId!, id);

  res.status(200).json({ message: "Playlist deleted" });
};

const deleteMusic = async (req: UserRequest, res: Response) => {
  const { id, idMusic } = req.params;
  if (!id || !idMusic) {
    throw new BadRequestException("Missing ids in the params");
  }

  const playlist = await playlistService.deleteMusic(req.userId!, id, idMusic);

  res.status(200).json(playlist);
};

export default {
  getPlaylistById,
  searchPlaylist,
  createPlaylist,
  AddMusic,
  deletePlaylist,
  deleteMusic,
};
