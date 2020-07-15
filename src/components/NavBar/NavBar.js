import React, { useEffect, useState } from "react";
import { NavLink as Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser, getUserInfo } from "../../store/actions/userAction";
import puzzle from "../../styles/puzzle.module.scss";

const NavBar = ({ loggedIn, logoutUser }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [profile, setProfile] = useState("");
  const [id, setId] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  console.log(dropdown);
  useEffect(() => {
    if (loggedIn) {
      const authInstance = window.gapi.auth2.getAuthInstance();
      const getuser = authInstance.currentUser.get();
      const getprofile = getuser.getBasicProfile();
      setEmail(getprofile.getEmail());
      setImageUrl(getprofile.getImageUrl());
      setUser(getuser);
      setProfile(getprofile);
      setId(getprofile.getId());
    }
  }, [loggedIn]);
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    window.gapi.auth2.getAuthInstance().signOut();
    history.push("/home");
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
              to="/allPuzzles"
              className={puzzle.aTag}
              activeStyle={{ color: "#ffb81c" }}
            >
              All Puzzles
            </Link>
          </div>
          <div>
            <Link
              to="/createPuzzle"
              className={puzzle.aTag}
              activeStyle={{ color: "#ffb81c" }}
            >
              Create Puzzle
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
                <button onClick={(e) => logout(e)}>logout</button>
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
  };
}

export default connect(mapStateToProps, { logoutUser })(NavBar);
