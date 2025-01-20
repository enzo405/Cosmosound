import { Catalog, DetailedCatalog } from "./Catalog";
import { Artist } from "./User";

export interface Music {
  id: string;
  title: string;
  createdAt: string;
  duration: number;
  genres: Genre[];
}

export interface MusicWithCatalog extends Music {
  catalog: Catalog | DetailedCatalog;
}

export interface MusicDetails extends Music {
  artist: Artist;
  catalog: Catalog | DetailedCatalog;
}

export interface Genre {
  name: string;
}
