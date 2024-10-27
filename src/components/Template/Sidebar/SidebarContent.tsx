import { Icon } from "components/Icon";
import { routesSidebar } from "config/app-config";
import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

function SidebarContent(): ReactElement {
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return window.location.pathname === path;
  };

  return (
    <div className="flex flex-col gap-2 h-full mt-1 px-2 xsm:items-start">
      <span className="hidden xsm:block text-sidebar-category-font font-semibold text-lg sm:text-2xl font-mono">
        Menu
      </span>
      {Object.entries(routesSidebar).flatMap((objRoute, i) => {
        const IconName = objRoute[1].iconName;
        const IconNameActive = objRoute[1].iconActiveName;
        let active = isActive(objRoute[1].path);
        let classes = "";
        if (active) {
          classes += "bg-sidebar-item-bg text-primary-orange ";
        } else {
          classes += "hover:bg-sidebar-item-bg-hover text-dark-custom ";
        }
        return (
          <div
            key={i}
            onClick={() => navigate(objRoute[1].path)}
            className={
              classes +
              " w-full flex flex-col px-2 py-1 cursor-pointer rounded-lg justify-center sm:justify-normal sm:flex-row"
            }>
            <span className="flex w-full justify-center sm:justify-normal sm:w-auto">
              <Icon
                iconName={active ? IconNameActive : IconName}
                className="min-h-6 h-6 min-w-6 w-6 sm:h-8 sm:w-8 flex"
              />
            </span>
            <a className="flex w-full justify-center sm:justify-normal sm:ml-2 items-center text-sm sm:text-xl font-bold">
              {objRoute[1].displayText}
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default SidebarContent;
