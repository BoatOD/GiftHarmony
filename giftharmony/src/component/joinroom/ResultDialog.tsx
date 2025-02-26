import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Box, Dialog, DialogContent, IconButton, Typography } from "@mui/material/";
import { useState, useEffect } from "react";
// import GiftBox from "./GiftBox";

interface Props {
  open: boolean;
  onClose: () => void;
}

const shuffleArray = (array: number[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const ResultDialog = (props: Props) => {
  const { open, onClose } = props;
  const [, setConnections] = useState<{ boxAId: string; boxBId: string }[]>([]);
  const [pairs, setPairs] = useState<[number, number][]>([]);

  const boxes = [
    { id: 1, name: "Box 1" },
    { id: 2, name: "Box 2" },
    { id: 3, name: "Box 3" },
    { id: 4, name: "Box 4" },
    { id: 5, name: "Box 5" },
    { id: 6, name: "Box 6" },
  ];

  useEffect(() => {
    if (open) {
      const shuffled = shuffleArray([...Array(boxes.length).keys()]);
      const newConnections: { boxAId: string; boxBId: string }[] = [];
      const newPairs: [number, number][] = [];

      for (let i = 0; i < shuffled.length; i++) {
        const boxAId = `box-${boxes[shuffled[i]].id}`;
        const boxBId = `box-${boxes[shuffled[(i + 1) % shuffled.length]].id}`; 
        newConnections.push({ boxAId, boxBId });
        if (shuffled[i + 1] !== undefined) {
            newPairs.push([shuffled[i], shuffled[i + 1]]);
          }
      }

      setConnections(newConnections);
      setPairs(newPairs);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, boxes.length]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        sx: {
          backgroundColor: "#FFEDED",
          borderRadius: "16px",
          border: "5px solid #FFFFFF",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <CloseOutlinedIcon />
      </IconButton>
      <DialogContent>

        <Box sx={{ marginTop: "20px", textAlign: "center" }}>
          <h3>Spin Results:</h3>
          <Box>
            {pairs.map(([boxAIndex, boxBIndex], index) => (
              <Box key={index} sx={{ marginBottom: "10px" }}>
                <Typography>
                  {boxes[boxAIndex].name} แลกของขวัญกับ {boxes[boxBIndex].name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ResultDialog;
