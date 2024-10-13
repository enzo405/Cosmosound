import { Genre } from "./Music";

export interface User {
  id: number;
  name: string; // name of the user
  email: string; // email of the user
  date_creation: Date; // Date in UTC of the creation of the account
  followers: number;
  followings: Array<Artist>;
}

export interface Artist extends User {
  social_media: string[];
  picture_profile: string;
  genre: Genre;
}
