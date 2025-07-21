import { configureStore } from "@reduxjs/toolkit";
import editor from "./slices/editor";
import file from "./slices/file";
import room from "./slices/room.test"
// import room from "./slices/room";

export const store = configureStore({
  reducer: {
    editor,
    room,
    file,
  },
});

export type ReduxState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
