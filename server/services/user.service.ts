import user from "@/repository/user.repository";

const getUserById = async (id: string) => {
  return await user.getUserById(id);
};

export default { getUserById };
