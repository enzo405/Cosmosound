import Divider from "components/Divider";
import SettingsOptions from "components/settings/SettingsOptions";
import { routesConfig } from "config/app-config";
import { MusicDetails } from "models/Music";
import { Playlist } from "models/Playlist";
import { ReactElement, useEffect, useState } from "react";
import TextSetting from "./TextSetting";
import { enqueueSnackbar } from "notistack";
import SelectPlaylist from "./SelectPlaylist";

interface MusicSettingsProps {
  dropdownPosition: "top" | "bottom";
  music: MusicDetails;
  isFav: boolean;
  onDeleteSong: () => void;
  onCloseSetting: () => void;
  onAddToFav: () => void;
}

export default function MusicSettings({
  dropdownPosition,
  isFav,
  music,
  onDeleteSong,
  onCloseSetting,
  onAddToFav,
}: MusicSettingsProps): ReactElement {
  const [displayPlaylistSelect, setDisplayPlaylistSelect] = useState(false);

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      let id = `music-item-actions-${music.id}`;
      const settings = document.getElementById(id);
      const target = event.target as Node;

      if (settings && !settings.contains(target)) {
        onCloseSetting();
      }
    };

    window.addEventListener("click", handleClickAway);

    // Disable scroll when settings are open so the settings menu won't be hidden by rest of the page if the user scrolls
    document.body.classList.add("overflow-hidden");

    return () => {
      window.removeEventListener("click", handleClickAway);
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const handleCopyLink = () => {
    const path = routesConfig.catalog.getParameter(music.catalog.id);
    const host = window.location.host;
    navigator.clipboard.writeText(`${host}${path}`);
    enqueueSnackbar(`Link copied to your clipboard`, {
      variant: "info",
    });
  };

  const toggleDisplayPlaylistDropdown = () => {
    setDisplayPlaylistSelect(!displayPlaylistSelect);
  };

  const handleAddToPlaylist = (playlist: Playlist) => {
    enqueueSnackbar(`Added to ${playlist.title}`, {
      variant: "success",
    });
  };

  return (
    <div
      className={`absolute ${
        dropdownPosition === "bottom" ? "top-[80%] mt-2" : "bottom-[80%] mb-2"
      } right-0 z-20 bg-white rounded-md drop-shadow-md`}>
      <SettingsOptions onClick={() => onAddToFav()}>
        <TextSetting
          text={isFav ? "Remove from Favourite Songs" : "Add to Favourite Songs"}
          iconName={isFav ? "minus" : "heartadd"}
        />
      </SettingsOptions>
      <SettingsOptions onClick={handleCopyLink}>
        <TextSetting text="Copy Link" iconName="copylink" />
      </SettingsOptions>
      <SettingsOptions onClick={toggleDisplayPlaylistDropdown}>
        <TextSetting text="Add to Playlist" iconName="plus" />
      </SettingsOptions>
      <Divider />
      <SettingsOptions onClick={onDeleteSong}>
        <TextSetting iconName="minus" text="Remove From Playlist" />
      </SettingsOptions>
      <SettingsOptions onClick={onDeleteSong}>
        <TextSetting iconName="trash" text="Delete Song" />
      </SettingsOptions>
      {displayPlaylistSelect && (
        <SelectPlaylist handleAddToPlaylist={handleAddToPlaylist} closeSettings={onCloseSetting} />
      )}
    </div>
  );
}
