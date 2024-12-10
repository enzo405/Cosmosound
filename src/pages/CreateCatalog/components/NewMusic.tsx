import { Genre } from "models/Music";
import { ReactElement, useState } from "react";
import { CreateMusicFormData } from "../CreateCatalogPage";
import { Icon } from "components/icons/Icon";
import { BiXCircle } from "react-icons/bi";

interface NewMusicProps {
  genres: Genre[];
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
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGenres = genres.filter((genre) =>
    genre.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelectGenre = (genreName: string) => {
    const updatedGenres = musicData.genres.includes(genreName)
      ? musicData.genres.filter((g) => g !== genreName)
      : musicData.genres.length < 3
        ? [...musicData.genres, genreName]
        : musicData.genres;

    handleGenreChange(index, updatedGenres);
  };

  return (
    <div
      key={index}
      className="relative w-full flex flex-col sm:flex-row items-center justify-between border gap-2 p-2 bg-tertio-orange rounded-md">
      <div className="flex flex-row w-min max-w-[45%] gap-3 lg:gap-1 items-center">
        <Icon iconName="music" className="mm-size-6 fill-dark-custom" />
        <div className="flex flex-col w-full min-w-0">
          <span className="font-medium text-sm inline-flex text-dark-custom truncate overflow-hidden whitespace-nowrap">
            <span
              className={`${musicData.title.length > 10 ? "lg:animate-scroll-text" : ""} inline-block whitespace-nowrap`}>
              {musicData.title}
            </span>
          </span>
        </div>
      </div>

      <div className="flex flex-row w-1/2 gap-2 items-center justify-end lg:justify-center">
        <div className="w-auto">
          <button
            type="button"
            onClick={() => setOpenGenreDropdown((prev) => !prev)}
            className="w-full text-sm text-dark-custom p-1.5 border rounded-md bg-white">
            {musicData.genres.length > 0 ? musicData.genres.join(", ") : "Select Genres"}
          </button>

          {openGenreDropdown && (
            <div className="absolute z-10 top-full right-0 bg-white border rounded-sm shadow-lg w-full max-h-60 overflow-y-auto overflow-x-hidden">
              <div className="p-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search genres..."
                  className="w-full p-2 border rounded-md text-sm"
                />
              </div>

              {filteredGenres.length > 0 ? (
                filteredGenres.map((genre) => (
                  <label
                    key={genre.name}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={musicData.genres.includes(genre.name)}
                      onChange={() => handleSelectGenre(genre.name)}
                      className="rounded text-primary-orange"
                    />
                    <span className="capitalize text-dark-custom">{genre.name}</span>
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
          onClick={handleRemoveMusic}
        />
      </div>
    </div>
  );
}
