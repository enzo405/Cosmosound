import { Catalog } from "./Catalog";
import { Artist } from "./User";

export interface Music {
  id: string;
  title: string; // title of the music
  date_creation: string; // Date in UTC of the creation of the music
  duration: number; // duration time of the music
  artist: Artist; // User that uploaded the Music
  genres: Array<Genre>; // list of musical genre of the music
  catalog: Catalog; // catalog that this music belong
}

export interface Genre {
  name: string;
}
