import { Icon } from "./../../components/icons/Icon";
import { ReactElement } from "react";

interface ArrowRightProps {
  isActiv: boolean;
  className?: string;
}

export default function ArrowRight({ isActiv, className }: ArrowRightProps): ReactElement {
  return (
    <Icon
      iconName="arrow-right"
      className={`${className} ${isActiv ? "stroke-black" : "stroke-grey-inactiv"} h-3 w-3 min-w-3 min-h-3 sm:h-4 sm:w-4 sm:min-w-4 sm:min-h-4`}
    />
  );
}
