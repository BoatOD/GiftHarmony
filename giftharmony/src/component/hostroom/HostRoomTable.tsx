import { useState } from "react";
import {
  Paper,
  Skeleton,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material/";
import { IGetRoom } from "../../interface/IGetRoom";
import HostRoomTableRow from "./HostRoomTableRow";
import SantaRoomAlert from "../santaroom/SantaroomAlert";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import React from "react";

interface Props {
  room: IGetRoom[];
  loading: boolean;
  search: string;
}

const HostRoomTable = (props: Props) => {
  const { room, loading, search } = props;
  const [open, setOpen] = useState<boolean>(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = ["Room’s name", "Room’s code", "Action"];

  const filteredRoom = room.filter((room) =>
    room.Name.toLowerCase().includes(search.toLowerCase())
  );

  const emptyRows =
    page >= Math.ceil(filteredRoom.length / rowsPerPage) - 1
      ? rowsPerPage - (filteredRoom.length % rowsPerPage || rowsPerPage)
      : 0;

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    sx={{
                      bgcolor: "table.dark",
                      textAlign: "center",
                      color: "font.main",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                    key={column}
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {loading ? (
              Array.from(new Array(5)).map((_, index) => (
                <TableRow key={index}>
                  {Array.from(new Array(3)).map((_, idx) => (
                    <TableCell key={idx}>
                      <Skeleton height={40} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : filteredRoom.length < 1 ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ height: 398 }}>
                  <SentimentDissatisfiedIcon
                    sx={{ color: "action.disabled", fontSize: "5rem" }}
                  />
                  <Typography
                    color="action.disabled"
                    fontWeight="500"
                    fontSize="1.25rem"
                  >
                    No Data
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {filteredRoom
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((room, index) => (
                    <HostRoomTableRow room={room} key={index} />
                  ))}
              </>
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 73 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={filteredRoom.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <SantaRoomAlert open={open} onClose={() => setOpen(false)} />
    </>
  );
};


export default HostRoomTable;
