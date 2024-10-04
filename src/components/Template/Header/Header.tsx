import {type ReactElement} from "react";

type HeaderProps = { unAuthenticated?: boolean };

function Header({ unAuthenticated = false }: Readonly<HeaderProps>): ReactElement {
    return (
        <>
            {unAuthenticated ? (
                <span>You are not authenticated</span>
            ) : (
                <span>You are authenticated</span>
            )}
        </>
    );
}

export default Header;
