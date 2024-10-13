import { User } from "models/User";

const defaultUser: User = {
  id: 1,
  name: "me",
  email: "me@gmail.com",
  picture_profile: "/src/assets/img/default_avatar.png",
  date_creation: new Date(),
  followings: [],
  followers: 0,
};

function getUser(): User {
  return defaultUser;
}

const UserService = {
  getUser,
};

export default UserService;
