import axios from "axios";
import { ICreateRoom } from "../interface/ICreateRoom";
import { IJoinRoom, IRoom } from "../interface/IJoinRoom";
import { IGetRoom, IParticipant } from "../interface/IGetRoom";
const base_url = import.meta.env.VITE_API_URL;

export const RoomApi = {
  getRoom: async () => {
    const response = await axios.get<IGetRoom[]>(`${base_url}/getRoom`, {
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

  getParticipant: async (roomId: number) => {
    const response = await axios.post<IParticipant[]>(
      `${base_url}/getParticipant`, 
      { roomId : roomId }, 
      {
        withCredentials: true, 
      }
    );
    return response.data;
  },

  getJoinRoom: async () => {
    const response = await axios.get<IRoom[]>(`${base_url}/getJoinedRoom`, {
      withCredentials: true,
    });
    return response.data;
  },

  getAllRoom: async () => {
    const response = await axios.get<IGetRoom[]>(`${base_url}/getAllRoom`, {
      withCredentials: true,
    });
    return response.data;
  },
};
