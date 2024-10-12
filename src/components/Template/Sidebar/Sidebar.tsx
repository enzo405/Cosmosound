import { type ReactElement } from "react";
import TopSidebar from "./TopSidebar";
import SidebarContent from "./SidebarContent";

function Sidebar(): ReactElement {
  return (
    <div className="flex flex-col min-w-20 xsm:min-w-48">
      <TopSidebar />
      <SidebarContent />
    </div>
  );
}

export default Sidebar;
