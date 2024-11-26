import { Icon } from "components/icons/Icon";
import { routesConfig } from "config/app-config";
import { useMusic } from "hooks/useMusic";
import { MusicDetails } from "models/Music";
import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDuration, formatTime } from "utils/date";
import ArtistInfo from "./ArtistInfo";
import MusicSettings from "components/settings/MusicSettings";

interface MusicItemProps {
  music: MusicDetails;
}

export default function MusicItem({ music }: MusicItemProps): ReactElement {
  const { playingMusic, isPlaying, setIsPlaying, setPlayingMusic } = useMusic();
  const [displaySettings, setDisplaySettings] = useState<boolean>(false);
  const [displayPlay, setDisplayPlay] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const handleClickHeart = () => {
    setIsLiked(!isLiked);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleClickSettings = () => {
    setDisplaySettings(!displaySettings);
  };

  const handlePlayMusic = (music: MusicDetails) => {
    if (isCurrentMusicPlaying) {
      setIsPlaying(false);
    } else {
      setPlayingMusic(music);
      setIsPlaying(true);
    }
  };

  const handleClickPlay = (music: MusicDetails) => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
    } else {
      const timeout = setTimeout(() => {
        handlePlayMusic(music);
        setClickTimeout(null);
      }, 250);
      setClickTimeout(timeout);
    }
  };

  const handleDoubleClickPlay = (music: MusicDetails) => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
    }
    handlePlayMusic(music);
  };

  const isCurrentMusicPlaying = isPlaying && music.id === playingMusic.id;

  return (
    <div className="relative">
      <div
        className={`flex flex-row w-full p-1 justify-between h-16 md:h-[72px] lg:h-20 ${playingMusic.id == music.id ? "bg-slate-200" : "hover:bg-slate-100"} rounded-xl`}>
        <div
          onDoubleClick={() => handleDoubleClickPlay(music)}
          className="flex flex-row w-full justify-between xsm:pr-1 sm:pr-2 md:pr-4 lg:pr-36 cursor-pointer">
          <div className="flex flex-row items-center w-full sm:max-w-80 sm:min-w-80 lg:min-w-[28rem] lg:max-w-[28rem] gap-1">
            <div
              onMouseEnter={() => setDisplayPlay(true)}
              onMouseLeave={() => setDisplayPlay(false)}
              className="relative p-0.5 h-5/6 xsm:h-full">
              <img
                className="rounded-xl object-contain h-full"
                src={music.catalog.thumbnail}
                alt={`${music.title} ${music.catalog.title} ${music.artist.artist_name}`}
              />
              {displayPlay && (
                <span
                  onClick={() => handleClickPlay(music)}
                  className="flex justify-center items-center h-full w-full absolute top-0 left-0 p-3">
                  <Icon
                    iconName={isCurrentMusicPlaying ? "pauseButton-opek" : "playButton-opek"}
                    className="z-20 rounded-full h-full w-full fill-white/80"
                  />
                </span>
              )}
            </div>
            <div className="flex flex-col xsm:gap-1 h-full max-w-full overflow-hidden items-start">
              <span className="text-base text-dark-custom flex gap-1 xsm:gap-2 items-center w-full">
                <span className="font-semibold text-sm xsm:font-normal xsm:text-base truncate">
                  {music.title}
                </span>
                <span
                  className="flex-shrink-0 flex justify-center items-center rounded-lg size-[14px] xsm:size-[18px] bg-label-music-verif"
                  title={music.is_ai ? "AI Generated" : "Official Music"}>
                  <Icon iconName={music.is_ai ? "ai-label" : "verified-label"} className="size-3" />
                </span>
              </span>
              <span className="w-full text-sm text-dark-grey font-semibold flex flex-row gap-1">
                <ArtistInfo artist={music.artist} />
                <span className="hidden lg:block flex-shrink-0">-</span>
                <span
                  className="hidden lg:block cursor-pointer hover:underline truncate"
                  onClick={() => navigate(routesConfig.catalog.getParameter(music.catalog.id))}>
                  {music.catalog.title}
                </span>
              </span>
            </div>
          </div>
          <div className="hidden xl:flex items-center max-w-36 min-w-36 justify-center font-light text-sm">
            {formatTime(music.date_creation)}
          </div>
          <div className="hidden lg:flex items-center w-10 justify-center font-light text-sm">
            {formatDuration(music.duration)}
          </div>
        </div>
        <div
          id={`music-item-actions-${music.id}`}
          className="relative flex flex-row items-center justify-center h-full w-auto gap-2 xsm:gap-3 pr-1 xsm:pr-2">
          <Icon
            onClick={handleClickHeart}
            iconName={isLiked ? "heart-orange" : "heart-orange-empty"}
            className={`size-6 sm:size-[30px] cursor-pointer ${isAnimating ? "animate-pop" : ""}`}
          />
          <Icon
            onClick={handleClickSettings}
            iconName="ellipsis"
            className="cursor-pointer size-6 sm:size-[30px]"
          />
          {displaySettings && (
            <MusicSettings
              music={music}
              onDeleteSong={() => navigate(routesConfig.catalogEdit.getParameter(music.catalog.id))}
              onCloseSetting={() => setDisplaySettings(false)}
              onAddToFav={handleClickHeart}
              isFav={isLiked}
            />
          )}
        </div>
      </div>
    </div>
  );
}
