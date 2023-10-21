import { createSlice } from "@reduxjs/toolkit";

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: [],
  reducers: {
    getAllNotifications: (state, action) => {
      return action.payload;
    },
  },
});

export const { getAllNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
