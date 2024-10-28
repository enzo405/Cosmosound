import { type ReactElement } from "react";
import HeaderAvatar from "./Avatar/HeaderAvatar";
import HeaderSearchbar from "./HeaderSearchbar";
import HeaderNavigation from "./HeaderNavigation";

function Header(): ReactElement {
  return (
    <div className="flex items-center w-full h-24 gap-2 sm:gap-6">
      <HeaderNavigation />
      <HeaderSearchbar />
      <HeaderAvatar className="sm:flex hidden" id="avatar-button-1" />
      <img
        className="block sm:hidden w-8 h-8 mr-2 "
        src="./src/assets/img/cosmosound.svg"
        alt="CosmoSound"
      />
    </div>
  );
}

export default Header;
