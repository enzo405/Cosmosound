import { Artist } from "./User";

export interface Music {
  id: number;
  title: string; // title of the music
  date_creation: Date; // Date in UTC of the creation of the music
  duration: number; // duration time of the music
  description: string; // description of the music
  thumbnail: string; // url of the image
  artist: Artist; // User that uploaded the Music
  genres: Array<Genre>; // list of musical genre of the music
}

export interface Genre {
  name: string;
}
