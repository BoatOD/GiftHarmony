import React from "react";
import { createContext } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";
import { useMediaQuery, useTheme } from "@mui/material";

export const SnackbarContext = createContext({
  pushMessage: (_: string, __: AlertColor, ___?: React.ReactNode) => { },
});

const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState<AlertColor>("info");
  const [userAction, setUserAction] = React.useState<React.ReactNode>();

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));

  const pushMessage = (message: string, severity: AlertColor, action?: React.ReactNode) => {
    setMessage(message);
    setSeverity(severity);
    setUserAction(action);
    setOpen(true);
  };

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const extendAction = (userAction?: React.ReactNode) => {
    return (
      <React.Fragment>
        {userAction}
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );
  };

  return (
    <SnackbarContext.Provider value={{ pushMessage }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: isXs ? "center" : "left" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity={severity} action={extendAction(userAction)} sx={{width: isXs ? "100vw" : "unset"}}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;