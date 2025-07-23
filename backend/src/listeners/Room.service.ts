import { Socket } from "socket.io";
import { removeUserFromRoom, rooms } from "../configs/Socket";
import {
  createContainer,
  createNewStream,
  runNonInteractiveCmd,
} from "./Container.service";
import crypto from "crypto";

const RoomOperations = (socket: Socket) => {
  //event to create a room
  socket.on("create-room", async ({ name, profile, title }) => {
    //generate a random room id using crypto
    const roomID = crypto.randomBytes(8).toString("hex");

    if (rooms.has(roomID)) {
      socket.emit("error", "Room already exists");
    } else {
      const { containerID } = await createContainer(title, roomID);
      //if container is not created then emit error
      if (!containerID) {
        socket.emit("error", "Error while creating the environment");
        return;
      }

      //add a new room
      rooms.set(roomID, {
        containerID,
        streams: [],
        members: new Map(),
      });

      runNonInteractiveCmd(roomID, true);
      createNewStream(roomID);

      rooms
        .get(roomID)!
        .members.set(socket.id, { name, profile, currFile: null });
      socket.join(roomID);
      socket.emit("room-created", { roomID, containerID });
    }
  });

  //event to join a room
  socket.on("join-room", ({ roomID, name, profile }) => {
    if (rooms.has(roomID)) {
      rooms
        .get(roomID)!
        .members.set(socket.id, { name, profile, currFile: null });
      socket.join(roomID);
      socket.emit("room-joined", roomID);

      runNonInteractiveCmd(roomID, true);
    } else {
      socket.emit("error", "Room does not exist");
    }
  });

  //event to leave the sandbox
  socket.on("leave-sandbox", () => {
    removeUserFromRoom(socket.id);
  });
};

export default RoomOperations;
