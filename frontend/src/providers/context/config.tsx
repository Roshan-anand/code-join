import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";
import { Terminal as XTerminal } from "@xterm/xterm";

// Define the type for our context value
interface ContextT {
  socket: Socket | null;
  setsocket: React.Dispatch<React.SetStateAction<Socket | null>>;
  terminal: XTerminal | null;
  setTerminal: React.Dispatch<React.SetStateAction<XTerminal | null>>;
}

// Create the context with an initial undefined value
export const WsContext = createContext<ContextT | null>(null);

// Custom hook to use the MyContext
export const useWsContext = () => {
  const context = useContext(WsContext);
  if (!context) {
    throw new Error("inter error");
  }
  return context;
};
