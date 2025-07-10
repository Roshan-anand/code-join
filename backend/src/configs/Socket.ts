import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import RoomOperations from "../listeners/Room.service";
import { Room } from "../helpers/Types";
import TerminalOperations from "../listeners/Terminal.service";
import { StopContainer } from "../listeners/Container.service";
import EditorOperations from "../listeners/Editor.service";
import RoomTestOperation from "../listeners/Room_test.service";

//global object to store rooms information
export const rooms: Room = new Map([
  [
    "123",
    {
      containerID:
        "f381a21b1f5b1232a23524987b088802e75cadcf661b8f06621850666b701885",
      streams: [],
      members: new Map(),
    },
  ],
]);

//to initilize socket
let io: SocketServer;
export const initSocket = (server: HttpServer) => {
  io = new SocketServer(server, {
    cors: {
      origin: process.env.EXTERNAL_FRONTEND_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected");

    RoomOperations(socket);
    TerminalOperations(socket);
    EditorOperations(socket);
    RoomTestOperation(socket);

    //on user disconnect
    socket.on("disconnect", () => {
      for (const [roomID, room] of rooms) {
        if (room.members.has(socket.id)) {
          room.members.delete(socket.id);
          if (room.members.size === 0) {
            // test
            rooms.get(roomID)!.streams = [];
            // StopContainer(room.containerID);
            // rooms.delete(roomID);
          }
          console.log("User disconnected");
          break;
        }
      }
    });
  });
};

export const getIO = (): SocketServer => {
  if (!io) throw new Error("IO not initialized");
  return io;
};
