import { Catalog } from "models/Catalog";
import { Genre, Music } from "models/Music";
import { Playlist } from "models/Playlist";
import { Artist, UserDetails } from "models/User";
import { AccountFormData } from "pages/Account/AccountPage";

const defaultUser: UserDetails = {
  id: 1,
  name: "John",
  email: "john.doe@gmail.com",
  picture_profile: "/src/assets/img/header/default_avatar.png",
  date_creation: "08-10-2024",
  followings: [],
  followers: 0,
  likedArtists: [],
  likedCatalogs: [],
  likedGenres: [],
  likedMusics: [],
  likedPlaylists: [],
};

function getUser(): UserDetails {
  return defaultUser;
}

function like(item: Artist | Genre | Playlist | Catalog | Music): void {
  console.log("like item", item);
}

function removeLike(item: Artist | Genre | Playlist | Catalog | Music): void {
  console.log("removeLike item", item);
}

function saveData(data: AccountFormData): void {
  console.log("submit form data", data);
}

const UserService = {
  getUser,
  like,
  removeLike,
  saveData,
};

export default UserService;
