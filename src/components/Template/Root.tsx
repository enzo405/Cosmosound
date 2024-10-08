import { type ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

function Root(): ReactElement {
  return (
    <div className="font-bs flex flex-row w-screen h-screen">
      <Sidebar />
      <div className="flex flex-col main">
        <Header />
        <div className="h-full p-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Root;
