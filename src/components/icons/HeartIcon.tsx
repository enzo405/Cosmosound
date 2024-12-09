import { ReactElement, useState } from "react";
import { Icon } from "./Icon";

interface HeartIconProps {
  className?: string;
  isLiked: boolean;
  handleClickHeart: () => void;
}

export default function HeartIcon({
  handleClickHeart,
  isLiked,
  className = "",
}: HeartIconProps): ReactElement {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    handleClickHeart();
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <Icon
      onClick={handleClick}
      iconName={isLiked ? "heart-orange" : "heart-orange-empty"}
      className={`${className} cursor-pointer ${isAnimating ? "animate-pop" : ""}`}
    />
  );
}
