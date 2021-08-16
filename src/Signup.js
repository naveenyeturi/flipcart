import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

import { auth } from "./firebase.js";
import { TextField } from "@material-ui/core";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;

        if (user) {
          user.updateProfile({ displayName: name });
        }
        // ...
      })
      .catch((error) => {
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // ..
        document.getElementById("registrationfail").innerHTML =
          "User already exists or check email format";
      });
  };

  return (
    <div className="signin">
      <div className="signin__left">
        <span>Looks like you're new here!</span>
        <p>Sign up with your email id to get started</p>
      </div>
      <div className="signin__right">
        <form onSubmit={signup}>
          <TextField
            id="standard-basic"
            label="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: 330, marginBottom: 35 }}
          />
          <TextField
            id="standard-basic"
            label="Enter Email/Mobile number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: 330, marginBottom: 35 }}
          />
          <TextField
            id="standard-basic"
            type="password"
            label="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: 330, marginBottom: 35 }}
          />
          <p>
            By continuing, you agree to Flipkart's <a href="#">Terms of Use </a>
            and <a href="#">Privacy Policy</a>.
          </p>
          <p id="registrationfail"></p>
          <button className="login-btn1" type="submit">
            Register
          </button>
          <Link to="/signin">Existing User? Log in</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
