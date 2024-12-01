import Box from "components/box/Box";
import MusicItem from "components/music/MusicItem";
import { ReactElement } from "react";
import MusicService from "services/musicService";

interface RecentMusicProps {}

export default function RecentMusic({}: RecentMusicProps): ReactElement {
  const musicHistory = MusicService.getMusicHistory();

  return (
    <Box
      title="Recent Music"
      children={musicHistory.map((m) => {
        return <MusicItem music={m} key={m.id} />;
      })}
    />
  );
}
