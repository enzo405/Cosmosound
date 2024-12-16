import { Catalog } from "./Catalog";
import { Genre } from "./Music";
import { Artist, User } from "./User";

export interface Playlist {
  id: string;
  title: string; // title of the playlist
  dateCreation: string; // Date in UTC of the creation of the account
  owner: User; // User that created the playlist
  musics: Array<PlaylistMusic>;
}

export interface PlaylistMusic {
  id: string;
  title: string;
  playlistThumbnail: string;
  dateCreation: string;
  duration: number;
  genres: Array<Genre>;
  artist: Artist;
  catalog: Catalog;
}
