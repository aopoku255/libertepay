import { createAsyncThunk } from "@reduxjs/toolkit";
//Include Both Helper File with needed methods
import {
  getTransationList as getTransationListApi,
  getOrderList as getOrderListApi,
  getMyTransactions as getMyTransactionsApi,
} from "../../helpers/fakebackend_helper";

export const getTransationList = createAsyncThunk(
  "crypto/getTransationList",
  async () => {
    try {
      const response = getTransationListApi();
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getOrderList = createAsyncThunk(
  "crypto/getOrderList",
  async () => {
    try {
      const response = getOrderListApi();
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getMyTransationList = createAsyncThunk(
  "crypto/getMyTransaction",
  async () => {
    try {
      const response = await getMyTransactionsApi();
      console.log(response?.data);
      return response?.data?.transactions;
    } catch (error) {
      return error;
    }
  }
);
