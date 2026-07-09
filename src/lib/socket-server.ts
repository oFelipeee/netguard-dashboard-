import { Server as SocketServer } from "socket.io";

declare global {
  var io: SocketServer | undefined;
}

export function getIO() {
  if (!global.io) {
    throw new Error("Socket.io não inicializado");
  }
  return global.io;
}