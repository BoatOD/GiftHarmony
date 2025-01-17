import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import Typography from "@mui/material/Typography";
import { useState } from "react";

interface Props {
  onSortChange: (order: "ASC" | "DESC") => void;
}

const SortBox = ({ onSortChange }: Props) => {
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "ASC" ? "DESC" : "ASC";
    setSortOrder(newOrder);
    onSortChange(newOrder);
  };

  return (
    <Tooltip title="Sort Room's name" arrow placement="top">
      <IconButton onClick={toggleSortOrder} sx={{ ml: 1 }}>
        <SwapVertIcon />
        <Typography>{sortOrder}</Typography>
      </IconButton>
    </Tooltip>
  );
};

export default SortBox;
