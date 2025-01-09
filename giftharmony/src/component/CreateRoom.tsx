import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import chirstmasVeed from "../assets/chirstmasveed.svg";

interface Props {
  open: boolean;
  onClose: () => void;
}
const CreateRoom = (props: Props) => {
  const { open, onClose } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "400px",
          maxWidth: "none",
          backgroundColor: "#FFEDED",
          borderRadius: "16px",
          border: "5px solid #FFFFFF",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}
      >
        <CloseOutlinedIcon />
      </IconButton>
      <Box
        component="img"
        src={chirstmasVeed}
        alt="chirstmas veed"
        sx={{
          position: "absolute",
          top: -80,
          left: 0,
          width: "100%",
          height: "70%",
          objectFit: "cover",
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 3,
          mt: 15,
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "left",
            padding: 0,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography
            sx={{ color: "#380F0F", fontWeight: 800, mr: 1, fontSize: 18 }}
          >
            Host :
          </Typography>
          <Typography sx={{ color: "#4C6B39", fontWeight: 600, fontSize: 18 }}>
            Jiranthanin
          </Typography>
        </DialogTitle>
      </Box>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography>Room : </Typography>
        <TextField
          autoFocus
          required
          id="room"
          name="room"
          label="Type your room’s name"
          fullWidth
          variant="outlined"
        />
        <Typography>Member : </Typography>
        <TextField
          required
          id="member"
          name="member"
          fullWidth
          variant="outlined"
          type="number"
          defaultValue={1}
          inputProps={{
            min: 1,
          }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", mb: 2 }}>
        <Button
          type="submit"
          sx={{
            bgcolor: "button.dark",
            color: "font.main",
            minWidth: "100px",
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRoom;
