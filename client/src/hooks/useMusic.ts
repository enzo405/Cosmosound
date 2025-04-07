import { MusicContext } from "./../context/musicContext";
import { useContext } from "react";

export const useMusic = () => {
  const context = useContext(MusicContext);

  if (!context) {
    throw new Error("useMusic must be used within an MusicProvider");
  }

  return context;
};
