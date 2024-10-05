import { type ReactElement } from "react";

type HeaderProps = { unAuthenticated?: boolean };

function Header({ unAuthenticated = false }: Readonly<HeaderProps>): ReactElement {
  return (
    <>
      {unAuthenticated ? (
        <span>You are not authenticated</span>
      ) : (
        <div className="h-screen bg-blue-500 flex items-center justify-center">
          <h1 className="text-white text-4xl">Hello !</h1>
        </div>
      )}
    </>
  );
}

export default Header;
