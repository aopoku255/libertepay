import {
  userForgetPasswordSuccess,
  userForgetPasswordError,
  userResetPasswordSuccess,
  userResetPasswordError,
} from "./reducer";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";

import {
  postFakeForgetPwd,
  postFakeResetPwd,
  postJwtForgetPwd,
} from "../../../helpers/fakebackend_helper";

const fireBaseBackend = getFirebaseBackend();

export const userForgetPassword = (user, navigate) => async (dispatch) => {
  try {
    const response = await postFakeForgetPwd(user);
    console.log("response", response);
    if (response) {
      //   dispatch(userForgetPasswordSuccess(response?.msg));
      navigate(`/change-password/${response?.data?.token}`);
    } else {
      dispatch(userForgetPasswordError("Email not found"));
    }
  } catch (forgetError) {
    console.log("forgetError", forgetError);
    const errorMessage =
      forgetError?.response?.data?.msg ||
      forgetError.message ||
      "Email not found";
    dispatch(userForgetPasswordError(errorMessage));
  }
};

export const userResetPassword = (user, navigate) => async (dispatch) => {
  try {
    const response = await postFakeResetPwd(user);
    if (response) {
      dispatch(userResetPasswordSuccess(response?.msg));
      navigate("/password-reset-success");
    }
  } catch (forgetError) {
    const errorMessage =
      forgetError?.response?.data?.message ||
      forgetError.message ||
      "Something went wrong";
    dispatch(userResetPasswordError(errorMessage));
  }
};
