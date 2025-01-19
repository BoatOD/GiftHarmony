import {
  Button,
  Dialog,
  DialogActions,
  DialogProps,
  DialogTitle,
} from "@mui/material/";

export interface Props extends DialogProps {
  isFirstRound: boolean;
  winner: string;
  onDelete: (winner: string) => void;
}

const PopupExchange = (props: Props) => {
  const { isFirstRound, winner, ...DialogProps } = props;
  return (
    <>
      <Dialog {...DialogProps}>
        <DialogTitle id="alert-dialog-title">
          {isFirstRound ? "First spinner is " + winner : "Winner is " + winner}
        </DialogTitle>
        <DialogActions>
          {/* <Button
            onClick={() => {
              onDelete(winner);
              if (props.onClose) props.onClose(() => {}, "escapeKeyDown");
            }}
          >
            Remove
          </Button> */}
          <Button
            onClick={() => {
              if (props.onClose) props.onClose(() => {}, "escapeKeyDown");
            }}
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PopupExchange;
