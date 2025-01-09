import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pagelayout from "./pages/pagelayout/Pagelayout";
import ColorModeProvider from "./providers/ColorModeProvider";
import Home from "./pages/home/Home";
import Userprovider from "./providers/UserProvider";
import SantaRoom from "./pages/santaroom/Santaroom";
import SantaroomJoinRoom from "./component/santaroom/joinroom/SantaroomJoinRoom";
import HostRoom from "./pages/hostroom/HostRoom";

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
                <Route path="santaroom/joinroom" element={<SantaroomJoinRoom/>} />
                <Route path="hostroom" element={<HostRoom/>}/>
                <Route path="hostroom/joinroom" element={<SantaroomJoinRoom/>} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Userprovider>
    </ColorModeProvider>
  );
};

export default App;
