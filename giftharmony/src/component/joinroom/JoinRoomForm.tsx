import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { IconButton, Box } from "@mui/material/";
import sendgift from "../../assets/sendgift.svg";

interface Props {
  open: boolean;
  onClose: () => void;
}

const JoinRoomForm = (props: Props) => {
  const { open, onClose } = props;

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
          width: "350px",
          maxWidth: "none",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <CloseOutlinedIcon />
      </IconButton>
      <Box sx={{ display: "flex" , mt : 3, justifyContent: 'center'}}>
        <img
          src={sendgift}
          alt="sendgift-photo"
          style={{ width: "15rem", height: "auto", objectFit: "cover" }}
        />
      </Box>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography> Room ID </Typography>
        <TextField
          required
          id="message"
          name="message"
          label="Type your room ID"
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", mb: 2 }}>
        <Button
          type="submit"
          sx={{
            bgcolor: "button.main",
            color: "font.main",
            minWidth: "100px",
          }}
        >
          Join
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JoinRoomForm;
