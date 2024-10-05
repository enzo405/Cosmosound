import { RouterProvider } from "react-router-dom";
import authenticatedRouter from "./routes/authenticatedRouter";

function App() {
  return (
    <>
      <RouterProvider router={authenticatedRouter} />
    </>
  );
}

export default App;
