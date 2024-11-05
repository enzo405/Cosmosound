import { type ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import MusicPlayer from "components/music/MusicPlayer";

function Root(): ReactElement {
  return (
    <div className="flex flex-col h-screen">
      <div className="font-bs h-full flex flex-row bg-body-bg">
        <Sidebar className="hidden sm:flex flex-col gap-6 sm:gap-10 min-w-20 sm:min-w-56" />
        <div className="flex flex-col flex-grow mx-1 sm:mx-4 lg:mx-10">
          <Header />
          <div className="h-full">
            <Outlet />
          </div>
        </div>
      </div>
      <MusicPlayer />
      <Sidebar className="sm:hidden flex flex-row gap-6 w-full" showHeaderAvatar={true} />
    </div>
  );
}

export default Root;
