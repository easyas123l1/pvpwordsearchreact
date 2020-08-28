import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import io from "socket.io-client";
import "./styles/global.scss";
import NavBar from "./components/NavBar/NavBar";
import AddPuzzle from "./components/Puzzle/AddPuzzle";
import CreatePuzzle from "./components/Puzzle/CreatePuzzle";
import AllPuzzles from "./components/Puzzle/AllPuzzles";
import PlayPuzzle from "./components/Puzzle/PlayPuzzle";
import Victory from "./components/Puzzle/Victory";
import { loginUser } from "./store/actions/userAction";
import LandingPage from "./components/Landing/LandingPage";
import PrintPuzzle from "./components/Puzzle/PrintPuzzle";
import SocketGame from "./components/SocketGame/SocketGame";

export const socket = io("http://localhost:4999");

function App({ loginUser, loggedInStatus }) {
    const [mail, setMail] = useState("");
    const [conn, setConn] = useState(false);
    const [error, setError] = useState("");
    const [serverId, setServerId] = useState(null);

    socket.on("getUserInfo", () => {
        if (mail) {
            socket.emit("userInfo", mail);
        }
    });

    socket.on("alreadyConnected", () => {
        setConn(false);
        setError("this account is already logged in");
    });

    socket.on("goodConnection", (id) => {
        setConn(true);
        setError("");
        setServerId(id);
    });

    const insertGapiScript = () => {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/platform.js";
        script.onload = () => {
            initializeGoogleSignIn();
        };
        document.body.appendChild(script);
    };

    const getUserInfo = (isSignedIn) => {
        let email = "";
        let imageUrl = "";
        let id = "";
        if (isSignedIn) {
            const authInstance = window.gapi.auth2.getAuthInstance();
            const getuser = authInstance.currentUser.get();
            const getprofile = getuser.getBasicProfile();
            email = getprofile.getEmail();
            imageUrl = getprofile.getImageUrl();
            id = getprofile.getId();
        }
        const user = {
            email,
            imageUrl,
            id,
            isSignedIn,
        };
        loginUser(user);
        if (email) {
            socket.emit("userInfo", email);
            setMail(email);
        } else {
            setServerId(null);
        }
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
                    getUserInfo(isSignedIn);
                    authInstance.isSignedIn.listen((isSignedIn) => {
                        if (loggedInStatus !== isSignedIn) {
                            getUserInfo(isSignedIn);
                        }
                    });
                });
            // console.log("Api inited");

            window.gapi.load("signin2", () => {
                const params = {
                    onsuccess: () => {
                        // console.log("User has finished signing in!");
                    },
                };

                window.gapi.signin2.render("loginButton", params);
            });
        });
    };

    useEffect(() => {
        // console.log("Loading");
        insertGapiScript();
    });

    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/home" component={LandingPage} />
                <Route path="/allPuzzles" component={AllPuzzles} />
                <Route path="/playPuzzle" component={PlayPuzzle} />
                <Route path="/completePuzzle" component={Victory} />
                <Route path="/printPuzzle" component={PrintPuzzle} />
                <Route path="/createPuzzle" component={CreatePuzzle} />
                <Route path="/addPuzzle" component={AddPuzzle} />
                <Route
                    path="/socketGame"
                    render={(props) => (
                        <SocketGame
                            {...props}
                            email={mail}
                            conn={conn}
                            error={error}
                            serverId={serverId}
                        />
                    )}
                />
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
