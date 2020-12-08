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
            <div>
                <Link
                    to="/home"
                    className={puzzle.aTag}
                    activeStyle={{ color: "#ffb81c" }}
                >
                    Home
                </Link>
            </div>
            {loggedIn && (
                <>
                    <div>
                        <Link
                            to="/socketGame"
                            className={puzzle.aTag}
                            activeStyle={{ color: "#ffb81c" }}
                        >
                            Play
                        </Link>
                    </div>
                    <div>
                        <img
                            onClick={() => setDropdown(!dropdown)}
                            className={puzzle.imageURL}
                            src={imageUrl}
                            role="button"
                            alt="drop-down"
                        />
                        {dropdown && (
                            <div className={puzzle.dropdown}>
                                <Link to="/profile">Profile</Link>
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
