import React, { useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

import { auth } from "./firebase.js";

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
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Name"
            autoFocus
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter Email/Mobile number"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>
            By continuing, you agree to Flipkart's <a href="#">Terms of Use </a>
            and <a href="#">Privacy Policy</a>.
          </p>
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
