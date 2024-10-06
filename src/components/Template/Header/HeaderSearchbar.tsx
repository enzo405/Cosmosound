import { type ReactElement } from "react";

function HeaderSearchbar(): ReactElement {
  return (
    <div className="flex flex-col mr-auto">
      <input
        type="search"
        id="default-search"
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-yellow-100"
        placeholder="Search Music"
      />
    </div>
  );
}

export default HeaderSearchbar;
