import React, { useState } from "react";
import { NavLink as Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import puzzle from "../../styles/puzzle.module.scss";
import { socket } from "../../App.js";

const NavBar = ({ loggedIn, imageUrl }) => {
    const [dropdown, setDropdown] = useState(false);
    const history = useHistory();

    const logout = (e) => {
        e.preventDefault();
        window.gapi.auth2.getAuthInstance().signOut();
        socket.emit("disconnecting");
        history.push("/home");
        setDropdown(false);
    };

    return (
        <div className={puzzle.navBar}>
            {loggedIn && (
                <>
                    {/* <div>
                        <Link
                            to="/socketGame"
                            className={puzzle.aTag}
                            activeStyle={{ color: "#ffb81c" }}
                        >
                            Play
                        </Link>
                    </div> */}
                    <div>
                        <img
                            onClick={() => setDropdown(!dropdown)}
                            className={puzzle.imageURL}
                            src={imageUrl}
                            alt="drop-down"
                            role="button"
                        />
                        {dropdown && (
                            <div className={puzzle.dropdown}>
                                <Link to="/home">Home</Link>
                                <Link to="/profile">Profile</Link>
                                <Link to="/socketGame">Play</Link>
                                <Link to="/matchHistory">History</Link>
                                <button onClick={(e) => logout(e)}>
                                    logout
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
            {!loggedIn && (
                <div>
                    {/* <Link
                        to="/home"
                        className={puzzle.aTag}
                        activeStyle={{ color: "#ffb81c" }}
                    >
                        Home
                    </Link> */}
                    <button id="loginButton">Sign in</button>
                </div>
            )}
        </div>
    );
};

function mapStateToProps(state) {
    return {
        loggedIn: state.userReducer.loggedIn,
        imageUrl: state.userReducer.user.imageUrl,
    };
}

export default connect(mapStateToProps, {})(NavBar);
