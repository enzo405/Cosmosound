import { type ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import MusicPlayer from "components/music/MusicPlayer";

function Root(): ReactElement {
  return (
    <div className="flex flex-col h-screen">
      <div className="font-bs h-full flex flex-row bg-body-bg">
        <Sidebar />
        <div className="flex flex-col flex-grow mx-1 sm:mx-4 lg:mx-10">
          <Header />
          <div className="h-full">
            <Outlet />
          </div>
        </div>
      </div>
      <MusicPlayer />
    </div>
  );
}

export default Root;
