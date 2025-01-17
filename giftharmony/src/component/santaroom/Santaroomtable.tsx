import { useState } from "react";
import SantaroomAlert from "./SantaroomAlert";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material/";
import GiftPopover from "./GiftPopover";
import ResultPopover from "./ResultPopover";

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
                  <GiftPopover />
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
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    gap: 1, 
                  }}
                >
                  <GiftPopover />
                  <ResultPopover/>
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
