import { Catalog } from "./Catalog";
import { Artist, User } from "./User";

export interface Playlist {
  id: string;
  title: string; // title of the playlist
  createdAt: string; // Date in UTC of the creation of the account
  ownerId: string;
  owner?: User; // User that created the playlist
  playlistThumbnail: string;
  musics: {
    id: string;
    idCatalog: string;
    idArtist: string;
    title: string;
    url: string;
    createdAt: string;
    duration: number;
    genres: string[];
  }[];
}

export interface PlaylistWithMusic extends Playlist {
  musics: {
    id: string;
    idCatalog: string;
    idArtist: string;
    title: string;
    createdAt: string;
    duration: number;
    url: string;
    artist: Artist;
    catalog: Catalog;
    genres: string[];
  }[];
}
