import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

function TopSidebar(): ReactElement {
  const navigate = useNavigate();

  return (
    <a
      onClick={() => navigate("/")}
      className="cursor-pointer h-24 w-full flex flex-row justify-center items-center xsm:mx-1">
      <img className="m-1 w-8 h-8" src="./src/assets/img/cosmosound.svg" alt="CosmoSound" />
      <span className="font-extrabold text-2xl hidden xsm:block">CosmoSound</span>
    </a>
  );
}

export default TopSidebar;
