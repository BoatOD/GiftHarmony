import { Box, Grid2 } from "@mui/material/";
import Typography from "@mui/material/Typography";
import gift from "../../assets/gift.svg";
import { IParticipant } from "../../interface/IGetRoom";

interface Props {
  participant: IParticipant;
}

const GiftBox = (props: Props) => {
  const { participant } = props;
  
  return (
    <Grid2>
      <Box
        sx={{
          position: "relative",
          width: "240px",
          height: "auto",
          margin: "auto",
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
          {participant.Name}
        </Typography>
      </Box>
    </Grid2>
  );
};

export default GiftBox;
