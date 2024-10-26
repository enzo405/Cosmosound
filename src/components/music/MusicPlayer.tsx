import { Icon } from "components/Icon";
import { useMusic } from "hooks/useMusic";
import { ReactElement, HTMLAttributes } from "react";
import MusicInfo from "./MusicInfo";
import TimeMusicSlider from "./TimeMusicSlider";
import SoundSlider from "./SoundSlider";

export default function MusicPlayer({ className }: HTMLAttributes<HTMLHRElement>): ReactElement {
  const { music, isPlaying, soundValue, time, setIsPlaying, setSoundValue, setTime } = useMusic();

  const handleIsPlaying = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className={`bg-music-player-bg gap-8 pr-24 pl-8 border-music-player-border flex justify-around items-center h-32 shadow-music-player ${className}`}>
      <div className="flex flex-row gap-2 items-center w-fit">
        <MusicInfo music={music} />
      </div>
      <div className="flex flex-col gap-2 items-center w-full">
        <div className="flex flex-row items-center gap-3">
          <Icon iconName="left-lastsound" className="w-8 h-8" />
          <Icon
            iconName={isPlaying ? "playButton" : "pauseButton"}
            className="w-10 h-10 cursor-pointer select-none"
            onClick={handleIsPlaying}
          />
          <Icon iconName="right-nextsound" className="w-8 h-8" />
        </div>
        <div className="flex flex-row gap-1 items-center w-2/3">
          <TimeMusicSlider time={time} setTime={setTime} duration={music.duration} />
        </div>
      </div>
      <div className="flex flex-row gap-1 items-center w-[12%]">
        <Icon
          iconName={soundValue === 0 ? "volume-muted" : "volume-high"}
          className="w-8 h-8"
          onClick={() =>
            setSoundValue(() => {
              return soundValue === 0 ? 50 : 0;
            })
          }
        />
        <SoundSlider sound={soundValue} setSound={setSoundValue} />
      </div>
    </div>
  );
}
