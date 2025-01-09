import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../../component/Navbar";

const Pagelayout = () => {
  return (
      <Box
        id="pagelayout"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Navbar />
        <Box
          id="content"
          component="main"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            bgcolor: "background.default",
          }}
        >
          <Outlet />
        </Box>
        {/* <Footer /> */}
      </Box>
  );
};

export default Pagelayout;
