import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  newCategory: {},
  loading: false,
  updatedCategory: false,
  CategoryDeleted: "",
  error: "",
};

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async ({ data }, { rejectWithValue }) => {
    console.log("data: ", data);
    try {
      return await axios
        .post("/api/categories", { ...data })
        .then((response) => {
          return response.data;
        });
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ data }, { rejectWithValue }) => {
    try {
      console.log(" data: ", data);

      return await axios
        .put("/api/categories", { ...data })
        .then((response) => {
          return response.data;
        });
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      return await axios
        .get("/api/categories")
        .then((response) => response.data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteACategory = createAsyncThunk(
  "categories/deleteACategory",
  async ({ _id }, { rejectWithValue }) => {
    try {
      console.log("the id: ", _id);
      return await axios
        .delete("/api/categories?=id" + _id)
        .then((response) => response.data);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [createCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [createCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.newCategory = action.payload;
    },
    [createCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

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

    [updateCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.updatedCategory = action.payload;
    },
    [updateCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },

    [deleteACategory.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteACategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.CategoryDeleted = action.payload;
    },

    [deleteACategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default categorySlice.reducer;
