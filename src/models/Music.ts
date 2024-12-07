import { Catalog, CatalogWithMusic } from "./Catalog";
import { Artist } from "./User";

export interface Music {
  id: string;
  title: string;
  date_creation: string; // Date in UTC of the creation of the music
  duration: number;
  is_ai: boolean;
}

export interface MusicWithCatalog extends Music {
  catalog: Catalog | CatalogWithMusic;
}

export interface MusicDetails extends MusicWithCatalog {
  artist: Artist;
  genres: Array<Genre>;
  catalog: Catalog | CatalogWithMusic;
}

export interface Genre {
  name: string;
}
