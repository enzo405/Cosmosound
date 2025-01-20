import { Playlists, Prisma } from "@prisma/client";
import playlistRepository from "@/repository/playlist.repository";
import NotFoundException from "@/errors/NotFoundException";
import ForbiddenException from "@/errors/ForbiddenException";
import catalogRepository from "@/repository/catalog.repository";

const getPlaylistById = async (id: string): Promise<Playlists | null> => {
  return await playlistRepository.getPlaylistById(id);
};

const searchPlaylist = async (value: string): Promise<Playlists[]> => {
  return await playlistRepository.searchPlaylist(value);
};

const createPlaylist = async (data: Prisma.PlaylistsCreateInput): Promise<Playlists> => {
  return await playlistRepository.createPlaylist(data);
};

const AddMusic = async (
  userId: string,
  playlidId: string,
  idCatalog: string,
  idMusic: string
): Promise<Playlists> => {
  const playlist = await playlistRepository.getPlaylistById(playlidId);

  if (!playlist) {
    throw new NotFoundException(`Playlist with id ${playlidId} not found`);
  }

  if (!userId || playlist.ownerId != userId) {
    throw new ForbiddenException("You are not allowed to add music to a playlist you don't own");
  }

  return await playlistRepository.AddMusic(playlist.id, idCatalog, idMusic);
};

const deletePlaylist = async (idPlaylist: string, userId: string): Promise<void> => {
  const playlist = await playlistRepository.getPlaylistById(idPlaylist);

  if (!playlist) {
    throw new NotFoundException(`Playlist with id ${idPlaylist} not found`);
  }

  if (!userId || playlist.ownerId != userId) {
    throw new ForbiddenException("You are not allowed to delete a catalog you don't own");
  }
  return await playlistRepository.deletePlaylist(idPlaylist);
};

const deleteMusic = async (
  idPlaylist: string,
  idMusic: string,
  userId: string
): Promise<Playlists> => {
  const playlist = await playlistRepository.getPlaylistById(idPlaylist);

  if (!playlist) {
    throw new NotFoundException(`Playlist with id ${idPlaylist} not found`);
  }

  if (!userId || playlist.ownerId != userId) {
    throw new ForbiddenException("You are not allowed to delete a catalog you don't own");
  }

  return await playlistRepository.deleteMusic(playlist, idMusic);
};

export default {
  getPlaylistById,
  searchPlaylist,
  createPlaylist,
  AddMusic,
  deletePlaylist,
  deleteMusic,
};
