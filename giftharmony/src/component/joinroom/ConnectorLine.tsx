import { Box } from "@mui/material/";
import { useState, useLayoutEffect } from "react";

interface ConnectorLineProps {
  boxAId: string;
  boxBId: string;
}

const ConnectorLine = ({ boxAId, boxBId }: ConnectorLineProps) => {
  const [lineStyle, setLineStyle] = useState<React.CSSProperties>({});

  useLayoutEffect(() => {
    const boxA = document.getElementById(boxAId);
    const boxB = document.getElementById(boxBId);

    if (boxA && boxB) {
      const boxARect = boxA.getBoundingClientRect();
      const boxBRect = boxB.getBoundingClientRect();

      const startX = boxARect.left + boxARect.width / 2;
      const startY = boxARect.top + boxARect.height / 2;

      const endX = boxBRect.left + boxBRect.width / 2;
      const endY = boxBRect.top + boxBRect.height / 2;

      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const length = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      const offsetX = -300;
      const offsetY = -140;
      
      setLineStyle({
        position: "absolute",
        top: `${startY + offsetY}px`,
        left: `${startX + offsetX}px`,
        width: `${length}px`,
        height: "2px",
        backgroundColor: "#8C5959",
        transformOrigin: "0 0",
        transform: `rotate(${angle}deg)`,
        zIndex: 0,
        pointerEvents: "none",
        transition: "width 0.2s ease-out",
      });
    }
  }, [boxAId, boxBId]);

  return (
    <Box
      sx={{
        ...lineStyle,
        "&::after": {
          content: '""',
          position: "absolute",
          right: "-5px",
          top: "50%",
          width: 0,
          height: 0,
          borderLeft: `10px solid transparent`,
          borderRight: `10px solid transparent`,
          borderTop: `10px solid #8C5959`,
          transform: "translateY(-50%)",
        },
      }}
    />
  );
};

export default ConnectorLine;
