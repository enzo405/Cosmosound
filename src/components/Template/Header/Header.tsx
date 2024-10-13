import { type ReactElement } from "react";
import HeaderAvatar from "./HeaderAvatar";
import HeaderSearchbar from "./HeaderSearchbar";

function Header(): ReactElement {
  return (
    <div className="flex items-center h-24 mx-1 xsm:mx-4 py-2 gap-2">
      <HeaderSearchbar />
      <HeaderAvatar />
    </div>
  );
}

export default Header;
