import { BrowserRouter, Route, Routes } from "react-router-dom";
import ColorModeProvider from "./providers/ColorModeProvider";
import Home from "./pages/home/Home";
import UserProvider from "./providers/UserProvider";
import SantaroomJoinRoom from "./pages/joinroom/JoinRoom";
import HostRoom from "./pages/hostroom/HostRoom";
import SantaRoom from "./pages/santaroom/Santaroom";
import PageLayout from "./pages/pagelayout/Pagelayout";
import SnackbarProvider from "./providers/SnackbarProvide";

const App = () => {
  return (
    <ColorModeProvider>
      <SnackbarProvider>
        <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route element={<PageLayout />}>
                  <Route element={<Home />} index />
                  <Route path="santaroom" element={<SantaRoom />} />
                  <Route
                    path="santaroom/joinroom"
                    element={<SantaroomJoinRoom />}
                  />
                  <Route path="hostroom" element={<HostRoom />} />
                  <Route
                    path="hostroom/joinroom"
                    element={<SantaroomJoinRoom />}
                  />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </SnackbarProvider>
    </ColorModeProvider>
  );
};

export default App;
