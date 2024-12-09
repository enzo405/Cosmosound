import { Icon } from "components/icons/Icon";
import AppleMusicIcon from "components/icons/media/AppleMusicIcon";
import InstagramIcon from "components/icons/media/InstagramIcon";
import SpotifyIcon from "components/icons/media/SpotifyIcon";
import XIcon from "components/icons/media/XIcon";
import YoutubeMusicIcon from "components/icons/media/YoutubeMusicIcon";
import { useMusic } from "hooks/useMusic";
import { Media } from "models/User";
import { enqueueSnackbar } from "notistack";
import NotFoundErrorPage from "pages/errors/NotFoundErrorPage";
import { ReactElement, useState } from "react";
import { useParams } from "react-router-dom";
import ArtistService from "services/artistService";
import { formatTime } from "utils/date";
import CategoryTabs from "../../components/CategoryTabs";
import { Catalog, TypeCatalog } from "models/Catalog";
import { Music } from "models/Music";
import MusicItem from "components/music/MusicItem";
import Card from "components/cards/Card";
import { routesConfig } from "config/app-config";
import ArtistSettings from "./components/ArtistSettings";
import PageLayout from "components/PageLayout";
import UserService from "services/userService";
import HeartIcon from "components/icons/HeartIcon";

export enum ArtistTabs {
  MUSIC = "Songs",
  ALBUM = "Albums",
  EP = "EPs",
  SINGLE = "Singles",
}

export default function ArtistPage(): ReactElement {
  const { idArtist } = useParams();
  const { playingMusic, isPlaying, setIsPlaying, setPlayingMusic } = useMusic();
  const artist = ArtistService.getArtistById(Number(idArtist));

  if (artist == undefined) {
    return <NotFoundErrorPage />;
  }

  const [isArtistLiked, setIsArtistLiked] = useState<boolean>(false);
  const [displaySettings, setDisplaySettings] = useState(false);
  const [content, setContent] = useState<Catalog[] | Music[]>(artist.musics);
  const [activeTab, setActiveTab] = useState(ArtistTabs.MUSIC);

  const getMediaIcon = (media: Media): ReactElement => {
    switch (media) {
      case Media.YTB_MUSIC:
        return <YoutubeMusicIcon />;
      case Media.X:
        return <XIcon />;
      case Media.APPLE_MUSIC:
        return <AppleMusicIcon />;
      case Media.SPOTIFY:
        return <SpotifyIcon />;
      case Media.INSTAGRAM:
        return <InstagramIcon />;
    }
  };

  const handlePlaying = () => {
    if (!isPlayingSongCurrentPage && artist != undefined) {
      const firstMusicCatalog = artist.musics.find((m) => m.id == artist.musics[0].id)?.catalog;
      setPlayingMusic({ ...artist.musics[0], artist, catalog: firstMusicCatalog! });
    }
    setIsPlaying(!isPlaying);
  };

  const handleClickHeart = () => {
    if (isArtistLiked) {
      UserService.removeLike(artist);
      enqueueSnackbar(`Artist removed from your favourite artist`, {
        variant: "success",
      });
    } else {
      UserService.like(artist);
      enqueueSnackbar(`Artist added to your favourite artists`, {
        variant: "success",
      });
    }
    setIsArtistLiked(!isArtistLiked);
  };

  const handleTabChange = (selectedTab: ArtistTabs) => {
    setActiveTab(selectedTab);
    switch (selectedTab) {
      case ArtistTabs.ALBUM:
        setContent(artist.catalogs.filter((c) => c.type == TypeCatalog.ALBUM));
        break;
      case ArtistTabs.MUSIC:
        setContent(artist.musics);
        break;
      case ArtistTabs.EP:
        setContent(artist.catalogs.filter((c) => c.type == TypeCatalog.EP));
        break;
      case ArtistTabs.SINGLE:
        setContent(artist.catalogs.filter((c) => c.type == TypeCatalog.SINGLE));
        break;
    }
  };

  const isPlayingSongCurrentPage = artist?.musics.find((m) => m.id == playingMusic.id) != undefined;

  const onLikeCatalog = (like: boolean, catalog: Catalog) => {
    if (like) {
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
  };

  return (
    <PageLayout
      thumbnail={artist.picture_profile}
      settingsComponent={
        <ArtistSettings artist={artist} onCloseSetting={() => setDisplaySettings(false)} />
      }
      title={artist.artist_name}
      subtitle={
        <div className="flex flex-col gap-1">
          <span className="font-light">Member since {formatTime(artist.date_creation)}</span>
          <span className="font-light">{artist.followers} followers</span>
          <span className="flex flex-wrap gap-2 xsm:gap-3 items-center">
            {artist.social_media.map(({ link, media }) => (
              <a
                key={media}
                href={link}
                target="_blank"
                className="lg:mm-size-8 mm-size-7 items-center h-full flex">
                {getMediaIcon(media)}
              </a>
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
            isLiked={isArtistLiked}
            handleClickHeart={handleClickHeart}
            className="lg:mm-size-16 md:mm-size-14 mm-size-12"
          />
        </>
      }
      onPageActionClick={() => setDisplaySettings(!displaySettings)}
      content={
        <div className="flex flex-col gap-3">
          <CategoryTabs tabs={ArtistTabs} activeTab={activeTab} onTabSelect={handleTabChange} />
          <div className={`flex ${activeTab == ArtistTabs.MUSIC ? "flex-col" : "flex-wrap gap-2"}`}>
            {content.length != 0 ? (
              activeTab == ArtistTabs.MUSIC ? (
                content.map((item) => {
                  return (
                    <MusicItem
                      key={item.id}
                      music={item as Music}
                      catalog={artist.musics.find((m) => m.id == item.id)?.catalog!}
                      artist={artist}
                      showArtist={false}
                    />
                  );
                })
              ) : (
                content.map((item) => {
                  const catalog = item as Catalog;
                  return (
                    <Card
                      key={catalog.id}
                      title={catalog.title}
                      description={`${TypeCatalog[catalog.type]} - ${catalog.owner.artist_name}`}
                      thumbnail={catalog.thumbnail}
                      link={routesConfig.catalog.getParameter(catalog.id)}
                      onLike={(like) => onLikeCatalog(like, catalog)}
                    />
                  );
                })
              )
            ) : (
              <span className="text-dark-custom">
                {artist.artist_name} haven't made any {activeTab.valueOf()} yet
              </span>
            )}
          </div>
        </div>
      }
    />
  );
}
