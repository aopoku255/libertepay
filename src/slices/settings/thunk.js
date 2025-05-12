import { createAsyncThunk } from "@reduxjs/toolkit";

import { getServices as getServicesApi } from "../../helpers/fakebackend_helper";

export const getServices = createAsyncThunk(
  "settings/getServices",
  async () => {
    try {
      const response = await getServicesApi();
      console.log(response);
      return response;
    } catch (error) {
      return error;
    }
  }
);
