import { useState } from "react";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material/";
import { IGetRoom } from "../../interface/IGetRoom";
import HostRoomTableRow from "./HostRoomTableRow";
import SantaRoomAlert from "../santaroom/SantaroomAlert";
import React from "react";

interface Props {
  room: IGetRoom[];
  loading: boolean;
}

const HostRoomTable = (props: Props) => {
  const { room, loading } = props;
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
              <>loading</>
            ) : (
              room
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((room, index) => {
                  return <HostRoomTableRow room={room} key={index} />;
                })
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={room.length}
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
