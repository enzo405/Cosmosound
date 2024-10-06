import Root from "components/Template/Root";
import { routesConfig } from "config/app-config";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "pages/Home/HomePage";
import ErrorPage from "pages/errors/ErrorPage";
import NotFoundErrorPage from "pages/errors/NotFoundErrorPage";
import AccountPage from "pages/Account/AccountPage";
import LoginPage from "pages/Login/LoginPage";
import RegisterPage from "pages/Register/RegisterPage";
import FeedPage from "pages/Feed/FeedPage";
import SearchPage from "pages/Search/SearchPage";

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
        path: routesConfig.account.path,
        element: <AccountPage />,
      },
      {
        path: routesConfig.login.path,
        element: <LoginPage />,
      },
      {
        path: routesConfig.register.path,
        element: <RegisterPage />,
      },
      {
        path: routesConfig.feed.path,
        element: <FeedPage />,
      },
      {
        path: routesConfig.search.path,
        element: <SearchPage />,
      },
      {
        path: routesConfig.any.path,
        element: <NotFoundErrorPage />,
      },
    ],
  },
]);

export default authenticatedRouter;
