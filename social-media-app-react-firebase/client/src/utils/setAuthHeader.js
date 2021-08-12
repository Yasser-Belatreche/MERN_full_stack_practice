import axios from "axios";

export const setAuthorizationHeader = (token) => {
  localStorage.setItem("FBIdToken", `Bearer ${token}`);

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
