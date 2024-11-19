import { Icon } from "components/icons/Icon";
import { routesConfig } from "config/app-config";
import { MusicDetails } from "models/Music";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { formatDuration, formatTime } from "utils/date";

interface MusicItemProps {
  music: MusicDetails;
  actions: ReactElement;
}

export default function MusicItem({ music, actions }: MusicItemProps): ReactElement {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row w-full p-2 h-24 justify-between">
      <div className="flex flex-row items-center max-w-96 gap-2">
        <img
          className="rounded-md object-contain h-full"
          src={music.catalog.thumbnail}
          alt={music.title}
        />
        <div className="flex flex-col h-full items-start">
          <span className="w-full text-base text-dark-custom flex flex-row gap-2">
            {music.title}
            <span
              className="flex justify-center items-center rounded-lg size-5 bg-label-music-verif"
              title={music.is_ai ? "AI Generated" : "Official Music"}>
              <Icon
                iconName={music.is_ai ? "ai-label" : "verified-label"}
                className="size-[18px]"
              />
            </span>
          </span>
          <span className="text-sm text-dark-glassy font-semibold whitespace-nowrap flex flex-row gap-2">
            <p
              className="cursor-pointer hover:underline"
              onClick={() => navigate(routesConfig.catalog.getParameter(music.catalog.id))}>
              {music.catalog.title}
            </p>
            -
            <p
              className="cursor-pointer hover:underline"
              onClick={() => navigate(routesConfig.artist.getParameter(music.artist.id))}>
              {music.artist.artist_name}
            </p>
          </span>
        </div>
      </div>
      <div className="flex items-center w-36">{formatTime(music.date_creation)}</div>
      <div className="flex items-center">{formatDuration(music.duration)}</div>
      <div className="flex flex-row items-center justify-center h-full w-auto">{actions}</div>
    </div>
  );
}
