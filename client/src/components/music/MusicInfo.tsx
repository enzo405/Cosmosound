import { MusicDetails } from "models/Music";
import { ReactElement } from "react";
import ArtistInfo from "./ArtistInfo";
import { displayPictureProfile } from "utils/user";

interface MusicInfoProps {
  music: MusicDetails;
}

export default function MusicInfo({ music }: MusicInfoProps): ReactElement {
  return (
    <div className="flex flex-shrink overflow-hidden gap-1 xsm:gap-3 sm:gap-2">
      <img
        className="rounded-xl mm-size-12 sm:mm-size-14"
        src={displayPictureProfile(music.catalog.thumbnail)}
        alt={`${music.title} ${music?.artist.artistName}`}
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
