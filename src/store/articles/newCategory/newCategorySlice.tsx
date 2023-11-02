import { createSlice } from "@reduxjs/toolkit";

export const newCategories = createSlice({
  name: "newCategories",
  initialState: [],
  reducers: {
    addNewCategory: (_, action) => {
      return action.payload;
    },
  },
});

export const { addNewCategory } = newCategories.actions;
export default newCategories.reducer;
