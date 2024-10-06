import { type ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

function Root(): ReactElement {
  return (
    <div className="flex flex-row w-screen h-screen">
      <Sidebar />
      <div className="flex flex-col main">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
