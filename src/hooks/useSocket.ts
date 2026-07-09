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
        path: "/api/socketio",
      });
    }

    socket.on("connect", () => {
      setIsConnected(true);
      setTransport(socket!.io.engine.transport.name);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket?.off("connect");
      socket?.off("disconnect");
    };
  }, []);

  return { socket, isConnected, transport };
}