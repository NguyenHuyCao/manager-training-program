import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const logout = createSlice({
  name: "logout",
  initialState: {
    isLogout: false,
  },
  reducers: {
    logout(state) {
      state.isLogout = true;
    },
    login(state) {
      state.isLogout = false;
    },
  },
});

export const actionLogout = logout.actions;

const store = configureStore({ reducer: logout.reducer });

export default store;
