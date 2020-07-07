import {
  START_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  BEGIN_GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILURE,
  BEGIN_LOGOUT,
  LOGOUT_SUCCESS
} from "../actions/userAction";

const initState = {
  user: {
    name: "",
    id: null
  },
  isAuthenticating: false,
  loggedIn: false,
  authenticationError: ""
};

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case START_LOGIN:
      return {
        ...state,
        isAuthenticating: true,
        authenticationError: ""
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        loggedIn: true,
        authenticationError: "",
        user: {
          ...state.user,
          name: action.payload.user.username,
          id: action.payload.user.id
        }
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        authenticationError: action.payload,
        isAuthenticating: false
      };

    case BEGIN_GET_USER_INFO:
      return {
        ...state,
        isAuthenticating: true,
        authenticationError: ""
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
          id: action.payload.id
        }
      };

    case GET_USER_INFO_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        loggedIn: false,
        authenticationError: action.payload
      };

    case BEGIN_LOGOUT:
      return {
        ...state,
        isAuthenticating: true,
        authenticationError: ""
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: initState.user,
        isAuthenticating: false,
        loggedIn: false
      };

    default:
      return {
        ...state
      };
  }
};
