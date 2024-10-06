import { routesConfig } from "config/app-config";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "pages/errors/ErrorPage";
import Root from "components/Template/Root";
import UnauthenticatedRoot from "components/Template/UnauthenticatedRoot";

const unAuthenticatedRouter = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: routesConfig.home.path,
        element: <UnauthenticatedRoot />,
      },
    ],
  },
]);

export default unAuthenticatedRouter;
