import { MusicDetails } from "models/Music";
import { ReactElement } from "react";

interface MusicInfoProps {
  music: MusicDetails;
}

export default function MusicInfo({ music }: MusicInfoProps): ReactElement {
  return (
    <div className="flex flex-shrink overflow-hidden gap-1 xsm:gap-3 sm:gap-2">
      <img
        className="rounded-lg w-12 h-12 min-w-12 min-h-12 sm:w-14 sm:h-14 sm:min-w-14 sm:min-h-14 select-none"
        src={music.catalog.thumbnail}
        alt={`${music.title} ${music?.artist.artist_name}`}
      />
      <span className="flex flex-col items-start w-full overflow-hidden">
        <p className="font-bold text-dark-custom text-sm xsm:text-base md:text-lg w-full overflow-hidden whitespace-nowrap text-ellipsis">
          {music.title}
        </p>
        <span className="flex flex-row gap-1 items-center text-music-player-artist font-semibold text-sm">
          <p className="cursor-pointer hover:underline">{music.artist.artist_name}</p>
          <span className="hidden sm:block">-</span>
          <p className="hidden sm:block cursor-pointer hover:underline">{music.catalog.title}</p>
        </span>
      </span>
    </div>
  );
}
