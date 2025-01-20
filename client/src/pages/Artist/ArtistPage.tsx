import { Icon } from "components/icons/Icon";
import { useMusic } from "hooks/useMusic";
import { enqueueSnackbar } from "notistack";
import NotFoundErrorPage from "pages/errors/NotFoundErrorPage";
import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArtistService from "services/artistService";
import { formatTime } from "utils/date";
import CategoryTabs from "../../components/CategoryTabs";
import { Catalog, TypeCatalog } from "models/Catalog";
import { Music } from "models/Music";
import MusicItem from "components/music/MusicItem";
import Card from "components/cards/Card";
import { routesConfig } from "config/app-config";
import ArtistSettings from "components/settings/ArtistSettings";
import PageLayout from "components/PageLayout";
import UserService from "services/userService";
import HeartIcon from "components/icons/HeartIcon";
import { useUser } from "hooks/useUser";
import { displayPictureProfile } from "utils/user";
import MediaIcon from "components/icons/media/MediaIcon";
import { DetailedArtistInfo } from "models/User";

export enum ArtistTabs {
  MUSIC = "Songs",
  ALBUM = "Albums",
  EP = "EPs",
  SINGLE = "Singles",
}

export default function ArtistPage(): ReactElement {
  const { idArtist } = useParams();
  const { user } = useUser();
  const { playingMusic, isPlaying, setIsPlaying, setPlayingMusic } = useMusic();

  const [displaySettings, setDisplaySettings] = useState(false);
  const [content, setContent] = useState<Catalog[] | Music[]>([]);
  const [activeTab, setActiveTab] = useState(ArtistTabs.MUSIC);
  const [artist, setArtist] = useState<DetailedArtistInfo | undefined>(undefined);
  const [isArtistLiked, setIsArtistLiked] = useState<boolean>(
    user?.likedArtists.find((id) => id == artist?.id) !== undefined,
  );

  const loadContent = (selectedTab: ArtistTabs) => {
    switch (selectedTab) {
      case ArtistTabs.ALBUM:
        setContent(artist?.catalogs.filter((c) => c.type === TypeCatalog.ALBUM) || []);
        break;
      case ArtistTabs.MUSIC:
        setContent(getMusic(artist) || []);
        break;
      case ArtistTabs.EP:
        setContent(artist?.catalogs.filter((c) => c.type === TypeCatalog.EP) || []);
        break;
      case ArtistTabs.SINGLE:
        setContent(artist?.catalogs.filter((c) => c.type === TypeCatalog.SINGLE) || []);
        break;
    }
  };

  const getMusic = (artist: DetailedArtistInfo | undefined) => {
    return artist === undefined ? [] : artist.catalogs.map((c) => c.musics).flat();
  };

  useEffect(() => {
    const fetchArtist = async () => {
      await ArtistService.getArtistById(idArtist)
        .then((artist) => {
          setArtist(artist);
        })
        .catch((err) => {
          enqueueSnackbar({
            message: err.message,
            variant: "error",
          });
        });
    };
    fetchArtist();
  }, []);

  useEffect(() => {
    if (artist != undefined) {
      loadContent(ArtistTabs.MUSIC);
      setActiveTab(ArtistTabs.MUSIC);
    }
  }, [artist]);

  if (artist == undefined) {
    return <NotFoundErrorPage message="ARTIST NOT FOUND" />;
  }

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
    loadContent(selectedTab);
    setActiveTab(selectedTab);
  };

  const isPlayingSongCurrentPage =
    getMusic(artist).find((m) => m.id == playingMusic.id) != undefined;

  const handlePlaying = () => {
    loadContent(ArtistTabs.MUSIC);
    setActiveTab(ArtistTabs.MUSIC);
    if (!isPlayingSongCurrentPage && artist != undefined) {
      const firstCatalog = artist.catalogs[0];
      setPlayingMusic({
        ...firstCatalog.musics[0],
        catalog: firstCatalog,
        artist: artist,
      });
    }
    setIsPlaying(!isPlaying);
  };

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
      thumbnail={displayPictureProfile(artist.pictureProfile)}
      settingsComponent={
        <ArtistSettings artist={artist} onCloseSetting={() => setDisplaySettings(false)} />
      }
      title={artist.artistName}
      subtitle={
        <div className="flex flex-col gap-1">
          <span className="font-light">Member since {formatTime(artist.createdAt)}</span>
          <span className="font-light">{artist.followers} followers</span>
          <span className="flex flex-wrap gap-2 xsm:gap-3 items-center">
            {artist.socialMedia.map(({ link, media }) => (
              <a
                key={media}
                href={link}
                target="_blank"
                className="lg:mm-size-8 mm-size-7 items-center h-full flex">
                {<MediaIcon media={media} />}
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
          <div
            className={`flex ${activeTab == ArtistTabs.MUSIC ? "flex-col gap-1" : "flex-wrap gap-2"}`}>
            {content.length != 0 ? (
              activeTab == ArtistTabs.MUSIC ? (
                content.map((item) => {
                  return (
                    <MusicItem
                      key={item.id}
                      music={item as Music}
                      catalog={artist.catalogs.find((c) => c.musics.find((m) => m.id === item.id))!}
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
                      description={`${catalog.type.valueOf()} - ${artist.artistName}`}
                      thumbnail={displayPictureProfile(catalog.thumbnail)}
                      link={routesConfig.catalog.getParameter(catalog.id)}
                      defaultLiked={
                        user?.likedCatalogs.find((id) => id == catalog.id.toString()) !== undefined
                      }
                      onLike={(like) => onLikeCatalog(like, catalog)}
                    />
                  );
                })
              )
            ) : (
              <span className="text-dark-custom">
                {artist.artistName} haven't made any {activeTab.valueOf()} yet
              </span>
            )}
          </div>
        </div>
      }
    />
  );
}
