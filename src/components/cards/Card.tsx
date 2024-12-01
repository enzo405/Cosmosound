import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  thumbnail: string;
  title: string;
  description: string;
  link: string;
  className?: string;
}

export default function Card({
  thumbnail,
  title,
  description,
  link,
  className = "",
}: CardProps): ReactElement {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(link)}
      className={`group cursor-pointer min-h-44 min-w-36 sm:min-h-52 sm:min-w-44 max-h-44 max-w-36 sm:max-h-52 sm:max-w-44 border border-dark-glassy rounded-2xl p-2 sm:p-4 flex flex-col gap-2 ${className}`}>
      <img
        className="h-full w-full rounded-lg object-cover"
        src={thumbnail}
        alt={`${title} ${description}`}
      />
      <div className="h-2/6 overflow-hidden cursor-pointer">
        <div className="group-hover:underline text-sm font-medium truncate">{title}</div>
        <div className="group-hover:underline text-xs text-gray-500 truncate">{description}</div>
      </div>
    </div>
  );
}
