import userRepository from "@/repository/user.repository";
import { Prisma, Users } from "@prisma/client";
import bcrypt from "bcrypt";

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
  return await bcrypt.hash(password, 10);
};

export default { getUserById, createUser, getUserByEmail, updateUser, encryptPassword };
