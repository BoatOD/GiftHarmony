import { useCallback, useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material/";
import { IRoom } from "../../interface/IJoinRoom";
import { RoomApi } from "../../api/RoomApi";
import SantaRoomTableRow from "./SantaRoomTableRow";
import SantaroomAlert from "./SantaroomAlert";
import React from "react";

const SantaRoomTable = () => {
  const [open, setOpen] = useState<boolean>(false);

  const columns = ["Room's name", "Details"];

  const [participants, setParticipants] = useState<IRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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

  const getJoinSantaRoom = useCallback(async () => {
    setLoading(true);
    const response = await RoomApi.getJoinRoom();
    setParticipants(response);
    setLoading(false);
  }, []);

  useEffect(() => {
    getJoinSantaRoom();
  }, [getJoinSantaRoom]);

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
              participants
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((participant, index) => {
                  return (
                    <SantaRoomTableRow participant={participant} key={index} />
                  );
                })
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={participants.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <SantaroomAlert open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default SantaRoomTable;
