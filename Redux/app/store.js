import { configureStore } from "@reduxjs/toolkit";
// const { getDefaultMiddleware } = require("@reduxjs/toolkit");
import productsReducer from "../features/products-slice/productsSlice";

// const reduxLogger = require("redux-logger");

// const logger = reduxLogger.createLogger();
const store = configureStore({
  reducer: {
    // cake: cakeReducer,
    // icecream: icecreamReducers,
    // user: userReducer,
    products: productsReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
