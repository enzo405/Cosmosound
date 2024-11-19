import { Genre } from "./Music";

export interface User {
  id: string;
  name: string; // name of the user
  email: string; // email of the user
  date_creation: string; // Date in UTC of the creation of the account
  picture_profile: string;
  followers: number;
  followings: Array<Artist>;
}

export interface Artist extends User {
  social_media: SocialMediaLink[];
  genre: Genre;
  artist_name: string;
}

export interface SocialMediaLink {
  media: Media;
  link: string;
}

export enum Media {
  X,
  SPOTIFY,
  APPLE_MUSIC,
  YTB_MUSIC,
  INSTAGRAM,
}
