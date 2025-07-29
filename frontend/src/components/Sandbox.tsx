import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxState } from "../providers/redux/store";
import Terminal from "./home/Terminal";
import SideBar from "./home/SideBar";
import useResizeable from "../hooks/Resize";
import CodeEditor from "./home/CodeEditor";
import { useNavigate } from "react-router-dom";
// import CodeEditorTest from "./HomeComponents/CodeEditor.test";

const Sandbox = () => {
  const navigate = useNavigate();
  const { editorWidth } = useSelector((state: ReduxState) => state.editor);
  const { roomID } = useSelector((state: ReduxState) => state.room);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const containerRef = useRef<HTMLDivElement>(null);

  const { startSidebarResize, startEditorResize } = useResizeable({
    setWindowWidth,
    containerRef,
  });

  // access to sanbox only if roomID is present
  useEffect(() => {
    if (!roomID) navigate("/home/dashboard");
  }, [roomID, navigate]);

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
