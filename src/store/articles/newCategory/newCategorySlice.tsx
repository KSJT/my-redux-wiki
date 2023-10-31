import { createSlice } from "@reduxjs/toolkit";

export const newCategories = createSlice({
  name: "newCategories",
  initialState: [],
  reducers: {
    addNewCategory: (state, action) => {
      return action.payload;
    },
  },
});

export const { addNewCategory } = newCategories.actions;
export default newCategories.reducer;
