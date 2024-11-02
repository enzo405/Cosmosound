import { routesSidebar } from "config/app-config";
import { type ReactElement } from "react";
import SidebarItem from "./SidebarItem";
import HeaderAvatar from "components/Template/Avatar/HeaderAvatar";

interface SidebarContentProps {
  showHeaderAvatar: boolean;
}

function SidebarContent({ showHeaderAvatar }: SidebarContentProps): ReactElement {
  return (
    <div className="flex flex-row justify-around sm:justify-start sm:flex-col sm:gap-2 w-full h-full mt-1 px-2 xsm:items-start">
      <span className="hidden sm:block text-sidebar-category-font font-medium sm:font-semibold text-lg sm:text-2xl font-mono">
        Menu
      </span>
      {Object.entries(routesSidebar).flatMap((objRoute, i) => (
        <SidebarItem
          iconName={objRoute[1].iconName}
          iconNameActive={objRoute[1].iconActiveName}
          path={objRoute[1].path}
          text={objRoute[1].displayText}
          key={i}
        />
      ))}
      {showHeaderAvatar && <HeaderAvatar className="sm:hidden flex" id="avatar-button-2" />}
    </div>
  );
}

export default SidebarContent;
