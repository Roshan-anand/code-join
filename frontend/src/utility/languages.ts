import { LangInfoType, langKey } from "./Types";

export const languagesOpt: Record<langKey, LangInfoType> = {
  javascript: {
    env: "node",
    code: "// Have fun coding!! 😃\nconsole.log('roshan is cool');",
  },
  typescript: {
    env: "node",
    code: "// Have fun coding!! 😃\nconsole.log('roshan is cool');",
  },
  python: {
    env: "python",
    code: "# Have fun coding!! 😃\nprint('roshan is cool')",
  },
  java: {
    env: "java",
    code: '// Have fun coding!! 😃\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("roshan is cool");\n    }\n}',
  },
  go: {
    env: "go",
    code: '// Have fun coding!! 😃\npackage main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("roshan is cool")\n}',
  },
  c: {
    env: "c",
    code: '// Have fun coding!! 😃\n#include <stdio.h>\n\nint main() {\n    printf("roshan is cool\\n");\n    return 0;\n}',
  },
  cpp: {
    env: "cpp",
    code: '// Have fun coding!! 😃\n#include <iostream>\n\nint main() {\n    std::cout << "roshan is cool" << std::endl;\n    return 0;\n}',
  },
};
