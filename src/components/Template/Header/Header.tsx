import { type ReactElement } from "react";
import HeaderAvatar from "./Avatar/HeaderAvatar";
import HeaderSearchbar from "./HeaderSearchbar";
import HeaderNavigation from "./HeaderNavigation";

function Header(): ReactElement {
  return (
    <div className="flex items-center h-24 gap-6">
      <HeaderNavigation />
      <HeaderSearchbar />
      <HeaderAvatar />
    </div>
  );
}

export default Header;
