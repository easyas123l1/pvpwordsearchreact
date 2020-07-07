import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import puzzle from "../../styles/puzzle.module.scss";
import Footer from "../Footer/Footer";

const initialState = {
  username: "",
  password: "",
  verpassword: "",
};

const Register = (props) => {
  const [cred, setCred] = useState(initialState);

  const changeHandler = (e) => {
    e.persist();
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(cred);
    if (cred.password === cred.verpassword) {
      const user = { username: cred.username, password: cred.password };
      axios
        .post(
          "https://backend-word-search.herokuapp.com/api/user/register",
          user
        )
        .then((res) => {
          console.log(res);
          props.history.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("password and verify password must match!");
    }
  };
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
          <input
            type="text"
            name="verpassword"
            onChange={changeHandler}
            placeholder="Verify Password"
            value={cred.verpassword}
            className={puzzle.username}
          />
          <button type="submit" className={puzzle.loginButton}>
            Create Account
          </button>
          <p className={puzzle.loginText}>
            If you have an account,{" "}
            <Link to="/login">Click here to sign in</Link>.
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
