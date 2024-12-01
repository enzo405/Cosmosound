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
    {
      id: "2",
      title: ":)",
      owner: UserService.getUser(),
      musics: MusicService.getMusicHistory(),
    },
    {
      id: "3",
      title: "Your Top Songs 2023",
      owner: UserService.getUser(),
      musics: MusicService.getMusicHistory(),
    },
    {
      id: "4",
      title: "To Listen Later",
      owner: UserService.getUser(),
      musics: MusicService.getMusicHistory(),
    },
  ];
}

const PlaylistService = {
  getMyPlaylist,
};

export default PlaylistService;
