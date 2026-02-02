import { Music, MusicDetails } from "./Music";
import { Artist } from "./User";

export enum TypeCatalog {
  SINGLE = "SINGLE", // A Single is a release containing one to three songs that are under 10 minutes each.
  ALBUM = "ALBUM", // An EP contains four to six songs with a total running time of 30 minutes or less.
  EP = "EP", // An Album is a release that contains over 30 minutes of music, a continuous DJ mix, or six different tracks from the same artist.
}

export interface Catalog {
  id: string;
  title: string;
  ownerId: string;
  createdAt: string;
  thumbnail: string;
  type: TypeCatalog;
}

export interface CatalogWithOwner extends Catalog {
  owner: Artist;
}

export interface DetailedCatalog extends Catalog {
  owner: Artist;
  musics: MusicDetails[] | Music[];
}
