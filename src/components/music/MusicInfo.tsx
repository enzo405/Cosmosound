import { MusicDetails } from "models/Music";
import { ReactElement } from "react";
import ArtistInfo from "./ArtistInfo";

interface MusicInfoProps {
  music: MusicDetails;
}

export default function MusicInfo({ music }: MusicInfoProps): ReactElement {
  return (
    <div className="flex flex-shrink overflow-hidden gap-1 xsm:gap-3 sm:gap-2">
      <img
        className="rounded-xl w-12 h-12 min-w-12 min-h-12 sm:w-14 sm:h-14 sm:min-w-14 sm:min-h-14"
        src={music.catalog.thumbnail}
        alt={`${music.title} ${music?.artist.artist_name}`}
      />
      <span className="flex flex-col items-start w-full overflow-hidden lg:gap-1">
        <p className="font-bold text-dark-custom text-sm xsm:text-base w-full truncate">
          {music.title}
        </p>
        <span className="flex flex-row gap-1 items-center text-music-player-artist font-semibold text-sm">
          <ArtistInfo artist={music.artist} className="min-w-fit" />
          <span className="hidden lg:block">-</span>
          <span className="hidden lg:block cursor-pointer hover:underline truncate">
            {music.catalog.title}
          </span>
        </span>
      </span>
    </div>
  );
}
