import type * as Monaco from "monaco-editor";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../providers/redux/store";
import { useMonaco } from "@monaco-editor/react";
import { convertToFolder } from "../lib/FolderConvertor";
import { FolderStructureType } from "../lib/Types";
import { setEditorCode, setOpenedFile } from "../providers/redux/slices/file";
import { useWsContext } from "../providers/context/config";

const useEditorService = (
  editor: Monaco.editor.IStandaloneCodeEditor | null
) => {
  const dispatch = useDispatch();
  const { socket } = useWsContext();
  const { roomID } = useSelector((state: ReduxState) => state.room);
  const { openedFile, folderStructure } = useSelector(
    (state: ReduxState) => state.file
  );
  const monaco = useMonaco();

  //get the code for the selected file
  useEffect(() => {
    if (!openedFile) return;
    socket?.emit("get-file-content", { roomID, openedFile });
  }, [openedFile, socket, roomID]);

  //to listen for get and set editor value
  useEffect(() => {
    if (!socket) return;
    if (!socket.hasListeners("set-editor-value")) {
      socket.on("set-editor-value", (output) => {
        dispatch(setEditorCode(output));
      });
    }

    if (!socket.hasListeners("get-member-content") && editor !== null) {
      socket.on("get-member-content", (socketID) => {
        const code = editor.getValue();
        socket.emit("set-member-content", { socketID, code });
      });
    }
  }, [socket, editor, dispatch]);

  //check if  openedFile exists in the folderStructure
  useEffect(() => {
    if (!openedFile || !folderStructure) return;

    const { root } = convertToFolder(folderStructure);
    const target = openedFile.split("/");

    const checkExistence = (i: number, parent: FolderStructureType) => {
      if (!parent[target[i]]) {
        dispatch(
          setOpenedFile({
            openedFile: "",
            loc: "",
            langObj: { name: "plaintext", runCmd: "" },
          })
        );
        dispatch(setEditorCode(null));
        return;
      } else if (parent[target[i]] == "file") return;

      checkExistence(i + 1, parent[target[i]] as FolderStructureType);
    };

    checkExistence(0, root as FolderStructureType);
  }, [openedFile, folderStructure, dispatch]);

  const isRemoteUpdate = useRef(false);
  useEffect(() => {
    if (!socket || !editor || !monaco) return;
    if (socket.hasListeners("editor-content-update")) return;

    //listen for editor-content-update event from server
    socket.on(
      "editor-content-update",
      ({
        range,
        text,
        openedFile: filename,
      }: {
        range: Monaco.IRange;
        text: string;
        openedFile: string;
      }) => {
        if (openedFile !== filename) return;

        isRemoteUpdate.current = true;
        const { startColumn, startLineNumber, endColumn, endLineNumber } =
          range;
        const model = editor.getModel();

        model?.applyEdits([
          {
            range: new monaco.Range(
              startLineNumber,
              startColumn,
              endLineNumber,
              endColumn
            ),
            text,
            forceMoveMarkers: true,
          },
        ]);

        //reset the falg
        setTimeout(() => {
          isRemoteUpdate.current = false;
        }, 0);
      }
    );

    //emit keypress event to server
    const disposable = editor.onDidChangeModelContent((e) => {
      if (isRemoteUpdate.current) return;
      const { range, text } = e.changes[0];
      socket?.emit("editor-keypress", { range, text, roomID, openedFile });
    });

    return () => {
      socket.off("editor-content-update");
      disposable?.dispose();
    };
  }, [socket, editor, monaco, roomID, openedFile]);
};

export default useEditorService;
