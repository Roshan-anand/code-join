import Docker from "dockerode";
import dotenv from "dotenv";
dotenv.config();
const docker = new Docker({ socketPath: process.env.DOCKER_PATH });

docker.listContainers((err) => {
  if (err) {
    console.error("Error connecting to Docker daemon:", err);
  } else {
    console.log("Containers running on host");
  }
});

export default docker;
