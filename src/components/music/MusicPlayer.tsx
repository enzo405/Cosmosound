import { Icon } from "components/Icon";
import { ReactElement, useState } from "react";

export default function MusicPlayer({
  className,
}: React.HTMLAttributes<HTMLHRElement>): ReactElement {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleIsPlaying = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className={`bg-music-player-bg gap-8 px-24 border-music-player-border flex justify-around items-center h-32 shadow-music-player ${className}`}>
      <div className="flex flex-row gap-2 items-center w-[20%]">
        <span>
          <img
            className="rounded-lg w-12 h-12 min-w-12 min-h-12 select-none"
            src="./src/assets/img/temp/music/seasonIn.png"
            alt="music thumbnail"
          />
        </span>
        <span className="flex flex-col items-start w-full">
          <p className="font-bold text-black text-lg">Seasons In</p>
          <p className="text-music-player-artist font-semibold text-sm cursor-pointer hover:underline">
            James
          </p>
        </span>
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
          <span className="text-soft-gray text-xs">1:21</span>
          <span className="w-full h-1 flex relative items-center mx-2">
            <span className="bg-primary-orange h-1 w-3/5 rounded-s-md" />
            <span className="absolute left-[13.5em] w-3 h-3 rounded-full bg-primary-orange border-border-music-player-dot border-2" />
            <span className="bg-secondary-orange h-1 w-2/5 rounded-e-md" />
          </span>
          <span className="text-soft-gray text-xs">4:12</span>
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center w-[12%]">
        <Icon iconName="volume-high" className="w-6 h-6" />
        <span className="w-full h-[2px] flex relative items-center mx-1">
          <span className="bg-primary-orange h-[2px] w-3/5 rounded-s-md" />
          <span className="bg-secondary-orange h-[2px] w-2/5 rounded-e-md" />
        </span>
      </div>
    </div>
  );
}
