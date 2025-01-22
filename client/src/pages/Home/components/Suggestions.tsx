import ScrollableBox from "components/box/ScrollableBox";
import Card from "components/cards/Card";
import { routesConfig } from "config/app-config";
import { useUser } from "hooks/useUser";
import { Catalog, DetailedCatalog } from "models/Catalog";
import { enqueueSnackbar } from "notistack";
import { ReactElement } from "react";
import UserService from "services/userService";
import { displayPictureProfile } from "utils/user";

interface SuggestionsProps {
  catalogs: DetailedCatalog[];
}

export default function Suggestions({ catalogs }: SuggestionsProps): ReactElement {
  const { user, toggleLike } = useUser();

  const onLikeCatalog = async (like: boolean, catalog: Catalog): Promise<boolean> => {
    return await UserService.toggleLike(catalog.id, "album")
      .then(() => {
        toggleLike(catalog.id, "album");
        if (like) {
          enqueueSnackbar(`${catalog.title} removed from your favourite`, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(`${catalog.title} added to your favourite `, {
            variant: "success",
          });
        }
        return true;
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data.error, {
          variant: "error",
        });
        return false;
      });
  };

  return (
    <ScrollableBox
      children={catalogs.map((catalog) => {
        return (
          <Card
            key={catalog.id}
            title={catalog.title}
            description={`${catalog.type.valueOf()} - ${catalog.owner.artistName}`}
            link={routesConfig.catalog.getParameter(catalog.id)}
            thumbnail={displayPictureProfile(catalog.thumbnail)}
            defaultLiked={
              user?.likedCatalogs.find((id) => id == catalog.id.toString()) !== undefined
            }
            onLike={(like) => onLikeCatalog(like, catalog)}
          />
        );
      })}
      title="Suggestions"
    />
  );
}
