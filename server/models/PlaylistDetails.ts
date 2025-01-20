import { Catalogs, MusicInPlaylist, Playlists, Users } from "@prisma/client";

export type PlaylistDetails = Playlists & {
  musics: MusicPlaylistDetails[];
};

export type MusicPlaylistDetails = MusicInPlaylist & {
  artist: Users | null;
  catalog: Catalogs | null;
};
