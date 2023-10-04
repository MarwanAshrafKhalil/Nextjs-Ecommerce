import * as requestFromServer from "./categoriesCrud";
import { categoriesSlice } from "./categoriesSlice";

const { actions: categoriesActions } = categoriesSlice;

export const getCategories = () => (dispatch) => {
  dispatch(categoriesActions.openLoader());
  return requestFromServer
    .getCategoriesData()
    .then((response) => {
      dispatch(categoriesActions.fetchCategories(response.data));
    })
    .catch((error) => {
      dispatch(categoriesActions.catchError({ error }));
    })
    .finally(() => {
      dispatch(categoriesActions.closeLoader());
    });
};

export const createCategory =
  ({ data }) =>
  (dispatch) => {
    dispatch(categoriesActions.openLoader());
    return requestFromServer
      .createACategory({ data })
      .then((response) => {
        dispatch(categoriesActions.createCategory(response.data));
      })
      .catch((error) => {
        dispatch(categoriesActions.catchError(error));
      })
      .finally(() => {
        dispatch(categoriesActions.closeLoader());
      });
  };

export const updateCategory =
  ({ data }) =>
  (dispatch) => {
    dispatch(categoriesActions.openLoader());
    return requestFromServer
      .updateCategory({ data })
      .then((response) => {
        dispatch(categoriesActions.updateCategory(response.data));
      })
      .catch((error) => {
        dispatch(categoriesActions.catchError(error));
      })
      .finally(() => {
        dispatch(categoriesActions.closeLoader());
      });
  };

export const deleteACategory = (_id) => async (dispatch) => {
  console.log("id-delete: ", _id);
  dispatch(categoriesActions.openLoader());
  await requestFromServer
    .deleteCategory(_id)
    .then((response) => {
      dispatch(categoriesActions.deleteCategory(response.data));
    })
    .catch((error) => {
      dispatch(categoriesActions.catchError(error));
    })
    .finally(() => {
      dispatch(categoriesActions.closeLoader());
    });
};
