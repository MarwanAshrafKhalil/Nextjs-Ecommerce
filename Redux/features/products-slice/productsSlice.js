import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
  "products/createProduct",
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

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/categories");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/products?id=" + id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ _id: id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put("/api/products", { ...data, _id });
      // toast.success("Tour Updated Successfully");
      // navigate("/dashboard");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await axios.delete("/api/products?id=" + id);
      // toast.success("Tour Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const productSlice = createSlice({
  name: "productsData",
  initialState: initialState,
  reducers: {
    catchError: (state, action) => {
      state.error = action.payload;
    },

    setProductsData: (state, action) => {
      let data = action.payload;
      // await axios.put("/api/products", { ...data, _id })
    },

    updateProductsData: (state, action) => {
      let data = action.payload;
      // axios.post("/api/products", data)
    },

    deleteProductsData: (state, action) => {
      let data = action.payload; // need to get the id
      // await axios.delete("/api/products?id=" + id);
    },
  },
});
