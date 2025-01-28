import { Icon } from "./../../components/icons/Icon";
import { routesConfig } from "./../../config/app-config";
import { useMusic } from "./../../hooks/useMusic";
import { Music } from "./../../models/Music";
import { ReactElement, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDuration, formatTime } from "./../../utils/date";
import ArtistInfo from "./ArtistInfo";
import MusicSettings from "./../../components/settings/MusicSettings";
import { enqueueSnackbar } from "notistack";
import { Artist } from "./../../models/User";
import { Catalog } from "./../../models/Catalog";
import UserService from "./../../services/userService";
import HeartIcon from "./../../components/icons/HeartIcon";
import { useUser } from "./../../hooks/useUser";
import { displayPictureProfile } from "./../../utils/user";
import VerifiedIcon from "./../../components/icons/VerifiedIcon";

interface MusicItemProps {
  music: Music;
  artist: Artist;
  catalog: Catalog;
  showArtist?: boolean;
  showCatalog?: boolean;
  showCatalogThumbnail?: boolean;
  index?: number;
  handleDeleteFromPlaylist?: (music: Music) => void;
}

export default function MusicItem({
  music,
  artist,
  catalog,
  showArtist = true,
  showCatalog = true,
  showCatalogThumbnail = true,
  index,
  handleDeleteFromPlaylist,
}: MusicItemProps): ReactElement {
  const { user, toggleLike } = useUser();
  const { playingMusic, isPlaying, setIsPlaying, setPlayingMusic } = useMusic();
  const [displaySettings, setDisplaySettings] = useState<boolean>(false);
  const [displayPlay, setDisplayPlay] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(
    user?.likedMusics.find((id) => id == music.id) !== undefined,
  );
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const musicItemRef = useRef<HTMLInputElement>(null);

  const dropdownSettingPosition =
    musicItemRef?.current?.getBoundingClientRect()?.bottom! > window.innerHeight / 2; // Divided by 2 since the header + music player takes a lot of space

  const handleClickHeart = async () => {
    await UserService.toggleLike(music.id, "song")
      .then(() => {
        toggleLike(music.id, "song");
        if (isLiked) {
          enqueueSnackbar(`Song removed from your favourite songs`, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(`Song added to your favourite songs`, {
            variant: "success",
          });
        }
        setIsLiked(!isLiked);
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data.error, {
          variant: "error",
        });
      });
  };

  const handleClickSettings = () => {
    setDisplaySettings(!displaySettings);
  };

  const handlePlayMusic = (music: Music) => {
    if (isPlaying && isCurrentMusicPlaying) {
      setIsPlaying(false);
    } else {
      if (!isCurrentMusicPlaying) {
        setPlayingMusic({ ...music, artist, catalog });
      }
      setIsPlaying(true);
    }
  };

  const handleClickPlay = (music: Music) => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
    } else {
      const timeout = setTimeout(() => {
        handlePlayMusic(music);
        setClickTimeout(null);
      }, 250);
      setClickTimeout(timeout);
    }
  };

  const handleDoubleClickPlay = (music: Music) => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
    }
    handlePlayMusic(music);
  };

  const isCurrentMusicPlaying = music.id == playingMusic?.id;

  return (
    <div className="relative w-full" ref={musicItemRef}>
      <div
        className={`group flex flex-row w-full justify-between h-16 ${showCatalogThumbnail ? "md:h-[68px] lg:h-18" : "lg:h-18"} ${isCurrentMusicPlaying ? "bg-music-activ" : "hover:bg-music-hover"} rounded-xl`}>
        <div
          onDoubleClick={() => handleDoubleClickPlay(music)}
          className="flex flex-row flex-grow select-none justify-between xsm:pr-1 sm:pr-2 md:pr-4 lg:pr-36 cursor-pointer min-w-0">
          <div className="flex flex-row items-center w-full sm:max-w-80 sm:min-w-80 lg:min-w-[28rem] lg:max-w-[28rem] gap-1">
            <div
              onMouseEnter={() => setDisplayPlay(true)}
              onMouseLeave={() => setDisplayPlay(false)}
              className={`relative ml-1 p-0.5 ${showCatalogThumbnail ? "mm-size-14" : "mm-size-10"}`}>
              {showCatalogThumbnail ? (
                <img
                  className="rounded-xl aspect-square object-cover h-full"
                  src={displayPictureProfile(catalog.thumbnail)}
                  alt={`${music.title} ${catalog.title} ${artist.artistName}`}
                />
              ) : (
                <div
                  className="flex justify-center items-center h-full w-10"
                  onClick={() => handleClickPlay(music)}>
                  <span className="group-hover:hidden flex">{index}</span>
                  <Icon
                    iconName={isPlaying && isCurrentMusicPlaying ? "pauseButton" : "playButton"}
                    className="w-4/5 group-hover:block hidden rounded-full fill-primary-orange"
                  />
                </div>
              )}
              {displayPlay && showCatalogThumbnail && (
                <span
                  onClick={() => handleClickPlay(music)}
                  className="flex justify-center items-center h-full w-full absolute top-0 left-0 p-3">
                  <Icon
                    iconName={
                      isPlaying && isCurrentMusicPlaying ? "pauseButton-opek" : "playButton-opek"
                    }
                    className="z-10 rounded-full h-full w-full fill-white/80"
                  />
                </span>
              )}
            </div>
            <div className="flex flex-col xsm:gap-1 h-full max-w-full overflow-hidden items-start justify-center">
              <span className="text-base text-dark-custom flex gap-1 xsm:gap-2 items-center w-full">
                <span className="font-semibold text-sm xsm:font-normal xsm:text-base truncate">
                  {music.title}
                </span>
                {artist.isVerified && <VerifiedIcon className="size-[14px] xsm:size-[18px]" />}
              </span>
              <span className="w-full text-sm text-dark-grey font-semibold flex flex-row gap-1">
                {showArtist && <ArtistInfo artist={artist} className="min-w-fit" />}
                {showArtist && showCatalog && (
                  <span className="hidden lg:block flex-shrink-0">-</span>
                )}
                {showCatalog && (
                  <span
                    className="hidden lg:block cursor-pointer hover:underline truncate"
                    onClick={() => navigate(routesConfig.catalog.getParameter(catalog.id))}>
                    {catalog.title}
                  </span>
                )}
              </span>
            </div>
          </div>
          <div className="hidden xl:flex items-center max-w-36 min-w-36 justify-center font-light text-sm">
            {formatTime(music.createdAt)}
          </div>
          <div className="hidden lg:flex items-center w-10 justify-center font-light text-sm">
            {formatDuration(music.duration)}
          </div>
        </div>
        <div
          id={`music-item-actions-${music.id}`}
          className="relative flex flex-row shrink-0 items-center justify-center h-full w-auto gap-2 xsm:gap-3 pr-1 xsm:pr-2">
          <HeartIcon
            className="mm-size-6 sm:mm-size-7"
            isLiked={isLiked}
            handleClickHeart={handleClickHeart}
          />
          <Icon
            onClick={handleClickSettings}
            iconName="ellipsis"
            className="fill-dark-custom cursor-pointer mm-size-6 sm:mm-size-7"
          />
          {displaySettings && (
            <MusicSettings
              dropdownPosition={dropdownSettingPosition ? "top" : "bottom"}
              music={{ ...music, catalog }}
              onDeleteSong={() => navigate(routesConfig.catalogEdit.getParameter(catalog.id))}
              onCloseSetting={() => setDisplaySettings(false)}
              onAddToFav={handleClickHeart}
              onDeleteFromPlaylist={handleDeleteFromPlaylist}
              isFav={isLiked}
            />
          )}
        </div>
      </div>
    </div>
  );
}
