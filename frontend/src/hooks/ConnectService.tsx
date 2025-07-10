import { useEffect } from "react";
import { io } from "socket.io-client";
import { useWsContext } from "../providers/context/config";

export const ConnectSocket = () => {
  const { setsocket } = useWsContext();

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL);
    if (!newSocket) return;
    setsocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [setsocket]);

  return null;
};
