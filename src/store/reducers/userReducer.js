import {
    LOGIN_SUCCESS,
    BEGIN_GET_USER_INFO,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAILURE,
} from "../actions/userAction";

const initState = {
    user: {
        email: "", //this needs to be changed to '' or 'fake' for offline
        id: null,
        imageUrl: "",
    },
    isAuthenticating: false,
    loggedIn: false, //this needs to be changed to false, or true for offline
    authenticationError: "",
};

export const userReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: {
                    email: action.payload.email,
                    id: action.payload.id,
                    imageUrl: action.payload.imageUrl,
                },
                isAuthenticating: false,
                loggedIn: action.payload.isSignedIn,
                authenticationError: "",
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
        default:
            return {
                ...state,
            };
    }
};
