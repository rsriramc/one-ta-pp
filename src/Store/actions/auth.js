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

export const saveLocally = () => {
   return (dispatch, getState) => {
      if (getState().token === "own") {
         localStorage.setItem(
            "ownSubjects",
            JSON.stringify(getState().subjects)
         );
      } else {
         // console.log("Happy");
         localStorage.setItem("subjects", JSON.stringify(getState().subjects));
         localStorage.setItem(
            "hasSavedToCloud",
            JSON.stringify(getState().hasSaved)
         );
      }
   };
};

export const authLogout = () => {
   return (dispatch) => {
      localStorage.removeItem("refreshToken");
      localStorage.setItem("hasSavedToCloud", "true");
      localStorage.removeItem("subjects");
      dispatch({
         type: actionTypes.AUTH_LOGOUT,
      });
   };
};

export const loadCloudData = (subjects) => {
   return {
      type: actionTypes.LOAD_CLOUD_DATA,
      payload: { subjects: subjects },
   };
};

export const autoLogin = () => {
   return (dispatch) => {
      if (localStorage.getItem("ownSubjects") === null)
         localStorage.setItem("ownSubjects", JSON.stringify([]));
      dispatch({ type: actionTypes.START_LOAD });

      if (localStorage.getItem("refreshToken") !== null)
         dispatch(refreshToken(localStorage.getItem("refreshToken")));
      // console.log("Hello how are you");
      if (localStorage.getItem("refreshToken") === "own") {
         dispatch(
            loadCloudData(JSON.parse(localStorage.getItem("ownSubjects")))
         );
      } else
         try {
            dispatch(
               loadCloudData(JSON.parse(localStorage.getItem("subjects")))
            );
         } catch (err) {
            localStorage.removeItem("subjects");
            console.log('Some error occured deleted the local subjects!');
         }
      if (JSON.parse(localStorage.getItem("hasSavedToCloud")) === false)
         dispatch({
            type: "HAS_SAVED",
            payload: {
               hasSaved: JSON.parse(localStorage.getItem("hasSavedToCloud")),
            },
         });

      dispatch({ type: actionTypes.END_LOAD });
   };
};

export const refToken = (token, userId, refreshtoken) => {
   return {
      type: actionTypes.REFRESH_TOKEN,
      payload: {
         token: token,
         userId: userId,
         refreshToken: refreshtoken,
      },
   };
};

export const savedata = () => {
   return {
      type: actionTypes.SAVE_DATA,
   };
};

export const saveData = () => {
   return (dispatch, getState) => {
      axios
         .put(
            "https://one-ta-pp.firebaseio.com/users/" +
               getState().userId +
               "/.json?auth=" +
               getState().token,
            {
               userId: getState().userId,
               subjects: getState().subjects,
            }
         )
         .then((response) => {
            // console.log(response.data);
            localStorage.setItem("hasSavedToCloud", "true");
         })
         .catch((err) => {
            // console.log(err.response.data.error.message);
         });
      dispatch(savedata());
   };
};

export const refreshToken = (refreshUserToken) => {
   return (dispatch, getState) => {
      if (localStorage.getItem("refreshToken") === "demo") {
         dispatch(refToken("demo", "demo", "demo"));
      } else if (localStorage.getItem("refreshToken") === "own") {
         dispatch(refToken("own", "own", "own"));
      } else {
         axios
            .post(
               "https://securetoken.googleapis.com/v1/token?key=AIzaSyCR6Dk36Sjph73-8oUF0Y6dg74CAtmZOd4",
               {
                  grant_type: "refresh_token",
                  refresh_token: refreshUserToken,
               }
            )
            .then((response) => {
               dispatch(
                  refToken(
                     response.data.id_token,
                     response.data.user_id,
                     response.data.refresh_token
                  )
               );
               // console.log(parseFloat(response.data.expires_in) - 100);
               setTimeout(() => {
                  if (!getState().hasLogout) {
                     dispatch(refreshToken(response.data.refresh_token));
                  }
               }, 1000 * (parseFloat(response.data.expires_in) - 100));
            })
            .catch((err) => {
               // console.log(err.response.data.error.message);
            });
      }
   };
};

export const auth = (email, password, authMode, history) => {
   return (dispatch, getState) => {
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
            localStorage.setItem("subjects", []);
            history.push("/subjects");
            // console.log("hello");
            localStorage.setItem("hasSavedToCloud", "true");
            dispatch({
               type: "HAS_SAVED",
               payload: {
                  hasSaved: true,
               },
            });
            dispatch(authSuccess(response.data));
            // console.log(parseFloat(response.data.expiresIn) - 100);
            setTimeout(() => {
               dispatch(refreshToken(response.data.refreshToken));
            }, 1000 * (parseFloat(response.data.expiresIn) - 100));
            localStorage.setItem("refreshToken", response.data.refreshToken);
            if (authMode === "SIGNUP") {
               axios
                  .put(
                     "https://one-ta-pp.firebaseio.com/users/" +
                        response.data.localId +
                        "/.json?auth=" +
                        response.data.idToken,
                     {
                        userId: response.data.localId,
                        subjects: [],
                     }
                  )
                  .then((res) => {
                     dispatch(loadCloudData(res.data.subjects));
                     dispatch({ type: actionTypes.END_LOAD });
                  });
            } else {
               axios
                  .get(
                     "https://one-ta-pp.firebaseio.com/users/" +
                        response.data.localId +
                        "/.json?auth=" +
                        response.data.idToken
                  )
                  .then((res) => {
                     dispatch({ type: actionTypes.END_LOAD });
                     dispatch({ type: actionTypes.END_LOAD });
                     dispatch(loadCloudData(res.data.subjects));
                     dispatch(saveLocally());
                  });
            }
         })
         .catch((err) => {
            dispatch(authFail(err.response.data.error.message));
            dispatch({ type: actionTypes.END_LOAD });
         });
      dispatch({ type: actionTypes.START_LOAD });
   };
};

export const demoAuth = (history) => {
   return (dispatch, getState) => {
      history.push("/subjects");

      localStorage.setItem("refreshToken", "demo");
      dispatch({ type: actionTypes.LOAD_DEMODATA });
      localStorage.setItem("subjects", JSON.stringify(getState().subjects));
   };
};

export const ownAuth = (history) => {
   return (dispatch, getState) => {
      history.push("/subjects");
      // console.log("ownAuth");
      localStorage.setItem("refreshToken", "own");
      dispatch({
         type: actionTypes.LOAD_OWNDATA,
         payload: {
            subjects: JSON.parse(localStorage.getItem("ownSubjects")),
         },
      });
   };
};
