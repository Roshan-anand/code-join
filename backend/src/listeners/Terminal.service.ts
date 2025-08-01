import { Socket } from "socket.io";
import { rooms } from "../configs/Socket";
import { runNonInteractiveCmd } from "./Container.service";

const TerminalOperations = (socket: Socket) => {
  // let streamCmd = "";
  socket.on("terminal-input", ({ key, roomID }) => {
    //capture backspace
    // if (key === "\u007F") {
    //   streamCmd = streamCmd.slice(0, -1);
    // } else streamCmd += key;
    const stream = rooms.get(roomID)?.streams;
    if (!stream) return;
    stream.write(key);

    // const fileCmdRegex = /\b(?:touch|mkdir|rmdir|rm|cp|mv|npm)\b/i;
    if (key == "\r") {
      //   if (fileCmdRegex.test(streamCmd))
      runNonInteractiveCmd(roomID, true);
      // streamCmd = "";
    }
  });

  socket.on("stream-run", ({ cmd, roomID, send }) => {
    runNonInteractiveCmd(roomID, send, cmd);
  });
};

export default TerminalOperations;
