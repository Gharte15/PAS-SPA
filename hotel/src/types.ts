export interface Room {
  uuid: string;
  roomNumber: number;
  price: number;
  roomCapacity: number;
}

export interface User {
  uuid: string;
  login: string;
  accessLevel: string;
}

export interface Rent {
  id: string;
  login: string;
  roomId: string;
  beginTime: Date;
  endTime: Date;
}