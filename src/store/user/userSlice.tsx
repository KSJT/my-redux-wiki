import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface userState {
  email: string;
  token: string;
  id: string;
}

const initialState: userState = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") || "")
  : {
      email: "",
      token: "",
      id: "",
    };

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ email: string; token: string; id: string }>
    ) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;

      localStorage.setItem("user", JSON.stringify(state));
    },
    removeUser: (state) => {
      state.email = "";
      state.token = "";
      state.id = "";

      localStorage.setItem("user", JSON.stringify(state));
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
