export interface User {
  id: string;
  socketId: string;
}

export interface Room {
  roomId: string;
  currentUser: User;
  availableUser: User;
  roomURL?: string | null;
}

export interface SocketResponse {
  isUserFound: boolean;
  message: string;
  room: Room | null;
}
