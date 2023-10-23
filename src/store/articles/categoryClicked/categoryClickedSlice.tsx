import { createSlice } from "@reduxjs/toolkit";

export const clickedNoti = createSlice({
  name: "clickedNoti",
  initialState: { isClicked: false },
  reducers: {
    notiClicked: (state, action) => {
      state.isClicked = action.payload.isClicked;
    },
  },
});

export const { notiClicked } = clickedNoti.actions;
export default clickedNoti.reducer;
