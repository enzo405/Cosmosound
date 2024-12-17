import Box from "components/box/Box";
import MusicItem from "components/music/MusicItem";
import { ReactElement } from "react";
import MusicService from "services/musicService";

interface RecentMusicProps {}

export default function RecentMusic({}: RecentMusicProps): ReactElement {
  const musicHistory = MusicService.getMusicHistory();

  return (
    <Box
      title="Recently Played"
      className="flex-col"
      children={musicHistory.map((m) => {
        return <MusicItem music={m} artist={m.artist} catalog={m.catalog} key={m.id} />;
      })}
    />
  );
}
