import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material/";
import { useCallback, useEffect, useState } from "react";
import { RoomApi } from "../../api/RoomApi";
import { IParticipant } from "../../interface/IGetRoom";
import MemberChilde from "./MemberChilde";

interface Props {
  open: boolean;
  onClose: () => void;
  roomId: number;
  hostName: string;
}

const MemberDialog = (props: Props) => {
  const { open, onClose, roomId, hostName } = props;
  const [participants, setParticipants] = useState<IParticipant[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const getParticipants = useCallback(async () => {
    setLoading(true);
    const participants = await RoomApi.getParticipant(roomId);
    setParticipants(participants);
    setLoading(false);
  }, [roomId]);

  useEffect(() => {
    if (open === true) getParticipants();
  }, [getParticipants, open]);

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
          width:"300px"
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
        <Box sx={{ marginTop: "22px", textAlign: "center" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Typography sx={{ mr: 2, fontSize: "18px", fontWeight: 600 }}>
              Host :
            </Typography>
            <Typography sx={{ fontSize: "18px" }}>{hostName}</Typography>
          </div>
          <Divider sx={{ my: 2 }} />
          {loading ? (
            <Box display="flex" flexDirection="column" gap={2}>
              <Skeleton variant="rectangular" width={210} height={50} />
              <Skeleton variant="rectangular" width={210} height={50} />
              <Skeleton variant="rectangular" width={210} height={50} />
              <Skeleton variant="rectangular" width={210} height={50} />
            </Box>
          ) : (
            participants &&
            participants.length > 0 &&
            participants.map((participant, index) => (
              <div key={index}>
                <MemberChilde
                  participant={participant}
                  roomId={roomId}
                  deleteSucceed={getParticipants}
                />
              </div>
            ))
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MemberDialog;
