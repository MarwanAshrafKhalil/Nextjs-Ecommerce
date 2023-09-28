import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//https://dev.to/julfikarhaidar/redux-toolkit-crud-example-with-react-hooks-4d98
const initialState = {
  data: [],
  newProduct: {},
  loading: false,
  updatedProduct: false,
  error: "",
};

export const createProduct = createAsyncThunk(
  "productsData/createProduct",
  async ({ data }, { rejectWithValue }) => {
    console.log("data: ", data);
    try {
      return await axios.post("/api/products", data).then((response) => {
        // console.log(response.data);
        return response.data;
      });
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "productsData/updateProduct",
  async ({ data, _id }, { rejectWithValue }) => {
    try {
      // console.log("id: ", _id, " data: ", data);

      return await axios
        .put("/api/products", { ...data, _id })
        .then((response) => {
          // console.log(response);
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
  "productsData/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await axios.get("/api/products").then((response) => response.data);
    } catch (err) {
      return rejectWithValue(err.response, data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "productsData/deleteProduct",
  async ({ id }) => {
    return await axios.delete("/api/products?id=" + id).then((response) => {
      // console.log(response);
      return response.data;
    });
  }
);

// export const getAProduct = createAsyncThunk(
//   "productsData/getAProduct",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axios.get("/api/products?id=" + id);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

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

    // [deleteProduct.rejected]: (state, action) => {
    //   state.loading = false;
    // },
    // [getAProduct.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [getAProduct.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.data = action.payload;
    // },
    // [getAProduct.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.message;
    // },
  },
});

export default productSlice.reducer;
