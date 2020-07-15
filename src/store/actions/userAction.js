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

// export const START_LOGIN = "START_LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
// export const LOGIN_FAILURE = "LOGIN FAILURE";

export const loginUser = (isLoggedIn) => (dispatch) => {
  dispatch({ type: LOGIN_SUCCESS, payload: isLoggedIn });
};

//need to make sure the URL is correct.
// axios
//   .post(
//     "https://backend-word-search.herokuapp.com/api/user/login",
//     credentials
//   )
//   .then(res => {
//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("id", res.data.user.id);
//     // Need to fix the payload.  Once backend is updated we should get back username, email, image url, and maybe userID
//     return dispatch({ type: LOGIN_SUCCESS, payload: res.data });
//   })
//   .catch(error => {
//     console.error(error);
//     dispatch({ type: LOGIN_FAILURE, payload: error });
//   });

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

export const BEGIN_LOGOUT = "BEGIN_LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const logoutUser = () => (dispatch) => {
  dispatch({ type: BEGIN_LOGOUT });
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  // right now logout is not working as intended.  I believe this has somehting to do with how we're using sessions.
  // axios
  //   .get("https://backend-word-search.herokuapp.com/api/user/logout")
  //   .then(res => {
  //     console.log(res);
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("id");
  //   })
  //   .catch(error => {
  //     console.log(error.data);
  //     console.log(error.res);
  //     console.log(error);
  //     console.log(error.message);
  //   });
  dispatch({ type: LOGOUT_SUCCESS });
};
