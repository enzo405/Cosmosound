import { routesConfig } from "config/app-config";
import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

function SidebarContent(): ReactElement {
  const navigate = useNavigate();

  return (
    <div className="bg-yellow-600 h-full">
      {Object.entries(routesConfig).flatMap((objRoute) => {
        let display = objRoute[1].diplaySidebar;
        if (!display) return;

        return (
          <div>
            <a onClick={() => navigate(objRoute[1].path)} className="capitalize underline ">
              {objRoute[0]}
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default SidebarContent;
