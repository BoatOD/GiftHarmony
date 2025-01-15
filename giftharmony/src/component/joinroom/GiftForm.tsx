import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { IconButton, Box } from "@mui/material/";

interface Props {
  open: boolean;
  onClose: () => void;
}

const GiftForm = (props: Props) => {
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
          width: "500px",
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 3,
          pt: 6,
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "left",
            padding: 0,
            color: "#6A4B37",
            fontWeight: 800,
            fontSize: 20,
          }}
        >
          Join in <br />
          คิดจะถึง คริสมาสไทม์’s Room
          <Typography sx={{ color: "#5E7764", fontWeight: 600, fontSize: 18 }}>
            Host : นีน คนสวยมาก
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
        <Typography>In gift : </Typography>
        <TextField
          autoFocus
          required
          id="gift"
          name="gift"
          label="Type your gift"
          fullWidth
          variant="outlined"
        />
        <Typography>Message : </Typography>
        <TextField
          id="message"
          name="message"
          label="Type your message"
          fullWidth
          variant="outlined"
          multiline
          rows={3}
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
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GiftForm;