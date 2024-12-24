import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pagelayout from "./pages/pagelayout/Pagelayout";
import ColorModeProvider from "./providers/ColorModeProvider";
import Home from "./pages/home/Home";
import Userprovider from "./providers/UserProvider";
import SantaRoom from "./pages/santaroom/Santaroom";

const App = () => {
  return (
    <ColorModeProvider>
      <Userprovider>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route element={<Pagelayout />}>
                <Route element={<Home />} index />
                <Route path="santaroom" element={<SantaRoom/>} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Userprovider>
    </ColorModeProvider>
  );
};

export default App;
