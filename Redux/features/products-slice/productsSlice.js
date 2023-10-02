import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  newProduct: {},
  loading: false,
  updatedProduct: false,
  error: "",
};

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async ({ data }, { rejectWithValue }) => {
    console.log("data: ", data);
    try {
      return await axios.post("/api/products", data).then((response) => {
        return response.data;
      });
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ data, _id }, { rejectWithValue }) => {
    try {
      return await axios
        .put("/api/products", { ...data, _id })
        .then((response) => {
          return response.data;
        });
    } catch (err) {
      throw new Error(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await axios.get("/api/products").then((response) => response.data);
    } catch (err) {
      return rejectWithValue(err.response, data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ id }) => {
    return await axios.delete("/api/products?id=" + id).then((response) => {
      // console.log(response);
      return response.data;
    });
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [createProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.newProduct = action.payload;
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [updateProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.loading = false;
      // state.updatedProduct = action.payload;
    },
    [updateProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },

    [deleteProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false;
    },
  },
});

export default productSlice.reducer;
