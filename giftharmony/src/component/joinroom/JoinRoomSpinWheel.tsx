import { Box, Grid2, Typography } from "@mui/material/";
import WheelComponent from "react-wheel-of-prizes-react18-compatible";
import { IParticipant } from "../../interface/IGetRoom";
import { useEffect, useRef, useState } from "react";
import { IGiftExchange } from "../../interface/IGiftExchange";
import PopupExchange from "./PopupExchange";

export interface Props {
  participants?: IParticipant[];
  giftExchanges?: IGiftExchange[];
  onSpinComplete: (senderId: number, receiverId: number) => void;
}

const JoinRoomSpinWheel = (props: Props) => {
  const { participants, giftExchanges, onSpinComplete } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [segments, setSegments] = useState<string[]>([]);
  const [winners, setWinners] = useState<string[]>([]);
  const spinner = useRef<string>("Select First Spinner.");
  const [isFirstRound, setIsFirstRound] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [filteredPar, setFilteredPar] = useState<IParticipant[]>();

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
    if (
      spinner.current !== "Select First Spinner." &&
      spinner.current !== winner
    ) {
      const senderId = parseInt(winner.slice(0, winner.indexOf(".")));
      const receiverId = parseInt(
        spinner.current.slice(0, winner.indexOf("."))
      );
      spinner.current = winner;
      setWinners((prevWinners) => [...prevWinners, winner]);
      onSpinComplete(senderId, receiverId);
    } else {
      spinner.current = winner;
    }
    setOpen(true);
  };

  const onDelete = (winner: string) => {
    setLoading(true);

    // Filter out the winner from segments
    const newSegments = segments.filter((e) => e !== winner);

    // Update state with the filtered array
    setSegments(newSegments);

    setOpen(false);
    setIsFirstRound(false);
    setLoading(false);
  };

  useEffect(() => {
    if (participants && participants.length > 0) {
      setLoading(true);

      const filteredPars =
        giftExchanges && giftExchanges.length > 0
          ? participants.filter(
              (participant) =>
                !giftExchanges.some(
                  (exchange) => exchange.SenderId === participant.ParticipantId
                )
            )
          : participants;
      setFilteredPar(participants);
      const names = filteredPars.map(
        (item) => `${item.ParticipantId}.${item.Name || "ไม่ระบุ"}`
      );
      setSegments(names);
      setLoading(false);
    }
  }, [giftExchanges, participants]);

  return (
    <>
      <Grid2>
        <Typography>{spinner.current}</Typography>
      </Grid2>
      <Grid2>
        {segments.length < 1 ? (
          <>
            {/* ใส่อะไรสักอย่างไม่ให้มันโล่งเวลาหมุนวงล้อหมดแล้ว */}
          </>
        ) : (
          !loading && (
            <WheelComponent
              key={segments.join(",")}
              segments={segments}
              segColors={segColors}
              winningSegment={spinner.current}
              onFinished={(winner) => onFinished(winner)}
              primaryColor="#E4889C"
              contrastColor="black"
              buttonText="Spin"
              isOnlyOnce={false}
              size={290}
              upDuration={100}
              downDuration={1000}
              fontFamily="sans-serif"
            />
          )
        )}
      </Grid2>
      <Grid2>
        {giftExchanges &&
          giftExchanges.length > 0 &&
          giftExchanges.map((item, index) => (
            <Box
              key={index}
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
                {
                  participants?.find((e) => e.ParticipantId === item.SenderId)
                    ?.Name
                }
              </Typography>
              <Typography
                sx={{ fontSize: 20, fontWeight: 600, marginRight: 2 }}
              >
                แลกของขวัญกับ
              </Typography>
              <Typography sx={{ fontSize: 20 }}>
                {
                  participants?.find((e) => e.ParticipantId === item.ReceiverId)
                    ?.Name
                }
              </Typography>
            </Box>
          ))}
      </Grid2>
      <PopupExchange
        isFirstRound={isFirstRound}
        winner={spinner.current}
        open={open}
        onDelete={onDelete}
        onClose={() => {
          setOpen(false);
          setIsFirstRound(false);
        }}
      />
    </>
  );
};

export default JoinRoomSpinWheel;
