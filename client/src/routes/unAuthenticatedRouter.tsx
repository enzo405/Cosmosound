import { routesConfig } from "config/app-config";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "pages/errors/ErrorPage";
import UnauthenticatedRoot from "components/template/UnauthenticatedRoot";
import RegisterPage from "pages/Register/RegisterPage";
import LoginPage from "pages/Login/LoginPage";
import AboutUsPage from "pages/AboutUs/AboutUsPage";
import NotFoundErrorPage from "pages/errors/NotFoundErrorPage";

const unAuthenticatedRouter = createBrowserRouter([
  {
    element: <UnauthenticatedRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: routesConfig.home.path,
        element: <AboutUsPage isAuthenticated={false} />,
      },
      {
        path: routesConfig.register.path,
        element: <RegisterPage />,
      },
      {
        path: routesConfig.login.path,
        element: <LoginPage />,
      },
      {
        path: routesConfig.any.path,
        element: <NotFoundErrorPage />,
      },
    ],
  },
]);

export default unAuthenticatedRouter;
