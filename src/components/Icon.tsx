import React from "react";
import sprite from "assets/img/sprite.svg";
import { IconName } from "constants/iconName";

interface IconProps {
  className?: string;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  iconName: IconName;
}

export const Icon: React.FC<IconProps> = ({ className = "", onClick = () => {}, iconName }) => {
  return (
    <svg className={className} onClick={onClick}>
      <use xlinkHref={`${sprite}#icon-${iconName}`}></use>
    </svg>
  );
};
