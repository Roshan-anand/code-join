import { FaNodeJs, FaReact } from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";

import { Project } from "./Types";

//languages to set for monaco editor
export const langExt: Record<string, string> = {
  jsx: "javascript",
  css: "css",
  js: "javascript",
  py: "python",
  go: "go",
  json: "json",
  md: "markdown",
  html: "html",
};

export const projects: Project[] = [
  {
    title: "NodeJS",
    description:
      "Nodejs is an open-source, cross-platform, back-end JavaScript runtime environment.",
    icon: FaNodeJs,
    type: "Language",
    runCmd: "node src/index.js",
  },
  {
    title: "GOlang",
    description:
      "Go is an open-source programming language that makes it easy to build simple, reliable, and efficient software.",
    icon: FaGolang,
    type: "Language",
    runCmd: "go run cmd/main.go",
  },
  {
    title: "ReactJS",
    description:
      "ReactJS is a JavaScript library for building user interfaces, particularly single-page applications where you can create reusable UI components.",
    icon: FaReact,
    type: "Website",
    runCmd: "npm run dev",
  },
];
