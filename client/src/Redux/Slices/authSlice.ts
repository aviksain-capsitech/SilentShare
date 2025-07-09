import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

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
    saveUserData: (state, action: PayloadAction<{ userData: any }>) => {
      state.status = true;
      state.userData = action.payload;
    },
    toggleUser: (state) => {
      if (state.userData) {
        state.userData.IsAccepting = !(state.userData.IsAccepting);
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