import axios from "axios";

const base_url = import.meta.env.VITE_API_URL;

export const CreateRoomApi = {
  createRoom: async (data: { name: string }) => {
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
