import {
  LOGIN_SUCCESS,
  BEGIN_GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,
  BEGIN_LOGOUT,
  LOGOUT_SUCCESS,
} from "../actions/userAction";

const initState = {
  user: {
    name: "",
    id: null,
  },
  isAuthenticating: false,
  loggedIn: false,
  authenticationError: "",
};

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        loggedIn: action.payload,
        authenticationError: "",
        // user: {
        //   ...state.user,
        //   name: action.payload.user.username,
        //   id: action.payload.user.id,
        // },
      };

    case BEGIN_GET_USER_INFO:
      return {
        ...state,
        isAuthenticating: true,
        authenticationError: "",
      };

    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        loggedIn: true,
        authenticationError: "",
        user: {
          ...state.user,
          name: action.payload.username,
          id: action.payload.id,
        },
      };

    case GET_USER_INFO_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        loggedIn: false,
        authenticationError: action.payload,
      };

    case BEGIN_LOGOUT:
      return {
        ...state,
        isAuthenticating: true,
        authenticationError: "",
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: initState.user,
        isAuthenticating: false,
        loggedIn: false,
      };

    default:
      return {
        ...state,
      };
  }
};
