import {
  SET_USER,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_ERRORS,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
} from "../types";
import axios from "axios";
import { setAuthorizationHeader } from "../../utils/setAuthHeader";

export const loginUser = (userInfo, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/login", userInfo)
    .then((result) => {
      setAuthorizationHeader(result.data.token);

      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });

      history.push("/");
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const signupUser = (userInfo, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/signup", userInfo)
    .then((result) => {
      setAuthorizationHeader(result.data.token);

      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });

      history.push("/");
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");

  delete axios.defaults.headers.common["Authorization"];

  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });

  axios
    .get("/user")
    .then((res) => {
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });

  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });

  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const markNotificationsRead = (notificationIds) => (dispatch) => {
  axios
    .post("user/notification", { notificationIds })
    .then(() => {
      dispatch({ type: MARK_NOTIFICATIONS_READ });
    })
    .catch((err) => {
      console.log(err);
    });
};
