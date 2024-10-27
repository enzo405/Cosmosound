import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

function TopSidebar(): ReactElement {
  const navigate = useNavigate();

  return (
    <a
      onClick={() => navigate("/")}
      className="p-1 mt-2 sm:mt-0 h-16 min-h-16 sm:h-20 sm:min-h-20 lg:h-24 lg:min-h-24 cursor-pointer w-full flex flex-row justify-center items-center">
      <img
        className="hidden sm:block"
        src="./src/assets/img/sidebar/CosmoSound_logoSidebar.png"
        alt="CosmoSound"
      />
      <img
        className="nlock sm:hidden w-12 h-12"
        src="./src/assets/img/cosmosound.svg"
        alt="CosmoSound"
      />
    </a>
  );
}

export default TopSidebar;
