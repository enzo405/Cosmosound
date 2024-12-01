import ScrollableBox from "components/box/ScrollableBox";
import Card from "components/cards/Card";
import { Catalog, TypeCatalog } from "models/Catalog";
import { ReactElement } from "react";

interface SuggestionsProps {
  catalogs: Array<Catalog>;
}

export default function Suggestions({ catalogs }: SuggestionsProps): ReactElement {
  return (
    <ScrollableBox
      children={catalogs.map((catalog) => {
        return (
          <Card
            key={catalog.id}
            title={catalog.title}
            description={`${TypeCatalog[catalog.type]} - ${catalog.owner.artist_name}`}
            link={`/catalog/${catalog.id}`}
            thumbnail={catalog.thumbnail}
          />
        );
      })}
      title="Suggestions"
    />
  );
}
