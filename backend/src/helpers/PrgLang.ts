import { langKey, ProjectInfo } from "./Types";

export const projects: Record<langKey, ProjectInfo> = {
  NodeJS: {
    image: "nodeboiler",
    port: "5000",
    dir: "/server",
    cmd: ["bash", "-c", "rm -rf ../app && bash"],
  },

  GOlang: {
    image: "goboiler",
    port: "8080",
    dir: "/app",
    cmd: ["bash"],
  },
  ReactJS: {
    image: "nodeboiler",
    port: "5173",
    dir: "/app",
    cmd: ["bash", "-c", "rm -rf ../server && npm i && bash"],
  },
};
