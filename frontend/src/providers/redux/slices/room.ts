import { createSlice } from "@reduxjs/toolkit";

interface RoomState {
  userName: string | null;
  email: string | null;
  profile: string | null;
  roomID: string | null;
  devUrl: string | null;
}

const initialState: RoomState = {
  roomID: null,
  userName: null,
  email: null,
  profile: null,
  devUrl: null,
};
const RoomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setBasicDetails: (state, action) => {
      const { name, email, profile } = action.payload;
      state.userName = name;
      state.email = email;
      state.profile = profile;
    },
    setRoomInfo: (state, action) => {
      const { roomID, devUrl } = action.payload;
      state.roomID = roomID;
      state.devUrl = `https://${devUrl}.${import.meta.env.VITE_SUBDOMAIN}`;
    },
  },
});

export const { setBasicDetails, setRoomInfo } = RoomSlice.actions;
export default RoomSlice.reducer;
