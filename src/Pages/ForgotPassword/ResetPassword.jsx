import React, { useState } from "react";
import SuccessPage from "./SuccessPage";
import "./styles.css";

const ConfirmPassword = () => {
  const [isNewPasswordSet, setIsNewPasswordSet] = useState(false);

  if (isNewPasswordSet) {
    return <SuccessPage />;
  }
  return (
    <>
      <div className="forgot__password">
        <h1 className="forgot__password__header">Reset Password?!</h1>
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
        <button
          className="forgot__password__button--confirm"
          type="submit"
          onClick={() => setIsNewPasswordSet(true)}
        >
          Confirm
        </button>
      </div>
    </>
  );
};

export default ConfirmPassword;
