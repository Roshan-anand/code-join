import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../providers/redux/store";
import { useWsContext } from "../providers/context/config";

const useTerminalService = () => {
  //socket from context
  const { socket, terminal } = useWsContext();

  //global state from redux
  const dispatch = useDispatch();
  const { roomID } = useSelector((state: ReduxState) => state.room);

  //terminal socket events captured
  useEffect(() => {
    if (!socket || !terminal) return;
    if (socket.listeners("terminal-output").length == 1) return;

    //to listen terminal output
    socket.on("terminal-output", (data: string) => {
      terminal.write(data);
    });

    return () => {
      socket.off("terminal-output");
    };
  }, [socket, terminal, dispatch]);

  //function to emmit terminal input
  const setTerminalInput = (key: string) => {
    socket?.emit("terminal-input", { key, roomID });
  };

  //function to run non interactive command
  const runStream = (cmd: string, send: boolean) => {
    socket?.emit("stream-run", {
      cmd,
      roomID,
      send,
    });
  };

  return { setTerminalInput, runStream };
};

export default useTerminalService;
