import React from 'react';
import './forgotPassword.css';

const forgotPassword = () => {
    return(
        <>
          <div className="forgot--password">
            <h1>Forgot Password?!</h1>
            <p>Enter your registered email id to receive OTP</p>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Email address"></input>
            <button type="submit">Continue</button>
          </div>
        </>
      );
}

export default forgotPassword;
