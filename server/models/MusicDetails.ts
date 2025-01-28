import { Catalogs, Music, Users } from ".prisma/client";

export type MusicDetails = Music & {
  artist: Users;
  catalog: Catalogs;
};
