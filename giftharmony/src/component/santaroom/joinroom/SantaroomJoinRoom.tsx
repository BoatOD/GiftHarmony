import {
  Avatar,
  Box,
  Button,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material/";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import santa from "../../../assets/santa.svg";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import gift from "../../../assets/gift.svg";
import JoinRoomAlert from "./JoinRoomAlert";
import { useState } from "react";

const SantaroomJoinRoom = () => {
  const navigate = useNavigate();
  const [open , setOpen] = useState<boolean>(false);

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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
            <Box component="span" sx={{ color: "#8D0000" }}>
              In{" "}
            </Box>
            <Box component="span" sx={{ color: "#1C5736" }}>
              คิดจะถึง คริสมาสไทม์{" "}
            </Box>
            <Box component="span" sx={{ color: "#8D0000" }}>
              ‘s Room
            </Box>
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Host :</Typography>
          <Typography sx={{ fontSize: 18, fontWeight: 500 }}>
            Jiranthanin
          </Typography>
          <Avatar
            alt="Profile"
            src={santa}
            sx={{
              backgroundColor: "pink",
              width: 40,
              height: 40,
            }}
          />
        </Box>
      </Grid2>

      <Grid2
        container
        sx={{
          display: "flex",
          alignItems: "right",
          justifyContent: "right",
          mt: 3,
        }}
      >
        <Button
          variant="contained"
          sx={{ borderRadius: "20", bgcolor: "#8D4646" }}
          onClick={() => setOpen(true)}
        >
          <ShuffleIcon sx={{ mr: 1 }} /> Shuffle
        </Button>
      </Grid2>

      <Grid2
        container
        sx={{
          display: "flex",
          alignItems: "center", 
          justifyContent: "center", 
          mt: 4,
        }}
      >
        <Grid2
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "1200px", 
          }}
        >
          {Array.from(new Array(12)).map((_, index) => (
            <Grid2 key={index}>
              <Box
                sx={{
                  position: "relative",
                  width: "240px",
                  height: "auto",
                  margin: "auto",
                }}
              >
                <img
                  src={gift}
                  alt="gift"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
                <Typography
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#8C5959",
                    color: "#F3F3F3",
                    padding: "4px 25px",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Name
                </Typography>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Grid2>
    </Box>
    <JoinRoomAlert open={open} onClose={() => setOpen(false)}/>
    </>
  );
};

export default SantaroomJoinRoom;
