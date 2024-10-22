import { ReactElement } from "react";

export default function MusicPlayer({
  className,
}: React.HTMLAttributes<HTMLHRElement>): ReactElement {
  return (
    <div
      className={`bg-music-player-bg border-music-player-border flex justify-around h-28 shadow-music-player ${className}`}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
