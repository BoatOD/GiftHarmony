import { useState } from "react";
import SantaroomAlert from "./SantaroomAlert";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material/";
import TopicIcon from "@mui/icons-material/Topic";

const SantaroomTable = () => {
  const [open, setOpen] = useState<boolean>(false);

  const columns = ["Room's name", "Host", "Member", "Details"];

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
                  <IconButton sx={{ bgcolor: "#E7B0B0" }}>
                    <CardGiftcardIcon />
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
                  <Tooltip title="Your gift" arrow placement="top">
                    <IconButton sx={{ bgcolor: "#E7B0B0", mr: 1 }}>
                      <CardGiftcardIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Result" arrow placement="top">
                    <IconButton sx={{ bgcolor: "#E1C9B3" }}>
                      <TopicIcon />
                    </IconButton>
                  </Tooltip>
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
