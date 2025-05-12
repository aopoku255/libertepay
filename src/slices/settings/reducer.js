import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: [],
  smsconfig: [],
};

const SettingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase("settings/getServices/fulfilled", (state, action) => {
      state.services = action.payload.data;
    });
  },
});

export default SettingsSlice.reducer;
