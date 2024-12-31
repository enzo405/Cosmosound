import userRepository from "@/repository/user.repository";
import { Prisma, Users } from "@prisma/client";

const getUserById = async (id: string): Promise<Users | null> => {
  return await userRepository.getUserById(id);
};

const createUser = async (userData: Prisma.UsersCreateInput): Promise<Users> => {
  return await userRepository.createUser(userData);
};

const getUserByEmail = async (email: string): Promise<Users | null> => {
  return await userRepository.getUserByEmail(email);
};

export default { getUserById, createUser, getUserByEmail };
