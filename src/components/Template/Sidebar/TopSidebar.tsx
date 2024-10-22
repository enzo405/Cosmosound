import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

function TopSidebar(): ReactElement {
  const navigate = useNavigate();

  return (
    <a
      onClick={() => navigate("/")}
      className="cursor-pointer h-24 w-full flex flex-row justify-center items-center xsm:mx-1">
      <img src="./src/assets/img/sidebar/CosmoSound_logoSidebar.png" alt="CosmoSound" />
    </a>
  );
}

export default TopSidebar;
