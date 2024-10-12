import { routesSidebar } from "config/app-config";
import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

function SidebarContent(): ReactElement {
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return window.location.pathname === path;
  };

  return (
    <div className="flex flex-col items-center gap-2 h-full mt-1 px-2 xsm:items-start">
      {Object.entries(routesSidebar).flatMap((objRoute, i) => {
        const Icon = objRoute[1].icon;
        const IconActiv = objRoute[1].iconActiv;
        let active = isActive(objRoute[1].path);
        let classes = "";
        if (active) {
          classes += "bg-gray-300";
        } else {
          classes += "hover:bg-gray-200";
        }
        return (
          <div
            key={i}
            onClick={() => navigate(objRoute[1].path)}
            className={
              classes +
              " w-full flex flex-col px-2 py-1 cursor-pointer rounded-lg justify-center xsm:justify-normal xsm:flex-row"
            }>
            <span className="flex w-full justify-center xsm:justify-normal xsm:w-auto">
              {active ? <IconActiv className="h-8 flex" /> : <Icon className="h-8 flex" />}
            </span>
            <a className="flex w-full justify-center xsm:justify-normal xsm:ml-2 items-center text-xs xsm:text-lg">
              {objRoute[1].displayText}
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default SidebarContent;
