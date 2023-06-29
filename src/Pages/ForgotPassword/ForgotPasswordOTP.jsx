import React from "react";
import "./styles.css";

const forgotPasswordOTP = () => {
  return (
    <>
      <div className="forgot__password">
        <h1 className="forgot__password__header">Forgot Password?!</h1>
        <p className="forgot__password__sub-header">
          Enter the OTP sent on your registered email ID
        </p>
        <div className="forgot_password__otp">
          <input
            name="box1"
            className="forgot__password__otp__box"
            type="text"
          ></input>
          <input
            name="box2"
            className="forgot__password__otp__box"
            type="text"
          ></input>
          <input
            name="box3"
            className="forgot__password__otp__box"
            type="text"
          ></input>
          <input
            name="box4"
            className="forgot__password__otp__box"
            type="text"
          ></input>
          <input
            name="box5"
            className="forgot__password__otp__box"
            type="text"
          ></input>
          <input
            name="box6"
            className="forgot__password__otp__box"
            type="text"
          ></input>
        </div>
        <button className="forgot__password__button" type="submit">
          Submit
        </button>
        <p className="forgot__password__footer">
          Didn't receive?
          <a href="#">Resend OTP</a>
        </p>
      </div>
    </>
  );
};

export default forgotPasswordOTP;
