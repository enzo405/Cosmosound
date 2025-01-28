import { Catalogs, Playlists, Users } from "@prisma/client";

export type Favourites = {
  likedArtists: Users[];
  likedPlaylists: Playlists[];
  likedCatalogs: Catalogs[];
};
