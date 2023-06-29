import React, { useState } from "react";
import ConfirmPassword from "./ResetPassword";
import "./styles.css";

const ForgotPasswordOTP = () => {
  const limitSingleValue = (input) => {
    input.target.value = input.target.value?.slice(0, 1);
  };

  const [isOtpValid, setIsOtpValid] = useState(false);

  if (isOtpValid) {
    return <ConfirmPassword />;
  }
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
            onInput={limitSingleValue}
          ></input>
          <input
            name="box2"
            className="forgot__password__otp__box"
            type="text"
            onInput={limitSingleValue}
          ></input>
          <input
            name="box3"
            className="forgot__password__otp__box"
            type="text"
            onInput={limitSingleValue}
          ></input>
          <input
            name="box4"
            className="forgot__password__otp__box"
            type="text"
            onInput={limitSingleValue}
          ></input>
          <input
            name="box5"
            className="forgot__password__otp__box"
            type="text"
            onInput={limitSingleValue}
          ></input>
          <input
            name="box6"
            className="forgot__password__otp__box"
            type="text"
            onInput={limitSingleValue}
          ></input>
        </div>
        <button
          className="forgot__password__button"
          type="submit"
          onClick={() => setIsOtpValid(true)}
        >
          Submit
        </button>
        <p className="forgot__password__footer">
          Didn&#39;t receive?
          <a href="#">Resend OTP</a>
        </p>
      </div>
    </>
  );
};

export default ForgotPasswordOTP;
