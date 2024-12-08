import { Icon } from "components/icons/Icon";
import { useMusic } from "hooks/useMusic";
import { ReactElement, HTMLAttributes } from "react";
import MusicInfo from "../../music/MusicInfo";
import TimeMusicSlider from "./TimeMusicSlider";
import SoundSlider from "./SoundSlider";
import { IconName } from "constants/iconName";
import { useScreenSize } from "hooks/useScreenSize";

export default function MusicPlayer({}: HTMLAttributes<HTMLHRElement>): ReactElement {
  const { playingMusic, isPlaying, soundValue, time, setIsPlaying, setSoundValue, setTime } =
    useMusic();
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

  return (
    <>
      {isMobile ? (
        <div className={`justify-around flex flex-col-reverse w-full gap-4 py-4 h-28`}>
          <div className="flex flex-row items-center w-full p-1 xsm:px-3">
            <div className="flex items-center flex-shrink-0 w-2/3 min-w-2/3 max-w-2/3">
              <MusicInfo music={playingMusic} />
            </div>
            <div className="flex gap-1 items-center flex-shrink-0 w-1/3 justify-end pr-2">
              <Icon
                iconName="previous-music"
                className="min-w-6 w-6 min-h-6 h-6 cursor-pointer fill-primary-orange hover:fill-brown-music-player-dot"
                onClick={handlePreviousMusic}
              />
              <Icon
                iconName={isPlaying ? "pauseButton" : "playButton"}
                className="size-8 cursor-pointer fill-primary-orange hover:fill-brown-music-player-dot"
                onClick={handleIsPlaying}
              />
              <Icon
                iconName="next-music"
                className="size-6 cursor-pointer fill-primary-orange hover:fill-brown-music-player-dot"
                onClick={handleNextMusic}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center w-full px-10 pt-2">
            <TimeMusicSlider time={time} setTime={setTime} duration={playingMusic.duration} />
          </div>
        </div>
      ) : (
        <div className="border-music-player-border justify-around items-center shadow-music-player flex w-full gap-4 xl:gap-8 px-2 lg:px-4 xl:px-8 h-[6.5rem]">
          <div className="flex flex-row gap-2 items-center h-full w-0 sm:w-[11rem] sm:min-w-[11rem] sm:max-w-[11rem] md:w-[14rem] md:min-w-[14rem] md:max-w-[14rem] lg:w-[16rem] lg:min-w-[16rem] lg:max-w-[16rem] xl:w-[18rem] xl:min-w-[18rem] xl:max-w-[18rem] 2xl:w-[20rem] 2xl:min-w-[20rem] 2xl:max-w-[20rem]">
            <MusicInfo music={playingMusic} />
          </div>
          <div className="flex flex-col gap-2 justify-center items-center h-full w-1/2 lg:w-full max-w-7xl">
            <div className="flex flex-row items-center gap-3">
              <Icon
                iconName="previous-music"
                className="md:size-8 size-6 cursor-pointer fill-primary-orange hover:fill-brown-music-player-dot"
                onClick={handlePreviousMusic}
              />
              <Icon
                iconName={isPlaying ? "pauseButton" : "playButton"}
                className="md:size-10 size-8 cursor-pointer fill-primary-orange hover:fill-brown-music-player-dot"
                onClick={handleIsPlaying}
              />
              <Icon
                iconName="next-music"
                className="md:size-8 size-6 cursor-pointer fill-primary-orange hover:fill-brown-music-player-dot"
                onClick={handleNextMusic}
              />
            </div>
            <div className="flex flex-row gap-1 items-center w-full lg:w-5/6">
              <TimeMusicSlider time={time} setTime={setTime} duration={playingMusic.duration} />
            </div>
          </div>
          <div className="flex flex-row w-1/4 lg:w-1/3 h-full justify-end">
            <div className="hidden lg:block h-full w-2/3"></div>
            <div
              className="flex flex-row gap-1 items-center w-auto max-w-28 lg:max-w-36"
              onWheel={onWheel}
              onMouseLeave={() => document.body.classList.remove("overflow-hidden")}
              onMouseEnter={() => document.body.classList.add("overflow-hidden")}>
              <Icon
                iconName={getSoundIcon()}
                className="size-5 fill-primary-orange cursor-pointer"
                onClick={() => setSoundValue(soundValue == 0 ? 50 : 0)}
              />
              <SoundSlider sound={soundValue} setSound={setSoundValue} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
