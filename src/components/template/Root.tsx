import { MouseEvent, useEffect, useState, type ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import MusicPlayer from "components/music/MusicPlayer";
import { useScreenSize } from "hooks/useScreenSize";
import DropdownHeaderAvatar from "./Avatar/ModalHeaderAvatar";

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
    document.body.style.cursor = "col-resize";
    document.getElementById("root-parent")?.classList.add("select-none");
    setDrag({ active: true, x: e.clientX });
  };

  const stopResizing = () => {
    if (drag.active) {
      document.body.style.cursor = "auto";
      document.getElementById("root-parent")?.classList.remove("select-none");
      setDrag({ ...drag, active: false });
      localStorage.setItem("sidebarWidth", sidebarWidth.toString());
    }
  };

  return (
    <div
      id="root-parent"
      className="flex flex-col h-screen w-full"
      onMouseMove={resizeSidebar}
      onMouseUp={stopResizing}>
      <div className="font-bs h-full w-full flex flex-row bg-body-bg">
        {!isMobile && (
          <div className="fixed left-0 h-full flex flex-row" style={{ width: `${sidebarWidth}px` }}>
            <Sidebar
              className="hidden sm:flex flex-col gap-10 h-full w-full"
              isSidebarSmall={sidebarWidth === SMALL_SIDEBAR_WIDTH}
            />
            <div
              onMouseDown={startResizing}
              className={`${
                drag.active ? "bg-red-400" : "bg-soft-beige"
              } w-[3px] z-20 hover:cursor-col-resize h-full`}
            />
          </div>
        )}
        <div
          className="h-min flex flex-col flex-grow"
          style={{
            width: isMobile ? "100vw" : `calc(100% - ${sidebarWidth}px)`,
            marginLeft: isMobile ? "0px" : `${sidebarWidth}px`,
          }}>
          <Header />
          <div className="h-full w-full bg-body-bg flex flex-col px-1 sm:px-4 lg:px-10 pb-52 sm:pb-28">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full z-20 flex flex-col bg-music-player-bg backdrop-blur-3xl">
        <MusicPlayer />
        {isMobile && <Sidebar className="sm:hidden flex flex-row gap-6" showHeaderAvatar={true} />}
      </div>
      <DropdownHeaderAvatar />
    </div>
  );
}

export default Root;
