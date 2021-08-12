import {
  SET_SCREAMS,
  SET_SCREAM,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  SUBMIT_COMMENT,
} from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  if (type === LOADING_DATA) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === SET_SCREAMS) {
    return {
      ...state,
      loading: false,
      screams: payload,
    };
  }

  if (type === LIKE_SCREAM || type === UNLIKE_SCREAM) {
    let index = state.screams.findIndex(
      (scream) => scream.screamId === payload.screamId
    );

    state.screams[index] = payload;
    if (state.scream.screamId === payload.screamId) {
      state.scream.likeCount = state.screams[index].likeCount;
    }
    return {
      ...state,
    };
  }

  if (type === DELETE_SCREAM) {
    return {
      ...state,
      screams: state.screams.filter(
        (scream) => scream.screamId !== payload.screamId
      ),
    };
  }

  if (type === POST_SCREAM) {
    return {
      ...state,
      screams: [payload, ...state.screams],
    };
  }

  if (type === SET_SCREAM) {
    return {
      ...state,
      scream: payload,
      loading: false,
    };
  }

  if (type === SUBMIT_COMMENT) {
    let index = state.screams.findIndex(
      (scream) => scream.screamId === payload.screamId
    );

    state.screams[index].commentCount++;

    if (state.scream.screamId === payload.screamId) {
      state.scream.commentCount = state.screams[index].commentCount;
    }

    return {
      ...state,
      scream: {
        ...state.scream,
        comments: [payload, ...state.scream.comments],
      },
    };
  }

  return state;
};
