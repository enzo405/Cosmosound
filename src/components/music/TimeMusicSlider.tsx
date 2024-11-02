import React, { ReactElement } from "react";

interface TimeMusicSliderProps {
  time: number;
  duration: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

export default function TimeMusicSlider({
  time,
  duration,
  setTime,
}: TimeMusicSliderProps): ReactElement {
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(parseInt(event.target.value));
  };

  const stringifyTime = (timeInSeconds: number): string => {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="w-full flex items-center mx-2 relative">
      <span className="mr-2 text-soft-gray text-sm font-medium">{stringifyTime(time)}</span>
      <input
        id="music-slider"
        type="range"
        min="0"
        max={duration}
        value={time}
        onChange={handleTimeChange}
        className="cursor-pointer w-full h-1 rounded-full appearance-none [&::-moz-range-thumb]:appearance-none [&::-webkit-slider-thumb]:appearance-none"
      />
      <span className="ml-2 text-soft-gray text-sm font-medium">{stringifyTime(duration)}</span>

      <style>{`
        #music-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          background: linear-gradient(to right, var(--color-primary-orange) ${(time * 100) / duration}%, var(--color-secondary-orange) ${(time * 100) / duration}%);
          border-radius: 2px;
        }

        #music-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 10px;
          height: 10px;
          background: var(--color-primary-orange);
          border: 2px solid var(--color-brown-music-player-dot);
          border-radius: 50%;
          cursor: grab;
        }

        #music-slider::-moz-range-thumb {
          width: 10px;
          height: 10px;
          background: var(--color-primary-orange);
          border: 2px solid var(--color-brown-music-player-dot);
          border-radius: 50%;
          cursor: grab;
        }`}</style>
    </div>
  );
}
