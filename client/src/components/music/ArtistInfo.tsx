import { routesConfig } from "./../../config/app-config";
import { Artist } from "./../../models/User";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { displayPictureProfile } from "./../../utils/user";

interface ArtistInfoProps {
  artist: Artist;
  className?: string;
}

export default function ArtistInfo({ artist, className }: ArtistInfoProps): ReactElement {
  return (
    <Link
      className={`${className} cursor-pointer hover:underline flex flex-row gap-1 min-w-0 truncate`}
      to={routesConfig.artist.getParameter(artist.id)}>
      <img
        src={displayPictureProfile(artist.pictureProfile)}
        className="mm-size-5 rounded-full flex-shrink-0"
        alt={`${artist.artistName}`}
      />
      <span className="truncate select-none">{artist.artistName}</span>
    </Link>
  );
}
