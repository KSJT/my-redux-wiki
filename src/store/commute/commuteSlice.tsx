import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCommute: false,
  commuteTime: "",
  leaveTime: "",
};

const commuteSlice = createSlice({
  name: "commute",
  initialState: initialState,
  reducers: {
    setTimerOn: (state, action) => {
      state.isCommute = action.payload;
    },
    setCommuteTime: (state, action) => {
      state.commuteTime = action.payload;
    },
    setLeaveTime: (state, action) => {
      state.leaveTime = action.payload;
    },
  },
});

export const { setTimerOn, setCommuteTime, setLeaveTime } =
  commuteSlice.actions;
export default commuteSlice.reducer;
