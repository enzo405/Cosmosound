import { RouterProvider } from "react-router-dom";
import authenticatedRouter from "./authenticatedRouter";

function RouterWrapper() {
  // const { user } = useUser();

  // return <RouterProvider router={user ? authenticatedRouter : unAuthenticatedRouter} />;
  return <RouterProvider router={authenticatedRouter} />;
}

export default RouterWrapper;
