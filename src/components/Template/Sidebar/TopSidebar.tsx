import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

function TopSidebar(): ReactElement {
  const navigate = useNavigate();

  return (
    <a
      onClick={() => navigate("/")}
      className="cursor-pointer h-24 w-full flex flex-row justify-center items-center xsm:mx-1">
      <img
        className="w-10 xsm:w-8 xsm:m-1"
        src="./src/assets/img/cosmosound.svg"
        alt="CosmoSound"
      />
      <span className="font-extrabold text-2xl hidden xsm:block">CosmoSound</span>
    </a>
  );
}

export default TopSidebar;
