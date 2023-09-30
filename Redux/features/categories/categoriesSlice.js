import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//https://dev.to/julfikarhaidar/redux-toolkit-crud-example-with-react-hooks-4d98
const initialState = {
  data: [],
  newCategory: {},
  loading: false,
  updatedCategory: false,
  error: "",
};

// export const createCategory = createAsyncThunk(
//   "productsData/createCategory",
//   async ({ data }, { rejectWithValue }) => {
//     console.log("data: ", data);
//     try {
//       return await axios.post("/api/products", data).then((response) => {
//         // console.log(response.data);
//         return response.data;
//       });
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const updateCategory = createAsyncThunk(
//   "productsData/updateCategory",
//   async ({ data, _id }, { rejectWithValue }) => {
//     try {
//       // console.log("id: ", _id, " data: ", data);

//       return await axios
//         .put("/api/products", { ...data, _id })
//         .then((response) => {
//           // console.log(response);
//           return response.data;
//         });
//     } catch (err) {
//       throw new Error(
//         error.response?.data?.message || "Failed to update product"
//       );
//     }
//   }
// );

export const getCategories = createAsyncThunk(
  "productsData/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      return axios.get("/api/categories").then((response) => response.data);
    } catch (err) {
      return rejectWithValue(err.response, data);
    }
  }
);

// export const deleteCategory = createAsyncThunk(
//   "productsData/deleteCategory",
//   async ({ id }) => {
//     return await axios.delete("/api/products?id=" + id).then((response) => {
//       // console.log(response);
//       return response.data;
//     });
//   }
// );

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

export const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    // [createCategory.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [createCategory.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.newProduct = action.payload;
    // },
    // [createCategory.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.message;
    // },

    [getCategories.pending]: (state, action) => {
      state.loading = true;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getCategories.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    // [updateCategory.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [updateCategory.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   // state.updatedProduct = action.payload;
    // },
    // [updateCategory.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // },

    // [deleteCategory.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [deleteCategory.fulfilled]: (state, action) => {
    //   state.loading = false;
    // },

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

export default categorySlice.reducer;
