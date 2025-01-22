import HeartIcon from "components/icons/HeartIcon";
import { MouseEvent, ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SmallCardProps {
  title: string;
  link: string;
  defaultLiked: boolean;
  className?: string;
  onLike: (like: boolean) => Promise<boolean>;
}

export default function SmallCard({
  title,
  link,
  defaultLiked,
  className = "",
  onLike,
}: SmallCardProps): ReactElement {
  const navigate = useNavigate();
  const [displayLikeBtn, setDisplayLikeBtn] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(defaultLiked);

  const handleOnClick = (event: MouseEvent) => {
    let likeBtn = document.getElementById("likeBtn");
    const target = event.target as Node;

    if (!likeBtn?.contains(target)) {
      navigate(link);
    }
  };

  const handleClickHeart = async () => {
    if (await onLike(isLiked)) {
      setIsLiked(!isLiked);
    }
  };

  return (
    <div
      onMouseEnter={() => setDisplayLikeBtn(true)}
      onMouseLeave={() => setDisplayLikeBtn(false)}
      onClick={(e) => handleOnClick(e)}
      className={`relative flex flex-col group cursor-pointer min-w-24 max-w-24 sm:min-w-32 sm:max-w-32 h-14 border border-dark-glassy rounded-[1.2rem] p-2 ${className}`}>
      <div className="h-full w-full flex items-center justify-center group-hover:underline underline-offset-2 text-sm font-medium truncate">
        <span className="truncate">{title}</span>
      </div>
      {displayLikeBtn && (
        <div id="likeBtn" className="z-10 absolute -bottom-2 -right-1">
          <HeartIcon isLiked={isLiked} handleClickHeart={handleClickHeart} className="size-6" />
        </div>
      )}
    </div>
  );
}
