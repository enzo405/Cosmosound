import { MusicDetails } from "./../models/Music";
import { createContext } from "react";

interface MusicContextProps {
  playingMusic: MusicDetails | undefined;
  soundValue: number;
  isPlaying: boolean;
  time: number;
  queue: MusicDetails[];
  canPauseWithSpace: boolean;
  setPlayingMusic: React.Dispatch<React.SetStateAction<MusicDetails | undefined>>;
  setSoundValue: React.Dispatch<React.SetStateAction<number>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  setQueue: React.Dispatch<React.SetStateAction<MusicDetails[]>>;
  setCanPauseWithSpace: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MusicContext = createContext<MusicContextProps | undefined>(undefined);
