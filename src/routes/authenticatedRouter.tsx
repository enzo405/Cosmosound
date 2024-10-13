import Root from "components/Template/Root";
import { routesConfig } from "config/app-config";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "pages/Home/HomePage";
import ErrorPage from "pages/errors/ErrorPage";
import NotFoundErrorPage from "pages/errors/NotFoundErrorPage";
import AccountPage from "pages/Account/AccountPage";
import LoginPage from "pages/Login/LoginPage";
import RegisterPage from "pages/Register/RegisterPage";
import LibraryPage from "pages/Library/LibraryPage";
import ExplorePage from "pages/Explore/ExplorePage";
import AboutUsPage from "pages/AboutUs/AboutUsPage";

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
        path: routesConfig.library.path,
        element: <LibraryPage />,
      },
      {
        path: routesConfig.explore.path,
        element: <ExplorePage />,
      },
      {
        path: routesConfig.aboutUs.path,
        element: <AboutUsPage />,
      },
      {
        path: routesConfig.any.path,
        element: <NotFoundErrorPage />,
      },
    ],
  },
]);

export default authenticatedRouter;
