import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
} from "../types";

const initialeState = {
  loading: false,
  errors: {},
};

export default (state = initialeState, action) => {
  const { type, payload } = action;

  if (type === SET_ERRORS) {
    return {
      ...state,
      loading: false,
      errors: payload,
    };
  }

  if (type === CLEAR_ERRORS) {
    return {
      ...state,
      loading: false,
      errors: {},
    };
  }

  if (type === LOADING_UI) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === STOP_LOADING_UI) {
    return {
      ...state,
      loading: false,
    };
  }

  return state;
};
