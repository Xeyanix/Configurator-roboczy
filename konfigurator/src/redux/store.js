import { configureStore } from "@reduxjs/toolkit";
import yourReducer from "./appSlice";

export default configureStore({
  reducer: {
    app: yourReducer,
  },
});
