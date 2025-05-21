import { createSlice } from "@reduxjs/toolkit";
import { getTransationList, getOrderList, getMyTransationList } from "./thunk";

export const initialState = {
  transationList: [],
  orderList: [],
  transactions: [],
};

const Cryptoslice = createSlice({
  name: "Crypto",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransationList.fulfilled, (state, action) => {
      state.transationList = action.payload;
    });
    builder.addCase(getTransationList.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getOrderList.fulfilled, (state, action) => {
      state.orderList = action.payload;
    });
    builder.addCase(getOrderList.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
    builder.addCase(getMyTransationList.fulfilled, (state, action) => {
      state.transactions = action.payload;
    });
  },
});

export default Cryptoslice.reducer;
