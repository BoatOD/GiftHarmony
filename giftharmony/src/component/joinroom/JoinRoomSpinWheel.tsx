import { Box, Grid2, Typography } from "@mui/material/";
import WheelComponent from "react-wheel-of-prizes-react18-compatible";
import { IGetRoom, IParticipant } from "../../interface/IGetRoom";
import { useEffect, useRef, useState } from "react";
import { IGiftExchange } from "../../interface/IGiftExchange";
import PopupExchange from "./PopupExchange";

export interface Props {
  room : IGetRoom;
  participants?: IParticipant[];
  giftExchanges?: IGiftExchange[];
  onSpinComplete: (senderId: number, receiverId: number) => void;
}

const JoinRoomSpinWheel = (props: Props) => {
  const { room, participants, giftExchanges, onSpinComplete } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [segments, setSegments] = useState<string[]>([]);
  const [, setWinners] = useState<string[]>([]);
  const spinner = useRef<string>("Select First Spinner.");
  const [isFirstRound, setIsFirstRound] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [, setFilteredPar] = useState<IParticipant[]>();

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
      const cacheKey = `giftExchanges_${room.RoomId}`;

      const cachedData = localStorage.getItem(cacheKey);
      const parsedGiftExchanges: IGiftExchange[] = cachedData
        ? JSON.parse(cachedData)
        : giftExchanges || [];

      const filteredPars = parsedGiftExchanges.length
        ? participants.filter((participant) =>
            !parsedGiftExchanges.some(
              (exchange: IGiftExchange) =>
                exchange.SenderId === participant.ParticipantId
            )
          )
        : participants;

      setFilteredPar(filteredPars);
      setSegments(
        filteredPars.map(
          (item) => `${item.ParticipantId}.${item.Name || "ไม่ระบุ"}`
        )
      );
      setLoading(false);
    }
  }, [room, giftExchanges, participants]);
  

  return (
    <>
      <Grid2>
        {segments.length < 1 && giftExchanges && giftExchanges.length > 0 ? (
          <Typography>{spinner.current}</Typography>
        ) : (
          <></>
        )}
      </Grid2>
      <Grid2>
        {segments.length < 1 ? (
          <>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="350px"
              width="100%"
            >
              {giftExchanges && giftExchanges.length > 0 ? (
                <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                  จบการหมุนวงล้อแล้ว
                </Typography>
              ) : (
                <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                  กำลังรอเพื่อนๆ มาร่วมสนุกด้วยกัน!
                </Typography>
              )}
            </Box>
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
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                padding: "12px 16px",
                border: "2px solid #A5BF94",
                borderRadius: "12px",
                width: "fit-content",
                background: "linear-gradient(135deg, #E3F2FD 0%, #F1F8E9 100%)",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <Typography
                sx={{ fontSize: 20, fontWeight: 500, color: "#2E7D32" }}
              >
                {
                  participants?.find((e) => e.ParticipantId === item.SenderId)
                    ?.Name
                }
              </Typography>
              <Typography
                sx={{ fontSize: 20, fontWeight: 600, color: "#37474F" }}
              >
                แลกของขวัญกับ
              </Typography>
              <Typography
                sx={{ fontSize: 20, fontWeight: 500, color: "#D84315" }}
              >
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
