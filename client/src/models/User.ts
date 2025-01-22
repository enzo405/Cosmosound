import { Catalog, CatalogWithOwner, DetailedCatalog } from "./Catalog";
import { Playlist } from "./Playlist";

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
  genre: string;
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
  genre?: string;
  artistName?: string;
  catalogs?: Catalog[];
  playlists?: Playlist[];
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

export interface Favourites {
  likedArtists: Artist[];
  likedCatalogs: CatalogWithOwner[];
  likedPlaylists: Playlist[];
}
