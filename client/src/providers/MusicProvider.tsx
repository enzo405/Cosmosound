import { MusicContext } from "./../context/musicContext";
import { MusicDetails } from "./../models/Music";
import React, { PropsWithChildren, useMemo } from "react";
import { useState } from "react";

export const MusicProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [playingMusic, setPlayingMusic] = useState<MusicDetails | undefined>(undefined);
  const [queue, setQueue] = useState<MusicDetails[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [soundValue, setSoundValue] = useState<number>(50);
  const [time, setTime] = useState<number>(0); // seconds

  const value = useMemo(() => {
    return {
      playingMusic,
      soundValue,
      isPlaying,
      time,
      queue,
      setPlayingMusic,
      setSoundValue,
      setIsPlaying,
      setTime,
      setQueue,
    };
  }, [playingMusic, soundValue, isPlaying, time]);

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
};
