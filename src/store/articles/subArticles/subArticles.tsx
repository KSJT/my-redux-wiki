import { createSlice } from "@reduxjs/toolkit";

export const subArticles = createSlice({
  name: "subArticles",
  initialState: [],
  reducers: {
    getAllSubArticles: (_, action) => {
      return action.payload;
    },
  },
});

export const { getAllSubArticles } = subArticles.actions;
export default subArticles.reducer;
