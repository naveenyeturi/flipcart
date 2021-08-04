import React, { useState } from "react";
import "./Signin.css";

function Signin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <div className="signin">
      <div className="signin__left">
        <span>Login</span>
        <p>Get access to your Orders, Wishlist and Recommendations</p>
      </div>
      <div className="signin__right">
        <form>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter Email/Mobile number"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
          />
          <p>
            By continuing, you agree to Flipkart's <a href="#">Terms of Use </a>
            and <a href="#">Privacy Policy</a>.
          </p>
          <button className="login-btn1" type="submit">
            Login
          </button>

          <a href="#">New to Flipkart? Create an account</a>
        </form>
      </div>
    </div>
  );
}

export default Signin;
