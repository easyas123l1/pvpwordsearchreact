import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./styles/global.scss";
import PrivateRoute from "./components/Private/PrivateRoute";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NavBar from "./components/NavBar/NavBar";
import AddPuzzle from "./components/Puzzle/AddPuzzle";
import CreatePuzzle from "./components/Puzzle/CreatePuzzle";
import AllPuzzles from "./components/Puzzle/AllPuzzles";
import PlayPuzzle from "./components/Puzzle/PlayPuzzle";
import Victory from "./components/Puzzle/Victory";
import { loginUser } from "./store/actions/userAction";
import LandingPage from "./components/Landing/LandingPage";
import PrintPuzzle from "./components/Puzzle/PrintPuzzle";

function App({ loginUser, loggedInStatus }) {
  const insertGapiScript = () => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.onload = () => {
      initializeGoogleSignIn();
    };
    document.body.appendChild(script);
  };

  const initializeGoogleSignIn = () => {
    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          client_id: process.env.REACT_APP_CLIENT_ID,
        })
        .then(() => {
          const authInstance = window.gapi.auth2.getAuthInstance();
          const isSignedIn = authInstance.isSignedIn.get();
          // this is where we will call userAction signIn
          loginUser(isSignedIn);
          authInstance.isSignedIn.listen((isSignedIn) => {
            if (loggedInStatus !== isSignedIn) {
              loginUser(isSignedIn);
            }
          });
        });
      console.log("Api inited");

      window.gapi.load("signin2", () => {
        const params = {
          onsuccess: () => {
            console.log("User has finished signing in!");
          },
        };

        window.gapi.signin2.render("loginButton", params);
      });
    });
  };

  useEffect(() => {
    console.log("Loading");
    insertGapiScript();
  });

  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/home" component={LandingPage} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/allPuzzles" component={AllPuzzles} />
        <Route path="/playPuzzle" component={PlayPuzzle} />
        <Route path="/completePuzzle" component={Victory} />
        <Route path="/printPuzzle" component={PrintPuzzle} />
        <Route path="/createPuzzle" component={CreatePuzzle} />
        <Route path="/addPuzzle" component={AddPuzzle} />
        <Route component={LandingPage} />
        {/* default route incase route doesn't exist */}
      </Switch>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedInStatus: state.userReducer.loggedIn,
  };
};

export default connect(mapStateToProps, { loginUser })(App);
