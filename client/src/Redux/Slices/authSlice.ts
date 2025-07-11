import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  status: boolean;
  userData: any | null;
}

const initialState: CounterState = {
  status: false,
  userData: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },

    toggleUser: (state) => {
      if (state.userData) {
        state.userData.isAccepting = !(state.userData.isAccepting);
      }
    },

    deleteUserData: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { saveUserData, toggleUser, deleteUserData } = authSlice.actions;

export default authSlice.reducer;