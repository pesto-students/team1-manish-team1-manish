import React from "react";
import "./styles.css";

const confirmPassword = () => {
  return (
    <>
      <div className="forgot__password">
        <h1 className="forgot__password__header">Forgot Password?!</h1>
        <p className="forgot__password__sub-header">Reset your password</p>
        <input
          className="forgot__password__input"
          type="password"
          placeholder="Enter new password"
        ></input>
        <input
          className="forgot__password__input--confirm"
          type="password"
          placeholder="Confirm New password again"
        ></input>
        <button className="forgot__password__button--confirm" type="submit">
          Confirm
        </button>
      </div>
    </>
  );
};

export default confirmPassword;
