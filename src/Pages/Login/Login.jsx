import React from "react";
import "./index.css";

const Login = () => {
  return (
    <>
      <div className="login">
        <div className="form-container">
          <h1>Hello !</h1>
          <p>Signup to create your account !</p>
          <div className="input-container">
            <div className="left-container">
              <input type="text" placeholder=" Full Name" />
              <input type="email" placeholder=" Email" />
              <input type="password" placeholder=" Password" />
            </div>
            <div className="right-container">
              <input type="text" placeholder=" Last Name" />
              <input type="tel" placeholder=" Phone No." />
              <input type="password" placeholder=" Confirm Password" />
            </div>
          </div>
          <div className="tnc-checkbox">
            <input type="checkbox" />
            <label>I agree with the terms of use</label>
          </div>
          <button className="signup-btn">Sign Up</button>
        </div>
      </div>
    </>
  );
};

export default Login;
