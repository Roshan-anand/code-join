import { IconType } from "react-icons";

//all RTK Query types
export type getFileCodeArg = { roomID: string; fileLoc: string };
export type getFileCodeRes = { output: string };

export type FolderStructureType = {
  [key: string]: "file" | FolderStructureType;
};

export type Project = {
  title: string;
  description: string;
  icon: IconType;
  image: string;
  type: "Language" | "Website";
  runCmd: string;
};
