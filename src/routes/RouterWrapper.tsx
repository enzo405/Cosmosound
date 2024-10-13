import { RouterProvider } from "react-router-dom";
import authenticatedRouter from "./authenticatedRouter";
import unAuthenticatedRouter from "./unAuthenticatedRouter";
import { useUser } from "hooks/useUser";

function RouterWrapper() {
  const { user } = useUser();

  return <RouterProvider router={user ? authenticatedRouter : unAuthenticatedRouter} />;
}

export default RouterWrapper;
