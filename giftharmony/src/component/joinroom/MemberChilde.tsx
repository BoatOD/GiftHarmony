import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { IParticipant } from "../../interface/IGetRoom";
import { useState } from "react";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { RoomApi } from "../../api/RoomApi";

interface Props {
  participant: IParticipant;
  roomId: number;
  deleteSucceed: () => void;
}

const MemberChilde = (props: Props) => {
  const { participant, roomId, deleteSucceed } = props;
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    // TODO: Add delete logic here
    try {
      const res = await RoomApi.deleteParticipant(
        participant.ParticipantId,
        roomId
      );
      console.log(res);
    } catch (error) {
      console.error(error);
    }
    console.log("Participant deleted");
    deleteSucceed();
    setConfirmDelete(false);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };
  return (
    <>
      <Typography
        sx={{
          textAlign: "left",
          mr: 2,
          fontSize: "18px",
          fontWeight: 600,
        }}
      >
        Members :
      </Typography>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography sx={{ fontSize: "18px", mb: 1 }}>
          {participant.Name}
        </Typography>

        {!confirmDelete && (
          <Tooltip title="Delete Participants" arrow placement="top">
            <IconButton onClick={handleDeleteClick}>
              <PersonRemoveIcon sx={{ color: "darkred" }} />
            </IconButton>
          </Tooltip>
        )}
      </div>

      {confirmDelete && (
        <Paper sx={{ p: 1, textAlign: "center" }}>
          <Typography sx={{ mb: 1 }}>
            Are you sure you want to <br /> delete this participant?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleConfirmDelete}
            >
              Confirm
            </Button>
            <Button variant="outlined" onClick={handleCancelDelete}>
              Cancel
            </Button>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default MemberChilde;
