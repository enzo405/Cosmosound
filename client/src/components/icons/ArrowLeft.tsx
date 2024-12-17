import { Icon } from "components/icons/Icon";
import { ReactElement } from "react";

interface ArrowLeftProps {
  isActiv: boolean;
  className?: string;
}

export default function ArrowLeft({ isActiv, className }: ArrowLeftProps): ReactElement {
  return (
    <Icon
      iconName="arrow-left"
      className={`${className} ${isActiv ? "stroke-black" : "stroke-grey-inactiv"} h-3 w-3 min-w-3 min-h-3 sm:h-4 sm:w-4 sm:min-w-4 sm:min-h-4`}
    />
  );
}
