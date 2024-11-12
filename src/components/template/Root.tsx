import { type ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import MusicPlayer from "components/music/MusicPlayer";
import { useScreenSize } from "hooks/useScreenSize";

function Root(): ReactElement {
  const isMobile = useScreenSize();

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="font-bs h-full w-auto flex flex-row bg-body-bg">
        {!isMobile && <Sidebar className="hidden sm:flex flex-col gap-10 min-w-[14rem]" />}
        <div className="w-screen sm:w-[calc(100vw-14rem)] flex flex-col flex-grow px-1 sm:px-4 lg:px-10">
          <Header />
          <div className="h-full w-auto flex">
            <Outlet />
          </div>
        </div>
      </div>
      <MusicPlayer />
      {isMobile && <Sidebar className="sm:hidden flex flex-row gap-6" showHeaderAvatar={true} />}
    </div>
  );
}

export default Root;
