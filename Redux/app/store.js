import { configureStore } from "@reduxjs/toolkit";
// const { getDefaultMiddleware } = require("@reduxjs/toolkit");
import cakeReducer from "../features/cake/cakeSlice";
import icecreamReducers from "../features/icecream/icecreamSlice";
import userReducer from "../features/users/userSlice";
import productsReducer from "../features/products-slice/productsSlice";

// const reduxLogger = require("redux-logger");

// const logger = reduxLogger.createLogger();
const store = configureStore({
  reducer: {
    cake: cakeReducer,
    icecream: icecreamReducers,
    user: userReducer,
    product: productsReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
