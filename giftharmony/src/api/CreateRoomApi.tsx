import axios from "axios";

const base_url = import.meta.env.VITE_API_URL;

export const CreateRoomApi = {
  getRoom: async () => {
    const result = await axios.post(
        base_url + "/auth",
        {},
        {
          withCredentials: true,
        }
      );
    return result.data;
  },
};