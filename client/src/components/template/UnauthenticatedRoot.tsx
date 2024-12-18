import { type ReactElement } from "react";
import { Outlet } from "react-router-dom";

function UnauthenticatedRoot(): ReactElement {
  return (
    <div className="h-full">
      <Outlet />
    </div>
  );
}

export default UnauthenticatedRoot;
