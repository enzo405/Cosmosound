import Root from "../components/Template/Root";
import { routesConfig } from "../config/app-config";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import ErrorPage from "../pages/errors/ErrorPage";
import NotFoundErrorPage from "../pages/errors/NotFoundErrorPage";

const authenticatedRouter = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: routesConfig.home.path,
        element: <HomePage />,
      },
      {
        path: routesConfig.any.path,
        element: <NotFoundErrorPage />,
      },
    ],
  },
]);

export default authenticatedRouter;
