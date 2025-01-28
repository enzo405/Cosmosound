import { prisma } from "./app";
import BadRequestException from "./errors/BadRequestException";
import DatabaseException from "./errors/DatabaseException";
import NotFoundException from "./errors/NotFoundException";
import { PlaylistDetails } from "./models/PlaylistDetails";
import { Playlists, Prisma, Users } from ".prisma/client";

const getPlaylistById = async (
  id: string,
  expand: boolean
): Promise<PlaylistDetails | Playlists | null> => {
  try {
    const playlist = await prisma.playlists.findUnique({
      where: { id: id },
      include: {
        owner: true,
      },
    });

    if (!playlist) {
      return null;
    }

    if (!expand) {
      return playlist;
    }

    const musics = playlist.musics;
    const detailedMusic = await Promise.all(
      musics.map(async (music) => {
        const artist = await prisma.users.findUnique({ where: { id: music.idArtist } });
        const catalog = await prisma.catalogs.findUnique({ where: { id: music.idCatalog } });
        return {
          ...music,
          artist,
          catalog,
        };
      })
    );

    return { ...playlist, musics: detailedMusic };
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
  const playlistPromise = prisma.playlists.findUnique({ where: { id: playlistId } });
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

  const playlist = await playlistPromise;
  if (playlist?.musics.find((music) => music.id === musicId)) {
    throw new BadRequestException("Music already added to playlist");
  }

  try {
    return await prisma.playlists.update({
      where: {
        id: playlistId,
      },
      data: {
        musics: {
          push: {
            duration: music.duration,
            id: music.id,
            idArtist: catalog.ownerId,
            idCatalog: catalog.id,
            title: music.title,
            url: music.url,
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

const deleteDenormalizedMusic = async (idCatalog: string, idMusic: string): Promise<void> => {
  const playlists = await prisma.playlists.findMany({
    where: {
      musics: {
        some: {
          id: idMusic,
          idCatalog: idCatalog,
        },
      },
    },
  });

  playlists.forEach((playlist) => {
    deleteMusic(playlist, idMusic);
  });
};

const getFavouritesPlaylists = async (user: Users): Promise<Playlists[]> => {
  try {
    return await prisma.playlists.findMany({
      where: {
        id: { in: user.likedPlaylists },
      },
      include: {
        owner: true,
      },
    });
  } catch (err) {
    throw new DatabaseException("Error fetching liked playlists", err);
  }
};

export default {
  getPlaylistById,
  searchPlaylist,
  createPlaylist,
  AddMusic,
  deletePlaylist,
  deleteMusic,
  deleteDenormalizedMusic,
  getFavouritesPlaylists,
};
