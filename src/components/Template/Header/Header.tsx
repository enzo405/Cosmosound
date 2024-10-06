import { type ReactElement } from "react";
import HeaderAvatar from "./HeaderAvatar";
import HeaderSearchbar from "./HeaderSearchbar";

type HeaderProps = { unAuthenticated?: boolean };

function Header({ unAuthenticated = false }: Readonly<HeaderProps>): ReactElement {
  return (
    <>
      {unAuthenticated ? (
        <span>You are not authenticated</span>
      ) : (
        <div className="flex items-center h-24 mx-2">
          <HeaderSearchbar />
          <HeaderAvatar />
        </div>
      )}
    </>
  );
}

export default Header;
