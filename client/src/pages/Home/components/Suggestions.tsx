import ScrollableBox from "components/box/ScrollableBox";
import Card from "components/cards/Card";
import { useUser } from "hooks/useUser";
import { Catalog } from "models/Catalog";
import { enqueueSnackbar } from "notistack";
import { ReactElement } from "react";
import UserService from "services/userService";

interface SuggestionsProps {
  catalogs: Array<Catalog>;
}

export default function Suggestions({ catalogs }: SuggestionsProps): ReactElement {
  const { user } = useUser();

  const onLikeCatalog = (like: boolean, catalog: Catalog) => {
    if (like) {
      UserService.removeLike(catalog);
      enqueueSnackbar(`${catalog.title} removed from your favourite`, {
        variant: "success",
      });
    } else {
      UserService.like(catalog);
      enqueueSnackbar(`${catalog.title} added to your favourite `, {
        variant: "success",
      });
    }
  };

  return (
    <ScrollableBox
      children={catalogs.map((catalog) => {
        return (
          <Card
            key={catalog.id}
            title={catalog.title}
            description={`${catalog.type.valueOf()} - ${catalog.owner.artistName}`}
            link={`/catalog/${catalog.id}`}
            thumbnail={catalog.thumbnail}
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
