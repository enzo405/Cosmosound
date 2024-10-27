import { type ReactElement } from "react";
import TopSidebar from "./TopSidebar";
import SidebarContent from "./SidebarContent";

function Sidebar(): ReactElement {
  return (
    <div className="bg-sidebar-bg border-soft-beige border-r-[1px] flex flex-col sm:p-2 gap-6 sm:gap-10 min-w-20 sm:min-w-56">
      <TopSidebar />
      <SidebarContent />
    </div>
  );
}

export default Sidebar;
