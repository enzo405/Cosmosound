import { Icon } from "components/icons/Icon";
import MusicItem from "components/music/MusicItem";
import { useMusic } from "hooks/useMusic";
import { MusicDetails } from "models/Music";
import { enqueueSnackbar } from "notistack";
import NotFoundErrorPage from "pages/errors/NotFoundErrorPage";
import { ReactElement, useState } from "react";
import { useParams } from "react-router-dom";
import PlaylistService from "services/playlistService";
import { formatTime } from "utils/date";
import PlaylistSettings from "./components/PlaylistSettings";
import PlaylistOwnerBadge from "./components/PlaylistOwnerBadge";

interface PlaylistPageProps {}

export default function PlaylistPage({}: PlaylistPageProps): ReactElement {
  const { idPlaylist } = useParams();
  if (idPlaylist == undefined) {
    return <NotFoundErrorPage />;
  }

  const playlist = PlaylistService.getPlaylistById(idPlaylist);

  if (playlist == undefined) {
    return <NotFoundErrorPage />;
  }
  const musicDetails: MusicDetails = {
    ...playlist.musics[0],
    artist: playlist.musics[0].artist,
    catalog: playlist.musics[0].catalog,
  };

  const { playingMusic, isPlaying, setIsPlaying, setPlayingMusic } = useMusic();

  const [isPlaylistLiked, setIsPlaylistLiked] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displaySettings, setDisplaySettings] = useState(false);

  const handlePlaying = () => {
    if (!isPlayingSongCurrentPage && playlist != undefined) {
      setPlayingMusic(musicDetails);
    }
    setIsPlaying(!isPlaying);
  };

  const handleClickHeart = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    if (isPlaylistLiked) {
      enqueueSnackbar(`${playlist.title} removed from your favourite playlist`, {
        variant: "success",
      });
    } else {
      enqueueSnackbar(`${playlist.title} added to your favourite playlist `, {
        variant: "success",
      });
    }
    setIsPlaylistLiked(!isPlaylistLiked);
  };

  const handleDeleteFromPlaylist = () => {
    console.log("playlist", playlist); // TODO add a modal
  };

  const isPlayingSongCurrentPage =
    playlist.musics.find((m) => m.id == playingMusic.id) != undefined;

  return (
    <div className="relative flex flex-col rounded-lg bg-box-bg h-full w-full gap-4 py-8 px-4">
      <div className="flex flex-col sm:flex-row w-full lg:gap-10 md:gap-6 gap-4 pb-6 border-b border-gray-300">
        <img
          className="rounded-full lg:size-64 md:size-52 size-40 shadow-2xl"
          src={playlist.musics[0].catalog.thumbnail}
          alt={playlist.title}
        />
        <div className="w-full sm:w-4/5 flex flex-col gap-2 text-dark-custom">
          <h1 className="lg:text-5xl md:text-3xl text-2xl font-bs font-semibold">
            {playlist.title}
          </h1>
          <span className="font-light flex flex-wrap gap-1">
            <p>Made by </p>
            <PlaylistOwnerBadge owner={playlist.owner} />
            <span>on {formatTime(playlist.date_creation)}</span>
          </span>
          <span className="flex flex-row-reverse sm:flex-row gap-4 mt-2 md:mt-auto w-full justify-start">
            <Icon
              className="lg:size-16 md:size-14 size-12 cursor-pointer fill-primary-orange hover:fill-brown-music-player-dot"
              iconName={isPlayingSongCurrentPage && isPlaying ? "pauseButton" : "playButton"}
              onClick={handlePlaying}
            />
            <Icon
              onClick={handleClickHeart}
              iconName={isPlaylistLiked ? "heart-orange" : "heart-orange-empty"}
              className={`lg:size-16 md:size-14 size-12 cursor-pointer ${isAnimating ? "animate-pop" : ""}`}
            />
          </span>
        </div>
        <span id="settings-playlist">
          <Icon
            onClick={() => setDisplaySettings(!displaySettings)}
            iconName="ellipsis"
            className="absolute top-6 right-4 rotate-90 fill-dark-custom cursor-pointer md:size-8 size-6"
          />
        </span>
        {displaySettings && (
          <PlaylistSettings playlist={playlist} onCloseSetting={() => setDisplaySettings(false)} />
        )}
      </div>
      <div className="flex flex-col gap-3">
        <div className={`flex flex-col`}>
          {playlist.musics.length != 0 ? (
            playlist.musics.map((music) => {
              return (
                <MusicItem
                  key={music.id}
                  music={music}
                  artist={music.artist}
                  catalog={music.catalog}
                  handleDeleteFromPlaylist={handleDeleteFromPlaylist}
                />
              );
            })
          ) : (
            <span className="text-dark-custom">This playlist doesn't have any song yet</span>
          )}
        </div>
      </div>
    </div>
  );
}
