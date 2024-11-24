import { routesConfig } from "config/app-config";
import { Artist } from "models/User";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface ArtistInfoProps {
  artist: Artist;
}

export default function ArtistInfo({ artist }: ArtistInfoProps): ReactElement {
  const navigate = useNavigate();

  return (
    <span
      className="cursor-pointer hover:underline flex flex-row gap-1 min-w-0 truncate"
      onClick={() => navigate(routesConfig.artist.getParameter(artist.id))}>
      <img
        src={artist.picture_profile}
        className="size-5 rounded-full flex-shrink-0"
        alt={`${artist.artist_name}'s picture profile`}
      />
      <span className="truncate">{artist.artist_name}</span>
    </span>
  );
}
