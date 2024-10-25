import { Icon } from "components/Icon";
import { ReactElement } from "react";

export default function MusicPlayer({
  className,
}: React.HTMLAttributes<HTMLHRElement>): ReactElement {
  return (
    <div
      className={`bg-music-player-bg gap-28 px-24 border-music-player-border flex justify-around items-center h-32 shadow-music-player ${className}`}>
      {/* Music Info */}
      <div className="flex flex-row gap-2">
        <span>
          <img
            className="rounded-lg w-16"
            src="./src/assets/img/temp/music/seasonIn.png"
            alt="music thumbnail"
          />
        </span>
        <span className="flex flex-col justify-center">
          <p className="font-bold text-black text-lg">Seasons In</p>
          <p className="text-music-player-artist font-semibold text-sm">James</p>
        </span>
      </div>
      <div className="flex flex-col gap-2 items-center w-full">
        <div className="flex flex-row items-center gap-3">
          <Icon iconName="left-lastsound" className="w-8 h-8" />
          <Icon iconName="playButton" className="w-10 h-10" />
          <Icon iconName="right-nextsound" className="w-8 h-8" />
        </div>
        <div className="flex flex-row gap-1 items-center w-2/3">
          <span className="text-soft-gray">1:21</span>
          <span className="w-full h-2 flex relative items-center mx-2">
            <span className="bg-primary-orange h-2 w-3/5 rounded-s-md" />
            <span className="absolute left-[31em] w-4 h-4 rounded-full bg-primary-orange border-border-music-player-dot border-2" />
            <span className="bg-secondary-orange h-2 w-2/5 rounded-e-md" />
          </span>
          <span className="text-soft-gray">4:12</span>
        </div>
      </div>
      <div></div>
    </div>
  );
}
