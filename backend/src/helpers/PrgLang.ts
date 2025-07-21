import { langKey, ProjectInfo } from "./Types";

export const projects: Record<langKey, ProjectInfo> = {
  NodeJS: {
    image: "nodeboiler",
    port: "5000",
  },
  GOlang: {
    image: "goboiler",
    port: "8080",
  },
  ReactJS: {
    image: "reactboiler",
    port: "5173",
  },
};
