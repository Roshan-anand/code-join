import internal from "stream";

export type langKey = "NodeJS" | "GOlang" | "ReactJS";

export type ProjectInfo = {
  image: string;
  dir: string;
  cmd: string[];
  port: string;
};

//type for rooms object
export type Room = Map<
  string,
  {
    containerID: string;
    streams: internal.Duplex | undefined;
    members: Map<
      string,
      { name: string; profile: string; currFile: string | null }
    >;
  }
>;
