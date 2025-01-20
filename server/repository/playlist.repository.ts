import { prisma } from "@/app";
import DatabaseException from "@/errors/DatabaseException";
import NotFoundException from "@/errors/NotFoundException";
import { Playlists, Prisma } from "@prisma/client";
import { cpSync } from "fs";

const getPlaylistById = async (id: string): Promise<Playlists | null> => {
  try {
    const playlist = await prisma.playlists.findUnique({
      where: { id: id },
      include: {
        owner: true,
      },
    });

    return playlist ? playlist : null;
  } catch (err) {
    throw new DatabaseException(`There was an error while fetching playlist with id ${id}`, err);
  }
};

const searchPlaylist = async (name: string): Promise<Playlists[]> => {
  try {
    return await prisma.playlists.findMany({
      where: {
        OR: [
          { title: { contains: name, mode: "insensitive" } },
          { owner: { artistName: { contains: name, mode: "insensitive" } } },
        ],
      },
      include: {
        owner: true,
      },
    });
  } catch (err) {
    throw new DatabaseException(
      `There was an error while searching for playlist with value ${name}`,
      err
    );
  }
};

const createPlaylist = async (data: Prisma.PlaylistsCreateInput): Promise<Playlists> => {
  try {
    return await prisma.playlists.create({
      data: data,
    });
  } catch (err) {
    throw new DatabaseException("Error creating playlist", err);
  }
};

const AddMusic = async (
  playlistId: string,
  catalogId: string,
  musicId: string
): Promise<Playlists> => {
  try {
    const catalog = await prisma.catalogs.findUnique({
      where: {
        id: catalogId,
      },
    });

    if (!catalog) {
      throw new NotFoundException("Catalog not found");
    }

    const music = catalog.musics.find((music) => music.id === musicId);

    if (!music) {
      throw new NotFoundException("Music not found in catalog");
    }

    return await prisma.playlists.update({
      where: {
        id: playlistId,
      },
      data: {
        musics: {
          push: {
            duration: music.duration,
            id: music.id,
            title: music.title,
            url: music.url,
            idCatalog: catalogId,
            createdAt: music.createdAt,
            genres: music.genres,
          },
        },
      },
      include: {
        owner: true,
      },
    });
  } catch (err) {
    throw new DatabaseException("Error adding music to playlist", err);
  }
};

const deletePlaylist = async (id: string): Promise<void> => {
  try {
    await prisma.playlists.delete({
      where: {
        id: id,
      },
      include: {
        owner: true,
      },
    });
  } catch (err) {
    throw new DatabaseException("Error deleting playlist", err);
  }
};

const deleteMusic = async (playlist: Playlists, musicId: string): Promise<Playlists> => {
  const newSetMusics = playlist.musics.filter((music) => music.id !== musicId);

  try {
    return await prisma.playlists.update({
      where: {
        id: playlist.id,
      },
      data: {
        musics: { set: newSetMusics },
      },
      include: {
        owner: true,
      },
    });
  } catch (err) {
    throw new DatabaseException("Error deleting music from playlist", err);
  }
};

export default {
  getPlaylistById,
  searchPlaylist,
  createPlaylist,
  AddMusic,
  deletePlaylist,
  deleteMusic,
};
