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
import FirstLogin from "./components/FirstLogin/FirstLogin";
import axios from "axios";

export const socket = io("http://localhost:4999");

function App({ loginUser, loggedInStatus }) {
    const [name, setName] = useState("");
    const [mail, setMail] = useState(""); // this needs to be changed to "" for online | "anything" inside for offline
    const [conn, setConn] = useState(false);
    const [error, setError] = useState("");
    const [serverId, setServerId] = useState(null);
    const [firstLogin, setFirstLogin] = useState(false);

    socket.on("getUserInfo", () => {
        if (mail && name) {
            socket.emit("userInfo", mail, name);
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
            setMail(email);
            axios
                .post("http://localhost:4999/puzzle/user", { email })
                .then((res) => {
                    if (res.status === 201) {
                        // set app in create name state
                        setFirstLogin(true);
                    } else if (res.status === 200) {
                        setName(res.data.name);
                        setFirstLogin(false);
                        socket.emit("userInfo", email, res.data.name);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setServerId(null);
                });
        }
        const user = {
            email,
            imageUrl,
            id,
            isSignedIn,
        };
        loginUser(user);
    };

    const createName = (newName) => {
        if (firstLogin) {
            axios
                .put("http://localhost:4999/puzzle/user", {
                    email: mail,
                    name: newName,
                })
                .then((res) => {
                    setFirstLogin(false);
                    setName(res.data.name);
                })
                .catch((err) => {
                    setFirstLogin(true);
                    console.log(err);
                });
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

    if (firstLogin) {
        return (
            <>
                <FirstLogin createName={createName} />
            </>
        );
    } else {
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
}

const mapStateToProps = (state) => {
    return {
        loggedInStatus: state.userReducer.loggedIn,
    };
};

export default connect(mapStateToProps, { loginUser })(App);
