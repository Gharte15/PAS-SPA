export interface Room {
  uuid: string;
  roomNumber: number;
  price: number;
  roomCapacity: number;
}

export interface Rent {
  login: string;
  roomId: string;
  beginTime: Date;
  endTime: Date;
}