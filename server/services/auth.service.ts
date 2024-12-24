import userRepository from "@/repository/user.repository";

const saveRefreshToken = async (refreshToken: string, id: string) => {
  return await userRepository.saveRefreshToken(refreshToken, id);
};

export default { saveRefreshToken };
