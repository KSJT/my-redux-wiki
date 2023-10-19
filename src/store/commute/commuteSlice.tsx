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
    setIsCommute: (state, action) => {
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

export const { setIsCommute, setCommuteTime, setLeaveTime } =
  commuteSlice.actions;
export default commuteSlice.reducer;
