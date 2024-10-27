import React, { ReactElement } from "react";

interface SoundSliderProps {
  sound: number;
  setSound: React.Dispatch<React.SetStateAction<number>>;
}

export default function SoundSlider({ sound, setSound }: SoundSliderProps): ReactElement {
  const handleSoundChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSound(parseInt(event.target.value));
  };

  return (
    <div className="w-full flex items-center mx-2 relative">
      <input
        id="sound-slider"
        type="range"
        min="0"
        max="100"
        value={sound}
        onChange={handleSoundChange}
        className="cursor-pointer w-full h-1 appearance-none rounded-full"
      />

      <style>{`
        #sound-slider {
          -webkit-appearance: none;
          background: linear-gradient(
            to right,
            var(--color-primary-orange) ${sound}%,
            var(--color-secondary-orange) ${sound}%
          );
        }

        #sound-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 6px;
          height: 6px;
          background: var(--color-primary-orange);
          border: 2px solid var(--color-border-music-player-dot);
          border-radius: 50%;
          cursor: grab;
        }

        #sound-slider::-moz-range-thumb {
          width: 6px;
          height: 6px;
          background: var(--color-primary-orange);
          border: 2px solid var(--color-border-music-player-dot);
          border-radius: 50%;
          cursor: grab;
        }
      `}</style>
    </div>
  );
}
