import { MusicContext } from "context/musicContext";
import { TypeCatalog } from "models/Catalog";
import { MusicDetails } from "models/Music";
import { Artist, Media } from "models/User";
import React, { PropsWithChildren, useMemo } from "react";
import { useState } from "react";

export const MusicProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const artistTemp: Artist = {
    id: 1,
    artist_name: "Linkin Park",
    name: "Linkin Park",
    date_creation: "10-10-2024",
    email: "belo.smile@gmail.com",
    followers: 0,
    followings: [],
    picture_profile: "",
    genre: { name: "Metal" },
    social_media: [{ media: Media.SPOTIFY, link: "" }],
  };
  const defaultMusic: MusicDetails = {
    id: "1",
    artist: artistTemp,
    title: "The Emptiness Machine",
    duration: 260,
    date_creation: "10-10-2024",
    genres: [{ name: "Metal" }],
    catalog: {
      id: "1",
      type: TypeCatalog.ALBUM,
      title: "From Zero",
      owner: artistTemp,
      musics: [],
      thumbnail: "https://upload.wikimedia.org/wikipedia/en/9/90/Linkin_Park_-_From_Zero.png",
    },
  };

  const [music, setMusic] = useState<MusicDetails>(defaultMusic);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [soundValue, setSoundValue] = useState<number>(50);
  const [time, setTime] = useState<number>(0); // seconds

  const value = useMemo(() => {
    return { music, soundValue, isPlaying, time, setMusic, setSoundValue, setIsPlaying, setTime };
  }, [music, soundValue, isPlaying, time]);

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
};
