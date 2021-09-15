import React, { useState } from "react";
import "./Signin.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase.js";
import { TextField } from "@material-ui/core";
import { loggedIn } from "./redux/actions";
import { useDispatch } from "react-redux";

function Signin({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const history = useHistory();

  const signin = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        if (user.email) {
          // setUser(user);
          localStorage.setItem("email", email);
          // console.log(localStorage.getItem("email"));
          dispatch(loggedIn(user));
          history.push("/");
        }
        // ...
      })
      .catch((error) => {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // console.log(errorMessage);
        document.getElementById("loginfail").innerHTML =
          "Email and Password does not match";
      });
  };

  return (
    <div className="signin">
      <div className="signin__left">
        <span>Login</span>
        <p>Get access to your Orders, Wishlist and Recommendations</p>
      </div>
      <div className="signin__right">
        <form onSubmit={signin}>
          <TextField
            id="standard-basic1"
            label="Enter Email/Mobile number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: 330, marginBottom: 35 }}
          />
          <TextField
            id="standard-basic2"
            label="Enter Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: 330, marginBottom: 35 }}
          />
          <p>
            By continuing, you agree to Flipkart's <a href="/">Terms of Use </a>
            and <a href="/">Privacy Policy</a>.
          </p>
          <p id="loginfail"></p>
          <button className="login-btn1" type="submit">
            Login
          </button>

          <p id="loginfail"></p>

          {/* <Link to="/signup">
            <a href="#">New to Flipkart? Create an account</a>
          </Link> */}
          <Link to="/signup">New to Flipkart? Create an account</Link>
        </form>
      </div>
    </div>
  );
}

export default Signin;
