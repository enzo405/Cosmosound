import { Genre } from "./Music";

export interface User {
  id: number;
  name: string; // name of the user
  email: string; // email of the user
  date_creation: Date; // Date in UTC of the creation of the account
  picture_profile: string;
  followers: number;
  followings: Array<Artist>;
}

export interface Artist extends User {
  social_media: string[];
  genre: Genre;
}