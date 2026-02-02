import { ReactElement, useEffect, useRef, useState } from "react";
import { CreateMusicFormData } from "../CreateCatalogPage";
import { Icon } from "./../../../components/icons/Icon";
import { BiXCircle } from "react-icons/bi";
import { useMusic } from "./../../../hooks/useMusic";

interface NewMusicProps {
  genres: string[];
  musicData: CreateMusicFormData;
  index: number;
  error?: string;
  handleGenreChange: (i: number, value: string[]) => void;
  handleRemoveMusic: () => void;
}

export default function NewMusic({
  genres,
  musicData,
  index,
  handleGenreChange,
  handleRemoveMusic,
}: NewMusicProps): ReactElement {
  const [openGenreDropdown, setOpenGenreDropdown] = useState(false);
  const { setCanPauseWithSpace } = useMusic();
  const [searchQuery, setSearchQuery] = useState("");
  const musicFieldRef = useRef<HTMLInputElement>(null);

  const dropdownSettingPosition =
    musicFieldRef?.current?.getBoundingClientRect()?.bottom! > window.innerHeight / 2;

  const filteredGenres = genres.filter((genre) =>
    genre.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelectGenre = (genreName: string) => {
    const updatedGenres = musicData.genres.includes(genreName)
      ? musicData.genres.filter((g) => g !== genreName)
      : musicData.genres.length < 3
        ? [...musicData.genres, genreName]
        : musicData.genres;

    handleGenreChange(index, updatedGenres);
  };

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      let id = `dropdown-genre`;
      const settings = document.getElementById(id);
      const target = event.target as Node;

      if (settings && !settings.contains(target)) {
        setOpenGenreDropdown(false);
      }
    };

    if (openGenreDropdown) {
      window.addEventListener("click", handleClickAway);
      document.body.classList.add("overflow-hidden");
    } else {
      window.removeEventListener("click", handleClickAway);
      document.body.classList.remove("overflow-hidden");
    }
  }, [openGenreDropdown]);

  const isGenreEmpty = musicData.genres.length == 0;

  return (
    <div
      ref={musicFieldRef}
      key={index}
      className="relative w-full flex flex-col sm:flex-row items-center justify-between border gap-2 p-2 bg-tertio-orange rounded-md">
      <div className="flex flex-row w-min max-w-[45%] gap-3 lg:gap-1 items-center">
        <Icon iconName="music" className="mm-size-6 fill-dark-custom" />
        <div className="flex flex-col w-full min-w-0">
          <span className="font-medium text-sm inline-flex text-dark-custom truncate overflow-hidden whitespace-nowrap">
            <span
              className={`${musicData.file.name.length > 10 ? "lg:animate-scroll-text" : ""} inline-block whitespace-nowrap`}>
              {musicData.file.name}
            </span>
          </span>
        </div>
      </div>

      <div className="flex flex-row w-1/2 gap-2 items-center justify-end lg:justify-center">
        <div className="w-auto">
          <button
            type="button"
            onClick={() => setOpenGenreDropdown((prev) => !prev)}
            className="w-full text-sm p-1.5 bg-white text-dark-custom border rounded-md">
            {isGenreEmpty ? "Select Genres" : musicData.genres.join(", ")}
          </button>

          {openGenreDropdown && (
            <div
              className={`absolute z-10 ${dropdownSettingPosition ? "bottom-full" : "top-full"} right-0 bg-white border rounded-sm shadow-lg w-full max-h-60 overflow-y-auto overflow-x-hidden`}>
              <div className="p-1">
                <input
                  type="text"
                  autoFocus
                  onFocus={() => setCanPauseWithSpace(false)}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search genres..."
                  className="w-full p-2 border rounded-md text-sm"
                />
              </div>

              {filteredGenres.length > 0 ? (
                filteredGenres.map((genre) => (
                  <label
                    key={genre}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer">
                    <input
                      type="checkbox"
                      onFocus={() => setCanPauseWithSpace(false)}
                      checked={musicData.genres.includes(genre)}
                      onChange={() => handleSelectGenre(genre)}
                      className="rounded text-primary-orange"
                    />
                    <span className="capitalize text-dark-custom">{genre}</span>
                  </label>
                ))
              ) : (
                <div className="p-2 text-sm text-gray-500">No genres found</div>
              )}
            </div>
          )}
        </div>
        <BiXCircle
          className="mm-size-6 fill-dark-custom cursor-pointer"
          onClick={() => {
            setOpenGenreDropdown(false);
            handleRemoveMusic();
          }}
        />
      </div>
    </div>
  );
}
