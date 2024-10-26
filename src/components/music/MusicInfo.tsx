import { Music } from "models/Music";
import { ReactElement } from "react";

interface MusicInfoProps {
  music: Music;
}

export default function MusicInfo({ music }: MusicInfoProps): ReactElement {
  return (
    <>
      <span>
        <img
          className="rounded-lg w-14 h-14 min-w-14 min-h-14 select-none"
          src={music.catalog.thumbnail}
          alt={`${music.title} ${music?.artist}`}
        />
      </span>
      <span className="flex flex-col items-start w-fit">
        <p className="font-bold text-dark-custom text-lg w-max">{music.title}</p>
        <span className="flex flex-row gap-1 items-center text-music-player-artist font-semibold text-sm ">
          <p className="cursor-pointer hover:underline">{music.artist.artist_name}</p>
          {"-"}
          <p className="cursor-pointer hover:underline">{music.catalog.title}</p>
        </span>
      </span>
    </>
  );
}
