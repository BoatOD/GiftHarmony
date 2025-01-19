export interface IParticipant {
  ParticipantId: number;
  RoomId: number;
  UserId: number;
  Name: string;
  PictureUrl?: string;
  GiftDescription?: string;
  Message?: string;
  DateJoined: string;
}

export interface IGetRoom {
  RoomId: number;
  HostId: number;
  Name: string;
  Code: string;
  DateCreated: string;
  isRoomActive: boolean;
}
