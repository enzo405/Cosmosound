import { routesSidebar } from "config/app-config";
import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

function SidebarContent(): ReactElement {
  const navigate = useNavigate();

  return (
    <div className="h-full mt-3 flex flex-col">
      {Object.entries(routesSidebar).flatMap((objRoute, i) => {
        const Icon = objRoute[1].icon;
        return (
          <div
            key={i}
            onClick={() => navigate(objRoute[1].path)}
            className="flex flex-row px-4 mx-2 cursor-pointer py-2 rounded-md hover:bg-gray-300">
            <Icon className="h-8 flex" />
            <a className="ml-2 h-8 flex items-center text-lg">{objRoute[1].displayText}</a>
          </div>
        );
      })}
    </div>
  );
}

export default SidebarContent;
