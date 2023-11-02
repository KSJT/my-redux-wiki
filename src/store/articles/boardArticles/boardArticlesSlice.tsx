import { createSlice } from "@reduxjs/toolkit";

const boardArticles = createSlice({
  name: "boardAarticles",
  initialState: [],
  reducers: {
    getBoardArticles: (_, action) => {
      return action.payload;
    },
  },
});

export const { getBoardArticles } = boardArticles.actions;
export default boardArticles.reducer;
