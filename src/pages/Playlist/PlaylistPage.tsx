import { Icon } from "components/icons/Icon";
import MusicItem from "components/music/MusicItem";
import { useMusic } from "hooks/useMusic";
import { Music, MusicDetails } from "models/Music";
import { enqueueSnackbar } from "notistack";
import NotFoundErrorPage from "pages/errors/NotFoundErrorPage";
import { ReactElement, useState } from "react";
import { useParams } from "react-router-dom";
import PlaylistService from "services/playlistService";
import { formatTime } from "utils/date";
import PlaylistSettings from "./components/PlaylistSettings";
import PlaylistOwnerBadge from "./components/PlaylistOwnerBadge";
import PageLayout from "components/PageLayout";
import UserService from "services/userService";

interface PlaylistPageProps {}

export default function PlaylistPage({}: PlaylistPageProps): ReactElement {
  const { idPlaylist } = useParams();
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
      UserService.removeLike(playlist);
      enqueueSnackbar(`${playlist.title} removed from your favourite playlist`, {
        variant: "success",
      });
    } else {
      UserService.like(playlist);
      enqueueSnackbar(`${playlist.title} added to your favourite playlist `, {
        variant: "success",
      });
    }
    setIsPlaylistLiked(!isPlaylistLiked);
  };

  const handleDeleteFromPlaylist = (music: Music) => {
    PlaylistService.deleteMusic(playlist, music);
    console.log("playlist", playlist); // TODO add a modal
  };

  const isPlayingSongCurrentPage =
    playlist.musics.find((m) => m.id == playingMusic.id) != undefined;

  return (
    <PageLayout
      thumbnail={playlist.musics[0].catalog.thumbnail}
      settingsComponent={
        <PlaylistSettings playlist={playlist} onCloseSetting={() => setDisplaySettings(false)} />
      }
      title={playlist.title}
      subtitle={
        <span className="font-light flex flex-wrap gap-1">
          <p>Made by </p>
          <PlaylistOwnerBadge owner={playlist.owner} />
          <span>on {formatTime(playlist.date_creation)}</span>
        </span>
      }
      displaySettings={displaySettings}
      headerActions={
        <>
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
        </>
      }
      onPageActionClick={() => setDisplaySettings(!displaySettings)}
      content={
        <div className="flex flex-col">
          <div className="w-full border-b border-gray-300 py-2 mb-2" />
          <div className="flex flex-col">
            {playlist.musics.length != 0 ? (
              playlist.musics.map((music) => {
                return (
                  <MusicItem
                    key={music.id}
                    music={music}
                    artist={music.artist}
                    catalog={music.catalog}
                    handleDeleteFromPlaylist={(music) => handleDeleteFromPlaylist(music)}
                  />
                );
              })
            ) : (
              <span className="text-dark-custom">This playlist doesn't have any song yet</span>
            )}
          </div>
        </div>
      }
    />
  );
}
