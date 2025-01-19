export interface IGiftExchange {
    GiftExchangeId: number;
    RoomId: number;
    SenderId: number;
    SenderName?: string;
    ReceiverId: number;
    ReceiverName?: string;
    PictureUrl?: string;
    GiftDescription?: string;
    Message?: string;
    DateCreated: string;
  }