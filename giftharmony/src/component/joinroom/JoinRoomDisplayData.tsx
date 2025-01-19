import { Box, CircularProgress, Grid2 } from "@mui/material/";
import { IGetRoom, IParticipant } from "../../interface/IGetRoom";
import { useState, useCallback, useEffect } from "react";
import { RoomApi } from "../../api/RoomApi";
import JoinRoomSpinWheel from "./JoinRoomSpinWheel";
import { IGiftExchange } from "../../interface/IGiftExchange";
import { GiftExchangeApi } from "../../api/GiftExchangeApi";

interface Props {
  room: IGetRoom;
}

const JoinRoomDisplayData = (props: Props) => {
  const { room } = props;
  const [participants, setParticipants] = useState<IParticipant[]>();
  const [giftExchanges, setGiftExchanges] = useState<IGiftExchange[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const getData = useCallback(async () => {
    setLoading(true);
    const participants = await RoomApi.getParticipant(room.RoomId);
    setParticipants(participants);
    await getGiftExchange();
    setLoading(false);
  }, [room.RoomId]);

  const getGiftExchange = useCallback(async () => {
    const giftExchanges = await GiftExchangeApi.getGiftExchange(room.RoomId);
    setGiftExchanges(giftExchanges);
  }, [room.RoomId]);

  const exchangeGift = async (senderId: number, receiverId: number) => {
    const res = await GiftExchangeApi.exchangeGift(
      room.RoomId,
      senderId,
      receiverId
    );
    console.log(res);
    await getGiftExchange();
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Grid2
      container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        my: 4,
      }}
    >
      <Grid2
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "1200px",
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh", 
              backgroundColor: "transparent", 
            }}
          >
            <CircularProgress
              sx={{
                color: "black", 
                visibility: "visible",
              }}
            />
          </Box>
        ) : (
          <>
            <Grid2
              container
              direction="column"
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <JoinRoomSpinWheel
                participants={participants}
                giftExchanges={giftExchanges}
                onSpinComplete={exchangeGift}
              />
            </Grid2>
          </>
        )}
      </Grid2>
    </Grid2>
  );
};

export default JoinRoomDisplayData;
