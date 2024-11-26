import Divider from "components/Divider";
import SettingsOptions from "components/settings/SettingsOptions";
import { routesConfig } from "config/app-config";
import { MusicDetails } from "models/Music";
import { Playlist } from "models/Playlist";
import { ReactElement, useEffect } from "react";
import TextSetting from "./TextSetting";

interface MusicSettingsProps {
  music: MusicDetails;
  isFav: boolean;
  onDeleteSong: () => void;
  onCloseSetting: () => void;
  onAddToFav: () => void;
}

export default function MusicSettings({
  isFav,
  music,
  onDeleteSong,
  onCloseSetting,
  onAddToFav,
}: MusicSettingsProps): ReactElement {
  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      let id = `music-item-actions-${music.id}`;
      const settings = document.getElementById(id);
      const target = event.target as Node;
      const clickIsOnSettings = settings?.contains(target);

      if (!clickIsOnSettings) {
        onCloseSetting();
      }
    };

    window.addEventListener("click", handleClickAway);

    return () => {
      window.removeEventListener("click", handleClickAway);
    };
  }, []);

  const handleFavouriteSong = () => {
    onAddToFav();
    console.log("faved music.id", music.id);
  };

  const handleCopyLink = () => {
    let path = routesConfig.catalog.getParameter(music.catalog.id);
    let host = window.location.host;
    navigator.clipboard.writeText(host + path);
  };

  const handleAddToPlaylist = (playlist: Playlist) => {};

  return (
    <div className="absolute top-[3.8rem] right-0 z-20 bg-white rounded-md drop-shadow-md">
      <SettingsOptions>
        <TextSetting
          onClick={handleFavouriteSong}
          text={isFav ? "Remove from Favourite Songs" : "Add to Favourite Songs"}
          iconName={isFav ? "minus" : "heartadd"}
        />
      </SettingsOptions>
      <SettingsOptions>
        <TextSetting onClick={handleCopyLink} text="Copy Link" iconName="copylink" />
      </SettingsOptions>
      <SettingsOptions>
        <TextSetting onClick={onDeleteSong} iconName="plus" text="Add to Playlist"></TextSetting>
      </SettingsOptions>
      <Divider />
      <SettingsOptions>
        <TextSetting
          onClick={onDeleteSong}
          iconName="minus"
          text="Remove From Playlist"></TextSetting>
      </SettingsOptions>
      <SettingsOptions>
        <TextSetting onClick={onDeleteSong} iconName="trash" text="Delete Song"></TextSetting>
      </SettingsOptions>
    </div>
  );
}
