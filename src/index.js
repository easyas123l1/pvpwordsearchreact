import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./store/reducers/userReducer";
import { puzzleReducer } from "./store/reducers/puzzleReducer";

const rootReducer = combineReducers({
    userReducer,
    puzzleReducer,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById("root")
);
