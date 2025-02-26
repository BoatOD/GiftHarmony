export interface IJoinRoom {
    code: string;
    name?: string;
    giftDescription?: string;
    message?: string;
  }
  
export interface IParticipant {
    Name: string;
    PictureUrl: string;
    GiftDescription: string;
    Message: string;
}

export interface IRoom {
  RoomId: number;
  HostId: number;
  FirstName?: string;
  LastName?: string;
  RoomName: string;
  Code: string;
  DateCreated: string;
  isRoomActive: boolean;
  participantData: IParticipant;
}
