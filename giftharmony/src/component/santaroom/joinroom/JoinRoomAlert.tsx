import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import React from "react";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

export interface Props {
  open: boolean;
  onClose: () => void;
}

const JoinRoomAlert = (props: Props) => {
  const { open, onClose } = props;

  return (
    <>
      <React.Fragment>
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            sx: {
              borderRadius: "16px",
            },
          }}
        >
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: 2,
              p: 3,
              bgcolor: "background.alert",
            }}
          >
            <ErrorOutlineOutlinedIcon sx={{ fontSize: "6.5rem" }} />
            <DialogContentText
              id="alert-dialog-description"
              sx={{ fontSize: 21, color: "#380F0F", fontWeight: 600 }}
            >
              Do you want to shuffle member <br />
              in คิกจะถึง คริสมาสไทม์ ‘s Room ?
            </DialogContentText>
            <DialogActions
              sx={{
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Button
                onClick={() => {}}
                variant="contained"
                sx={{
                  bgcolor: "alertbutton.main",
                  color: "font.main",
                  minWidth: "80px",
                  flex: 1,
                }}
              >
                Yes
              </Button>
              <Button
                onClick={onClose}
                variant="contained"
                sx={{
                  bgcolor: "alertbutton.light",
                  color: "#380F0F",
                  minWidth: "80px",
                  flex: 1,
                }}
              >
                No
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default JoinRoomAlert;
