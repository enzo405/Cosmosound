import SettingsOptions from "components/settings/SettingsOptions";
import TextSetting from "components/settings/TextSetting";
import { routesConfig } from "config/app-config";
import { useConfirmDialog } from "hooks/useConfirm";
import { Playlist } from "models/Playlist";
import { enqueueSnackbar } from "notistack";
import { ReactElement, useEffect } from "react";
import PlaylistService from "services/playlistService";

interface PlaylistSettingsProps {
  playlist: Playlist;
  onCloseSetting: () => void;
}

export default function PlaylistSettings({
  playlist,
  onCloseSetting,
}: PlaylistSettingsProps): ReactElement {
  const { openDialog } = useConfirmDialog();

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      let id = `settings`;
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
    const path = routesConfig.playlist.getParameter(playlist.id.toString());
    const host = window.location.host;
    navigator.clipboard.writeText(`${host}${path}`);
    enqueueSnackbar(`Link copied to clipboard`, {
      variant: "info",
    });
  };

  const handleDeletePlaylist = () => {
    openDialog({
      title: `Are you sure you want to delete this playlist ?`,
      description: "",
      onConfirm: () => PlaylistService.deletePlaylist(playlist),
    });
  };

  return (
    <div className={`absolute mt-7 right-2 z-20 bg-white rounded-md drop-shadow-md`}>
      <SettingsOptions onClick={handleCopyLink}>
        <TextSetting text="Copy Link" iconName="copylink" />
      </SettingsOptions>
      <SettingsOptions onClick={handleDeletePlaylist}>
        <TextSetting iconName="trash-red" text="Delete Playlist" />
      </SettingsOptions>
    </div>
  );
}
