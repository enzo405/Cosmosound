import { routesConfig } from "config/app-config";
import { type ReactElement } from "react";

function SidebarContent(): ReactElement {
  return (
    <div className="bg-yellow-600">
      {Object.keys(routesConfig).map((k, v) => (
        <div>
          <span>
            {k} - {v}
          </span>
        </div>
      ))}
    </div>
  );
}

export default SidebarContent;
