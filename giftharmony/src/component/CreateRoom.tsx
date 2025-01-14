import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { UserContext } from "../utils/UserContext";
import { useContext, useEffect } from "react";
import chirstmasVeed from "../assets/chirstmasveed.svg";
import useCreateRoomForm from "../hooks/useCreateRoomForm";

interface Props {
  open: boolean;
  onClose: () => void;
}
const CreateRoom = (props: Props) => {
  const { open, onClose } = props;
  const { profile } = useContext(UserContext);

  const {
    onSubmit,
    register,
    errors,
    isSubmitting,
    clearErrors,
    setValue,
    reset,
    isSubmitSuccessful,
  } = useCreateRoomForm({});

  useEffect(() => {
    if (isSubmitSuccessful) {
      // getData();
      // refreshUserProfile();
      onClose();
      reset();
    }
  }, [isSubmitSuccessful, onClose, reset]);

  useEffect(() => {
    reset();
    clearErrors();
  }, [clearErrors, props.open, reset, setValue]);

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
          top: -40,
          left: -40,
          width: "120%",
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
          <Typography sx={{ color: "#703232", fontWeight: 600, fontSize: 18 }}>
            {profile?.name}
          </Typography>
        </DialogTitle>
      </Box>
      <form id="create-room-form" onSubmit={onSubmit}>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography>Room's name : </Typography>
          <TextField
            autoFocus
            required
            label="Type your room's name"
            autoComplete="off"
            fullWidth
            variant="outlined"
            error={!!errors?.name}
            {...register("name", {
              required: {
                value: true,
                message: "Room's name is required",
              },
              pattern: {
                value: /\S/,
                message: "Invalid reason",
              },
            })}
            helperText={errors?.name?.message}
            inputProps={{
              maxLength: 30,
            }}
          />
        </DialogContent>
      </form>
      <DialogActions sx={{ justifyContent: "center", mb: 2 }}>
        {/* <Button
          type="submit"
          sx={{
            bgcolor: "button.dark",
            color: "font.main",
            minWidth: "100px",
          }}
        >
          Create
        </Button> */}
        <LoadingButton
          loading={isSubmitting}
          type="submit"
          form="create-room-form"
          variant="contained"
          size="large"
          sx={{
            bgcolor: "button.dark",
            color: "font.main",
            minWidth: "100px",
          }}
        >
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRoom;
