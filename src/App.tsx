import { MusicProvider } from "providers/MusicProvider";
import { OpenAvatarModalProvider } from "providers/OpenAvatarModalProvider";
import { ThemeProvider } from "providers/ThemeProvider";
import { UserProvider } from "providers/UserProvider";
import { SnackbarProvider } from "notistack";
import RouterWrapper from "routes/RouterWrapper";
import { SearchProvider } from "providers/SearchProvider";

function App() {
  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}>
        <ThemeProvider>
          <UserProvider>
            <SearchProvider>
              <MusicProvider>
                <OpenAvatarModalProvider>
                  <RouterWrapper />
                </OpenAvatarModalProvider>
              </MusicProvider>
            </SearchProvider>
          </UserProvider>
        </ThemeProvider>
      </SnackbarProvider>
    </>
  );
}

export default App;
