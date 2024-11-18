import { MusicProvider } from "providers/MusicProvider";
import { OpenAvatarModalProvider } from "providers/OpenAvatarModalProvider";
import { ThemeProvider } from "providers/ThemeProvider";
import { UserProvider } from "providers/UserProvider";
import RouterWrapper from "routes/RouterWrapper";

function App() {
  return (
    <>
      <ThemeProvider>
        <UserProvider>
          <MusicProvider>
            <OpenAvatarModalProvider>
              <RouterWrapper />
            </OpenAvatarModalProvider>
          </MusicProvider>
        </UserProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
