import Grid2 from "@mui/material/Grid2";
import HostRoomTable from "./HostRoomTable";
import ChristmasTree from "../ChirstmasTree";
// import chirstmastree from "../../assets/chirstmastree.svg";

const HostRoomDiaplay = () => {
  return (
    <Grid2 container spacing={10} alignItems="stretch">

      <Grid2 size={3} display="flex" justifyContent="center">
        <ChristmasTree/>
      </Grid2>

      <Grid2 size={9}>
        <HostRoomTable />
      </Grid2>
    </Grid2>
  );
};

export default HostRoomDiaplay;
