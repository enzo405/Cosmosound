import { ReactElement } from "react";
import { Filters } from "../ExplorePage";

interface FilterBoxProps {
  onFilterClick: (filter: Filters) => void;
  activeFilter: Filters;
}

export default function FilterBox({ onFilterClick, activeFilter }: FilterBoxProps): ReactElement {
  const filterEntries = Object.entries(Filters);

  const handleOnClick = (filter: Filters) => {
    onFilterClick?.(filter);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {filterEntries.map(([key, value]) => (
        <span
          key={key}
          className={`px-4 py-2 rounded-full cursor-pointer text-gray-800 select-none ${
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
