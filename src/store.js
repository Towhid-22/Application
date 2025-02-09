import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlices";
import msgSlice from "./slices/msgSlice";

export const store = configureStore({
  reducer: {
    userInfo: userSlice,
    msgInfo: msgSlice,
  },
});
