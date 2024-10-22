import { Icon } from "components/Icon";
import { type ReactElement } from "react";

function HeaderSearchbar(): ReactElement {
  return (
    <div className="w-2/3 mr-auto min-w-40 ">
      <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Icon iconName="magnifyingglass" className="w-5 h-5 ml-1" />
        </div>
        <span className="flex flex-row items-center justify-between bg-white w-full p-2 rounded-2xl">
          <input
            type="search"
            id="search"
            className="w-full block p-1 ps-10 xsm:ps-10 text-lg outline-none"
            placeholder="Search"
          />
          <Icon iconName="filter_searchbar" className="w-6 h-6 mr-2 cursor-pointer" />
        </span>
      </div>
    </div>
  );
}

export default HeaderSearchbar;
