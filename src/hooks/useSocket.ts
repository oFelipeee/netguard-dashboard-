"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function useSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    if (!socket) {
      socket = io({
        path: "/socket.io",  
        transports: ["websocket", "polling"],
      });
    }

    socket.on("connect", () => {
      console.log("✅ Socket conectado!");
      setIsConnected(true);
      setTransport(socket!.io.engine.transport.name);
    });

    socket.on("disconnect", () => {
      console.log(":( Socket desconectado");
      setIsConnected(false);
    });

    socket.on("connect_error", (error) => {
      console.error(":( Erro de conexão:", error.message);
    });

    return () => {
      socket?.off("connect");
      socket?.off("disconnect");
      socket?.off("connect_error");
    };
  }, []);

  return { socket, isConnected, transport };
}