import { useForm } from "react-hook-form";
import { useContext } from "react";
import { SnackbarContext } from "../providers/SnackbarProvide";
import { IJoinRoom } from "../interface/IJoinRoom";
import { RoomApi } from "../api/RoomApi";
import { UserContext } from "../providers/UserProvider";

const useJoinRoomForm = () => {
  const { pushMessage } = useContext(SnackbarContext);
  const { profile } = useContext(UserContext);

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
      name: "",
      giftDescription: "",
      message: "",
    },
  });

  const onFormValid = async (data: IJoinRoom) => {
    if (profile) await RoomApi.joinWithUserId(data);
    else await RoomApi.joinWithoutUserId(data)
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
