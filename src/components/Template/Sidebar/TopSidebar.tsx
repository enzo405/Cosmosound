import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

function TopSidebar(): ReactElement {
  const navigate = useNavigate();

  return (
    <a
      onClick={() => navigate("/")}
      className="bg-red-500 min-w-40 w-full flex flex-row justify-center items-center">
      <img className="m-1 w-8 h-8" src="./src/assets/img/cosmosound.svg" alt="CosmoSound" />
      CosmoSound
    </a>
  );
}

export default TopSidebar;
