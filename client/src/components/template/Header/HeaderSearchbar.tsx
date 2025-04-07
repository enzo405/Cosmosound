import { useMusic } from "./../../../hooks/useMusic";
import { Icon } from "./../../../components/icons/Icon";
import { routesConfig } from "./../../../config/app-config";
import { useSearch } from "./../../../hooks/useSearch";
import { useEffect, useRef, useState, type ReactElement } from "react";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function HeaderSearchbar(): ReactElement {
  const [isFocused, setIsFocused] = useState(false);
  const { search, setSearch, debouncedValue, setIsSearchFocus } = useSearch();
  const { setCanPauseWithSpace } = useMusic();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (debouncedValue != "") {
      navigate(routesConfig.explore.path);
    }
  }, [debouncedValue]);

  useEffect(() => {
    setIsSearchFocus(isFocused);
    setCanPauseWithSpace(!isFocused);
  }, [isFocused]);

  return (
    <div className="w-3/4 mr-1 sm:w-1/2">
      <div className="relative" onClick={handleClick}>
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Icon iconName="magnifyingglass" className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
        </div>
        <span
          className={`flex flex-row items-center justify-between bg-white w-full p-1 sm:p-2 rounded-full border-[2px] 
            ${isFocused ? "border-tertio-orange" : "border-transparent"}`}>
          <label htmlFor="searchbar" className="sr-only">
            Searchbar input
          </label>
          <input
            ref={inputRef}
            autoFocus
            type="search"
            id="searchbar"
            className="w-full block p-0 xsm:p-1 ps-10 xsm:ps-10 text-base font-normal text-dark-custom tracking-wide outline-none rounded-full"
            placeholder="Search"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            aria-label="Searchbar value"
            aria-valuetext={search}
          />
          {search !== "" && (
            <IoIosClose onClick={() => setSearch("")} className="mm-size-8 cursor-pointer" />
          )}
        </span>
      </div>
    </div>
  );
}

export default HeaderSearchbar;
