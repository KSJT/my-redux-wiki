import { createSlice } from "@reduxjs/toolkit";

const isEditCategory = createSlice({
  name: "isEditCategory",
  initialState: false,
  reducers: {
    setIsEditCategory: (_, action) => {
      return action.payload;
    },
  },
});

export const { setIsEditCategory } = isEditCategory.actions;
export default isEditCategory.reducer;
