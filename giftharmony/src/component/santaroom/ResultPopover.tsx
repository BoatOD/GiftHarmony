import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import TopicIcon from "@mui/icons-material/Topic";
import { Box, IconButton, Tooltip } from "@mui/material/";
import { UserContext } from "../../providers/UserProvider";

const ResultPopover = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { profile } = React.useContext(UserContext);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Tooltip title="Result" arrow placement="top">
        <IconButton sx={{ bgcolor: "#E1C9B3" }} onClick={handleClick}>
          <TopicIcon />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Typography sx={{ p: 1 }}>Result : </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
            py: 1
          }}
        >
          <Typography>{profile?.name}</Typography>
          <Typography>แลกของขวัญกับ</Typography>
          <Typography>{profile?.name}</Typography>
        </Box>
      </Popover>
    </div>
  );
};

export default ResultPopover;
