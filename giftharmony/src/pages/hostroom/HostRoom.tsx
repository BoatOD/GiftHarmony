import { Box, IconButton, Tooltip, Typography } from "@mui/material/";
import Grid2 from "@mui/material/Grid2";
import SearchBox from "../../component/SearchBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import hatsanta from "../../assets/hatsanta.svg";
import { useNavigate } from "react-router-dom";
import HostRoomDiaplay from "../../component/hostroom/HostRoomDisplay";

const HostRoom = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ flexGrow: 1, pt: 5, px: 15 }}>
        <Grid2
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
          size={10}
        >
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Box
            sx={{
              position: "relative",
              display: "inline-block",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography
                className="navBarFont"
                sx={{
                  color: "general.contrastText",
                  fontSize: 34,
                  display: "inline",
                }}
              >
                Host's Roo
              </Typography>
              <Typography
                className="navBarFont"
                component="span"
                sx={{
                  color: "general.contrastText",
                  fontSize: 34,
                  position: "relative",
                  display: "inline-block",
                }}
              >
                m
              </Typography>
            </Box>
            <img
              src={hatsanta}
              alt="Santa Hat"
              style={{
                position: "absolute",
                top: "-5px",
                left: "calc(100% - 30px)",
                width: "60px",
                height: "auto",
              }}
            />
          </Box>
          <Box>
            <SearchBox />
            <Tooltip title="Sort Name for DSEC" arrow placement="top">
              <IconButton sx={{ ml: 1 }}>
                <SortByAlphaIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid2>
        <Grid2
          container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Grid2 size={12}>
            <HostRoomDiaplay />
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default HostRoom;
