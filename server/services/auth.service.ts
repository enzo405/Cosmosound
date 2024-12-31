import userRepository from "@/repository/user.repository";

const saveRefreshToken = async (refreshToken: string, id: string) => {
  return await userRepository.saveRefreshToken(refreshToken, id);
};

const deleteRefreshToken = async (userId: string) => {
  return await userRepository.deleteRefreshToken(userId);
};

export default { saveRefreshToken, deleteRefreshToken };
