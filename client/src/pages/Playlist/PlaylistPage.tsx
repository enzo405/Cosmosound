import { Icon } from "./../../components/icons/Icon";
import MusicItem from "./../../components/music/MusicItem";
import { useMusic } from "./../../hooks/useMusic";
import { Music, MusicDetails } from "./../../models/Music";
import { enqueueSnackbar } from "notistack";
import NotFoundErrorPage from "./../../pages/errors/NotFoundErrorPage";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import PlaylistService from "./../../services/playlistService";
import { formatDurationWithLabel, formatTime } from "./../../utils/date";
import PlaylistSettings from "./../../components/settings/PlaylistSettings";
import PlaylistOwnerBadge from "./components/PlaylistOwnerBadge";
import PageLayout from "./../../components/PageLayout";
import UserService from "./../../services/userService";
import HeartIcon from "./../../components/icons/HeartIcon";
import { useConfirmDialog } from "./../../hooks/useConfirm";
import { useUser } from "./../../hooks/useUser";
import { PlaylistWithMusic } from "./../../models/Playlist";
import Loading from "./../../components/Loading";
import GenreLink from "./../../components/GenreLink";

interface PlaylistPageProps {}

export default function PlaylistPage({}: PlaylistPageProps): ReactElement {
  const { idPlaylist } = useParams();
  const { playingMusic, isPlaying, setIsPlaying, setPlayingMusic } = useMusic();
  const { openDialog } = useConfirmDialog();
  const { user, toggleLike } = useUser();

  const [playlist, setPlaylist] = useState<PlaylistWithMusic | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isPlaylistLiked, setIsPlaylistLiked] = useState<boolean>(
    user?.likedPlaylists.find((id) => id === idPlaylist) !== undefined,
  );
  const [displaySettings, setDisplaySettings] = useState(false);

  const musicDetails: MusicDetails | undefined = useMemo(() => {
    if (playlist == undefined) return;
    return {
      id: playlist.musics[0].id,
      title: playlist.musics[0].title,
      artist: playlist.musics[0].artist,
      duration: playlist.musics[0].duration,
      catalog: playlist.musics[0].catalog,
      url: playlist.musics[0].url,
      genres: playlist.musics[0].genres,
      createdAt: playlist.musics[0].createdAt,
    };
  }, [playlist]);

  const isPlayingSongCurrentPage = useMemo(() => {
    return playlist?.musics.find((m) => m.id === playingMusic?.id) != undefined;
  }, [playingMusic, playlist]);

  const playlistGenres: Set<string> = useMemo(() => {
    const genres = new Set<string>();
    playlist?.musics.forEach((music) => {
      music.genres.forEach((genre) => genres.add(genre));
    });
    return genres;
  }, [playlist]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      await PlaylistService.getPlaylistById(idPlaylist)
        .then((data) => {
          setPlaylist(data);
        })
        .catch((err) => {
          enqueueSnackbar({
            message: err.response.data.error,
            variant: "error",
          });
        })
        .finally(() => setLoading(false));
    };

    fetchPlaylist();
  }, [idPlaylist]);

  if (loading) {
    return <Loading />;
  }

  if (playlist == undefined) {
    return <NotFoundErrorPage message="PLAYLIST NOT FOUND" />;
  }

  const handlePlaying = () => {
    if (isPlaying && isPlayingSongCurrentPage) {
      setIsPlaying(false);
    } else {
      if (!isPlayingSongCurrentPage) {
        setPlayingMusic(musicDetails);
      }
      setIsPlaying(true);
    }
  };

  const handleClickHeart = async () => {
    await UserService.toggleLike(playlist.id, "playlist")
      .then(() => {
        toggleLike(playlist.id, "playlist");
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
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data.error, {
          variant: "error",
        });
      });
  };

  const handleDeleteFromPlaylist = (music: Music) => {
    openDialog({
      title: `Do you really want to delete ${music.title} from the playlist ?`,
      description: "",
      onConfirm: async () =>
        await PlaylistService.deleteMusic(playlist, music)
          .then(() => {
            enqueueSnackbar(`Song deleted from playlist`, {
              variant: "success",
            });
            setPlaylist({
              ...playlist,
              musics: playlist.musics.filter((m) => m.id != music.id),
            });
          })
          .catch(() => {
            enqueueSnackbar(`Failed to delete song from playlist`, {
              variant: "error",
            });
          }),
    });
  };

  return (
    <PageLayout
      thumbnail={playlist.playlistThumbnail}
      settingsComponent={
        <PlaylistSettings playlist={playlist} onCloseSetting={() => setDisplaySettings(false)} />
      }
      title={playlist.title}
      subtitle={
        <div className="flex flex-col gap-1">
          <span className="font-light flex flex-wrap gap-1">
            <p>Made by </p>
            <PlaylistOwnerBadge owner={playlist.owner} />
            <span>on {formatTime(playlist.createdAt)}</span>
          </span>
          <span>
            {playlist.musics.length} songs (
            {formatDurationWithLabel(
              playlist.musics.reduce((total, music) => total + music.duration, 0),
            )}
            )
          </span>
          <span className="flex flex-row gap-1">
            Genres:
            {Array.from(playlistGenres).map((genre) => (
              <GenreLink key={genre} genre={genre} />
            ))}
          </span>
        </div>
      }
      displaySettings={displaySettings}
      headerActions={
        <>
          <Icon
            className="lg:mm-size-16 md:mm-size-14 mm-size-12 cursor-pointer fill-primary-orange hover:fill-brown-music-player-dot"
            iconName={isPlayingSongCurrentPage && isPlaying ? "pauseButton" : "playButton"}
            onClick={handlePlaying}
          />
          <HeartIcon
            isLiked={isPlaylistLiked}
            handleClickHeart={handleClickHeart}
            className="lg:mm-size-16 md:mm-size-14 mm-size-12"
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
