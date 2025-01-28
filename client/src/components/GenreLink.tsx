import { routesConfig } from "./../config/app-config";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

interface GenreLinkProps {
  genre: string;
}

export default function GenreLink({ genre }: GenreLinkProps): ReactElement {
  return (
    <Link
      className="px-3 py-1 bg-white-orange hover:bg-primary-orange text-dark-custom text-sm rounded-full truncate"
      to={routesConfig.genres.getParameter(genre)}>
      {genre}
    </Link>
  );
}
