import Box from "components/box/Box";
import MusicItem from "components/music/MusicItem";
import { Music, MusicDetails } from "models/Music";
import { enqueueSnackbar } from "notistack";
import { ReactElement, useEffect, useState } from "react";
import MusicService from "services/musicService";

interface RecentMusicProps {}

export default function RecentMusic({}: RecentMusicProps): ReactElement {
  const [musicHistory, setMusicHistory] = useState<MusicDetails[]>();

  useEffect(() => {
    const fetchMusicHistory = async () => {
      await MusicService.getMusicHistory()
        .then((musics) => {
          setMusicHistory(musics);
        })
        .catch((err) => {
          enqueueSnackbar(err.message, { variant: "error" });
        });
    };
    fetchMusicHistory();
  }, []);

  return (
    <Box
      title="Recently Played"
      className="flex-col"
      children={musicHistory?.map((m) => {
        return <MusicItem music={m} artist={m.artist} catalog={m.catalog} key={m.id} />;
      })}
    />
  );
}
