import {
  createSlice,
  PayloadAction,
  AnyAction,
  Dispatch,
} from "@reduxjs/toolkit";
import { socket } from "../config/socket";
import { IUser } from "../types";

export interface IUserState {
  user: IUser;
}

const initialState: IUser = {
  _id: "",
  name: "",
  email: "",
  avatarUrl: "",
  isLoggedIn: false,
  isConnected: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoginDetails: (state: IUser, { payload }: PayloadAction<IUser>) => {
      state._id = payload._id;
      state.name = payload.name;
      state.email = payload.email;
      state.avatarUrl = payload.avatarUrl;
      state.isLoggedIn = true;
      state.isConnected = true;
    },
    setSignOutUser: (state: IUser) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.avatarUrl = "";
      state.isLoggedIn = false;
      state.isConnected = false;
    },
  },
});

export const { setUserLoginDetails, setSignOutUser } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: IUserState) => state.user;

export const fetchLoginUser = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/login/success`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();
    if (data.success) {
      dispatch(setUserLoginDetails(data.user));
      await socket.emit("user_connected", data.user);
    }
  } catch (err) {
    console.log(err);
  }
};
