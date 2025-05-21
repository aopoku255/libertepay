import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getServices as getServicesApi,
  getSMSConfig as getSMSConfigAPI,
  updateSMSConfig as updateConfigAPI,
  updateServices as updateServicesAPI,
  getTermsAndConditions as getTermsAndConditionsAPI,
  createTermsAndConditions as createTermsAndConditionsAPI,
  createServices as createServicesApi,
} from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

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

export const createServices = createAsyncThunk(
  "settings/createServices",
  async (data) => {
    try {
      const response = await createServicesApi(data);
      toast.success("Service created successfully", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getSMSConfig = createAsyncThunk(
  "settings/getSMSConfig",
  async (headers) => {
    try {
      const response = await getSMSConfigAPI(headers);
      console.log(response);
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const updateSMSConfig = createAsyncThunk(
  "settings/updateSMSConfig",
  async (data) => {
    try {
      const response = await updateConfigAPI(data);
      toast.success("SMS Provider updated successfully");
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const updateServices = createAsyncThunk(
  "settings/updateServices",
  async (data) => {
    console.log(data);
    try {
      const response = await updateServicesAPI(
        { active: data?.status === 1 ? false : true },
        data?.id
      );
      toast.success("Service updated successfully");
      return response;
    } catch (error) {
      toast.error("Maker can not update a service");
      return error;
    }
  }
);

export const getTermsAndConditions = createAsyncThunk(
  "settings/getTermsAndConditions",
  async () => {
    try {
      const response = await getTermsAndConditionsAPI();
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const createTermsAndConditions = createAsyncThunk(
  "settings/createTermsAndConditions",
  async (data) => {
    try {
      const response = await createTermsAndConditionsAPI({
        name: "Terms and Conditions",
        details: data,
      });
      toast.success("Terms and Conditions updated successfully");
      return response;
    } catch (error) {
      return error;
    }
  }
);
