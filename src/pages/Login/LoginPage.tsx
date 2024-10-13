import { routesConfig } from "config/app-config";
import { useUser } from "hooks/useUser";
import { type ReactElement } from "react";
import { Navigate } from "react-router-dom";

function LoginPage(): ReactElement {
  const login = () => {
    console.log('localStorage.getItem("user")', localStorage.getItem("user"));
    localStorage.setItem("user", "0");
  };
  const { user } = useUser();

  if (user) {
    return <Navigate to={routesConfig.home.path} replace />;
  }

  return (
    <div>
      LOGIN PAGE !!!
      <a onClick={login}>LOGIN ME</a>
    </div>
  );
}

export default LoginPage;
