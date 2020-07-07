import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import puzzle from "../../styles/puzzle.module.scss";
import { loginUser } from "../../store/actions/userAction";
import Footer from "../Footer/Footer";

const initialState = {
  username: "",
  password: "",
};

const Login = ({
  isAuthenticating,
  loggedIn,
  authenticationError,
  loginUser,
}) => {
  const [cred, setCred] = useState(initialState);
  const history = useHistory();

  const changeHandler = (e) => {
    e.persist();
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(cred);
  };

  if (loggedIn) {
    history.push("/allPuzzles");
  }

  if (isAuthenticating) {
    return <h1>loading...</h1>;
  }

  return (
    <div className={puzzle.spacer}>
      <div className={puzzle.background}>
        <form onSubmit={handleSubmit} className={puzzle.login}>
          <input
            type="text"
            name="username"
            onChange={changeHandler}
            placeholder="Username or Email Address"
            value={cred.username}
            className={puzzle.username}
          />
          <input
            type="password"
            name="password"
            onChange={changeHandler}
            placeholder="Password"
            value={cred.password}
            className={puzzle.username}
          />
          <button type="submit" className={puzzle.loginButton}>
            Login
          </button>
          <p className={puzzle.loginText}>
            If you don't have an account,{" "}
            {<Link to="/register">click here to register</Link>}
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticating: state.userReducer.isAuthenticating,
    loggedIn: state.userReducer.loggedIn,
    authenticationError: state.userReducer.authenticationError,
  };
};

export default connect(mapStateToProps, { loginUser })(Login);
