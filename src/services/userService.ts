import { Catalog } from "models/Catalog";
import { Genre, Music } from "models/Music";
import { Playlist } from "models/Playlist";
import { Artist, UserDetails } from "models/User";
import { AccountFormData } from "pages/Account/AccountPage";

export const defaultUser: UserDetails = {
  id: 1,
  name: "John",
  email: "john.doe@gmail.com",
  pictureProfile: "/src/assets/img/header/default_avatar.png",
  dateCreation: "08-10-2024",
  followings: [],
  followers: 0,
  likedArtists: [
    "1",
    "2",
    "3",
    "14",
    "30",
    "34",
    "38",
    "51",
    "52",
    "59",
    "60",
    "66",
    "68",
    "71",
    "72",
    "73",
    "30",
    "29",
    "25",
    "24",
    "19",
    "16",
  ],
  likedCatalogs: [
    "2knEuvsxqHMAoxlQpIdpQD",
    "4R6FV9NSzhPihHR0h4pI93",
    "1gjugH97doz3HktiEjx2vY",
    "3AO82S43rn68Vk4FLgNXKp",
    "0TGgnGzU80sNhNS1nBMiye",
    "1k7OXnGQPV4zF3seDwRroD",
  ],
  likedGenres: [
    "metalcore",
    "rap metal",
    "nu metal",
    "prog metal",
    "metal",
    "melodic metalcore",
    "death-metal",
    "heavy-metal",
  ],
  likedMusics: [
    "1xeIvccuZq4DiqqmZDSbAg",
    "7M8eZBRTD9QNasEVReEM0H",
    "6SShrkXpvyKEMslHdCbqJI",
    "1EDPVGbyPKJPeGqATwXZvN",
    "2eKoPnGnuHqIpfph45z44W",
    "6TlZSSNZd397eYRzbu5SaT",
    "4ffORoAHM64qesY9g2Pihk",
    "7efju7ceWRoeHSQytZf4e4",
    "47enw9R1hdkfuxeSjoDQ0N",
    "65VHUZPZKgaG4SJVRkBPzn",
    "7stpbtJzoBx1D38egFeT29",
    "3LpHzQU2CZzZJGdUWV79SI",
    "2ktANg8ehDgdR1EG1ANsIX",
  ],
  likedPlaylists: ["0", "1", "2", "3"],
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
