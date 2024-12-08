import { Icon } from "components/icons/Icon";
import { useMusic } from "hooks/useMusic";
import { Catalog, TypeCatalog } from "models/Catalog";
import { MusicDetails } from "models/Music";
import { Playlist } from "models/Playlist";
import { Artist } from "models/User";
import { enqueueSnackbar } from "notistack";
import CategoryTabs from "pages/Artist/components/CategoryTabs";
import NotFoundErrorPage from "pages/errors/NotFoundErrorPage";
import { ReactElement, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import GenresService from "services/genresService";
import GenreContent from "./components/GenreContent";

interface GenresPageProps {}

export enum GenreTabs {
  ARTISTS = "Artists",
  MUSIC = "Songs",
  ALBUM = "Albums",
  EP = "EPs",
  SINGLE = "Singles",
  PLAYLIST = "Playlists",
}

export default function GenresPage({}: GenresPageProps): ReactElement {
  const { nameGenre } = useParams();
  if (nameGenre == undefined) {
    return <NotFoundErrorPage />;
  }

  const genreContent = GenresService.getGenreContent(nameGenre);
  const { playingMusic, isPlaying, setIsPlaying, setPlayingMusic } = useMusic();

  const [isGenreLiked, setIsGenreLiked] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [content, setContent] = useState<Catalog[] | MusicDetails[] | Playlist[] | Artist[]>([]);
  const [activeTab, setActiveTab] = useState(GenreTabs.ARTISTS);

  const handlePlaying = () => {
    if (!isPlayingSongCurrentPage != undefined) {
      const firstMusicCatalog = genreContent.musics[0]?.catalog;
      setPlayingMusic({
        ...genreContent.musics[0],
        artist: genreContent.musics[0].artist,
        catalog: firstMusicCatalog!,
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleClickHeart = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    if (isGenreLiked) {
      enqueueSnackbar(`${nameGenre} removed from your favourite genres`, {
        variant: "success",
      });
    } else {
      enqueueSnackbar(`${nameGenre} added to your favourite genres`, {
        variant: "success",
      });
    }
    setIsGenreLiked(!isGenreLiked);
  };

  useEffect(() => {
    loadContent(activeTab);
  }, []);

  const handleTabChange = (selectedTab: GenreTabs) => {
    loadContent(selectedTab);
    setActiveTab(selectedTab);
  };

  const loadContent = (selectedTab: GenreTabs) => {
    switch (selectedTab) {
      case GenreTabs.ALBUM:
        setContent(genreContent.catalogs.filter((c) => c.type == TypeCatalog.ALBUM));
        break;
      case GenreTabs.MUSIC:
        setContent(genreContent.musics);
        break;
      case GenreTabs.EP:
        setContent(genreContent.catalogs.filter((c) => c.type == TypeCatalog.EP));
        break;
      case GenreTabs.SINGLE:
        setContent(genreContent.catalogs.filter((c) => c.type == TypeCatalog.SINGLE));
        break;
      case GenreTabs.PLAYLIST:
        setContent(genreContent.playlists);
        break;
      case GenreTabs.ARTISTS:
        setContent(genreContent.artists);
        break;
    }
  };

  const isPlayingSongCurrentPage =
    genreContent?.musics.find((m) => m.id == playingMusic.id) != undefined;

  return (
    <div className="relative flex flex-col rounded-lg bg-box-bg h-full w-full gap-8 py-8 px-4">
      <div className="flex flex-col sm:flex-row w-full lg:gap-10 md:gap-6 gap-4">
        <div className="w-full flex flex-row gap-6 text-dark-custom items-center">
          <h1 className="sm:text-6xl text-4xl font-bs font-semibold max-w-50% truncate">
            {nameGenre}
          </h1>
          <span className="flex flex-row-reverse sm:flex-row gap-4 mt-2 md:mt-auto justify-start">
            <Icon
              className="lg:size-16 md:size-14 size-12 cursor-pointer fill-primary-orange hover:fill-brown-music-player-dot"
              iconName={isPlayingSongCurrentPage && isPlaying ? "pauseButton" : "playButton"}
              onClick={handlePlaying}
            />
            <Icon
              onClick={handleClickHeart}
              iconName={isGenreLiked ? "heart-orange" : "heart-orange-empty"}
              className={`lg:size-16 md:size-14 size-12 cursor-pointer ${isAnimating ? "animate-pop" : ""}`}
            />
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <CategoryTabs tabs={GenreTabs} activeTab={activeTab} onTabSelect={handleTabChange} />
        <GenreContent content={content} activeTab={activeTab} />
      </div>
    </div>
  );
}
