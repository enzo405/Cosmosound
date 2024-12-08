import { Catalog } from "models/Catalog";
import { Genre, Music } from "models/Music";
import { Playlist } from "models/Playlist";
import { Artist, User } from "models/User";

const defaultUser: User = {
  id: 1,
  name: "me",
  email: "me@gmail.com",
  picture_profile: "/src/assets/img/default_avatar.png",
  date_creation: "08-10-2024",
  followings: [],
  followers: 0,
};

function getUser(): User {
  return defaultUser;
}

function like(item: Artist | Genre | Playlist | Catalog | Music): void {
  console.log("like item", item);
}

function removeLike(item: Artist | Genre | Playlist | Catalog | Music): void {
  console.log("removeLike item", item);
}

const UserService = {
  getUser,
  like,
  removeLike,
};

export default UserService;
