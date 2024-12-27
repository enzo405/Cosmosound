import { RouterProvider } from "react-router-dom";
import authenticatedRouter from "./authenticatedRouter";
import { useUser } from "hooks/useUser";
import unAuthenticatedRouter from "./unAuthenticatedRouter";

function RouterWrapper() {
  const { user } = useUser();

  return <RouterProvider router={user ? authenticatedRouter : unAuthenticatedRouter} />;
}

export default RouterWrapper;
