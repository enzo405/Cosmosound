import { routesConfig } from "config/app-config";
import { Playlist } from "models/Playlist";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

interface PlaylistLinkProps {
  playlist: Playlist;
}

export default function PlaylistLink({ playlist }: PlaylistLinkProps): ReactElement {
  return (
    <Link
      className="hover:bg-slate-300 rounded-md p-2 w-full"
      to={routesConfig.playlist.getParameter(playlist.id)}>
      <span className="flex flex-row gap-2 items-center">
        <img
          className="mm-size-8 rounded-full"
          src={playlist.playlistThumbnail}
          alt={playlist.createdAt}
        />
        <span>{playlist.title}</span>
      </span>
    </Link>
  );
}
