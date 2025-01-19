import axios from "axios";
import { IGiftExchange } from "../interface/IGiftExchange";
const base_url = import.meta.env.VITE_API_URL;

export const GiftExchangeApi = {
  getGiftExchange: async (roomId: number) => {
    const response = await axios.post<IGiftExchange[]>(
      `${base_url}/getGiftExchangeByRoomId`,
      { roomId: roomId },
      {
        withCredentials: true,
      }
    );
    return response.data;
  },

  exchangeGift: async (roomId: number, senderId: number, receiverId: number) => {
    const response = await axios.post(
      `${base_url}/exchangeGift`,
      { roomId: roomId, senderId: senderId, receiverId: receiverId },
      {
        withCredentials: true,
      }
    );
    return response.data;
  },
};
