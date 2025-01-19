import Grid2 from "@mui/material/Grid2";
import HostRoomTable from "./HostRoomTable";
import ChristmasTree from "../ChristmasTree";
import { useCallback, useEffect, useState } from "react";
import { IGetRoom } from "../../interface/IGetRoom";
import { RoomApi } from "../../api/RoomApi";

interface Props {
  search: string;
}

const HostRoomDisplay = (props: Props) => {
  const { search } = props;
  const [room, setRoom] = useState<IGetRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getRoom = useCallback(async () => {
    setLoading(true);
    const response = await RoomApi.getRoom();
    setRoom(response);
    setLoading(false);
  }, []);

  useEffect(() => {
    getRoom();
  }, [getRoom]);

  return (
    <Grid2 container spacing={10} alignItems="stretch">
      <Grid2 size={3} display="flex" justifyContent="center">
        <ChristmasTree />
      </Grid2>

      <Grid2 size={9}>
        <HostRoomTable room={room} loading={loading} search={search} />
      </Grid2>
    </Grid2>
  );
};

export default HostRoomDisplay;
