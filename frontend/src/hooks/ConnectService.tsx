import { useEffect } from "react";
import { io } from "socket.io-client";
import { useWsContext } from "../providers/context/config";

export const ConnectSocket = () => {
  const { setsocket } = useWsContext();

  useEffect(() => {
    const ws = io(import.meta.env.VITE_BACKEND_URL);
    if (!ws) return;
    setsocket(ws);
    return () => {
      ws.disconnect();
    };
  }, [setsocket]);

  return null;
};
