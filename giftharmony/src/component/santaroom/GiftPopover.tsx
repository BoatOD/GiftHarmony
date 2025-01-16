import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { IconButton, Tooltip, Box } from "@mui/material/";
import gift from "../../assets/gift.svg";

const GiftPopover = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Tooltip title="Your gift" arrow placement="top">
        <IconButton sx={{ bgcolor: "#E7B0B0" }} onClick={handleClick}>
          <CardGiftcardIcon />
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 1,
          }}
        >
          <Box
            component="img"
            src={gift}
            alt="Gift"
            sx={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
              maxWidth: "100%", 
            }}
          />
          <Typography>In Gift:</Typography>
          <Typography>Messages:</Typography>
        </Box>
      </Popover>
    </div>
  );
};

export default GiftPopover;
