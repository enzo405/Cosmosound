import { Music } from "models/Music";
import data from "assets/json/data.json";

const musicData: Music[] = data as Music[];

function getAllMusic(): Music[] {
  return musicData;
}

function getMusicById(id: number): Music | undefined {
  return musicData.find((music) => music.id === id);
}

const MusicService = {
  getAllMusic,
  getMusicById,
};

export default MusicService;
