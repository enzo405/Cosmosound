import { UserProvider } from "providers/UserProvider";
import RouterWrapper from "routes/RouterWrapper";

function App() {
  return (
    <>
      <UserProvider>
        <RouterWrapper />
      </UserProvider>
    </>
  );
}

export default App;
