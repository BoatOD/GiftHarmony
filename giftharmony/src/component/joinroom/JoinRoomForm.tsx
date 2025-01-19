import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  IconButton,
  Box,
  Divider,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material/";
import sendgift from "../../assets/sendgift.svg";
import { useContext, useEffect, useRef } from "react";
import useJoinRoomForm from "../../hooks/useJoinRoomForm";
import { LoadingButton } from "@mui/lab";
import { UserContext } from "../../providers/UserProvider";

interface Props {
  open: boolean;
  onClose: () => void;
}

const JoinRoomForm = (props: Props) => {
  const { open, onClose } = props;
  const { profile } = useContext(UserContext);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  
  const {
    onSubmit,
    register,
    errors,
    isSubmitting,
    clearErrors,
    setValue,
    reset,
    isSubmitSuccessful,
  } = useJoinRoomForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      onClose();
      reset();
    }
  }, [isSubmitSuccessful, onClose, reset]);

  useEffect(() => {
    reset();
    clearErrors();
  }, [clearErrors, props.open, reset, setValue]);

  useEffect(() => {
    if (profile?.name && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [profile?.name]);

  useEffect(() => {
    setValue("name", profile?.name || "");
  }, [profile?.name, setValue]);
  
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        PaperProps={{
          sx: {
            backgroundColor: "#FFEDED",
            borderRadius: "16px",
            border: "5px solid #FFFFFF",
            width: "380px",
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
        <Box sx={{ display: "flex", mt: 3, justifyContent: "center" }}>
          <img
            src={sendgift}
            alt="sendgift-photo"
            style={{ width: "15rem", height: "auto", objectFit: "cover" }}
          />
        </Box>
        <form id="join-room-form" onSubmit={onSubmit}>
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
              label="Type your room ID"
              fullWidth
              variant="outlined"
              autoComplete="off"
              error={!!errors?.code}
              {...register("code", {
                required: {
                  value: true,
                  message: "Room's ID is required",
                },
                pattern: {
                  value: /^[A-Z0-9]{1,4}$/,
                  message:
                    "Only uppercase letters and numbers are allowed, no spaces",
                },
              })}
              helperText={errors?.code?.message}
              inputProps={{
                maxLength: 4,
                style: { textTransform: "uppercase" },
              }}
              onInput={(e) => {
                const input = e.target as HTMLInputElement;
                input.value = input.value.toUpperCase();
                input.value = input.value.replace(/[^A-Z0-9]/g, "");
              }}
            />
            <Divider>
              <Chip label="Info" size="small" />
            </Divider>
            {profile ? (
              <>
                <Typography>Name : </Typography>
                <TextField
                  autoFocus
                  required
                  id="name"
                  label="Type your name"
                  fullWidth
                  variant="outlined"
                  autoComplete="off"
                  defaultValue={profile.name}
                  value={profile.name || ''}
                  error={!!errors?.name}
                  {...register("name", {
                    pattern: {
                      value: /\S/,
                      message: "Invalid reason",
                    },
                  })}
                  helperText={errors?.name?.message}
                  inputProps={{
                    maxLength: 20,
                  }}
                  inputRef={nameInputRef}
                />
              </>
            ) : (
              <>
                <Typography>Name : </Typography>
                <TextField
                  autoFocus
                  required
                  id="name"
                  label="Type your name"
                  fullWidth
                  variant="outlined"
                  autoComplete="off"
                  error={!!errors?.name}
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                    pattern: {
                      value: /\S/,
                      message: "Invalid reason",
                    },
                  })}
                  helperText={errors?.name?.message}
                  inputProps={{
                    maxLength: 20,
                  }}
                />
              </>
            )}
            <Typography>In gift : </Typography>
            <TextField
              autoFocus
              required
              id="gift"
              label="Type your gift"
              fullWidth
              variant="outlined"
              autoComplete="off"
              error={!!errors?.giftDescription}
              {...register("giftDescription", {
                required: {
                  value: true,
                  message: "Gift is required",
                },
                pattern: {
                  value: /\S/,
                  message: "Invalid reason",
                },
              })}
              helperText={errors?.giftDescription?.message}
              inputProps={{
                maxLength: 30,
              }}
            />
            <Typography>Message : </Typography>
            <TextField
              id="message"
              label="Type your message"
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              autoComplete="off"
              error={!!errors?.message}
              {...register("message", {
                pattern: {
                  value: /\S/,
                  message: "Invalid reason",
                },
              })}
              helperText={errors?.message?.message}
              inputProps={{
                maxLength: 50,
              }}
            />
          </DialogContent>
        </form>
        <DialogActions sx={{ justifyContent: "center", mb: 2 }}>
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            form="join-room-form"
            variant="contained"
            size="large"
            sx={{
              bgcolor: "button.main",
              color: "font.main",
              minWidth: "100px",
            }}
          >
            Join
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default JoinRoomForm;
