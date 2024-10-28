import { Icon } from "components/Icon";
import { useMusic } from "hooks/useMusic";
import { ReactElement, HTMLAttributes } from "react";
import MusicInfo from "./MusicInfo";
import TimeMusicSlider from "./TimeMusicSlider";
import SoundSlider from "./SoundSlider";

export default function MusicPlayer({}: HTMLAttributes<HTMLHRElement>): ReactElement {
  const { music, isPlaying, soundValue, time, setIsPlaying, setSoundValue, setTime } = useMusic();

  const handleIsPlaying = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextMusic = () => {
    // play next music
  };

  const handlePreviousMusic = () => {
    // play previous music
  };

  const defaultStyleParent =
    "bg-music-player-bg border-music-player-border justify-around items-center shadow-music-player";

  return (
    <>
      {/* Music Player for Desktop */}
      <div
        className={`${defaultStyleParent} hidden sm:flex w-full gap-4 lg:gap-8 pr-2 pl-2 lg:pr-24 lg:pl-8 h-32`}>
        <div className="flex flex-row gap-2 items-center w-fit">
          <MusicInfo music={music} />
        </div>
        <div className="flex flex-col gap-2 items-center w-fit lg:w-full">
          <div className="flex flex-row items-center gap-3">
            <Icon
              iconName="left-lastmusic"
              className="md:w-8 md:h-8 w-6 h-6 cursor-pointer"
              onClick={handlePreviousMusic}
            />
            <Icon
              iconName={isPlaying ? "playButton" : "pauseButton"}
              className="md:w-10 md:h-10 w-8 h-8 cursor-pointer select-none"
              onClick={handleIsPlaying}
            />
            <Icon
              iconName="right-nextmusic"
              className="md:w-8 md:h-8 w-6 h-6 cursor-pointer"
              onClick={handleNextMusic}
            />
          </div>
          <div className="flex flex-row gap-1 items-center w-full lg:w-2/3">
            <TimeMusicSlider time={time} setTime={setTime} duration={music.duration} />
          </div>
        </div>
        <div className="flex flex-row gap-1 items-center w-[12%]">
          <Icon
            iconName={soundValue === 0 ? "volume-muted" : "volume-high"}
            className="md:w-8 md:h-8 min-h-6 min-w-6 w-6 h-6"
            onClick={() =>
              setSoundValue(() => {
                return soundValue === 0 ? 50 : 0;
              })
            }
          />
          <SoundSlider sound={soundValue} setSound={setSoundValue} />
        </div>
      </div>
      {/* Music Player for Mobile */}
      <div
        className={`${defaultStyleParent} flex flex-col-reverse sm:hidden w-full gap-4 py-4 h-28`}>
        <div className="flex flex-row items-center w-full p-1 xsm:px-3">
          <div className="flex items-center flex-shrink-0 w-2/3">
            <MusicInfo music={music} />
          </div>
          <div className="flex gap-1 items-center flex-shrink-0 w-1/3 justify-end">
            <Icon
              iconName="left-lastmusic"
              className="min-w-6 w-6 min-h-6 h-6 cursor-pointer"
              onClick={handlePreviousMusic}
            />
            <Icon
              iconName={isPlaying ? "playButton" : "pauseButton"}
              className="min-w-8 w-8 min-h-8 h-8 cursor-pointer select-none"
              onClick={handleIsPlaying}
            />
            <Icon
              iconName="right-nextmusic"
              className="min-w-6 w-6 min-h-6 h-6 cursor-pointer"
              onClick={handleNextMusic}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center w-full px-10 pt-2">
          <TimeMusicSlider time={time} setTime={setTime} duration={music.duration} />
        </div>
      </div>
    </>
  );
}
