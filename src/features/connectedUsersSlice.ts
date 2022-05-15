import { createSlice } from "@reduxjs/toolkit";
import { IConnectedUser } from "../types";

const initialState: IConnectedUser = {
  socketId: "",
  userId: "",
};

const connectedUserSlice = createSlice({
  name: "connectedUser",
  initialState,
  reducers: {
    setConnectedUsers: (state, action) => {
      state.socketId = action.payload.socketId;
      state.userId = action.payload.userId;
    },
  },
});

export const { setConnectedUsers } = connectedUserSlice.actions;

export default connectedUserSlice.reducer;

export const fetchConnectedUsers: void =
  (data: IConnectedUser) => async (dispatch) => {
    dispatch(setConnectedUsers(data));
  };
