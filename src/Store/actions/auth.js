import * as actionTypes from "./actionTypes";

import axios from "axios";

export const authStart = () => {
   return {
      type: actionTypes.AUTH_START,
   };
};

export const authSuccess = (authData) => {
   return {
      type: actionTypes.AUTH_SUCCESS,
      payload: { authData: authData },
   };
};

export const authFail = (err) => {
   return {
      type: actionTypes.AUTH_FAIL,
      payload: { err: err },
   };
};

export const authSwitchMode = () => {
   return {
      type: actionTypes.AUTH_SWITCH_MODE,
   };
};

export const authLogout = () => {
   return {
      type: actionTypes.AUTH_LOGOUT,
   }
}

export const auth = (email, password, authMode) => {
   return (dispatch) => {
      dispatch(authStart());
      let url =
         "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCR6Dk36Sjph73-8oUF0Y6dg74CAtmZOd4";
      if (authMode === "SIGNIN")
         url =
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCR6Dk36Sjph73-8oUF0Y6dg74CAtmZOd4";
      axios
         .post(url, {
            email: email,
            password: password,
            returnSecureToken: true,
         })
         .then((response) => {
            console.log(response.data);
            dispatch(authSuccess(response.data));
         })
         .catch((err) => {
            // console.log(err.response.data.error.message);
            dispatch(authFail(err.response.data.error.message));
         });
   };
};
