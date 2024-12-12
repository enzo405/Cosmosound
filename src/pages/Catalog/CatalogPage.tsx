import { Icon } from "components/icons/Icon";
import MusicItem from "components/music/MusicItem";
import { useMusic } from "hooks/useMusic";
import { enqueueSnackbar } from "notistack";
import NotFoundErrorPage from "pages/errors/NotFoundErrorPage";
import { ReactElement, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import CatalogService from "services/catalogService";
import CatalogSettings from "components/settings/CatalogSettings";
import { MusicDetails } from "models/Music";
import { formatDurationWithLabel, formatTime } from "utils/date";
import PageLayout from "components/PageLayout";
import ArtistInfo from "components/music/ArtistInfo";
import UserService from "services/userService";
import HeartIcon from "components/icons/HeartIcon";

interface CatalogPageProps {}

export default function CatalogPage({}: CatalogPageProps): ReactElement {
  const { idCatalog } = useParams();
  const catalog = CatalogService.getCatalogById(idCatalog);

  if (catalog == undefined) {
    return <NotFoundErrorPage message="CATALOG NOT FOUND" />;
  }
  const musicDetails: MusicDetails = { ...catalog.musics[0], artist: catalog.owner, catalog };

  const { playingMusic, isPlaying, setIsPlaying, setPlayingMusic } = useMusic();

  const [isCatalogLiked, setIsCatalogLiked] = useState<boolean>(false);
  const [displaySettings, setDisplaySettings] = useState(false);

  const handlePlaying = () => {
    if (!isPlayingSongCurrentPage && catalog != undefined) {
      setPlayingMusic(musicDetails);
    }
    setIsPlaying(!isPlaying);
  };

  const handleClickHeart = () => {
    if (isCatalogLiked) {
      UserService.removeLike(catalog);
      enqueueSnackbar(`${catalog.title} removed from your favourite`, {
        variant: "success",
      });
    } else {
      UserService.like(catalog);
      enqueueSnackbar(`${catalog.title} added to your favourite`, {
        variant: "success",
      });
    }
    setIsCatalogLiked(!isCatalogLiked);
  };

  const isPlayingSongCurrentPage = useMemo(
    () => catalog.musics.find((m) => m.id == playingMusic.id) != undefined,
    [playingMusic],
  );

  return (
    <PageLayout
      thumbnail={catalog.thumbnail}
      settingsComponent={
        <CatalogSettings catalog={catalog} onCloseSetting={() => setDisplaySettings(false)} />
      }
      title={catalog.title}
      subtitle={
        <div className="flex flex-col gap-1">
          <span className="flex flex-row gap-1">
            By <ArtistInfo artist={catalog.owner} />
          </span>
          <span>Made on {formatTime(catalog.dateCreation)}</span>
          <span>
            {catalog.musics.length} songs (
            {formatDurationWithLabel(
              catalog.musics.reduce((total, music) => total + music.duration, 0),
            )}
            )
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
