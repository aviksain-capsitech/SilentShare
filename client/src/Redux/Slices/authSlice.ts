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
    deleteUserData: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { saveUserData, deleteUserData } = authSlice.actions;

export default authSlice.reducer;