import { Icon } from "components/icons/Icon";
import { MouseEvent, ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  thumbnail: string;
  title: string;
  description: string;
  link: string;
  className?: string;
  onLike: (like: boolean) => void;
}

export default function Card({
  thumbnail,
  title,
  description,
  link,
  className = "",
  onLike,
}: CardProps): ReactElement {
  const navigate = useNavigate();
  const [displayLikeBtn, setDisplayLikeBtn] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleOnClick = (event: MouseEvent) => {
    let likeBtn = document.getElementById("likeBtn");
    const target = event.target as Node;

    if (!likeBtn?.contains(target)) {
      navigate(link);
    }
  };

  const handleClickHeart = () => {
    onLike(isLiked);
    setIsLiked(!isLiked);
  };

  return (
    <div
      onMouseEnter={() => setDisplayLikeBtn(true)}
      onMouseLeave={() => setDisplayLikeBtn(false)}
      onClick={(e) => handleOnClick(e)}
      className={`relative flex flex-col items-center group cursor-pointer min-w-36 max-w-36 sm:min-w-40 sm:max-w-40 min-h-44 max-h-44 sm:min-h-52 sm:max-h-52 border border-dark-glassy rounded-2xl p-2 gap-2 ${className}`}>
      <div className="w-full flex flex-row justify-center">
        <img
          className="h-full w-[95%] rounded-lg object-contain"
          src={thumbnail}
          alt={`${title} ${description}`}
        />
      </div>
      <div className="h-2/6 flex flex-col cursor-pointer w-full ml-4">
        <div className="text-sm font-medium truncate">{title}</div>
        <div className="text-xs text-gray-500 truncate">{description}</div>
      </div>
      {displayLikeBtn && (
        <div id="likeBtn" className="z-10 absolute bottom-1 right-1">
          <Icon
            className="size-6"
            iconName={isLiked ? "heart-orange-empty" : "heart-orange"}
            onClick={handleClickHeart}
          />
        </div>
      )}
    </div>
  );
}
