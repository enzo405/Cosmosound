import { prisma } from "@/app";
import DatabaseException from "@/errors/DatabaseException";
import { Prisma, Users } from "@prisma/client"; // Import the User model type

const createUser = async (userData: Prisma.UsersCreateInput): Promise<Users> => {
  try {
    return await prisma.users.create({
      data: userData,
    });
  } catch (err) {
    throw new DatabaseException("Error creating user", err as Error);
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
    console.error(err);
    return null;
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
      },
    });
  } catch (err) {
    console.error(err);
    return null;
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
    throw new DatabaseException("Error saving refresh token", err as Error);
  }
};

const updateUser = async (userData: Prisma.UsersUpdateInput, userId: string): Promise<Users> => {
  try {
    return await prisma.users.update({
      where: {
        id: userId,
      },
      data: userData,
    });
  } catch (err) {
    throw new DatabaseException("Error updating user", err as Error);
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
    throw new DatabaseException("Error deleting refresh token from user", err as Error);
  }
};

const getFavourites = async (userId: string): Promise<Users[] | null> => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
      select: {
        likedArtists: true,
      },
    });

    if (!user) {
      return [];
    }

    return await prisma.users.findMany({
      where: {
        id: { in: user.likedArtists },
      },
    });
  } catch (err) {
    console.error(err);
    return null;
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
    console.error(err);
    return [];
  }
};

export default {
  createUser,
  getUserByEmail,
  getUserById,
  saveRefreshToken,
  deleteRefreshToken,
  updateUser,
  getFavourites,
  searchArtist,
};
