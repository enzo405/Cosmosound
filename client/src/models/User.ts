import { Catalog, DetailedCatalog } from "./Catalog";
import { Genre } from "./Music";

export interface User {
  id: string;
  name: string; // name of the user
  email: string; // email of the user
  pictureProfile: string;
  followers: number;
  role: "ARTISTS" | "USER";
  createdAt: string;
  updatedAt: string;
}

export interface UserDetails extends User {
  likedArtists: string[];
  likedMusics: string[];
  likedCatalogs: string[];
  likedGenres: string[];
  likedPlaylists: string[];
}

export interface Artist extends UserDetails {
  isVerified: boolean;
  socialMedia: SocialMediaLink[];
  genre: Genre;
  artistName: string;
}

export interface DetailedArtistInfo extends Artist {
  catalogs: DetailedCatalog[];
}

export interface PartialArtist {
  id: string;
  name: string; // name of the user
  email: string; // email of the user
  pictureProfile: string;
  followers: number;
  role: "ARTISTS" | "USER";
  createdAt: string;
  updatedAt: string;
  likedArtists: string[];
  likedMusics: string[];
  likedCatalogs: string[];
  likedGenres: string[];
  likedPlaylists: string[];
  isVerified?: boolean;
  socialMedia?: SocialMediaLink[];
  genre?: Genre;
  artistName?: string;
  catalogs?: Catalog[];
}

export interface SocialMediaLink {
  media: Media;
  link: string;
}

export enum Media {
  X = "X",
  SPOTIFY = "SPOTIFY",
  APPLE_MUSIC = "APPLE_MUSIC",
  YTB_MUSIC = "YTB_MUSIC",
  INSTAGRAM = "INSTAGRAM",
}
