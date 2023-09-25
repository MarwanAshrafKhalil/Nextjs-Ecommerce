import { configureStore } from "@reduxjs/toolkit";
// const { getDefaultMiddleware } = require("@reduxjs/toolkit");
import cakeReducer from "../features/cake/cakeSlice";
import icecreamReducers from "../features/icecream/icecreamSlice";
import userReducer from "../features/users/userSlice";
// const reduxLogger = require("redux-logger");

// const logger = reduxLogger.createLogger();
const store = configureStore({
  reducer: {
    cake: cakeReducer,
    icecream: icecreamReducers,
    user: userReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
