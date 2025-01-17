import { TableBody, TableCell, TableRow } from "@mui/material/";
import GiftPopover from "./GiftPopover";
import ResultPopover from "./ResultPopover";
import { IRoom } from "../../interface/IJoinRoom";

interface Props {
    participant : IRoom;
}
const SantaRoomTableRow = (props : Props) => {
    const {participant} = props;
  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            {participant.RoomName}
          </TableCell>
          <TableCell
            sx={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
              }}
          >
            <GiftPopover participant={participant}/>
            <ResultPopover/>
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
};

export default SantaRoomTableRow;
