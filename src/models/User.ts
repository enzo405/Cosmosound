import { Catalog } from "./Catalog";
import { Genre, MusicWithCatalog } from "./Music";

export interface User {
  id: number;
  name: string; // name of the user
  email: string; // email of the user
  date_creation: string; // Date in UTC of the creation of the account
  picture_profile: string;
  followers: number;
  followings: Array<Artist>;
}

export interface UserDetails extends User {
  likedArtists: string[];
  likedMusics: string[];
  likedCatalogs: string[];
  likedGenres: string[];
  likedPlaylists: string[];
}

export interface Artist extends User {
  social_media: SocialMediaLink[];
  genre: Genre;
  artist_name: string;
}

export interface DetailedArtistInfo extends Artist {
  musics: MusicWithCatalog[];
  catalogs: Catalog[];
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
