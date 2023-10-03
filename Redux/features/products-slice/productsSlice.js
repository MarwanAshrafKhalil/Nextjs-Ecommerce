import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  newProduct: {},
  isLoading: false,
  productUpdated: false,
  productDeleted: false,
  error: "",
};

export const productSlice = createSlice({
  name: "products",
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
    fetchProducts: (state, action) => {
      state.data = action.payload;
    },

    //create
    createProduct: (state, action) => {
      state.newProduct = action.payload;
    },

    //update
    updateProduct: (state, action) => {
      state.productUpdated = action.payload;
    },

    //delete
    deleteProduct: (state, action) => {
      state.productDeleted = action.payload;
    },
  },
});

export default productSlice.reducer;
