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
import PeopleIcon from "@mui/icons-material/People";
import { useState } from "react";
import JoinRoomDisplayData from "../../component/joinroom/JoinRoomDisplayData";
import MemberDialog from "../../component/joinroom/MemberDialog";

const JoinRoom = () => {
  const navigate = useNavigate();
  const [openMember, setOpenMember] = useState<boolean>(false);
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
            sx={{ borderRadius: "20", bgcolor: "#62723F"}}
            onClick={() => setOpenMember(true)}
          >
            <PeopleIcon sx={{ mr: 1 }} /> Members
          </Button>
        </Grid2>

        <JoinRoomDisplayData room={room} />
      </Box>
      <MemberDialog open={openMember} onClose={() => setOpenMember(false)} roomId={room.RoomId} hostName={room.FirstName}/>
    </>
  );
};

export default JoinRoom;
