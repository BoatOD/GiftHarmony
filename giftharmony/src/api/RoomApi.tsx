import axios from "axios";
import { ICreateRoom } from "../interface/ICreateRoom";
import {IJoinRoom } from "../interface/IJoinRoom";
import { IGetRoom } from "../interface/IGetRoom";
const base_url = import.meta.env.VITE_API_URL;

export const RoomApi = {
  getRoom: async (): Promise<IGetRoom> => {
    const response = await axios.get<IGetRoom>(`${base_url}/getRoom`, {
      withCredentials: true,
    });
    return response.data;
  },

  createRoom: async (data: ICreateRoom) => {
    const response = await axios.post(`${base_url}/createRoom`, data, {
      withCredentials: true,
    });
    return response.data;
  },

  joinWithUserId: async (data: IJoinRoom) => {
    const response = await axios.post(`${base_url}/joinWithUserId`, data, {
      withCredentials: true,
    });
    return response.data;
  },

  joinWithoutUserId: async (data: IJoinRoom) => {
    const response = await axios.post(`${base_url}/joinWithoutUserId`, data, {
      withCredentials: true,
    });
    return response.data;
  },
};
