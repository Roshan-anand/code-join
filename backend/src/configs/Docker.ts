import Docker from "dockerode";
import dotenv from "dotenv";
dotenv.config();
const docker = new Docker({ socketPath: process.env.DOCKER_PATH });
// const docker = new Docker();

// const options = dockerOpts();
// const docker = new Docker(options);

docker.listContainers((err, containers) => {
  if (err) {
    console.error("Error connecting to Docker daemon:", err);
  } else {
    console.log("Containers running on remote host:", containers?.[0]?.Id);
  }
});

export default docker;
