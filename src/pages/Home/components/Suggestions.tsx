import ScrollableBox from "components/box/ScrollableBox";
import Card from "components/cards/Card";
import { Music } from "models/Music";
import { ReactElement } from "react";

interface SuggestionsProps {
  musics: Array<Music>;
}

export default function Suggestions({ musics }: SuggestionsProps): ReactElement {
  return (
    <ScrollableBox
      children={musics.map((music) => {
        return (
          <Card
            title={music.title}
            description={music.artist.artist_name}
            link={`/music/${music.id}`}
            thumbnail={music.catalog.thumbnail}
          />
        );
      })}
      title="Suggestions"
    />
  );
}
