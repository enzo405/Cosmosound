import { Icon } from "components/icons/Icon";
import { useRef, useState, type ReactElement } from "react";
import { IoIosClose } from "react-icons/io";

function HeaderSearchbar(): ReactElement {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="w-3/4 mr-1 sm:w-1/2 sm:mr-auto">
      <div className="relative" onClick={handleClick}>
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Icon iconName="magnifyingglass" className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
        </div>
        <span
          className={`flex flex-row items-center justify-between bg-white w-full p-1 sm:p-2 rounded-full border-[3px] 
            ${isFocused ? "border-soft-beige" : "border-transparent"}`}>
          <label htmlFor="searchbar" className="sr-only">
            Searchbar input
          </label>
          <input
            ref={inputRef}
            autoFocus
            type="search"
            id="searchbar"
            className="w-full block p-0 xsm:p-1 ps-10 xsm:ps-10 text-base font-normal text-dark-custom tracking-wide outline-none"
            placeholder="Search"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            aria-label="Searchbar value"
            aria-valuetext={searchValue}
          />
          {searchValue !== "" && (
            <IoIosClose onClick={() => setSearchValue("")} className="w-8 h-8 cursor-pointer" />
          )}
        </span>
      </div>
    </div>
  );
}

export default HeaderSearchbar;
