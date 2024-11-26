import { Playlist } from "models/Playlist";
import UserService from "./userService";
import MusicService from "./musicService";

function getMyPlaylist(): Playlist[] {
  return [
    {
      id: "1",
      title: "Favourite Song",
      owner: UserService.getUser(),
      musics: MusicService.getMusicHistory(),
    },
  ];
}

const PlaylistService = {
  getMyPlaylist,
};

export default PlaylistService;
