import { useForm } from "react-hook-form";
import { useContext } from "react";
import { SnackbarContext } from "../providers/SnackbarProvide";
import { IJoinRoom } from "../interface/IJoinRoom";
import { RoomApi } from "../api/RoomApi";

const useJoinRoomForm = () => {
  const { pushMessage } = useContext(SnackbarContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    clearErrors,
    setValue,
    reset,
  } = useForm<IJoinRoom>({
    defaultValues: {
      roomCode: "",
      name: "",
      giftDescription: "",
      message: "",
    },
  });

  const onFormValid = async (data: IJoinRoom) => {
    await RoomApi.joinRoom(data)
      .then(() => {
        pushMessage("Join room successfully.", "success");
      })
      .catch((error) => {
        pushMessage(
          "Failed to join room, response message: " + error.response.data,
          "error"
        );
        throw "fail";
      });
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
