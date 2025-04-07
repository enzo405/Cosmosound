import { Icon } from "./../../components/icons/Icon";
import { useMusic } from "./../../hooks/useMusic";
import { Music } from "./../../models/Music";
import { ReactElement, useMemo, useRef } from "react";
import { formatDuration, formatTime } from "./../../utils/date";
import ArtistInfo from "./ArtistInfo";
import { Artist } from "./../../models/User";
import { Catalog } from "./../../models/Catalog";

interface MusicItemDeleteProps {
  music: Music;
  artist: Artist;
  catalog: Catalog;
  index?: number;
  handleClickDelete: (music: Music) => void;
}

export default function MusicItemDelete({
  music,
  artist,
  catalog,
  index,
  handleClickDelete,
}: MusicItemDeleteProps): ReactElement {
  const { playingMusic, isPlaying, setIsPlaying, setPlayingMusic } = useMusic();
  const musicItemRef = useRef<HTMLInputElement>(null);

  const handlePlayMusic = (music: Music) => {
    if (isPlaying && isCurrentMusicPlaying) {
      setIsPlaying(false);
    } else {
      if (!isCurrentMusicPlaying) {
        setPlayingMusic({ ...music, artist, catalog });
      }
      setIsPlaying(true);
    }
  };

  const isCurrentMusicPlaying = useMemo(
    () => isPlaying && music.id == playingMusic?.id,
    [playingMusic],
  );

  return (
    <div className="relative w-full" ref={musicItemRef}>
      <div
        className={`group flex flex-row w-full p-1 justify-between h-16 md:h-[64px] lg:h-18 ${playingMusic?.id === music.id ? "bg-music-activ" : "hover:bg-music-hover"} rounded-xl`}>
        <div className="flex flex-row w-full select-none flex-grow min-w-0 justify-between xsm:pr-1 sm:pr-2 md:pr-4 lg:pr-36 cursor-pointer">
          <div className="flex flex-row items-center w-full sm:max-w-80 sm:min-w-80 lg:min-w-[28rem] lg:max-w-[28rem] gap-1">
            <div className="relative p-0.5 h-5/6 xsm:h-full">
              <div
                className="flex justify-center items-center h-full w-8"
                onClick={() => handlePlayMusic(music)}>
                <span className="group-hover:hidden flex">{index}</span>
                <Icon
                  iconName={isCurrentMusicPlaying ? "pauseButton" : "playButton"}
                  className="w-4/5 group-hover:block hidden rounded-full fill-primary-orange"
                />
              </div>
            </div>
            <div className="flex flex-col xsm:gap-1 h-full max-w-full overflow-hidden items-start justify-center">
              <span className="text-base text-dark-custom flex gap-1 xsm:gap-2 items-center w-full">
                <span className="font-semibold select-none text-sm xsm:font-normal xsm:text-base truncate">
                  {music.title}
                </span>
                {artist.isVerified && (
                  <span
                    className="flex-shrink-0 flex justify-center items-center rounded-lg mm-size-3.5 xsm:mm-size-4 bg-label-music-verif"
                    title="Official Music">
                    <Icon iconName="verified-label" className="mm-size-3 stroke-black" />
                  </span>
                )}
              </span>
              <span className="w-full text-sm text-dark-grey font-semibold flex flex-row gap-1">
                <ArtistInfo artist={artist} className="min-w-fit" />
              </span>
            </div>
          </div>
          <div className="hidden xl:flex items-center max-w-36 min-w-36 justify-center font-light text-sm">
            {formatTime(music.createdAt)}
          </div>
          <div className="hidden lg:flex items-center w-10 justify-center font-light text-sm">
            {formatDuration(music.duration)}
          </div>
        </div>
        <div className="relative flex flex-row flex-shrink-0 items-center justify-center h-full w-auto gap-2 xsm:gap-3 pr-1 xsm:pr-2">
          <Icon
            onClick={() => handleClickDelete(music)}
            iconName="trash-red"
            className="fill-dark-custom cursor-pointer mm-size-6 sm:mm-size-7"
          />
        </div>
      </div>
    </div>
  );
}
