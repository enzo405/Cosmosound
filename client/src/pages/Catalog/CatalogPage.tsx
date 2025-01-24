import { Icon } from "components/icons/Icon";
import MusicItem from "components/music/MusicItem";
import { useMusic } from "hooks/useMusic";
import { enqueueSnackbar } from "notistack";
import NotFoundErrorPage from "pages/errors/NotFoundErrorPage";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import CatalogService from "services/catalogService";
import CatalogSettings from "components/settings/CatalogSettings";
import { MusicDetails } from "models/Music";
import { formatDurationWithLabel, formatTime } from "utils/date";
import PageLayout from "components/PageLayout";
import ArtistInfo from "components/music/ArtistInfo";
import UserService from "services/userService";
import HeartIcon from "components/icons/HeartIcon";
import { useUser } from "hooks/useUser";
import { DetailedCatalog } from "models/Catalog";
import { displayPictureProfile } from "utils/user";
import Loading from "components/Loading";
import GenreLink from "components/GenreLink";

interface CatalogPageProps {}

export default function CatalogPage({}: CatalogPageProps): ReactElement {
  const { idCatalog } = useParams();
  const { playingMusic, isPlaying, setIsPlaying, setPlayingMusic } = useMusic();
  const { user, toggleLike } = useUser();
  const [catalog, setCatalog] = useState<DetailedCatalog | undefined>();
  const [loading, setLoading] = useState(true);
  const [displaySettings, setDisplaySettings] = useState(false);
  const [isCatalogLiked, setIsCatalogLiked] = useState<boolean>(
    user?.likedCatalogs.find((id) => id === idCatalog) !== undefined,
  );

  const isPlayingSongCurrentPage = useMemo(
    () => catalog?.musics.find((m) => m.id === playingMusic?.id) != undefined,
    [playingMusic],
  );

  const musicDetails: MusicDetails | undefined = useMemo(() => {
    if (!catalog) return undefined;
    return { ...catalog.musics[0], artist: catalog.owner, catalog };
  }, [catalog]);

  const catalogGenres: Set<string> = useMemo(() => {
    const genres = new Set<string>();
    catalog?.musics.forEach((music) => {
      music.genres.forEach((genre) => genres.add(genre));
    });
    return genres;
  }, [catalog]);

  useEffect(() => {
    const fetchCatalog = async () => {
      await CatalogService.getCatalogById(idCatalog)
        .then((catalog) => {
          setCatalog(catalog);
        })
        .catch((err) => {
          enqueueSnackbar({
            message: err.response.data.error,
            variant: "error",
          });
        })
        .finally(() => setLoading(false));
    };

    fetchCatalog();
  }, [idCatalog]);

  if (loading) {
    return <Loading />;
  }

  if (catalog == undefined) {
    return <NotFoundErrorPage message="CATALOG NOT FOUND" />;
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
    await UserService.toggleLike(catalog.id, "album")
      .then(() => {
        toggleLike(catalog.id, "album");
        if (isCatalogLiked) {
          enqueueSnackbar(`${catalog.title} removed from your favourite`, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(`${catalog.title} added to your favourite`, {
            variant: "success",
          });
        }
        setIsCatalogLiked(!isCatalogLiked);
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data.error, {
          variant: "error",
        });
      });
  };

  return (
    <PageLayout
      thumbnail={displayPictureProfile(catalog.thumbnail)}
      settingsComponent={
        <CatalogSettings
          catalog={catalog}
          onCloseSetting={() => setDisplaySettings(false)}
          owner={catalog.owner}
        />
      }
      title={catalog.title}
      subtitle={
        <div className="flex flex-col gap-1">
          <span className="flex flex-row gap-1">
            By <ArtistInfo artist={catalog.owner} />
          </span>
          <span>Made on {formatTime(catalog.createdAt)}</span>
          <span>
            {catalog.musics.length} songs (
            {formatDurationWithLabel(
              catalog.musics.reduce((total, music) => total + music.duration, 0),
            )}
            )
          </span>
          <span className="flex flex-row gap-1">
            Genres:
            {Array.from(catalogGenres).map((genre) => (
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
            isLiked={isCatalogLiked}
            handleClickHeart={handleClickHeart}
            className="lg:mm-size-16 md:mm-size-14 mm-size-12 "
          />
        </>
      }
      onPageActionClick={() => setDisplaySettings(!displaySettings)}
      content={
        <div className="flex flex-col gap-1">
          <div className="w-full border-b border-gray-300 py-2 mb-2" />
          {catalog.musics.length != 0 ? (
            catalog.musics.map((music, i) => {
              return (
                <MusicItem
                  key={music.id}
                  music={music}
                  artist={catalog.owner}
                  catalog={catalog}
                  showCatalog={false}
                  showCatalogThumbnail={false}
                  index={i + 1}
                />
              );
            })
          ) : (
            <span className="text-dark-custom">
              {catalog.owner.artistName} haven't made any {catalog.type.valueOf()} yet
            </span>
          )}
        </div>
      }
    />
  );
}
