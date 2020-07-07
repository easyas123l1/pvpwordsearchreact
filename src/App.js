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
import WorldRecord from "./components/WorldRecord/WorldRecord";
import WorldRecordWords from "./components/WorldRecord/WorldRecordWords";
import Victory from "./components/Puzzle/Victory";
import { getUserInfo } from "./store/actions/userAction";
import LandingPage from "./components/Landing/LandingPage";
import PrintPuzzle from "./components/Puzzle/PrintPuzzle";

function App({ getUserInfo, loggedInStatus }) {
  const loggedIn = localStorage.getItem("token");

  useEffect(() => {
    if (loggedIn && !loggedInStatus) {
      getUserInfo();
    }
  }, [loggedIn, getUserInfo, loggedInStatus]);

  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/home" component={LandingPage} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/allPuzzles" component={AllPuzzles} />
        <Route path="/playPuzzle" component={PlayPuzzle} />
        <Route path="/worldRecord" component={WorldRecord} />
        <Route path="/worldRecordWords" component={WorldRecordWords} />
        <Route path="/completePuzzle" component={Victory} />
        <Route path="/printPuzzle" component={PrintPuzzle} />
        <PrivateRoute path="/addPuzzle">
          <AddPuzzle />
        </PrivateRoute>
        <PrivateRoute path="/createPuzzle">
          <CreatePuzzle />
        </PrivateRoute>
        <Route component={LandingPage} />
        {/* default route incase route doesn't exist */}
      </Switch>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedInStatus: state.puzzleReducer.loggedIn,
  };
};

export default connect(mapStateToProps, { getUserInfo })(App);
