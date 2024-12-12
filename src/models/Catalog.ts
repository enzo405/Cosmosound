import { Music, MusicDetails } from "./Music";
import { Artist } from "./User";

export enum TypeCatalog {
  SINGLE, // A Single is a release containing one to three songs that are under 10 minutes each.
  ALBUM, // An EP contains four to six songs with a total running time of 30 minutes or less.
  EP, // An Album is a release that contains over 30 minutes of music, a continuous DJ mix, or six different tracks from the same artist.
}

export interface Catalog {
  id: string;
  title: string;
  owner: Artist;
  dateCreation: string; // Date in UTC of the creation of the account
  thumbnail: string;
  type: TypeCatalog;
}

export interface CatalogWithMusic extends Catalog {
  musics: Array<MusicDetails> | Array<Music>;
}
