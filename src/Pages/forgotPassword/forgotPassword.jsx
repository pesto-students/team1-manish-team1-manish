import React from 'react';
import './styles.css';

const forgotPassword = () => {
return (
  <>
    <div className="forgot__password">
      <h1 className="forgot__password__header">Forgot Password?!</h1>
      <p className="forgot__password__sub-header">
        Enter your registered email id to receive OTP
      </p>
      <input
        className="forgot__password__input"
        type="email"
        placeholder="Email address"
      ></input>
      <button className="forgot__password__button" type="submit">
        Continue
      </button>
    </div>
  </>
);
}

export default forgotPassword;

