import {
  SET_SCREAMS,
  SET_SCREAM,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  LOADING_UI,
  POST_SCREAM,
  SET_ERRORS,
  CLEAR_ERRORS,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from "../types";
import axios from "axios";

export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  axios
    .get("/screams")
    .then((result) => {
      dispatch({ type: SET_SCREAMS, payload: result.data });
    })
    .catch((err) => {
      dispatch({ type: SET_SCREAMS, payload: [] });
    });
};

export const likeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/like`)
    .then((res) => {
      dispatch({ type: LIKE_SCREAM, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const unlikeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/unlike`)
    .then((res) => {
      dispatch({ type: UNLIKE_SCREAM, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteScream = (screamId) => (dispatch) => {
  axios
    .delete(`/scream/${screamId}`)
    .then(() => {
      dispatch({ type: DELETE_SCREAM, payload: { screamId } });
    })
    .catch((err) => console.log(err));
};

export const postScream = (body) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .post("/createScream", { body })
    .then((res) => {
      dispatch({ type: POST_SCREAM, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const getScream = (screamId) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get(`/scream/${screamId}`)
    .then((res) => {
      dispatch({ type: SET_SCREAM, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

export const postComment = (screamId, body) => (dispatch) => {
  axios
    .post(`/scream/${screamId}/comment`, { body })
    .then((res) => {
      dispatch({ type: SUBMIT_COMMENT, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
      console.log(err);
    });
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });

  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({ type: SET_SCREAMS, payload: res.data.screams });
    })
    .catch(() => {
      dispatch({ type: SET_SCREAMS, payload: null });
    });
};
