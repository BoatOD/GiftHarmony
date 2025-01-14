import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";
import SantaroomAlert from "./SantaroomAlert";
import { useNavigate } from "react-router-dom";

const SantaroomTable = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const columns = ["Room's name", "Host", "Member", "Action"];

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
                  แลกของขวัญกันๆ
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  นีน คนสวยมาก
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  2 / 10
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "button.main",
                      color: "font.main",
                      borderRadius: "10%",
                    }}
                    onClick={() => setOpen(true)}
                  >
                    Join
                  </Button>
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
                  นีน คนสวยมาก
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  2 / 10
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    disabled
                    sx={{
                      bgcolor: "button.main",
                      color: "font.main",
                      borderRadius: "10%",
                    }}
                  >
                    Join
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "button.dark",
                      color: "font.main",
                      borderRadius: "10%",
                      ml: 2,
                    }}
                    onClick={() => navigate("joinroom")}
                  >
                    <LoginIcon />
                  </Button>
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

export default SantaroomTable;
