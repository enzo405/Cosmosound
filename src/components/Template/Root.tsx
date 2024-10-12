import { type ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

function Root(): ReactElement {
  return (
    <div className="font-bs flex flex-row h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <div className="h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Root;
