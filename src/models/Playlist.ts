import { Music } from "./Music";
import { User } from "./User";

export interface Playlist {
  id: number;
  title: string; // title of the playlist
  description: string; // description of the playtlist
  owner: User; // User that created the playlist
  musics: Array<Music>;
}
