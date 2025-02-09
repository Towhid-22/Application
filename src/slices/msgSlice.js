import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const msgSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    msgInfo: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { msgInfo } = msgSlice.actions;

export default msgSlice.reducer;
