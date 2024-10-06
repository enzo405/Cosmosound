import { type ReactElement } from "react";
import TopSidebar from "./TopSidebar";
import SidebarContent from "./SidebarContent";

function Sidebar(): ReactElement {
  return (
    <div className="flex flex-col sidebar">
      <TopSidebar />
      <SidebarContent />
    </div>
  );
}

export default Sidebar;
