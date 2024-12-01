import Divider from "components/Divider";
import { Icon } from "components/icons/Icon";
import { Playlist } from "models/Playlist";
import { ReactElement, useRef, useState } from "react";
import PlaylistService from "services/playlistService";

interface SelectPlaylistProps {
  handleAddToPlaylist: (playlist: Playlist) => void;
  closeSettings: () => void;
}

export default function SelectPlaylist({
  handleAddToPlaylist,
  closeSettings,
}: SelectPlaylistProps): ReactElement {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClickPlaylist = (playlist: Playlist) => {
    handleAddToPlaylist(playlist);
    closeSettings();
  };

  const playlists = PlaylistService.getMyPlaylist();

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="absolute p-1 min-w-52 gap-1 flex flex-col bg-white rounded-lg right-full -top-0 mr-1">
      <div className="relative" onClick={handleClick}>
        <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none">
          <Icon iconName="magnifyingglass" className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
        </div>
        <span className="flex flex-row items-center justify-between w-full p-1 rounded-full">
          <label htmlFor="searchbar" className="sr-only">
            Searchbar input
          </label>
          <input
            ref={inputRef}
            autoFocus
            type="search"
            id="searchbar"
            className="w-full bg-slate-200 p-1 ps-8 rounded-md font-normal text-dark-custom tracking-wide outline-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search playlists..."
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            aria-label="Searchbar value"
            aria-valuetext={searchTerm}
          />
        </span>
      </div>
      <Divider className="my-1" />
      <div className="flex flex-col max-h-60 overflow-y-auto">
        {filteredPlaylists.map((p) => (
          <span
            key={p.id}
            onClick={() => handleClickPlaylist(p)}
            className="flex flex-row gap-2 p-0.5 items-center hover:bg-gray-200 cursor-pointer">
            <img
              className="size-7 rounded-md"
              src={p.musics[0]?.catalog.thumbnail}
              alt={`${p.title} thumbnail`}
            />
            <span className="truncate">{p.title}</span>
          </span>
        ))}
        {filteredPlaylists.length === 0 && (
          <span className="text-gray-500 p-1 text-sm">No playlists found</span>
        )}
      </div>
    </div>
  );
}
