import axios from "axios";

const base_url = import.meta.env.VITE_API_URL;

export const CreateRoomApi = {
  // getRoom: async () => {
  //   const response = await axios.get(`${base_url}/rooms`, {
  //     withCredentials: true, 
  //   });
  //   return response.data;
  // },

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
