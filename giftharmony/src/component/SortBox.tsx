import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import Typography from "@mui/material/Typography";

const SortBox = () => {
  return (
    <Tooltip title="Sort Room's name" arrow placement="top">
      <IconButton sx={{ ml: 1 }}>
        <SwapVertIcon /> <Typography>DESC</Typography>
      </IconButton>
    </Tooltip>
  );
};

export default SortBox;
