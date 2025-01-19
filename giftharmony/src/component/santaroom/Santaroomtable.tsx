import { useCallback, useEffect, useState } from "react";
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
import { IRoom } from "../../interface/IJoinRoom";
import { RoomApi } from "../../api/RoomApi";
import SantaRoomTableRow from "./SantaRoomTableRow";
import SantaroomAlert from "./SantaroomAlert";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import React from "react";

interface Props {
  search: string;
}

const SantaRoomTable = (props: Props) => {
  const { search } = props;
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

  const filteredParticipants = participants.filter((participant) =>
    participant.RoomName.toLowerCase().includes(search.toLowerCase())
  );


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
                  {Array.from(new Array(2)).map((_, idx) => (
                    <TableCell key={idx}>
                      <Skeleton height={40} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : filteredParticipants.length < 1 ? (
              <TableRow>
                <TableCell colSpan={2} align="center" sx={{ height: 398 }}>
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
                {filteredParticipants
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((participant, index) => {
                    return (
                      <SantaRoomTableRow
                        participant={participant}
                        key={index}
                      />
                    );
                  })}
              </>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={filteredParticipants.length}
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
