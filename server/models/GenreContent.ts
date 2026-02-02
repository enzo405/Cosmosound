import { Catalogs, Music, Playlists, Users } from "@prisma/client";
import { MusicDetails } from "./MusicDetails";

export type GenreContent = {
  musics: MusicDetails[];
  catalogs: Catalogs[];
  playlists: Playlists[];
  artists: Users[];
};
