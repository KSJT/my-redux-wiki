import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: { isCheck: false },
  reducers: {
    setModal: (state, action) => {
      state.isCheck = action.payload.isCheck;
    },
  },
});

export const { setModal } = modalSlice.actions;
export default modalSlice.reducer;
