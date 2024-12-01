import { MusicProvider } from "providers/MusicProvider";
import { OpenAvatarModalProvider } from "providers/OpenAvatarModalProvider";
import { ThemeProvider } from "providers/ThemeProvider";
import { UserProvider } from "providers/UserProvider";
import { SnackbarProvider } from "notistack";
import RouterWrapper from "routes/RouterWrapper";

function App() {
  return (
    <>
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <ThemeProvider>
          <UserProvider>
            <MusicProvider>
              <OpenAvatarModalProvider>
                <RouterWrapper />
              </OpenAvatarModalProvider>
            </MusicProvider>
          </UserProvider>
        </ThemeProvider>
      </SnackbarProvider>
    </>
  );
}

export default App;
