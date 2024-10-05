import { type ReactElement } from "react";

type HeaderProps = { unAuthenticated?: boolean };

function Header({ unAuthenticated = false }: Readonly<HeaderProps>): ReactElement {
  return (
    <>
      {unAuthenticated ? (
        <span>You are not authenticated</span>
      ) : (
        <div className="bg-red-400 w-screen h-10">HEADER</div>
      )}
    </>
  );
}

export default Header;
