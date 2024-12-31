import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface TopSidebarProps {
  isSidebarSmall?: boolean;
}

function TopSidebar({ isSidebarSmall = false }: TopSidebarProps): ReactElement {
  const navigate = useNavigate();

  return (
    <a
      onClick={() => navigate("/")}
      className="hidden sm:flex flex-row justify-center items-center cursor-pointer h-full w-fit px-4 sm:p-3 sm:h-20 sm:min-h-20 lg:h-24 lg:min-h-24 sm:w-full">
      {isSidebarSmall ? (
        <img src="/img/cosmosound.png" alt="CosmoSound" />
      ) : (
        <img src="/img/sidebar/CosmoSound_logoSidebar.png" alt="CosmoSound" />
      )}
    </a>
  );
}

export default TopSidebar;
