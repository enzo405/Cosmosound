import { routesSidebar } from "config/app-config";
import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

function SidebarContent(): ReactElement {
  const navigate = useNavigate();

  return (
    <div className="h-full mt-3 flex flex-col">
      {Object.entries(routesSidebar).flatMap((objRoute) => {
        const Icon = objRoute[1].icon;
        return (
          <div
            onClick={() => navigate(objRoute[1].path)}
            className="flex flex-row mx-6 cursor-pointer py-2">
            <Icon className="h-8 flex" />
            <a className="ml-2 h-8 flex items-center text-lg">{objRoute[1].displayText}</a>
          </div>
        );
      })}
    </div>
  );
}

export default SidebarContent;
