import { useForm } from "react-hook-form";
import { useContext } from "react";
import { SnackbarContext } from "../providers/SnackbarProvide";
import { IJoinRoom } from "../interface/IJoinRoom";
import { RoomApi } from "../api/RoomApi";
import { UserContext } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";

const useJoinRoomForm = () => {
  const { pushMessage } = useContext(SnackbarContext);
  const { profile } = useContext(UserContext);
  const navigate = useNavigate();
  

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    clearErrors,
    setValue,
    reset,
  } = useForm<IJoinRoom>({
    defaultValues: {
      code: "",
      name: profile?.name || "",
      giftDescription: "",
      message: "",
    },
  });

  const onFormValid = async (data: IJoinRoom) => {
    try {
      const rooms = await RoomApi.getAllRoom();
      const matchedRoom = rooms.find((room) => room.Code === data.code);

      if (!matchedRoom) {
        pushMessage("Invalid room code. Please try again.", "error");
        throw new Error("Room code not found.");
      }

      if (profile) await RoomApi.joinWithUserId(data);
      else await RoomApi.joinWithoutUserId(data);

      const roomData = {
        Name: matchedRoom.Name,
        Code: matchedRoom.Code,
        RoomId: matchedRoom.RoomId
      };

      pushMessage("Joined room successfully.", "success");
      navigate(`/joinroom`, { state: { room: roomData, userName: data.name} });
    } catch (error) {
      if (error instanceof Error) {
        pushMessage(
          "Failed to join room. Please try again. Error: " + error.message,
          "error"
        );
      } else {
        pushMessage("An unexpected error occurred.", "error");
      }
      throw error;
    }
  };

  const onSubmit = handleSubmit(onFormValid);

  return {
    onSubmit,
    register,
    errors,
    isSubmitting,
    clearErrors,
    setValue,
    reset,
    isSubmitSuccessful,
  };
};

export default useJoinRoomForm;
