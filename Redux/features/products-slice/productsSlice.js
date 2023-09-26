import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//https://dev.to/julfikarhaidar/redux-toolkit-crud-example-with-react-hooks-4d98
const initialState = {
  // title: "{ type: String, required: true }",
  // description: "String",
  // price: 0,
  // images: [""],
  // category: {},
  // properties: {},
  //   id:'', re-check
  data: [],
  loading: false,
  error: "",
};

export const createProduct = createAsyncThunk(
  "productsData/createProduct",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/products", data);
      // toast.success("Added Successfully");
      // navigate("/dashboard");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProducts = createAsyncThunk("productsData/getProducts", () => {
  return axios.get("/api/products").then((response) => response.data);
});

export const getAProduct = createAsyncThunk(
  "productsData/getAProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/products?id=" + id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// export const updateProduct = createAsyncThunk(
//   "productsData/updateProduct",
//   async ({ _id: id, data }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put("/api/products", { ...data, _id });
//       // toast.success("Tour Updated Successfully");
//       // navigate("/dashboard");
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const deleteProduct = createAsyncThunk(
//   "productsData/deleteProduct",
//   async ({ id, toast }, { rejectWithValue }) => {
//     try {
//       const response = await axios.delete("/api/products?id=" + id);
//       // toast.success("Tour Deleted Successfully");
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

export const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    // catchError: (state, action) => {
    //   state.error = action.payload;
    // },
    // setProductsData: (state, action) => {
    //   let data = action.payload;
    //   // await axios.put("/api/products", { ...data, _id })
    // },
    // updateProductsData: (state, action) => {
    //   let data = action.payload;
    //   // axios.post("/api/products", data)
    // },
    // deleteProductsData: (state, action) => {
    //   let data = action.payload; // need to get the id
    //   // await axios.delete("/api/products?id=" + id);
    // },
  },
  extraReducers: {
    [createProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getAProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [getAProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getAProduct.rejected]: (state, action) => {
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

    // [updateProduct.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [updateProduct.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   const {
    //     arg: { id },
    //   } = action.meta;
    //   if (id) {
    //     state.userTours = state.userTours.map((item) =>
    //       item._id === id ? action.payload : item
    //     );
    //     state.tours = state.tours.map((item) =>
    //       item._id === id ? action.payload : item
    //     );
    //   }
    // },
    // [updateProduct.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.message;
    // },
    // [deleteProduct.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [deleteProduct.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   const {
    //     arg: { id },
    //   } = action.meta;
    //   if (id) {
    //     state.userTours = state.userTours.filter((item) => item._id !== id);
    //     state.tours = state.tours.filter((item) => item._id !== id);
    //   }
    // },
    // [deleteProduct.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.message;
    // },
  },
});

export default productSlice.reducer;
