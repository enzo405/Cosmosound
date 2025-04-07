import { prisma } from "../app";
import DatabaseException from "../errors/DatabaseException";
import { MusicDetails } from "../models/MusicDetails";
import { HistoryRecord, Music, Prisma, Users } from "@prisma/client"; // Import the User model type

const createUser = async (userData: Prisma.UsersCreateInput): Promise<Users> => {
  try {
    return await prisma.users.create({
      data: userData,
    });
  } catch (err) {
    throw new DatabaseException("Error creating user", err);
  }
};

const getUserByEmail = async (emailParam: string): Promise<Users | null> => {
  try {
    return await prisma.users.findUnique({
      where: {
        email: emailParam,
      },
    });
  } catch (err) {
    throw new DatabaseException("Error getting user by email", err);
  }
};

const getUserById = async (id: string): Promise<Users | null> => {
  try {
    return await prisma.users.findUnique({
      where: {
        id: id,
      },
      include: {
        catalogs: true,
        playlists: {
          include: {
            owner: true,
          },
        },
      },
    });
  } catch (err) {
    throw new DatabaseException("Error getting user by id", err);
  }
};

const saveRefreshToken = async (refreshToken: string, id: string) => {
  try {
    await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        refreshToken: refreshToken,
      },
    });
  } catch (err) {
    throw new DatabaseException("Error saving refresh token", err);
  }
};

const updateUser = async (userData: Prisma.UsersUpdateInput, userId: string): Promise<Users> => {
  try {
    return await prisma.users.update({
      where: {
        id: userId,
      },
      data: userData,
      include: {
        catalogs: true,
        playlists: true,
      },
    });
  } catch (err) {
    throw new DatabaseException("Error updating user", err);
  }
};

const deleteRefreshToken = async (userId: string) => {
  try {
    await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: null,
      },
    });
  } catch (err) {
    throw new DatabaseException("Error deleting refresh token from user", err);
  }
};

const getFavouritesArtists = async (user: Users): Promise<Users[]> => {
  try {
    return await prisma.users.findMany({
      where: {
        id: { in: user.likedArtists },
      },
    });
  } catch (err) {
    throw new DatabaseException("Error fetching liked artists", err);
  }
};

const searchArtist = async (value: string): Promise<Users[]> => {
  try {
    return await prisma.users.findMany({
      where: {
        OR: [
          { name: { contains: value, mode: "insensitive" } },
          { artistName: { contains: value, mode: "insensitive" } },
        ],
      },
      include: {
        catalogs: true,
      },
      distinct: ["id"],
      take: 10,
    });
  } catch (err) {
    throw new DatabaseException("Error searching artist", err);
  }
};

const addMusicToHistory = async (userId: string, idCatalog: string, idMusic: string) => {
  try {
    await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        history: {
          push: {
            idCatalog,
            idMusic,
          },
        },
      },
    });
  } catch (err) {
    throw new DatabaseException("Error adding music to history", err);
  }
};

const getMusicHistory = async (
  historyRecord: HistoryRecord[],
  limit: number
): Promise<MusicDetails[]> => {
  const modifiedLimit = historyRecord.length >= limit ? historyRecord.length - limit : 0;
  const limitHistory = historyRecord.slice(modifiedLimit, historyRecord.length);

  const catalogIds = [...new Set(limitHistory.map((i) => i.idCatalog))];
  const catalogs = await prisma.catalogs.findMany({
    where: {
      id: { in: catalogIds },
    },
    include: {
      owner: true,
    },
  });

  const musics: MusicDetails[] = [];
  const musicSet = new Set<string>();

  for (const record of limitHistory) {
    const catalog = catalogs.find((c) => c.id === record.idCatalog);
    if (!catalog) continue;

    const music = catalog.musics.find((m) => m.id === record.idMusic);
    if (!music || musicSet.has(music.id)) continue;

    musicSet.add(music.id);
    musics.push({
      id: music.id,
      title: music.title,
      url: music.url,
      genres: music.genres,
      duration: music.duration,
      createdAt: music.createdAt,
      catalog: catalog,
      artist: catalog.owner,
    });
  }

  return musics;
};

export default {
  createUser,
  getUserByEmail,
  getUserById,
  saveRefreshToken,
  deleteRefreshToken,
  updateUser,
  getFavouritesArtists,
  searchArtist,
  addMusicToHistory,
  getMusicHistory,
};
