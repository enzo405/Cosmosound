import { MusicProvider } from "./providers/MusicProvider";
import { OpenAvatarModalProvider } from "./providers/OpenAvatarModalProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { UserProvider } from "./providers/UserProvider";
import { SnackbarProvider } from "notistack";
import { SearchProvider } from "./providers/SearchProvider";
import { ConfirmDialogProvider } from "./providers/DialogConfirmProvider";
import RouterWrapper from "./routes/RouterWrapper";

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={3000}>
      <ThemeProvider>
        <ConfirmDialogProvider>
          <UserProvider>
            <SearchProvider>
              <MusicProvider>
                <OpenAvatarModalProvider>
                  <RouterWrapper />
                </OpenAvatarModalProvider>
              </MusicProvider>
            </SearchProvider>
          </UserProvider>
        </ConfirmDialogProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
