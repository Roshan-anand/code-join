import { createSlice } from "@reduxjs/toolkit";
interface TerminalStateType {
  editorLang: string | null;
  editorCode: string | null;
  openedFile: string | null;
  currentFolder: string;
  runCmd: string | null;
  sideBarOpt: string | null;
  folderStructure: string | null;
}

const initialState: TerminalStateType = {
  editorLang: null,
  editorCode: null,
  openedFile: null,
  currentFolder: "",
  runCmd: null,
  sideBarOpt: "fileopt",
  folderStructure: null,
};

const FileSlice = createSlice({
  name: "terminal",
  initialState,
  reducers: {
    setOpenedFile: (state, action) => {
      const { lang, openedFile, loc } = action.payload;
      state.editorLang = lang;
      state.openedFile = openedFile;
      state.currentFolder = loc;
    },
    setSideBarOpt: (state, action) => {
      state.sideBarOpt = action.payload;
    },
    setFolderStructure: (state, action) => {
      state.folderStructure = action.payload;
    },
    setEditorCode: (state, action) => {
      state.editorCode = action.payload;
    },
    setCurrentFolder: (state, action) => {
      state.currentFolder = action.payload;
    },
    setRunCmd: (state, action) => {
      state.runCmd = action.payload;
    },
  },
});

export const {
  setOpenedFile,
  setEditorCode,
  setSideBarOpt,
  setFolderStructure,
  setCurrentFolder,
  setRunCmd,
} = FileSlice.actions;

export default FileSlice.reducer;
