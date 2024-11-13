import { MouseEvent, useEffect, useState, type ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import MusicPlayer from "components/music/MusicPlayer";
import { useScreenSize } from "hooks/useScreenSize";

const DEFAULT_SIDEBAR_WIDTH = 224;
const MIN_SIDEBAR_WIDTH = 180;
const MAX_SIDEBAR_WIDTH = 260;
const SMALL_SIDEBAR_WIDTH = 65;

function Root(): ReactElement {
  const [drag, setDrag] = useState({ active: false, x: 0 });
  const [sidebarWidth, setSidebarWidth] = useState<number>(DEFAULT_SIDEBAR_WIDTH);

  const isMobile = useScreenSize();

  useEffect(() => {
    const savedWidth = localStorage.getItem("sidebarWidth");
    setSidebarWidth(savedWidth ? Number(savedWidth) : DEFAULT_SIDEBAR_WIDTH);
  }, []);

  const resizeSidebar = (e: MouseEvent) => {
    if (!drag.active) return;

    const xDiff = Math.abs(drag.x - e.clientX);

    const newW = drag.x > e.clientX ? sidebarWidth - xDiff : sidebarWidth + xDiff;

    if (MIN_SIDEBAR_WIDTH < newW && newW < MAX_SIDEBAR_WIDTH) {
      setDrag({ ...drag, x: e.clientX });
      setSidebarWidth(newW);
    } else if (newW <= SMALL_SIDEBAR_WIDTH) {
      setDrag({ ...drag, x: e.clientX });
      setSidebarWidth(SMALL_SIDEBAR_WIDTH);
    }
  };

  const startResizing = (e: MouseEvent) => {
    setDrag({ active: true, x: e.clientX });
  };

  const stopResizing = () => {
    if (drag.active) {
      setDrag({ ...drag, active: false });
      localStorage.setItem("sidebarWidth", sidebarWidth.toString());
    }
  };

  return (
    <div
      className="select-none flex flex-col h-screen w-screen"
      onMouseMove={resizeSidebar}
      onMouseUp={stopResizing}>
      <div className="font-bs h-full w-auto flex flex-row bg-body-bg">
        {!isMobile && (
          <div className="h-full flex flex-row" style={{ width: `${sidebarWidth}px` }}>
            <Sidebar
              className="hidden sm:flex flex-col gap-10 w-full h-full"
              isSidebarSmall={sidebarWidth === SMALL_SIDEBAR_WIDTH}
            />
            <div
              onMouseDown={startResizing}
              className={`${
                drag.active ? "border-2" : ""
              } w-[3px] z-50 hover:cursor-col-resize border-red-400 border-1 h-full`}
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
