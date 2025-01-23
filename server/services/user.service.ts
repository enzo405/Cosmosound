import userRepository from "@/repository/user.repository";
import { Music, Prisma, Users } from "@prisma/client";
import bcrypt from "bcrypt";
import ServerException from "@/errors/ServerException";
import BadRequestException from "@/errors/BadRequestException";
import { Favourites } from "@/models/Favourites";
import NotFoundException from "@/errors/NotFoundException";
import playlistRepository from "@/repository/playlist.repository";
import catalogRepository from "@/repository/catalog.repository";
import catalogService from "./catalog.service";
import { MusicDetails } from "@/models/MusicDetails";

const getUserById = async (id: string): Promise<Users | null> => {
  return await userRepository.getUserById(id);
};

const updateUser = async (userData: Prisma.UsersUpdateInput, userId: string): Promise<Users> => {
  return await userRepository.updateUser(userData, userId);
};

const createUser = async (userData: Prisma.UsersCreateInput): Promise<Users> => {
  return await userRepository.createUser(userData);
};

const getUserByEmail = async (email: string): Promise<Users | null> => {
  return await userRepository.getUserByEmail(email);
};

const encryptPassword = async (password: string): Promise<string> => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (err) {
    throw new ServerException(
      "An error occurred while trying to encrypt the password",
      err as Error,
    );
  }
};

const getFavourites = async (userId: string): Promise<Favourites> => {
  const user = await userRepository.getUserById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }

  const favArtistsPromise = userRepository.getFavouritesArtists(user);
  const favPlaylistsPromise = playlistRepository.getFavouritesPlaylists(user);
  const favCatalogsPromise = catalogRepository.getFavouritesCatalogs(user);

  return {
    likedArtists: await favArtistsPromise,
    likedCatalogs: await favCatalogsPromise,
    likedPlaylists: await favPlaylistsPromise,
  };
};

const searchArtist = async (search: string): Promise<Users[]> => {
  return await userRepository.searchArtist(search);
};

const likeArtist = async (id: string, userId: string): Promise<void> => {
  const user = await userRepository.getUserById(userId);
  if (!user) {
    throw new ServerException("User not found");
  }

  let likedArtists;
  if (user.likedArtists.find((artistId) => artistId === id) !== undefined) {
    toggleFollowArtist(id, -1);
    likedArtists = user.likedArtists.filter((artist) => artist !== id);
  } else {
    toggleFollowArtist(id, 1);
    likedArtists = [...user.likedArtists, id];
  }

  await userRepository.updateUser({ likedArtists }, userId);
};

const likeSong = async (id: string, userId: string): Promise<void> => {
  const user = await userRepository.getUserById(userId);
  if (!user) {
    throw new ServerException("User not found");
  }

  let likedMusics;
  if (user.likedMusics.find((musicId) => musicId === id) !== undefined) {
    likedMusics = user.likedMusics.filter((song) => song !== id);
  } else {
    likedMusics = [...user.likedMusics, id];
  }

  await userRepository.updateUser({ likedMusics }, userId);
};

const likeCatalog = async (id: string, userId: string): Promise<void> => {
  const user = await userRepository.getUserById(userId);
  if (!user) {
    throw new ServerException("User not found");
  }

  let likedCatalogs;
  if (user.likedCatalogs.find((catalogId) => catalogId === id) !== undefined) {
    likedCatalogs = user.likedCatalogs.filter((catalog) => catalog !== id);
  } else {
    likedCatalogs = [...user.likedCatalogs, id];
  }

  await userRepository.updateUser({ likedCatalogs }, userId);
};

const likePlaylist = async (id: string, userId: string): Promise<void> => {
  const user = await userRepository.getUserById(userId);
  if (!user) {
    throw new ServerException("User not found");
  }

  let likedPlaylists;
  if (user.likedPlaylists.find((playlistId) => playlistId === id) !== undefined) {
    likedPlaylists = user.likedPlaylists.filter((playlist) => playlist !== id);
  } else {
    likedPlaylists = [...user.likedPlaylists, id];
  }

  await userRepository.updateUser({ likedPlaylists }, userId);
};

const likeGenre = async (id: string, userId: string): Promise<void> => {
  const user = await userRepository.getUserById(userId);
  if (!user) {
    throw new ServerException("User not found");
  }

  let likedGenres;
  if (user.likedGenres.find((genreId) => genreId === id) !== undefined) {
    likedGenres = user.likedGenres.filter((genre) => genre !== id);
  } else {
    likedGenres = [...user.likedGenres, id];
  }

  await userRepository.updateUser({ likedGenres }, userId);
};

const toggleFollowArtist = async (id: string, value: number): Promise<void> => {
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new BadRequestException("Artist not found");
  }

  await userRepository.updateUser({ followers: user.followers + value }, id);
};

const addMusicToHistory = async (userId: string, idCatalog: string, idMusic: string) => {
  const user = await userRepository.getUserById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }

  const lastMusicId = user.history[user.history.length - 1];
  if (lastMusicId && lastMusicId.idMusic === idMusic) {
    return;
  }

  return await userRepository.addMusicToHistory(userId, idCatalog, idMusic);
};

const getHistory = async (userId: string, limit: number): Promise<MusicDetails[]> => {
  const user = await userRepository.getUserById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }

  return await userRepository.getMusicHistory(user.history, limit);
};

export default {
  getUserById,
  createUser,
  getUserByEmail,
  updateUser,
  encryptPassword,
  getFavourites,
  searchArtist,
  likeArtist,
  likeSong,
  likeCatalog,
  likePlaylist,
  likeGenre,
  addMusicToHistory,
  getHistory,
};
