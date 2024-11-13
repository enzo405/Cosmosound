import { MouseEvent, useState, type ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import MusicPlayer from "components/music/MusicPlayer";
import { useScreenSize } from "hooks/useScreenSize";

function Root(): ReactElement {
  const [drag, setDrag] = useState({ active: false, x: 0 });
  const [sidebarWidth, setSidebarWidth] = useState(224);

  const isMobile = useScreenSize();
  const smallSizeSidebar = 65;

  const resizeFrame = (e: MouseEvent) => {
    const { active, x } = drag;
    if (active) {
      const xDiff = Math.abs(x - e.clientX);

      const newW = x > e.clientX ? sidebarWidth - xDiff : sidebarWidth + xDiff;

      if (180 < newW && newW < 300) {
        setDrag({ ...drag, x: e.clientX });
        setSidebarWidth(newW);
      } else if (newW <= smallSizeSidebar) {
        setDrag({ ...drag, x: e.clientX });
        setSidebarWidth(65);
      }
    }
  };

  const startResize = (e: { clientX: any }) => {
    setDrag({
      active: true,
      x: e.clientX,
    });
  };

  const stopResize = () => {
    setDrag({ ...drag, active: false });
  };

  return (
    <div
      className="select-none flex flex-col h-screen w-screen"
      onMouseMove={resizeFrame}
      onMouseUp={stopResize}>
      <div className="font-bs h-full w-auto flex flex-row bg-body-bg">
        {!isMobile && (
          <div className="h-full flex flex-row" style={{ width: `${sidebarWidth}px` }}>
            <Sidebar
              className="hidden sm:flex flex-col gap-10 w-full h-full"
              isSidebarSmall={sidebarWidth == smallSizeSidebar}
            />
            <div
              onMouseDown={startResize}
              className={`${drag.active ? "border-2" : ""} w-[3px] z-10 hover:cursor-col-resize border-red-400 border-1 h-full`}
            />
          </div>
        )}
        <div
          className="flex flex-col flex-grow px-1 sm:px-4 lg:px-10"
          style={{ width: isMobile ? "100vw" : `calc(100vw - ${sidebarWidth}px)` }}>
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
