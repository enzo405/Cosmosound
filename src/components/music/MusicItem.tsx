import { Icon } from "components/icons/Icon";
import { routesConfig } from "config/app-config";
import { MusicDetails } from "models/Music";
import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDuration, formatTime } from "utils/date";

interface MusicItemProps {
  music: MusicDetails;
}

export default function MusicItem({ music }: MusicItemProps): ReactElement {
  const [displaySettings, setDisplaySettings] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleClickHeart = () => {
    setIsLiked(!isLiked);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300); // Match animation duration
  };

  const handleClickSettings = () => {
    setDisplaySettings(!displaySettings);
  };

  return (
    <div className="relative">
      <div className="flex flex-row w-full p-2 justify-between h-16 md:h-[72px] lg:h-20">
        <div className="flex flex-row items-center w-auto sm:max-w-80 sm:min-w-80 gap-2">
          <img
            className="rounded-xl object-contain h-full"
            src={music.catalog.thumbnail}
            alt={music.title}
          />
          <div className="flex flex-col gap-1 h-full w-full items-start">
            <span className="w-full text-base text-dark-custom flex flex-row gap-2 items-center">
              {music.title}
              <span
                className="flex justify-center items-center rounded-lg size-[18px] bg-label-music-verif"
                title={music.is_ai ? "AI Generated" : "Official Music"}>
                <Icon iconName={music.is_ai ? "ai-label" : "verified-label"} className="size-4" />
              </span>
            </span>
            <span className="w-full text-sm text-dark-glassy font-semibold flex flex-row gap-2">
              <span
                className="cursor-pointer whitespace-nowrap hover:underline flex flex-row gap-1 min-w-fit"
                onClick={() => navigate(routesConfig.artist.getParameter(music.artist.id))}>
                <img
                  src={music.artist.picture_profile}
                  className="size-5 rounded-full"
                  alt={music.artist.artist_name}
                />
                {music.artist.artist_name}
              </span>
              <span className="hidden lg:block">-</span>
              <span
                className="hidden lg:block cursor-pointer hover:underline overflow-hidden whitespace-nowrap text-ellipsis"
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
        <div className="flex flex-row items-center justify-center h-full w-auto gap-3 pr-2">
          <Icon
            onClick={handleClickHeart}
            iconName={isLiked ? "heart-orange" : "heart-orange-empty"}
            className={`size-6 sm:size-[30px] cursor-pointer ${isAnimating ? "animate-pop" : ""}`}
          />
          <Icon
            onClick={handleClickSettings}
            iconName="ellipsis"
            className="size-6 sm:size-[30px]"
          />
        </div>
      </div>
      {displaySettings && <></>}
    </div>
  );
}
