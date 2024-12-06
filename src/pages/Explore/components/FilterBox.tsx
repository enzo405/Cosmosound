import { ReactElement, useState } from "react";

interface FilterBoxProps {
  onFilterClick?: (filter: Filters) => void;
}

export enum Filters {
  ALL = "All",
  ARTISTS = "Artists",
  MUSICS = "Musics",
  PLAYLIST = "Playlists",
  EP = "EPs",
  ALBUM = "Albums",
  SINGLE = "Singles",
}

export default function FilterBox({ onFilterClick }: FilterBoxProps): ReactElement {
  const filterEntries = Object.entries(Filters);
  const [activeFilter, setActiveFilter] = useState<Filters>(Filters.ALL);

  const sharedClasses = "px-4 py-2 rounded-full cursor-pointer text-gray-800";

  const handleOnClick = (filter: Filters) => {
    onFilterClick?.(filter);
    setActiveFilter(filter);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {filterEntries.map(([key, value]) => (
        <span
          key={key}
          className={`${sharedClasses} ${
            activeFilter === value ? "bg-gray-400" : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => handleOnClick(value)}
          role="button"
          aria-pressed={activeFilter === value}>
          {value}
        </span>
      ))}
    </div>
  );
}
