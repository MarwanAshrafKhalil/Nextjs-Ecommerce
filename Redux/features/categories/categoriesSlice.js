import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  newCategory: {},
  isLoading: false,
  categoryUpdated: false,
  categoryDeleted: "",
  error: "",
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    openLoader: (state) => {
      state.isLoading = true;
    },

    catchError: (state, action) => {
      state.error = action.payload.message;
    },

    closeLoader: (state) => {
      state.isLoading = false;
    },

    //get
    fetchCategories: (state, action) => {
      state.data = action.payload;
    },

    //create
    createCategory: (state, action) => {
      state.newCategory = action.payload;
    },

    //update
    updateCategory: (state, action) => {
      state.categoryUpdated = action.payload;
    },

    //delete
    deleteCategory: (state, action) => {
      state.categoryDeleted = action.payload;
    },
  },
});

export default categoriesSlice.reducer;
