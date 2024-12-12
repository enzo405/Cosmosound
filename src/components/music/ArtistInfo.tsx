import { routesConfig } from "config/app-config";
import { Artist } from "models/User";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface ArtistInfoProps {
  artist: Artist;
  className?: string;
}

export default function ArtistInfo({ artist, className }: ArtistInfoProps): ReactElement {
  const navigate = useNavigate();

  return (
    <span
      className={`${className} cursor-pointer hover:underline flex flex-row gap-1 min-w-0 truncate`}
      onClick={() => navigate(routesConfig.artist.getParameter(artist.id.toString()))}>
      <img
        src={artist.pictureProfile}
        className="mm-size-5 rounded-full flex-shrink-0"
        alt={`${artist.artistName}`}
      />
      <span className="truncate select-none">{artist.artistName}</span>
    </span>
  );
}
