import { createSlice } from "@reduxjs/toolkit";

export const currentnotiSlice = createSlice({
  name: "currentNoti",
  initialState: "",
  reducers: {
    setCurrentNoti: (_, action) => action.payload,
  },
});

export const { setCurrentNoti } = currentnotiSlice.actions;
export default currentnotiSlice.reducer;
