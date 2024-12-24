import { Prisma, PrismaClient, Users } from "@prisma/client"; // Import the User model type
const prisma = new PrismaClient();

const createUser = async (userData: Prisma.UsersCreateInput): Promise<Users> => {
  const newUser = await prisma.users.create({
    data: userData,
  });
  return newUser;
};

const getUserByEmail = async (emailParam: string): Promise<Users | null> => {
  try {
    return await prisma.users.findUnique({
      where: {
        email: emailParam,
      },
    });
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};

const getUserById = async (id: string): Promise<Users | null> => {
  try {
    return await prisma.users.findUnique({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return null;
  }
};

const saveRefreshToken = async (refreshToken: string, id: string) => {
  await prisma.users.update({
    where: {
      id: id,
    },
    data: {
      refreshToken: refreshToken,
    },
  });
};

export default { createUser, getUserByEmail, getUserById, saveRefreshToken };
