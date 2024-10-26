import { MusicProvider } from "providers/MusicProvider";
import { ThemeProvider } from "providers/ThemeProvider";
import { UserProvider } from "providers/UserProvider";
import RouterWrapper from "routes/RouterWrapper";

function App() {
  return (
    <>
      <ThemeProvider>
        <UserProvider>
          <MusicProvider>
            <RouterWrapper />
          </MusicProvider>
        </UserProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
