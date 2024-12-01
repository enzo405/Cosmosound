import { Catalog, CatalogWithMusic } from "./Catalog";
import { Artist } from "./User";

export interface Music {
  id: string;
  title: string;
  date_creation: string; // Date in UTC of the creation of the music
  duration: number;
  is_ai: boolean;
}

export interface MusicDetails extends Music {
  artist: Artist;
  genres: Array<Genre>;
  catalog: Catalog | CatalogWithMusic;
}

export interface Genre {
  name: string;
}
