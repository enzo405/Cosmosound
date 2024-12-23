import userRepository from "@/repository/user.repository";
import { Prisma, Users } from "@prisma/client";

const createUser = async (userData: Prisma.UsersCreateInput): Promise<Users> => {
  return await userRepository.saveUser(userData);
};

const findUserByEmail = async (email: string): Promise<Users | null> => {
  return await userRepository.getUserByEmail(email);
};

export default { createUser, findUserByEmail };
