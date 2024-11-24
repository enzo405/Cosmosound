import { MusicContext } from "context/musicContext";
import { MusicDetails } from "models/Music";
import React, { PropsWithChildren, useMemo } from "react";
import { useState } from "react";
import MusicService from "services/musicService";

export const MusicProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [playingMusic, setPlayingMusic] = useState<MusicDetails>(
    MusicService.getMusicById("1EDPVGbyPKJPeGqATwXZvN")!,
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [soundValue, setSoundValue] = useState<number>(50);
  const [time, setTime] = useState<number>(0); // seconds

  const value = useMemo(() => {
    return {
      playingMusic,
      soundValue,
      isPlaying,
      time,
      setPlayingMusic,
      setSoundValue,
      setIsPlaying,
      setTime,
    };
  }, [playingMusic, soundValue, isPlaying, time]);

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
};
