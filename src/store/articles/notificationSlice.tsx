import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  author: "",
  title: "",
  id: "",
  text: "",
  timestamp: "",
  url: "",
};
export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    getRecentNoti: (state, action) => {
      state.author = action.payload.author;
      state.title = action.payload.title;
      state.id = action.payload.id;
      state.text = action.payload.text;
      state.timestamp = action.payload.timestamp;
      state.url = action.payload.url;
    },
  },
});

export const { getRecentNoti } = notificationSlice.actions;
export default notificationSlice.reducer;
