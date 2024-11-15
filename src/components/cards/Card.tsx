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
  const cardStyle = "border border-dark-glassy rounded-2xl p-4 flex flex-col gap-2";

  return (
    <div
      onClick={() => navigate(link)}
      className={`group cursor-pointer h-52 w-44 min-h-52 min-w-44 max-h-52 max-w-44 ${cardStyle} ${className}`}>
      <img className="h-full w-full rounded-lg object-cover" src={thumbnail} alt={title} />
      <div className="h-2/6 overflow-hidden cursor-pointer">
        <div className="group-hover:underline text-sm font-medium truncate">{title}</div>
        <div className="group-hover:underline text-xs text-gray-500 truncate">{description}</div>
      </div>
    </div>
  );
}
