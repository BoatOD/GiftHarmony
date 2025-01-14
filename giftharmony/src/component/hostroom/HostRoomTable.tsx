import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SantaroomAlert from "../santaroom/SantaroomAlert";
import IconButton from "@mui/material/IconButton";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material/";

const HostRoomTable = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const columns = ["Room’s name", "Action"];

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
            <TableBody>
              {/* {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })} */}
              <TableRow>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  คิดจะถึง คริสมาสไทม์
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
              <TableRow>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  แลกของขวัญกันๆ
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
          </Table>
        </TableContainer>
      </Paper>
      <SantaroomAlert open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default HostRoomTable;
