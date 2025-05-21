import { createSlice } from "@reduxjs/toolkit";
import { getServices, getSMSConfig, getTermsAndConditions } from "./thunk";

const initialState = {
  services: [],
  smsconfig: [],
  termsandconditions: {},
};

const SettingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getServices.fulfilled, (state, action) => {
      state.services = action.payload.data;
    });
    builder.addCase(getSMSConfig.fulfilled, (state, action) => {
      state.smsconfig = action.payload.data;
    });
    builder.addCase(getTermsAndConditions.fulfilled, (state, action) => {
      state.termsandconditions = action.payload.data;
    });
  },
});

export default SettingsSlice.reducer;
