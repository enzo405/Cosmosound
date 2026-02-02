import { type ReactElement } from "react";
import { Outlet } from "react-router-dom";

function UnauthenticatedRoot(): ReactElement {
  return (
    <div id="root-parent" className="flex flex-col h-screen w-full">
      <div className="flex flex-col flex-grow">
        <Outlet />
      </div>
    </div>
  );
}

export default UnauthenticatedRoot;
