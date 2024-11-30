import { MusicDetails } from "./Music";
import { User } from "./User";

export interface Playlist {
  id: string;
  title: string; // title of the playlist
  owner: User; // User that created the playlist
  musics: Array<MusicDetails>;
}
