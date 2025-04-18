import { Box, IconButton, Typography } from "@mui/material/";
import Grid2 from "@mui/material/Grid2";
import SearchBox from "../../component/SearchBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import hatsanta from "../../assets/hatsanta.svg";
import { useNavigate } from "react-router-dom";
import HostRoomDisplay from "../../component/hostroom/HostRoomDisplay";
import { useState } from "react";

const HostRoom = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");


  const handleSearch = (query: string) => {
    setSearch(query);
  };

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
            <SearchBox onSearch={handleSearch} />
            {/* <SortBox onSortChange={handleSortChange}/> */}
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
            <HostRoomDisplay search={search} />
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default HostRoom;
