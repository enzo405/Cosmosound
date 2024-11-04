import { routesSidebar } from "config/app-config";
import { type ReactElement, useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import HeaderAvatar from "components/Template/Avatar/HeaderAvatar";
import { useNavigate } from "react-router-dom";

interface SidebarContentProps {
  showHeaderAvatar: boolean;
}

function SidebarContent({ showHeaderAvatar }: SidebarContentProps): ReactElement {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    let i = Object.entries(routesSidebar).findIndex(
      ([, route]) => route.path === window.location.pathname,
    );
    setActiveIndex(i);
  }, [window.location.pathname]);

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  const spanIndicatorClasses = "absolute bg-sidebar-item-bg transition-all duration-200 z-0";

  return (
    <div className="flex flex-row justify-start sm:flex-col gap-2 w-full h-full">
      <span className="z-10 hidden sm:block sm:px-4 text-sidebar-category-font font-medium sm:font-semibold text-lg sm:text-2xl font-mono">
        Menu
      </span>
      <span className="relative flex flex-row justify-around sm:justify-start sm:flex-col sm:gap-2 w-full h-full xsm:items-start">
        {Object.entries(routesSidebar).map(([key, route], index) => (
          <SidebarItem
            key={key}
            iconName={route.iconName}
            iconNameActive={route.iconActiveName}
            text={route.displayText}
            isActive={index === activeIndex}
            onClick={() => handleItemClick(route.path)}
          />
        ))}
        {/* Desktop Sidebar item background indicator */}
        <span
          className={`${spanIndicatorClasses} ${activeIndex >= 0 ? "hidden sm:block" : "hidden"} w-5/6 left-0 h-10 rounded-e-full`}
          style={{ top: `${activeIndex * 48}px` }}
        />
        <span
          className={`${spanIndicatorClasses} ${activeIndex >= 0 ? "block sm:hidden" : "hidden"} bottom-0 h-[3.25rem] w-1/3 rounded-t-lg`}
          style={{ left: `${activeIndex * (100 / 3)}%` }}
        />
      </span>
      {showHeaderAvatar && <HeaderAvatar className="sm:hidden flex mr-3" id="avatar-button-2" />}
    </div>
  );
}

export default SidebarContent;
