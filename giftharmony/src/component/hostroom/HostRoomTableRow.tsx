import { IconButton, TableBody, TableCell, TableRow } from "@mui/material/";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { IGetRoom } from "../../interface/IGetRoom";

interface Props {
  room: IGetRoom | undefined;
}

const HostRoomTableRow = (props: Props) => {
  const { room: roomFromProps } = props; 
  const navigate = useNavigate();

  return (
    <TableBody>
      <TableRow>
        <TableCell
          sx={{
            textAlign: "center",
          }}
        >
          {roomFromProps?.Name}
        </TableCell>
        <TableCell
          sx={{
            textAlign: "center",
          }}
        >
          {roomFromProps?.Code}
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
            onClick={() => navigate("joinroom", { state: { room: roomFromProps } })}
          >
            <LoginIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default HostRoomTableRow;
