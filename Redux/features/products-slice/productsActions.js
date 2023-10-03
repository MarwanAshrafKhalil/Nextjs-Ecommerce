import * as requestFromServer from "./productsCrud";
import { productSlice } from "./productsSlice";

const { actions: productsActions } = productSlice;

export const getProducts = () => (dispatch) => {
  dispatch(productsActions.openLoader());
  return requestFromServer
    .getProductsData()
    .then((response) => {
      dispatch(productsActions.fetchProducts(response.data));
    })
    .catch((error) => {
      dispatch(productsActions.catchError({ error }));
    })
    .finally(() => {
      dispatch(productsActions.closeLoader());
    });

  //   "products/getProducts",
  //   async (_, { rejectWithValue }) => {
  //     try {
  //       return await axios.get("/api/products").then((response) => response.data);
  //     } catch (err) {
  //       return rejectWithValue(err.response, data);
  //     }
};

export const createProduct =
  ({ data }) =>
  (dispatch) => {
    dispatch(productsActions.openLoader());
    return requestFromServer
      .createAProduct(data)
      .then((response) => {
        dispatch(productsActions.createProduct(response.data));
      })
      .catch((error) => {
        dispatch(productsActions.catchError(error));
      })
      .finally(() => {
        dispatch(productsActions.closeLoader());
      });
  };

// "products/createProduct",
//   async ({ data }, { rejectWithValue }) => {
//     console.log("data: ", data);
//     try {
//       return await axios.post("/api/products", data).then((response) => {
//         return response.data;
//       });
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }

export const updateProduct =
  ({ data, id }) =>
  (dispatch) => {
    dispatch(productsActions.openLoader());
    return requestFromServer
      .updateAProduct(data, id)
      .then((response) => {
        dispatch(productsActions.updateProduct(response.data));
      })
      .catch((error) => {
        dispatch(productsActions.catchError(error));
      })
      .finally(() => {
        dispatch(productsActions.closeLoader());
      });
  };

// "products/updateProduct",
//   async ({ data, _id }, { rejectWithValue }) => {
//     try {
//       return await axios
//         .put("/api/products", { ...data, _id })
//         .then((response) => {
//           return response.data;
//         });
//     } catch (err) {
//       throw new Error(
//         error.response?.data?.message || "Failed to update product"
//       );
//     }

export const deleteProduct =
  ({ id }) =>
  (dispatch) => {
    console.log("id-delete: ", id);
    dispatch(productsActions.openLoader());
    requestFromServer
      .deleteAProduct(id)
      .then((response) => {
        dispatch(productsActions.deleteProduct(response.data));
      })
      .catch((error) => {
        dispatch(productsActions.catchError(error));
      })
      .finally(() => {
        dispatch(productsActions.closeLoader());
      });
  };

// "products/deleteProduct",
// async ({ id }) => {
//   return await axios.delete("/api/products?id=" + id).then((response) => {
//     // console.log(response);
//     return response.data;
//   });
// }
