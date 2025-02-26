import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  Button,
  Paper,
} from "@mui/material/";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const MemberDialog = (props: Props) => {
  const { open, onClose } = props;
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    // TODO: Add delete logic here
    console.log("Participant deleted");
    setConfirmDelete(false);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        sx: {
          backgroundColor: "#FFEDED",
          borderRadius: "16px",
          border: "5px solid #FFFFFF",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <CloseOutlinedIcon />
      </IconButton>
      <DialogContent>
        <Box sx={{ marginTop: "22px", textAlign: "center" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Typography sx={{ mr: 2, fontSize: "18px", fontWeight: 600 }}>
              Host :
            </Typography>
            <Typography sx={{ fontSize: "18px" }}>
              Jiranthanin Supakad
            </Typography>
          </div>
          <Divider sx={{ my: 2 }} />
          <Typography
            sx={{ textAlign: "left", mr: 2, fontSize: "18px", fontWeight: 600 }}
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
            <Typography sx={{ fontSize: "18px" , mb : 1}}>Jiranthanin1</Typography>

            {!confirmDelete && <Tooltip title="Delete Participants" arrow placement="top">
              <IconButton onClick={handleDeleteClick}>
                <PersonRemoveIcon sx={{ color: "darkred" }} />
              </IconButton>
            </Tooltip> }
          </div>

          {confirmDelete && (
            <Paper sx={{ p : 1, textAlign: "center" }}>
                <Typography sx={{ mb: 1 }}>
                  Are you sure you want to <br/> delete this participant?
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
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MemberDialog;
