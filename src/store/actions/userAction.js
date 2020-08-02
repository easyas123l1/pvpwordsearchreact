import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const loginUser = (user) => (dispatch) => {
  dispatch({ type: LOGIN_SUCCESS, payload: user });
};

export const BEGIN_GET_USER_INFO = "BEGIN_GET_USER_INFO";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAILURE = "GET_USER_INFO_FAILURE";

export const getUserInfo = () => (dispatch) => {
  dispatch({ type: BEGIN_GET_USER_INFO });

  const id = localStorage.getItem("id");
  axiosWithAuth()
    .get(`https://backend-word-search.herokuapp.com/api/user/${id}`)
    .then((res) => {
      dispatch({ type: GET_USER_INFO_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      dispatch({
        type: GET_USER_INFO_FAILURE,
        payload: error,
      });
    });
};
