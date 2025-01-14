import Grid2 from "@mui/material/Grid2";
import HostRoomTable from "./HostRoomTable";
import chirstmastree from "../../assets/chirstmastree.svg";

const HostRoomDiaplay = () => {
  return (
    <Grid2 container spacing={10} alignItems="stretch">
      {/* Left Section - รูปภาพ */}
      <Grid2 size={3} display="flex" justifyContent="center" alignItems="stretch">
        <img
          src={chirstmastree}
          alt="chirstmastree"
          style={{
            width: "auto",
            height: "50%",
            objectFit: "cover",
          }}
        />
      </Grid2>

      {/* Right Section - ตาราง */}
      <Grid2 size={9}>
        <HostRoomTable />
      </Grid2>
    </Grid2>
  );
};

export default HostRoomDiaplay;
