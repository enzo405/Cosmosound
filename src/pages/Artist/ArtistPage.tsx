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
import CategoryTabs from "./components/CategoryTabs";
import { Catalog, TypeCatalog } from "models/Catalog";
import { Music } from "models/Music";
import MusicItem from "components/music/MusicItem";
import Card from "components/cards/Card";
import { routesConfig } from "config/app-config";
import ArtistSettings from "./components/ArtistSettings";

export enum ArtistTabs {
  MUSIC = "Songs",
  ALBUM = "Albums",
  EP = "EPs",
  SINGLE = "Singles",
}

export default function ArtistPage(): ReactElement {
  const { idArtist } = useParams();

  if (idArtist == undefined) {
    return <NotFoundErrorPage />;
  }

  const { playingMusic, isPlaying, setIsPlaying, setPlayingMusic } = useMusic();
  const artist = ArtistService.getArtistById(Number(idArtist));

  if (artist == undefined) {
    return <NotFoundErrorPage />;
  }

  const [isArtistLiked, setIsArtistLiked] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState(false);
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
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    if (isArtistLiked) {
      enqueueSnackbar(`Artist removed from your favourite artist`, {
        variant: "success",
      });
    } else {
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

  return (
    <div className="relative flex flex-col rounded-lg bg-box-bg h-full w-full gap-8 py-8 px-4">
      <div className="flex flex-col sm:flex-row w-full lg:gap-10 md:gap-6 gap-4">
        <img
          className="rounded-full lg:size-64 md:size-52 size-40"
          src={artist.picture_profile}
          alt={artist.artist_name}
        />
        <div className="w-full sm:w-4/5 flex flex-col gap-2 text-dark-custom">
          <h1 className="lg:text-5xl md:text-3xl text-2xl font-bs font-semibold">
            {artist.artist_name}
          </h1>
          <span className="font-light">Since {formatTime(artist.date_creation)}</span>
          <span className="font-light">{artist.followers} followers</span>
          <span className="flex flex-row gap-3 items-center">
            {artist.social_media.map(({ link, media }) => (
              <a
                key={media}
                href={link}
                target="_blank"
                className="lg:size-8 size-7 items-center h-full flex">
                {getMediaIcon(media)}
              </a>
            ))}
          </span>
          <span className="flex flex-row-reverse sm:flex-row gap-4 mt-2 md:mt-auto w-full justify-start">
            <Icon
              className="lg:size-16 md:size-14 size-12 cursor-pointer fill-primary-orange hover:fill-brown-music-player-dot"
              iconName={isPlayingSongCurrentPage && isPlaying ? "pauseButton" : "playButton"}
              onClick={handlePlaying}
            />
            <Icon
              onClick={handleClickHeart}
              iconName={isArtistLiked ? "heart-orange" : "heart-orange-empty"}
              className={`lg:size-16 md:size-14 size-12 cursor-pointer ${isAnimating ? "animate-pop" : ""}`}
            />
          </span>
        </div>
        <span id="settings-artist">
          <Icon
            onClick={() => setDisplaySettings(!displaySettings)}
            iconName="ellipsis"
            className="absolute top-6 right-4 rotate-90 fill-dark-custom cursor-pointer md:size-8 size-6"
          />
        </span>
        {displaySettings && (
          <ArtistSettings artist={artist} onCloseSetting={() => setDisplaySettings(false)} />
        )}
      </div>
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
    </div>
  );
}
