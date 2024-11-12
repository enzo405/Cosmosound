import { Icon } from "components/icons/Icon";
import { useMusic } from "hooks/useMusic";
import { ReactElement, HTMLAttributes } from "react";
import MusicInfo from "./MusicInfo";
import TimeMusicSlider from "./TimeMusicSlider";
import SoundSlider from "./SoundSlider";
import { IconName } from "constants/iconName";
import { useScreenSize } from "hooks/useScreenSize";

export default function MusicPlayer({}: HTMLAttributes<HTMLHRElement>): ReactElement {
  const { music, isPlaying, soundValue, time, setIsPlaying, setSoundValue, setTime } = useMusic();
  const isMobile = useScreenSize();

  const handleIsPlaying = () => setIsPlaying(!isPlaying);
  const handleNextMusic = () => {};
  const handlePreviousMusic = () => {};

  const getSoundIcon = (): IconName => {
    return soundValue > 0 ? (soundValue > 50 ? "volume-high" : "volume-low") : "volume-muted";
  };

  const onWheel = (event: React.WheelEvent<HTMLInputElement>) => {
    event.preventDefault();
    const step = event.deltaY > 0 ? -10 : 10;
    setSoundValue(Math.max(0, Math.min(100, soundValue + step)));
  };

  const defaultStyleParent =
    "bg-music-player-bg border-music-player-border justify-around items-center shadow-music-player";

  return (
    <>
      {isMobile ? (
        <div className={`${defaultStyleParent} flex flex-col-reverse w-full gap-4 py-4 h-28`}>
          {/* Mobile Music Player */}
          <div className="flex flex-row items-center w-full p-1 xsm:px-3">
            <div className="flex items-center flex-shrink-0 w-2/3">
              <MusicInfo music={music} />
            </div>
            <div className="flex gap-1 items-center flex-shrink-0 w-1/3 justify-end pr-2">
              <Icon
                iconName="previous-music"
                className="min-w-6 w-6 min-h-6 h-6 cursor-pointer fill-primary-orange hover:fill-brown-music-player-dot"
                onClick={handlePreviousMusic}
              />
              <Icon
                iconName={isPlaying ? "playButton" : "pauseButton"}
                className="min-w-8 w-8 min-h-8 h-8 cursor-pointer fill-primary-orange hover:fill-brown-music-player-dot"
                onClick={handleIsPlaying}
              />
              <Icon
                iconName="next-music"
                className="min-w-6 w-6 min-h-6 h-6 cursor-pointer fill-primary-orange hover:fill-brown-music-player-dot"
                onClick={handleNextMusic}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center w-full px-10 pt-2">
            <TimeMusicSlider time={time} setTime={setTime} duration={music.duration} />
          </div>
        </div>
      ) : (
        <div
          className={`${defaultStyleParent} hidden sm:flex w-full gap-4 xl:gap-8 pr-2 pl-2 lg:pr-12 xl:pr-24 xl:pl-8 h-32`}>
          {/* Desktop Music Player */}
          <div className="flex flex-row gap-2 items-center w-fit">
            <MusicInfo music={music} />
          </div>
          <div className="flex flex-col gap-2 items-center w-fit lg:w-full">
            <div className="flex flex-row items-center gap-3">
              <Icon
                iconName="previous-music"
                className="md:w-8 md:h-8 w-6 h-6 cursor-pointer fill-primary-orange hover:fill-brown-music-player-dot"
                onClick={handlePreviousMusic}
              />
              <Icon
                iconName={isPlaying ? "playButton" : "pauseButton"}
                className="md:w-10 md:h-10 w-8 h-8 cursor-pointer fill-primary-orange hover:fill-brown-music-player-dot"
                onClick={handleIsPlaying}
              />
              <Icon
                iconName="next-music"
                className="md:w-8 md:h-8 w-6 h-6 cursor-pointer fill-primary-orange hover:fill-brown-music-player-dot"
                onClick={handleNextMusic}
              />
            </div>
            <div className="flex flex-row gap-1 items-center w-full lg:w-2/3">
              <TimeMusicSlider time={time} setTime={setTime} duration={music.duration} />
            </div>
          </div>
          <div className="flex flex-row gap-1 items-center w-[12%]" onWheel={onWheel}>
            <Icon
              iconName={getSoundIcon()}
              className="min-h-5 min-w-5 w-5 h-5 fill-primary-orange cursor-pointer"
              onClick={() => setSoundValue(soundValue === 0 ? 50 : 0)}
            />
            <SoundSlider sound={soundValue} setSound={setSoundValue} />
          </div>
        </div>
      )}
    </>
  );
}
