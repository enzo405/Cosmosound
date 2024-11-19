import { Music } from "models/Music";
import data from "assets/json/musics.json";

const musicData: Music[] = data as Music[];

function getAllMusic(): Music[] {
  return musicData;
}

function getMusicById(id: string): Music | undefined {
  return musicData.find((music) => music.id === id);
}

const MusicService = {
  getAllMusic,
  getMusicById,
};

export default MusicService;
