import { type ReactElement } from "react";
import HeaderAvatar from "components/template/Avatar/HeaderAvatar";
import HeaderSearchbar from "./HeaderSearchbar";
import HeaderNavigation from "./HeaderNavigation";

function Header(): ReactElement {
  return (
    <div className="sticky top-0 flex items-center w-full h-24 gap-2 sm:gap-6 px-2 bg-body-bg">
      <div className="flex w-full">
        <HeaderNavigation />
        <HeaderSearchbar />
      </div>
      <HeaderAvatar className="sm:flex hidden" id="avatar-button-1" />
      <img
        className="block sm:hidden w-8 h-8 mr-2 "
        src="./src/assets/img/cosmosound.png"
        alt="CosmoSound"
      />
    </div>
  );
}

export default Header;
