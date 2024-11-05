import { Icon } from "components/Icon";
import { IconName } from "constants/iconName";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
  const location = useLocation();
  const isActive = location.pathname === path;

  let classes = "";
  if (isActive) {
    classes += "text-primary-orange";
  } else {
    classes += "text-dark-custom";
  }

  return (
    <div
      onClick={() => navigate(path)}
      className={`${classes} relative w-auto sm:w-11/12 h-full sm:h-auto flex gap-2 items-center px-2 xsm:px-4 py-1 cursor-pointer rounded-t-2xl sm:rounded-e-full sm:flex-row overflow-hidden`}>
      {/* Desktop Animated Background */}
      <span
        className={`hidden sm:block absolute inset-0 h-full bg-soft-beige transition-all duration-200 ${isActive ? "w-full" : "w-0"}`}
      />

      {/* Mobile Animated Background */}
      <span
        className={`block sm:hidden absolute bottom-0 inset-x-0 w-full bg-soft-beige transition-all duration-200 ${isActive ? "h-full" : "h-0"}`}
      />

      {/* Icon and Text */}
      <span className="flex justify-center sm:justify-normal sm:w-auto z-10">
        <Icon
          iconName={isActive ? iconNameActive : iconName}
          className="min-h-6 h-6 min-w-6 w-6 sm:h-8 sm:w-8"
        />
      </span>
      <a className="flex w-full justify-center items-center text-sm font-bold sm:text-xl sm:justify-normal sm:ml-2 z-10">
        {text}
      </a>
    </div>
  );
}
