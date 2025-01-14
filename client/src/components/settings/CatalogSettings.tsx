import SettingsOptions from "components/settings/SettingsOptions";
import TextSetting from "components/settings/TextSetting";
import { routesConfig } from "config/app-config";
import { useUser } from "hooks/useUser";
import { Catalog } from "models/Catalog";
import { Artist } from "models/User";
import { enqueueSnackbar } from "notistack";
import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CatalogSettingsProps {
  catalog: Catalog;
  owner: Artist;
  onCloseSetting: () => void;
}

export default function CatalogSettings({
  catalog,
  owner,
  onCloseSetting,
}: CatalogSettingsProps): ReactElement {
  const { user } = useUser();
  const navigate = useNavigate();

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
    const path = routesConfig.catalog.getParameter(catalog.id.toString());
    const host = window.location.host;
    navigator.clipboard.writeText(`${host}${path}`);
    enqueueSnackbar(`Link copied to clipboard`, {
      variant: "info",
    });
  };

  const handleNavigate = () => {
    navigate(routesConfig.catalogEdit.getParameter(catalog.id));
  };

  return (
    <div className={`absolute mt-7 right-2 z-20 bg-white rounded-md drop-shadow-md`}>
      <SettingsOptions onClick={handleCopyLink}>
        <TextSetting text="Copy Link" iconName="copylink" />
      </SettingsOptions>
      {user?.id === owner.id && (
        <SettingsOptions onClick={handleNavigate}>
          <TextSetting iconName="playlistadd" text="Edit Songs" />
        </SettingsOptions>
      )}
    </div>
  );
}
