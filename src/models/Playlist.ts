import { MusicDetails } from "./Music";
import { User } from "./User";

export interface Playlist {
  id: string;
  title: string; // title of the playlist
  date_creation: string; // Date in UTC of the creation of the account
  owner: User; // User that created the playlist
  musics: Array<MusicDetails>;
}
