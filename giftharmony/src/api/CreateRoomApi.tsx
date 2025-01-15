import axios from "axios";
import { ICreateRoom } from "../interface/ICreateRoom";

const base_url = import.meta.env.VITE_API_URL;

export const CreateRoomApi = {
  createRoom: async (data: ICreateRoom) => {
    const response = await axios.post(
      `${base_url}/createRoom`,
      data, 
      {
        withCredentials: true,
      }
    );
    return response.data;
  },
};
