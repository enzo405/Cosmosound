import { MusicDetails } from "models/Music";
import { createContext } from "react";

interface MusicContextProps {
  playingMusic: MusicDetails;
  soundValue: number;
  isPlaying: boolean;
  time: number;
  setPlayingMusic: React.Dispatch<React.SetStateAction<MusicDetails>>;
  setSoundValue: React.Dispatch<React.SetStateAction<number>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

export const MusicContext = createContext<MusicContextProps | undefined>(undefined);
