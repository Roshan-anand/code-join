import React, { useState, ReactNode } from "react";
import { Socket } from "socket.io-client";
import { Terminal as XTerminal } from "@xterm/xterm";
import { WsContext } from "./config";
const ContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [socket, setsocket] = useState<Socket | null>(null);
  const [terminal, setTerminal] = useState<XTerminal | null>(null);

  const disconnect = () => {
    if (socket) {
      socket.disconnect();
      setsocket(null);
      console.log("Socket disconnected");
    }
  };
  return (
    <WsContext.Provider value={{ socket, setsocket, terminal, setTerminal, disconnect }}>
      {children}
    </WsContext.Provider>
  );
};

export default ContextProvider;
