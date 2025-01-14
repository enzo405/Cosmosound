import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import { authenticatedRoutes, unauthenticatedRoutes } from "./router";
import { useUser } from "hooks/useUser";
import Root from "components/template/Root";
import UnauthenticatedRoot from "components/template/UnauthenticatedRoot";
import ErrorPage from "pages/errors/ErrorPage";
import NotFoundErrorPage from "pages/errors/NotFoundErrorPage";
import LoadingPage from "pages/errors/LoadingPage";

function RouterWrapper() {
  const { user, loading } = useUser();

  if (loading) {
    return <LoadingPage />;
  }

  const routes: RouteObject[] = [
    {
      element: user ? <Root /> : <UnauthenticatedRoot />,
      errorElement: <ErrorPage />,
      children: user ? authenticatedRoutes : unauthenticatedRoutes,
    },
    { path: "*", element: <NotFoundErrorPage /> },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default RouterWrapper;
