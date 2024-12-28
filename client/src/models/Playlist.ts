import { Catalog } from "./Catalog";
import { Genre } from "./Music";
import { Artist, User } from "./User";

export interface Playlist {
  id: string;
  title: string; // title of the playlist
  createdAt: string; // Date in UTC of the creation of the account
  owner: User; // User that created the playlist
  musics: Array<PlaylistMusic>;
  playlistThumbnail: string;
}

export interface PlaylistMusic {
  id: string;
  title: string;
  dateCreation: string;
  duration: number;
  genres: Array<Genre>;
  artist: Artist;
  catalog: Catalog;
}
