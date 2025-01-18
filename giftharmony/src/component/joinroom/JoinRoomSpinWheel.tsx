import { DialogContentText, IconButton, Typography } from "@mui/material/";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import React, { useContext, useState } from "react";
import WheelComponent from "react-wheel-of-prizes-react18-compatible";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { UserContext } from "../../providers/UserProvider";
import { IGetRoom } from "../../interface/IGetRoom";


export interface Props {
  open: boolean;
  onClose: () => void;
  room: IGetRoom;
  // onSpinComplete: () => void;
}

const JoinRoomSpinWheel = (props: Props) => {
  const { open, onClose, room } = props;
  const { profile } = useContext(UserContext);
  const [winningSegment, setWinningSegment] = useState<string>("");

  const segments = [
    "better luck next time",
    "won 70",
    "won 10",
    "better luck next time",
    "won uber pass",
    "better luck next time",
    "won a voucher",
  ];

  const generateRandomPastelColor = (): string => {
    const randomValue = () => Math.floor(Math.random() * 150) + 180;

    const r = randomValue();
    const g = randomValue();
    const b = randomValue();

    return `rgb(${r}, ${g}, ${b})`;
  };

  const segColors = Array.from({ length: 8 }, () =>
    generateRandomPastelColor()
  );

  const onFinished = (winner: string) => {
    setWinningSegment(winner);
    // onSpinComplete(); 
  };

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
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseOutlinedIcon />
          </IconButton>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: 2,
              p: 3,
            }}
          >
            <DialogContentText>Welcome to {room?.Name} party </DialogContentText>
            <WheelComponent
              segments={segments}
              segColors={segColors}
              winningSegment={winningSegment}
              onFinished={(winner) => onFinished(winner)}
              primaryColor="#E4889C"
              contrastColor="black"
              buttonText="Spin"
              isOnlyOnce={true}
              size={290}
              upDuration={100}
              downDuration={1000}
              fontFamily="sans-serif"
            />
            {winningSegment && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 10px",
                  border: "2px solid #A5BF94",
                  borderRadius: "8px",
                  width: "fit-content",
                }}
              >
                <Typography sx={{ fontSize: 20, marginRight: 2 }}>
                  {profile?.name}
                </Typography>
                <Typography
                  sx={{ fontSize: 20, fontWeight: 600, marginRight: 2 }}
                >
                  แลกของขวัญกับ
                </Typography>
                <Typography sx={{ fontSize: 20 }}>{winningSegment}</Typography>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default JoinRoomSpinWheel;
