import { routesSidebar } from "config/app-config";
import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

function SidebarContent(): ReactElement {
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return window.location.pathname === path;
  };

  return (
    <div className="h-full mt-3 flex flex-col gap-1">
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
            className={classes + " flex flex-row px-4 mx-2 cursor-pointer py-1 rounded-lg"}>
            {active ? <IconActiv className="h-8 flex" /> : <Icon className="h-8 flex" />}
            <a className="ml-2 h-8 flex items-center text-lg">{objRoute[1].displayText}</a>
          </div>
        );
      })}
    </div>
  );
}

export default SidebarContent;
