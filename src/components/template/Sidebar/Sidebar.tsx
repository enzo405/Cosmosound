import { type ReactElement } from "react";
import TopSidebar from "./TopSidebar";
import SidebarContent from "./SidebarContent";

interface SidebarProps {
  className: string;
  showHeaderAvatar?: boolean;
  isSidebarSmall?: boolean;
}

function Sidebar({
  className,
  showHeaderAvatar = false,
  isSidebarSmall = false,
}: SidebarProps): ReactElement {
  return (
    <div className={`${className} bg-sidebar-bg sm:border-soft-beige sm:border-r-[1px]`}>
      <TopSidebar isSidebarSmall={isSidebarSmall} />
      <SidebarContent showHeaderAvatar={showHeaderAvatar} isSidebarSmall={isSidebarSmall} />
    </div>
  );
}

export default Sidebar;
