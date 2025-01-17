import {
  Avatar,
  Box,
  Button,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material/";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import santa from "../../assets/santa.svg";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import JoinRoomAlert from "../../component/joinroom/JoinRoomAlert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import ResultDialog from "../../component/joinroom/ResultDialog";
import JoinRoomDisplayData from "../../component/joinroom/JoinRoomDisplayData";

const JoinRoom = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [openResult, setOpenResult] = useState<boolean>(false);
  const location = useLocation();

  const { room } = location.state;

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
                {room.Name}{" "}
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
            <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
              Room ID : {room.Code}
            </Typography>
            <Avatar alt="Santa" src={santa} />
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
            sx={{ borderRadius: "20", bgcolor: "#62723F", mr: 2 }}
            onClick={() => setOpenResult(true)}
          >
            <VisibilityIcon sx={{ mr: 1 }} /> View Result
          </Button>
          <Button
            variant="contained"
            sx={{ borderRadius: "20", bgcolor: "#8D4646" }}
            onClick={() => setOpen(true)}
          >
            <ShuffleIcon sx={{ mr: 1 }} /> Shuffle
          </Button>
        </Grid2>

        <JoinRoomDisplayData  room={room}/>
      </Box>
      <JoinRoomAlert open={open} onClose={() => setOpen(false)} />
      <ResultDialog open={openResult} onClose={() => setOpenResult(false)} />
    </>
  );
};

export default JoinRoom;
