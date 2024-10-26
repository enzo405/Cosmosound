import { Music } from "models/Music";
import { createContext } from "react";

interface MusicContextProps {
  music: Music;
  soundValue: number;
  isPlaying: boolean;
  time: number;
  setMusic: React.Dispatch<React.SetStateAction<Music>>;
  setSoundValue: React.Dispatch<React.SetStateAction<number>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

export const MusicContext = createContext<MusicContextProps | undefined>(undefined);
