import { ThemeProvider } from "providers/ThemeProvider";
import { UserProvider } from "providers/UserProvider";
import RouterWrapper from "routes/RouterWrapper";

function App() {
  return (
    <>
      <ThemeProvider>
        <UserProvider>
          <RouterWrapper />
        </UserProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
