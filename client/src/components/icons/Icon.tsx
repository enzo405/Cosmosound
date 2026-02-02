import React from "react";
import * as sprite from "./../../assets/sprite.svg";
import { IconName } from "./../../constants/iconName";

interface IconProps {
  className?: string;
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  iconName: IconName;
}

export const Icon: React.FC<IconProps> = ({ className = "", onClick = () => {}, iconName }) => {
  return (
    <svg className={`${className} select-none`} onClick={onClick}>
      <use xlinkHref={`${sprite.default}#icon-${iconName}`}></use>
    </svg>
  );
};
