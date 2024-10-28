import { Icon } from "components/Icon";
import { IconName } from "constants/iconName";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface SidebarItemProps {
  iconName: IconName;
  iconNameActive: IconName;
  text: string;
  path: string;
}

export default function SidebarItem({
  iconNameActive,
  iconName,
  text,
  path,
}: SidebarItemProps): ReactElement {
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return window.location.pathname === path;
  };

  let active = isActive(path);
  let classes = "";
  if (active) {
    classes += "bg-sidebar-item-bg text-primary-orange ";
  } else {
    classes += "hover:bg-sidebar-item-bg-hover text-dark-custom ";
  }
  return (
    <div
      onClick={() => navigate(path)}
      className={`${classes} w-auto sm:w-full flex flex-col px-2 py-1 cursor-pointer rounded-lg justify-center sm:justify-normal sm:flex-row`}>
      <span className="flex justify-center sm:justify-normal sm:w-auto">
        <Icon
          iconName={active ? iconNameActive : iconName}
          className="min-h-6 h-6 min-w-6 w-6 sm:h-8 sm:w-8 flex"
        />
      </span>
      <a className="flex w-full justify-center items-center text-sm font-bold sm:text-xl sm:justify-normal sm:ml-2">
        {text}
      </a>
    </div>
  );
}
