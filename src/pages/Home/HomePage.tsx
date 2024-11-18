import { type ReactElement } from "react";
import Suggestions from "./components/Suggestions";
import MusicService from "services/musicService";

function HomePage(): ReactElement {
  const musics = MusicService.getAllMusic().slice(1, 20);

  return (
    <>
      <Suggestions musics={musics} />
    </>
  );
}

export default HomePage;
