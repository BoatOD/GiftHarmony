import { IconButton, TableBody, TableCell, TableRow } from "@mui/material/";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { IGetRoom } from "../../interface/IGetRoom";

interface Props {
  room: IGetRoom | undefined;
}

const HostRoomTableRow = (props: Props) => {
  const { room } = props;
  const navigate = useNavigate();
  return (
    <TableBody>
      <TableRow>
        <TableCell
          sx={{
            textAlign: "center",
          }}
        >
          {room?.name}
        </TableCell>
        <TableCell
          sx={{
            textAlign: "center",
          }}
        >
          <IconButton
            sx={{
              bgcolor: "button.dark",
            }}
            onClick={() => navigate("joinroom")}
          >
            <LoginIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default HostRoomTableRow;
