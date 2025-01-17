import { Grid2 } from "@mui/material/";
import { IGetRoom, IParticipant } from "../../interface/IGetRoom";
import { useState, useCallback, useEffect } from "react";
import { RoomApi } from "../../api/RoomApi";
import GiftBox from "./GiftBox";

interface Props {
  room: IGetRoom;
}

const JoinRoomDisplayData = (props: Props) => {
  const { room } = props;
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getJoinRoom = useCallback(async () => {
    setLoading(true);
    const response = await RoomApi.getParticipant(room.RoomId); 
    setParticipants(response);
    setLoading(false);
  }, [room.RoomId]);
  

  useEffect(() => {
    getJoinRoom();
  }, [getJoinRoom]);

  return (
    <Grid2
      container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 4,
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
          <>loading</>
        ) : (
          participants.map((participant, index) => (
            <GiftBox key={index} participant={participant} />
          ))
        )}
      </Grid2>
    </Grid2>
  );
};

export default JoinRoomDisplayData;
