import { Icon } from "components/Icon";
import { IconName } from "constants/iconName";
import { ReactElement } from "react";

interface SidebarItemProps {
  iconName: IconName;
  iconNameActive: IconName;
  text: string;
  onClick: () => void;
  isActive: boolean;
}

export default function SidebarItem({
  iconNameActive,
  iconName,
  text,
  onClick,
  isActive,
}: SidebarItemProps): ReactElement {
  let classes = isActive ? "text-primary-orange" : "text-dark-custom";

  return (
    <div
      onClick={onClick}
      className={`${classes} z-10 w-full flex flex-col px-2 xsm:px-4 py-1 cursor-pointer justify-center sm:justify-normal sm:flex-row`}>
      <span className="flex justify-center sm:justify-normal sm:w-auto">
        <Icon
          iconName={isActive ? iconNameActive : iconName}
          className="min-h-6 h-6 min-w-6 w-6 sm:h-8 sm:w-8 flex"
        />
      </span>
      <a className="flex w-full justify-center items-center text-sm font-bold sm:text-xl sm:justify-normal sm:ml-2">
        {text}
      </a>
    </div>
  );
}
