import { Box } from "@mui/material/";
import Typography from "@mui/material/Typography";
import gift from "../../../assets/gift.svg";

const GiftBox = () => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        width: "260px",
        height: "auto",
      }}
    >
      <img
        src={gift}
        alt="gift"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />
      <Typography
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#8C5959",
          color: "#F3F3F3",
          padding: "4px 25px",
          borderRadius: "4px",
          fontSize: "14px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Name
      </Typography>
    </Box>
  );
};

export default GiftBox;
