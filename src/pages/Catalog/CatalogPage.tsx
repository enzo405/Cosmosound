import { Icon } from "components/icons/Icon";
import MusicItem from "components/music/MusicItem";
import { useMusic } from "hooks/useMusic";
import { enqueueSnackbar } from "notistack";
import NotFoundErrorPage from "pages/errors/NotFoundErrorPage";
import { ReactElement, useState } from "react";
import { useParams } from "react-router-dom";
import CatalogService from "services/catalogService";
import CatalogSettings from "./components/CatalogSettings";
import { MusicDetails } from "models/Music";
import { formatTime } from "utils/date";

interface CatalogPageProps {}

export default function CatalogPage({}: CatalogPageProps): ReactElement {
  const { idCatalog } = useParams();
  if (idCatalog == undefined) {
    return <NotFoundErrorPage />;
  }

  const catalog = CatalogService.getCatalogById(idCatalog);

  if (catalog == undefined) {
    return <NotFoundErrorPage />;
  }
  const musicDetails: MusicDetails = { ...catalog.musics[0], artist: catalog.owner, catalog };

  const { playingMusic, isPlaying, setIsPlaying, setPlayingMusic } = useMusic();

  const [isCatalogLiked, setIsCatalogLiked] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displaySettings, setDisplaySettings] = useState(false);

  const handlePlaying = () => {
    if (!isPlayingSongCurrentPage && catalog != undefined) {
      setPlayingMusic(musicDetails);
    }
    setIsPlaying(!isPlaying);
  };

  const handleClickHeart = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    if (isCatalogLiked) {
      enqueueSnackbar(`${catalog.type.valueOf()} removed from your favourite`, {
        variant: "success",
      });
    } else {
      enqueueSnackbar(`${catalog.type.valueOf()} added to your favourite`, {
        variant: "success",
      });
    }
    setIsCatalogLiked(!isCatalogLiked);
  };

  const isPlayingSongCurrentPage = catalog.musics.find((m) => m.id == playingMusic.id) != undefined;

  return (
    <div className="relative flex flex-col rounded-lg bg-box-bg h-full w-full gap-4 py-8 px-4">
      <div className="flex flex-col sm:flex-row w-full lg:gap-10 md:gap-6 gap-4 pb-6 border-b border-gray-300">
        <img
          className="rounded-full lg:size-64 md:size-52 size-40"
          src={catalog.thumbnail}
          alt={catalog.title}
        />
        <div className="w-full sm:w-4/5 flex flex-col gap-2 text-dark-custom">
          <h1 className="lg:text-5xl md:text-3xl text-2xl font-bs font-semibold">
            {catalog.title}
          </h1>
          <span className="font-light">Since {formatTime(catalog.date_creation)}</span>
          <span className="flex flex-row-reverse sm:flex-row gap-4 mt-2 md:mt-auto w-full justify-start">
            <Icon
              className="lg:size-16 md:size-14 size-12 cursor-pointer fill-primary-orange hover:fill-brown-music-player-dot"
              iconName={isPlayingSongCurrentPage && isPlaying ? "pauseButton" : "playButton"}
              onClick={handlePlaying}
            />
            <Icon
              onClick={handleClickHeart}
              iconName={isCatalogLiked ? "heart-orange" : "heart-orange-empty"}
              className={`lg:size-16 md:size-14 size-12 cursor-pointer ${isAnimating ? "animate-pop" : ""}`}
            />
          </span>
        </div>
        <span id="settings-catalog">
          <Icon
            onClick={() => setDisplaySettings(!displaySettings)}
            iconName="ellipsis"
            className="absolute top-6 right-4 rotate-90 fill-dark-custom cursor-pointer md:size-8 size-6"
          />
        </span>
        {displaySettings && (
          <CatalogSettings catalog={catalog} onCloseSetting={() => setDisplaySettings(false)} />
        )}
      </div>
      <div className="flex flex-col gap-3">
        <div className={`flex flex-col`}>
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
              {catalog.owner.artist_name} haven't made any {catalog.type.valueOf()} yet
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
