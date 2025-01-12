import { Catalog, CatalogWithMusic } from "./Catalog";
import { Artist } from "./User";

export interface Music {
  id: string;
  title: string;
  createdAt: string; // Date in UTC of the creation of the music
  duration: number;
  genres: Genre[];
}

export interface MusicWithCatalog extends Music {
  catalog: Catalog | CatalogWithMusic;
}

export interface MusicDetails extends Music {
  artist: Artist;
  catalog: Catalog | CatalogWithMusic;
}

export interface Genre {
  name: string;
}
