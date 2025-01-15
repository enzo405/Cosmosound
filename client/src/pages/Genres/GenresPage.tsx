import { Icon } from "components/icons/Icon";
import { useMusic } from "hooks/useMusic";
import { DetailedCatalog, TypeCatalog } from "models/Catalog";
import { MusicDetails } from "models/Music";
import { Playlist } from "models/Playlist";
import { Artist } from "models/User";
import { enqueueSnackbar } from "notistack";
import CategoryTabs from "components/CategoryTabs";
import NotFoundErrorPage from "pages/errors/NotFoundErrorPage";
import { ReactElement, useEffect, useMemo } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import GenresService from "services/genresService";
import GenreContent from "./components/GenreContent";
import PageLayout from "components/PageLayout";
import UserService from "services/userService";
import HeartIcon from "components/icons/HeartIcon";
import { useUser } from "hooks/useUser";

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
    return <NotFoundErrorPage message="GENRE NOT FOUND" />;
  }

  const genreContent = useMemo(() => GenresService.getGenreContent(nameGenre), []);

  const { playingMusic, isPlaying, setIsPlaying, setPlayingMusic } = useMusic();
  const { user } = useUser();

  const [isGenreLiked, setIsGenreLiked] = useState<boolean>(
    user?.likedGenres.find((name) => name === nameGenre) !== undefined,
  );
  const [content, setContent] = useState<
    DetailedCatalog[] | MusicDetails[] | Playlist[] | Artist[]
  >([]);
  const [activeTab, setActiveTab] = useState(GenreTabs.ARTISTS);

  const handlePlaying = () => {
    setActiveTab(GenreTabs.MUSIC);
    loadContent(GenreTabs.MUSIC);
    if (genreContent.musics.length == 0) {
      enqueueSnackbar(`It seems this genre doesn't have any songs`, {
        variant: "warning",
      });
    } else {
      if (!isPlayingSongCurrentPage != undefined) {
        const firstMusicCatalog = genreContent.musics[0]?.catalog;
        setPlayingMusic({
          ...genreContent.musics[0],
          artist: genreContent.musics[0].artist,
          catalog: firstMusicCatalog!,
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleClickHeart = () => {
    if (isGenreLiked) {
      UserService.removeLike({ name: nameGenre });
      enqueueSnackbar(`${nameGenre} removed from your favourite genres`, {
        variant: "success",
      });
    } else {
      UserService.like({ name: nameGenre });
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
        setContent(genreContent.catalogs.filter((c) => c.type === TypeCatalog.ALBUM));
        break;
      case GenreTabs.MUSIC:
        setContent(genreContent.musics);
        break;
      case GenreTabs.EP:
        setContent(genreContent.catalogs.filter((c) => c.type === TypeCatalog.EP));
        break;
      case GenreTabs.SINGLE:
        setContent(genreContent.catalogs.filter((c) => c.type === TypeCatalog.SINGLE));
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
    <>
      <PageLayout
        content={
          <>
            <CategoryTabs tabs={GenreTabs} activeTab={activeTab} onTabSelect={handleTabChange} />
            <GenreContent content={content} activeTab={activeTab} />
          </>
        }
        subtitle={<></>}
        title={nameGenre}
        headerActions={
          <>
            <Icon
              className="lg:mm-size-16 md:mm-size-14 mm-size-12 cursor-pointer fill-primary-orange hover:fill-brown-music-player-dot"
              iconName={isPlayingSongCurrentPage && isPlaying ? "pauseButton" : "playButton"}
              onClick={handlePlaying}
            />
            <HeartIcon
              isLiked={isGenreLiked}
              handleClickHeart={handleClickHeart}
              className="lg:mm-size-16 md:mm-size-14 mm-size-12"
            />
          </>
        }
      />
    </>
  );
}
