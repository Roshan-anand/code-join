import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  editorWidth: number;
  editorHeight: number;
  activeSection: "code" | "terminal" | "opt" | null;
}

const initialState: initialStateType = {
  editorWidth: 2000,
  editorHeight: 900,
  activeSection: null,
};

const editorSlice = createSlice({
  name: "resize",
  initialState,
  reducers: {
    setEditorWidth: (state, action) => {
      state.editorWidth = action.payload;
    },
    setEditorHeight: (state, action) => {
      state.editorHeight = action.payload;
    },
    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },
  },
});

export const { setEditorHeight, setEditorWidth, setActiveSection } =
  editorSlice.actions;
export default editorSlice.reducer;
