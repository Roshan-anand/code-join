import docker from "../configs/Docker";
import { getIO, rooms } from "../configs/Socket";
import { Socket } from "socket.io";
import { langKey } from "../helpers/Types";
import { projects } from "../helpers/PrgLang";
import internal from "stream";
//funtion to create a container
export const createContainer = async (
  title: langKey,
  roomID: string
): Promise<{ containerID?: string; stream?: internal.Duplex }> => {
  try {
    // Creating a container with proper command array
    let container = await docker.createContainer({
      name: roomID,
      Image: projects[title].image,
      AttachStdin: true,
      AttachStdout: true,
      Tty: true,
      WorkingDir: projects[title].dir,
      Labels: {
        "traefik.enable": "true",
        "traefik.constraint-label": "codejoin-dev",
        [`traefik.http.routers.${roomID}.entrypoints`]: "web",
        [`traefik.http.services.${roomID}.loadbalancer.server.port`]:
          projects[title].port,
      },
      HostConfig: {
        NetworkMode: "codejoin_net",
      },
      Cmd: projects[title].cmd,
    });

    await container.start();

    // to create new stream for the project
    const io = getIO();
    const exec1 = await container.exec({
      Cmd: ["bash"],
      AttachStdout: true,
      AttachStderr: true,
      AttachStdin: true,
      Tty: true,
    });
    const stream = await exec1.start({ hijack: true, stdin: true });
    stream.on("data", (data) => {
      io.to(roomID).emit("terminal-output", data.slice(8).toString());
    });

    return { containerID: container.id, stream };
  } catch (err) {
    console.error("Error creating container:", err);
    return {};
  }
};

//function to run non interactive commands
export const runNonInteractiveCmd = async (
  roomID: string,
  send: boolean,
  cmd?: string
) => {
  const io = getIO();
  const container = docker.getContainer(rooms.get(roomID)!.containerID);

  //to send folder details
  if (send) {
    const exec = await container.exec({
      Cmd: ["bash", "-c", 'ls ./ -R --ignore="node_modules"'],
      AttachStdout: true,
      AttachStderr: true,
    });
    const stream = await exec.start({ hijack: true });
    let output = "";
    stream.on("data", (data) => {
      output += data.slice(8).toString();
    });
    stream.on("end", () => {
      io.to(roomID).emit("folder-details", output);
    });
  }

  //if cmd is passed then only run the command no need of stream
  if (cmd) {
    const exec = await container.exec({
      Cmd: ["bash", "-c", cmd],
      AttachStdout: true,
      AttachStderr: true,
    });
    const stream = await exec.start({ hijack: true });
    stream.end();
  }
};

export const GetFileCode = async (
  roomID: string,
  fileLoc: string,
  socket: Socket
) => {
  try {
    const containerID = rooms.get(roomID as string)!.containerID;
    const container = docker.getContainer(containerID);
    const exec = await container.exec({
      Cmd: ["cat", fileLoc as string],
      AttachStdout: true,
      AttachStderr: true,
    });
    const stream = await exec.start({ hijack: true });
    let output: string = "";
    stream
      .on("data", (data) => {
        output += data.slice(8).toString();
      })
      .on("end", () => {
        socket.emit("set-editor-value", output);
      });
  } catch (err) {
    console.log(err);
    socket.emit("error", "Error in getting file content, please try again");
  }
};

//to stop and remove the container
export const StopContainer = async (containerID: string) => {
  try {
    let container = docker.getContainer(containerID);
    await container.stop();
    await container.remove();
    console.log("Container stopped and removed");
  } catch (err) {
    console.log(err);
  }
};
