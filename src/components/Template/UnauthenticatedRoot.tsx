import { type ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

function UnauthenticatedRoot(): ReactElement {
  return (
    <>
      <Header unAuthenticated />
      <Outlet />
    </>
  );
}

export default UnauthenticatedRoot;
