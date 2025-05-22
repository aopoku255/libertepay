import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  forgetSuccessMsg: null,
  forgetError: null,
  resetSuccessMsg: null,
  resetError: null,
};

const forgotPasswordSlice = createSlice({
  name: "forgotpwd",
  initialState,
  reducers: {
    userForgetPasswordSuccess(state, action) {
      state.forgetSuccessMsg = action.payload;
    },
    userForgetPasswordError(state, action) {
      state.forgetError = action.payload;
    },
    userResetPasswordSuccess(state, action) {
      state.forgetSuccessMsg = action.payload;
    },
    userResetPasswordError(state, action) {
      state.forgetSuccessMsg = action.payload;
    },
    resetError(state) {
      state.forgetError = null;
      state.forgetSuccessMsg = null;
      state.resetSuccessMsg = null;
      state.resetError = null;
    },
  },
});

export const {
  userForgetPasswordSuccess,
  userForgetPasswordError,
  userResetPasswordSuccess,
  userResetPasswordError,
  resetError,
} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
