import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoginInfo: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { userLoginInfo } = userSlice.actions;

export default userSlice.reducer;
