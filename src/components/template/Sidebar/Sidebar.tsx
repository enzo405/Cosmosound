import { type ReactElement } from "react";
import TopSidebar from "./TopSidebar";
import SidebarContent from "./SidebarContent";

interface SidebarProps {
  className: string;
  showHeaderAvatar?: boolean;
}

function Sidebar({ className, showHeaderAvatar = false }: SidebarProps): ReactElement {
  return (
    <div className={`${className} bg-sidebar-bg sm:border-soft-beige sm:border-r-[1px]`}>
      <TopSidebar />
      <SidebarContent showHeaderAvatar={showHeaderAvatar} />
    </div>
  );
}

export default Sidebar;
