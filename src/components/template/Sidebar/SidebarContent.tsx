import { routesSidebar } from "config/app-config";
import { type ReactElement, useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import HeaderAvatar from "components/template/Avatar/HeaderAvatar";
import { useNavigate } from "react-router-dom";
import { useScreenSize } from "hooks/useScreenSize";

interface SidebarContentProps {
  showHeaderAvatar: boolean;
}

function SidebarContent({ showHeaderAvatar }: SidebarContentProps): ReactElement {
  const navigate = useNavigate();
  const isMobile = useScreenSize();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    updateSidebar();
  }, [window.location.pathname]);

  const updateSidebar = (index?: number) => {
    if (index === undefined) {
      index = Object.entries(routesSidebar).findIndex(
        ([, route]) => route.path === window.location.pathname,
      );
    }
    setActiveIndex(index);
  };

  const handleSidebarClick = (index: number, path: string) => {
    updateSidebar(index);
    navigate(path);
  };

  const spanIndicatorClasses = "absolute transition-all z-0 duration-150";

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
            onClick={() => handleSidebarClick(index, route.path)}
          />
        ))}
        {isMobile ? (
          <span
            className={`${spanIndicatorClasses} ${activeIndex >= 0 ? "flex sm:hidden w-1/3" : "flex w-0"} bottom-0 h-[3.25rem] justify-center`}
            style={{ left: `${activeIndex * (100 / 3)}%` }}>
            <span className="bg-soft-beige rounded-t-lg w-4/5 min-w-14" />
          </span>
        ) : (
          <span
            className={`${spanIndicatorClasses} ${activeIndex >= 0 ? "hidden sm:block w-5/6" : "block w-0"} bg-soft-beige left-0 h-10 rounded-e-full`}
            style={{ top: `${activeIndex * 48}px` }}
          />
        )}
      </span>
      {showHeaderAvatar && <HeaderAvatar className="sm:hidden flex mr-3" id="avatar-button-2" />}
    </div>
  );
}

export default SidebarContent;
