import { routesConfig } from "config/app-config";
import { type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface AbousUsPageProps {
  isAuthenticated?: boolean;
}

function AboutUsPage({ isAuthenticated = true }: AbousUsPageProps): ReactElement {
  const navigate = useNavigate();

  return (
    <>
      <div>ABOUT US PAGE !!!</div>
      {!isAuthenticated ? (
        <span onClick={() => navigate(routesConfig.login.path)}>Login Button</span>
      ) : null}
    </>
  );
}

export default AboutUsPage;
