import { useForm } from "react-hook-form";
import { ICreateRoom } from "../interface/ICreateRoom";
import { useContext } from "react";
import { SnackbarContext } from "../providers/SnackbarProvide";
import { RoomApi } from "../api/RoomApi";

const useCreateRoomForm = () => {
  const { pushMessage } = useContext(SnackbarContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    clearErrors,
    setValue,
    reset,
  } = useForm<ICreateRoom>({
    defaultValues: {
      name: "",
    },
  });

  const onFormValid = async (data: ICreateRoom) => {
    await RoomApi.createRoom(data)
      .then(() => {
        pushMessage("Create room successfully.", "success");
      })
      .catch((error) => {
        pushMessage(
          "Failed to create room, response message: " + error.response.data,
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

export default useCreateRoomForm;
