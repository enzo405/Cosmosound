import { Genre } from "./Music";
import { User } from "./User";

export interface Playlist {
  id: string;
  title: string; // title of the playlist
  createdAt: string; // Date in UTC of the creation of the account
  ownerId: string;
  owner?: User; // User that created the playlist
  playlistThumbnail: string;
  musics: PlaylistMusic[];
}

export interface PlaylistMusic {
  id: string;
  idCatalog: string;
  idArtist: string;
  title: string;
  createdAt: string;
  duration: number;
  genres: Genre[];
}
