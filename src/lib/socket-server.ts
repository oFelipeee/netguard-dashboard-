import { Server as HTTPServer } from "http";
import { Server as SocketServer } from "socket.io";

let io: SocketServer | null = null;

export function getSocketServer(httpServer: HTTPServer) {
  if (!io) {
    io = new SocketServer(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("Novo Cliente conectado:", socket.id);

      socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
      });
    });
  }

  return io;
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.io não inicializado");
  }
  return io;
}