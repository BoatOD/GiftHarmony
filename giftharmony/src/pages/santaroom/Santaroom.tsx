import { Box, Grid2, IconButton, Typography } from "@mui/material/";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import hatsanta from "../../assets/hatsanta.svg";
import { useNavigate } from "react-router-dom";
import SearchBox from "../../component/SearchBox";
import { useState } from "react";
import SantaRoomTable from "../../component/santaroom/Santaroomtable";

const SantaRoom = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");

  const handleSearch = (query: string) => {
    setSearch(query);
  };
  return (
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
              Santa's Roo
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
          <SearchBox onSearch={handleSearch}/>
          {/* <SortBox /> */}
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
          <SantaRoomTable search={search} />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default SantaRoom;
