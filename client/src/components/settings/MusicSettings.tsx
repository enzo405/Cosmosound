import Divider from "components/Divider";
import SettingsOptions from "components/settings/SettingsOptions";
import { routesConfig } from "config/app-config";
import { Music, MusicWithCatalog } from "models/Music";
import { Playlist } from "models/Playlist";
import { ReactElement, useEffect, useMemo, useState } from "react";
import TextSetting from "./TextSetting";
import { enqueueSnackbar } from "notistack";
import SelectPlaylist from "./SelectPlaylist";
import PlaylistService from "services/playlistService";
import { useUser } from "hooks/useUser";

interface MusicSettingsProps {
  dropdownPosition: "top" | "bottom";
  music: MusicWithCatalog;
  isFav: boolean;
  onDeleteSong: () => void;
  onCloseSetting: () => void;
  onAddToFav: () => void;
  onDeleteFromPlaylist: ((music: Music) => void) | undefined;
}

export default function MusicSettings({
  dropdownPosition,
  isFav,
  music,
  onDeleteSong,
  onCloseSetting,
  onAddToFav,
  onDeleteFromPlaylist,
}: MusicSettingsProps): ReactElement {
  const { user } = useUser();
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
    enqueueSnackbar(`Link copied to clipboard`, {
      variant: "info",
    });
  };

  const toggleDisplayPlaylistDropdown = () => {
    setDisplayPlaylistSelect(!displayPlaylistSelect);
  };

  const handleAddToPlaylist = async (playlist: Playlist) => {
    await PlaylistService.addMusic(playlist, music)
      .then(() => {
        enqueueSnackbar(`Added to ${playlist.title}`, {
          variant: "success",
        });
      })
      .catch(() => {
        enqueueSnackbar(`Failed to add to ${playlist.title}`, {
          variant: "error",
        });
      });
  };

  const handleDeleteMusicFromPlaylist = () => {
    if (onDeleteFromPlaylist) onDeleteFromPlaylist(music);
  };

  const isPlaylistPageView = useMemo(() => {
    return window.location.pathname.startsWith(routesConfig.playlist.path.split(":")[0]);
  }, [window.location.pathname]);

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

      {isPlaylistPageView && (
        <>
          <Divider />
          <SettingsOptions onClick={handleDeleteMusicFromPlaylist}>
            <TextSetting iconName="minus" text="Remove From Playlist" />
          </SettingsOptions>
        </>
      )}
      {music.catalog.ownerId === user?.id && (
        <>
          <Divider />
          <SettingsOptions onClick={onDeleteSong}>
            <TextSetting iconName="trash" text="Delete Song" />
          </SettingsOptions>
        </>
      )}
      {displayPlaylistSelect && (
        <>
          <SelectPlaylist
            handleAddToPlaylist={handleAddToPlaylist}
            closeSettings={onCloseSetting}
          />
        </>
      )}
    </div>
  );
}
