import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "../providers/redux/store";
import Terminal from "../components/HomeComponents/Terminal";
import SideBar from "../components/HomeComponents/SideBar";
import useResizeable from "../hooks/Resize";
import CodeEditor from "../components/HomeComponents/CodeEditor";
// import CodeEditorTest from "../components/HomeComponents/CodeEditor_test";

const Sandbox = () => {
  const { editorWidth } = useSelector((state: ReduxState) => state.editor);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const containerRef = useRef<HTMLDivElement>(null);

  const { startSidebarResize, startEditorResize } = useResizeable({
    setWindowWidth,
    containerRef,
  });

  return (
    <main
      ref={containerRef}
      className="h-[90%] w-[99%] mx-auto flex gap-2 px-3"
    >
      <SideBar />
      <button
        className="my-2 resize-btn cursor-ew-resize w-[5px] after:w-full after:h-[50px]"
        onMouseDown={startSidebarResize}
        onTouchStart={startSidebarResize}
      ></button>

      <section
        className=" flex flex-col gap-2"
        style={{
          width: `clamp(50%,${editorWidth}px,${windowWidth - 110}px)`,
        }}
      >
        <CodeEditor />
        {/* <CodeEditorTest /> */}
        <button
          className="mx-2 resize-btn cursor-ns-resize h-[5px] after:w-[50px] after:h-full"
          onMouseDown={startEditorResize}
          onTouchStart={startEditorResize}
        ></button>

        <Terminal />
      </section>
    </main>
  );
};

export default Sandbox;
